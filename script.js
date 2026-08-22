/* ============================================
   State
   ============================================ */
let currentCategory = 'All';
let currentSearch = '';
let currentSort = 'default';
let cart = {}; // { productId: quantity }

document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================
   Category chips
   ============================================ */
const categoryNav = document.getElementById('categoryNav');

CATEGORIES.forEach(cat => {
  const chip = document.createElement('button');
  chip.className = 'cat-chip' + (cat === 'All' ? ' active' : '');
  chip.textContent = cat;
  chip.addEventListener('click', () => {
    currentCategory = cat;
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    render();
  });
  categoryNav.appendChild(chip);
});

/* ============================================
   Search
   ============================================ */
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.trim().toLowerCase();
  searchClearBtn.hidden = currentSearch.length === 0;
  render();
});

searchClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  currentSearch = '';
  searchClearBtn.hidden = true;
  render();
});

/* ============================================
   Sort
   ============================================ */
document.getElementById('sortSelect').addEventListener('change', (e) => {
  currentSort = e.target.value;
  render();
});

/* ============================================
   Filtering + rendering the grid
   ============================================ */
function getFilteredProducts() {
  let list = PRODUCTS.filter(p => {
    const matchesCategory = currentCategory === 'All' || p.category === currentCategory;
    const matchesSearch = currentSearch === '' ||
      p.name.toLowerCase().includes(currentSearch) ||
      p.category.toLowerCase().includes(currentSearch);
    return matchesCategory && matchesSearch;
  });

  if (currentSort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
  if (currentSort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
  if (currentSort === 'rating-desc') list = [...list].sort((a, b) => b.rating - a.rating);

  return list;
}

function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}

function renderStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

const productGrid = document.getElementById('productGrid');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');

function render() {
  const list = getFilteredProducts();

  resultsCount.textContent = currentCategory === 'All' && !currentSearch
    ? `Showing all ${list.length} products`
    : `${list.length} result${list.length === 1 ? '' : 's'}`;

  productGrid.innerHTML = '';
  noResults.hidden = list.length > 0;

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-visual" style="background:${p.color}22" data-id="${p.id}">${p.icon}</div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name" data-id="${p.id}">${p.name}</h3>
        <p class="product-rating">${renderStars(p.rating)} <b>${p.rating}</b> (${p.reviews})</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">Add</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Wire up interactions for the freshly rendered cards
  productGrid.querySelectorAll('.product-visual, .product-name').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = `product.html?id=${el.dataset.id}`;
    });
  });

  productGrid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id);
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = 'Add';
        btn.classList.remove('added');
      }, 900);
    });
  });
}

/* ============================================
   Cart logic
   ============================================ */
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartCount = document.getElementById('cartCount');

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  renderCart();
}

function saveCart() {
  try {
    localStorage.setItem('basketful-cart', JSON.stringify(cart));
  } catch (err) {
    console.warn('Could not save cart to localStorage', err);
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem('basketful-cart');
    if (saved) cart = JSON.parse(saved);
  } catch (err) {
    console.warn('Could not load cart from localStorage', err);
  }
}

function getCartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(prod => prod.id === id);
    return p ? sum + p.price * qty : sum;
  }, 0);
}

function getCartItemCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartFooterEl = document.getElementById('cartFooter');

function renderCart() {
  const entries = Object.entries(cart);
  cartCount.textContent = getCartItemCount();
  cartEmptyEl.hidden = entries.length > 0;
  cartFooterEl.hidden = entries.length === 0;

  cartItemsEl.innerHTML = '';
  entries.forEach(([id, qty]) => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-visual" style="background:${p.color}22">${p.icon}</div>
      <div class="cart-item-info">
        <p class="cart-item-name">${p.name}</p>
        <p class="cart-item-price">${formatPrice(p.price)} each</p>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" data-id="${id}">−</button>
          <span>${qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${id}">+</button>
          <button class="cart-item-remove" data-action="remove" data-id="${id}">Remove</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  cartItemsEl.querySelectorAll('[data-action="inc"]').forEach(b =>
    b.addEventListener('click', () => changeQty(b.dataset.id, 1)));
  cartItemsEl.querySelectorAll('[data-action="dec"]').forEach(b =>
    b.addEventListener('click', () => changeQty(b.dataset.id, -1)));
  cartItemsEl.querySelectorAll('[data-action="remove"]').forEach(b =>
    b.addEventListener('click', () => removeFromCart(b.dataset.id)));

  document.getElementById('cartSubtotal').textContent = formatPrice(getCartTotal());
}

function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.hidden = false;
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.hidden = true;
}

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);

/* ============================================
   Checkout (mock)
   ============================================ */
const confirmBackdrop = document.getElementById('confirmBackdrop');

document.getElementById('checkoutBtn').addEventListener('click', () => {
  const itemCount = getCartItemCount();
  const total = formatPrice(getCartTotal());
  document.getElementById('confirmText').textContent =
    `Thanks for your order of ${itemCount} item${itemCount === 1 ? '' : 's'} — total ${total}. A confirmation has been sent to your email.`;

  cart = {};
  saveCart();
  renderCart();
  closeCart();
  confirmBackdrop.hidden = false;
});

document.getElementById('confirmCloseBtn').addEventListener('click', () => {
  confirmBackdrop.hidden = true;
});

/* ============================================
   Keyboard: close overlays with Escape
   ============================================ */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!confirmBackdrop.hidden) confirmBackdrop.hidden = true;
  if (cartDrawer.classList.contains('open')) closeCart();
});

/* ============================================
   Init
   ============================================ */
loadCart();
renderCart();
render();

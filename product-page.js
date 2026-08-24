/* ============================================
   Read the product id from the URL
   e.g. product.html?id=p03
   ============================================ */
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const product = PRODUCTS.find(p => p.id === productId);

document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================
   Shared helpers (kept in sync with script.js)
   ============================================ */
function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}

function renderStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function getCart() {
  try {
    const saved = localStorage.getItem('basketful-cart');
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    console.warn('Could not read cart from localStorage', err);
    return {};
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem('basketful-cart', JSON.stringify(cart));
  } catch (err) {
    console.warn('Could not save cart to localStorage', err);
  }
}

function addToCart(id, quantity) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + quantity;
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  document.getElementById('cartCount').textContent = count;
}

/* ============================================
   Render the product, or a "not found" state
   ============================================ */
const detailEl = document.getElementById('productDetail');

function renderNotFound() {
  document.title = 'Product not found — Basketful';
  detailEl.innerHTML = `
    <div class="not-found">
      <h1>Product not found</h1>
      <p>We couldn't find the product you're looking for.</p>
      <a href="index.html" class="btn btn-primary">Back to shop</a>
    </div>
  `;
}

function renderProduct(p) {
  document.title = `${p.name} — Basketful`;

  detailEl.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-visual" style="background:${p.color}22">${p.icon}</div>
      <div class="product-detail-body">
        <p class="product-detail-category">${p.category}</p>
        <h1 class="product-detail-title">${p.name}</h1>
        <p class="product-detail-rating">${renderStars(p.rating)} <b>${p.rating}</b> (${p.reviews} reviews)</p>
        <p class="product-detail-desc">${p.desc}</p>

        <div class="product-detail-purchase">
          <span class="product-detail-price">${formatPrice(p.price)}</span>
          <div class="qty-stepper">
            <button type="button" class="qty-btn" id="qtyDecBtn" aria-label="Decrease quantity">−</button>
            <span id="qtyValue">1</span>
            <button type="button" class="qty-btn" id="qtyIncBtn" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn btn-primary" id="addToBasketBtn">Add to Basket</button>
        </div>

        <p class="add-feedback" id="addFeedback" hidden>Added to your basket ✓</p>
      </div>
    </div>
  `;

  let quantity = 1;
  const qtyValueEl = document.getElementById('qtyValue');
  const addFeedbackEl = document.getElementById('addFeedback');

  document.getElementById('qtyDecBtn').addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    qtyValueEl.textContent = quantity;
  });

  document.getElementById('qtyIncBtn').addEventListener('click', () => {
    quantity = Math.min(20, quantity + 1);
    qtyValueEl.textContent = quantity;
  });

  document.getElementById('addToBasketBtn').addEventListener('click', () => {
    addToCart(p.id, quantity);
    addFeedbackEl.hidden = false;
    setTimeout(() => addFeedbackEl.hidden = true, 1800);
  });
}

/* ============================================
   Related products (same category, excluding this one)
   ============================================ */
function renderRelated(p) {
  const related = PRODUCTS
    .filter(item => item.category === p.category && item.id !== p.id)
    .slice(0, 3);

  if (related.length === 0) return;

  const relatedSection = document.getElementById('relatedSection');
  const relatedGrid = document.getElementById('relatedGrid');

  relatedGrid.innerHTML = related.map(item => `
    <a class="related-card" href="product.html?id=${item.id}">
      <div class="related-visual" style="background:${item.color}22">${item.icon}</div>
      <p class="related-name">${item.name}</p>
      <p class="related-price">${formatPrice(item.price)}</p>
    </a>
  `).join('');

  relatedSection.hidden = false;
}

/* ============================================
   Init
   ============================================ */
updateCartCount();

if (product) {
  renderProduct(product);
  renderRelated(product);
} else {
  renderNotFound();
}

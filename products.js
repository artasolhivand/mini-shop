/* ============================================
   Product catalog
   Plain data — kept in its own file so it's easy
   to extend without touching the app logic.
   ============================================ */

const PRODUCTS = [
  {
    id: 'p01',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 59.99,
    rating: 4.5,
    reviews: 214,
    color: '#2F5233',
    icon: '🎧',
    desc: 'Over-ear wireless headphones with 30-hour battery life and a foldable design for travel.'
  },
  {
    id: 'p02',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 79.00,
    rating: 4.7,
    reviews: 388,
    color: '#2F5233',
    icon: '⌨️',
    desc: 'Compact 75% mechanical keyboard with hot-swappable switches and RGB backlighting.'
  },
  {
    id: 'p03',
    name: 'Portable Charger 10,000mAh',
    category: 'Electronics',
    price: 24.99,
    rating: 4.3,
    reviews: 512,
    color: '#2F5233',
    icon: '🔋',
    desc: 'Slim power bank with fast charging for phones and small tablets. Fits in any bag.'
  },
  {
    id: 'p04',
    name: 'Ceramic Coffee Mug Set',
    category: 'Home',
    price: 18.50,
    rating: 4.6,
    reviews: 176,
    color: '#B4693E',
    icon: '☕',
    desc: 'Set of two hand-glazed ceramic mugs, microwave and dishwasher safe.'
  },
  {
    id: 'p05',
    name: 'Linen Throw Blanket',
    category: 'Home',
    price: 34.00,
    rating: 4.4,
    reviews: 92,
    color: '#B4693E',
    icon: '🧶',
    desc: 'Soft woven throw blanket, perfect for the couch or the end of the bed.'
  },
  {
    id: 'p06',
    name: 'Desk Plant — Pothos',
    category: 'Home',
    price: 15.00,
    rating: 4.8,
    reviews: 267,
    color: '#B4693E',
    icon: '🪴',
    desc: 'Low-maintenance pothos plant in a ceramic pot. Thrives on neglect.'
  },
  {
    id: 'p07',
    name: 'The Pragmatic Programmer',
    category: 'Books',
    price: 32.99,
    rating: 4.9,
    reviews: 1204,
    color: '#3E5C76',
    icon: '📘',
    desc: 'A classic guide to software craftsmanship, still relevant two decades later.'
  },
  {
    id: 'p08',
    name: 'Notebook — Dot Grid',
    category: 'Books',
    price: 12.00,
    rating: 4.6,
    reviews: 341,
    color: '#3E5C76',
    icon: '📓',
    desc: 'A5 dot-grid notebook with 160 pages, ideal for notes, sketches, or journaling.'
  },
  {
    id: 'p09',
    name: 'Learning German A1–B1',
    category: 'Books',
    price: 22.50,
    rating: 4.5,
    reviews: 158,
    color: '#3E5C76',
    icon: '📗',
    desc: 'A structured self-study course covering grammar, vocabulary and listening practice.'
  },
  {
    id: 'p10',
    name: 'Insulated Water Bottle',
    category: 'Outdoors',
    price: 21.99,
    rating: 4.7,
    reviews: 430,
    color: '#7A8B69',
    icon: '🥤',
    desc: 'Double-walled stainless steel bottle that keeps drinks cold for 24 hours.'
  },
  {
    id: 'p11',
    name: 'Compact Camping Chair',
    category: 'Outdoors',
    price: 45.00,
    rating: 4.4,
    reviews: 88,
    color: '#7A8B69',
    icon: '🪑',
    desc: 'Foldable camping chair that packs down small, with a supportive backrest.'
  },
  {
    id: 'p12',
    name: 'Trail Running Backpack 20L',
    category: 'Outdoors',
    price: 54.00,
    rating: 4.6,
    reviews: 143,
    color: '#7A8B69',
    icon: '🎒',
    desc: 'Lightweight 20-liter backpack with a hydration sleeve and rain cover.'
  },
];

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

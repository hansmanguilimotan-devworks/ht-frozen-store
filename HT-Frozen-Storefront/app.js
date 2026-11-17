const STARTING_CAPITAL = 100000;
const STORAGE_KEYS = {
  sales: "ht-sales-records",
  expenses: "ht-expense-records"
};

const MASTER_PRODUCTS = [
  { name: "Bola-Bola", category: "Frozen Foods", image: "./Images/Bola2.jpg", unit: "pcs", stock: 100 },
  { name: "Burger Patties", category: "Frozen Foods", image: "./Images/Burger Patties.jpg", unit: "pcs", stock: 22.5 },
  { name: "Burger Patties Cheese", category: "Frozen Foods", image: "./Images/BurgerPattieswithCheese.jpg", unit: "pcs", stock: 18 },
  { name: "Calderon Longanisa", category: "Frozen Foods", image: "./Images/Calderon.jpg", unit: "pcs", stock: 60 },
  { name: "Champion Cheese Hotdog", category: "Frozen Foods", image: "./Images/Champion Cheese.jpg", unit: "pcs", stock: 35 },
  { name: "Lumpia", category: "Frozen Foods", image: "./Images/LumpiaGreen.jpg", unit: "pcs", stock: 25 },
  { name: "Champion Hotdog", category: "Frozen Foods", image: "./Images/Champion.jpg", unit: "pcs", stock: 12 },
  { name: "Chicken Hotdog", category: "Frozen Foods", image: "./Images/Chicken Hotdog.jpg", unit: "pcs", stock: 44 },
  { name: "Cooked Ham", category: "Frozen Foods", image: "./Images/Cooked Ham.jpg", unit: "pcs", stock: 90 },
  { name: "Happy Hotdog", category: "Frozen Foods", image: "./Images/Happy.jpg", unit: "pcs", stock: 80 },
  { name: "Ngohiong", category: "Frozen Foods", image: "./Images/Ngohiong.jpg", unit: "pcs", stock: 27 },
  { name: "Skinless", category: "Frozen Foods", image: "./Images/Skinless.jpg", unit: "pcs", stock: 50 },
  { name: "Spam", category: "Frozen Foods", image: "./Images/Spam.jpg", unit: "pcs", stock: 36 },
  { name: "Sunny Hotdog", category: "Frozen Foods", image: "./Images/Sunny.jpg", unit: "pcs", stock: 72 },
  { name: "Sweet Ham", category: "Frozen Foods", image: "./Images/Sweet Ham.jpg", unit: "pcs", stock: 58 },
  { name: "Dumanjug Longanisa", category: "Frozen Foods", image: "./Images/Dumanjug Longanisa.jpg", unit: "pcs", stock: 46 },
  { name: "Patties", category: "Frozen Foods", image: "./Images/Patties.jpg", unit: "pcs", stock: 41 },
  { name: "Tocino Dumanjug", category: "Frozen Foods", image: "./Images/Tocino Dumanjug.jpg", unit: "pcs", stock: 39 },
  { name: "Tocino Roll", category: "Frozen Foods", image: "./Images/Tocino Roll.jpg", unit: "pcs", stock: 24 },
  { name: "Tocino Roll Cheese", category: "Frozen Foods", image: "./Images/Tocino Roll Cheese.jpg", unit: "pcs", stock: 31 },
  { name: "Tocino", category: "Frozen Foods", image: "./Images/Tocino.jpg", unit: "pcs", stock: 29 },
  { name: "KenR Longanisa", category: "Frozen Foods", image: "./Images/Kenr.jpg", unit: "pcs", stock: 67 },
  { name: "Virginia Hotdog", category: "Frozen Foods", image: "./Images/Virginia Hotdog.jpg", unit: "pcs", stock: 20 },
  { name: "Star Nuggets", category: "Frozen Foods", image: "./Images/Star Nuggets.jpg", unit: "pcs", stock: 33 },
  { name: "Chicken Nuggets", category: "Frozen Foods", image: "./Images/Chicken Nuggets.jpg", unit: "pcs", stock: 16.5 },
  { name: "Longi", category: "Sari-Sari Items", image: "./Images/Longi.jpg", unit: "pcs", stock: 26 },
  { name: "Canton", category: "Sari-Sari Items", image: "./Images/Canton.jpg", unit: "pcs", stock: 21.25 },
  { name: "Barbeque Mix", category: "Sari-Sari Items", image: "./Images/Barbeque Mix.jpg", unit: "pcs", stock: 30 },
  { name: "Tocino Mix", category: "Sari-Sari Items", image: "./Images/Tocino Mix.jpg", unit: "pcs", stock: 19.5 },
  { name: "Tomato Sauce", category: "Sari-Sari Items", image: "./Images/Tomato Sauce.jpg", unit: "pcs", stock: 14.75 },
  { name: "Crispy Fry", category: "Sari-Sari Items", image: "./Images/Crispy Fry.jpg", unit: "pcs", stock: 14.75 },
  { name: "Coffee & Milk Powders", category: "Drinks & Beverages", image: "./Images/Coffee & Milk Powders.jpg", unit: "pcs", stock: 14.75 },
  { name: "Eggs", category: "Retail Foods", image: "./Images/Eggs.jpg", unit: "pcs", stock: 14.75 },
  { name: "Food Condense", category: "Drinks & Beverages", image: "./Images/Food Condense.jpg", unit: "pcs", stock: 14.75 },
  { name: "Food Mixs Powder", category: "Drinks & Beverages", image: "./Images/Food Mixs Powder.jpg", unit: "pcs", stock: 14.75 },
  { name: "Tender Juicy Hotdog", category: "Frozen Foods", image: "./Images/Tender Juicy Hotdog.jpg", unit: "pcs", stock: 14.75 },
  { name: "Small Soriso", category: "Retail Foods", image: "./Images/Small Soriso.jpg", unit: "pcs", stock: 14.75 },
  { name: "Soriso", category: "Retail Foods", image: "./Images/Soriso.jpg", unit: "pcs", stock: 14.75 },
  { name: "Spicy Soriso Small", category: "Retail Foods", image: "./Images/Spicy Soriso Small.jpg", unit: "pcs", stock: 14.75 },
  { name: "Spicy Soriso", category: "Retail Foods", image: "./Images/Spicy Soriso.jpg", unit: "pcs", stock: 14.75 },
  { name: "Fishball", category: "Retail Foods", image: "./Images/Fishball.jpg", unit: "pcs", stock: 14.75 },
  { name: "Tempura", category: "Retail Foods", image: "./Images/Tempura.jpg", unit: "pcs", stock: 14.75 },
  { name: "Whole Chicken", category: "Fresh Produce", image: "./Images/Whole Chicken.jpg", unit: "pcs", stock: 14.75 },
  { name: "Leg Quarter", category: "Fresh Produce", image: "./Images/Leg Quarter.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Breast", category: "Fresh Produce", image: "./Images/Chicken Breast.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Neck", category: "Fresh Produce", image: "./Images/Chicken Neck.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Backbone", category: "Fresh Produce", image: "./Images/Chicken Backbone.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Liver", category: "Fresh Produce", image: "./Images/Chicken Liver.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Intestine", category: "Fresh Produce", image: "./Images/Chicken Intestine.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Feet", category: "Fresh Produce", image: "./Images/Chicken Feet.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Head", category: "Fresh Produce", image: "./Images/Chicken Head.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Dugo", category: "Fresh Produce", image: "./Images/Chicken Dugo.jpg", unit: "pcs", stock: 14.75 },
  { name: "Chicken Butsi", category: "Fresh Produce", image: "./Images/Chicken Butsi.png", unit: "pcs", stock: 14.75 },
  { name: "Oil", category: "Retail Foods", image: "./Images/Oil.jpg", unit: "pcs", stock: 14.75 },
  { name: "Ketchup", category: "Retail Foods", image: "./Images/Ketchup.jpg", unit: "pcs", stock: 14.75 },
];

const DEFAULT_PRICE_BY_NAME = {
  "Bola-Bola": 42,                    
  "Burger Patties": 50,
  "Burger Patties Cheese": 52,
  "Calderon Longanisa": 40,
  "Champion Cheese Hotdog": 40,
  "Lumpia": 25,
  "Champion Hotdog": 34,
  "Chicken Hotdog": 37,
  "Cooked Ham": 57,
  "Happy Hotdog": 35,
  "Ngohiong": 45,
  "Skinless": 20,
  "Spam": 55,
  "Sunny Hotdog": 34,
  "Sweet Ham": 60,
  "Dumanjug Longanisa": 40,
  "Patties": 38,
  "Tocino Dumanjug": 57,
  "Tocino Roll": 45,
  "Tocino Roll Cheese": 50,
  "Tocino": 62,
  "KenR Longanisa": 40,
  "Virginia Hotdog": 62,
  "Star Nuggets": 47,
  "Chicken Nuggets": 67,
  "Longi": 105,
  "Canton": 55,
  "Barbeque Mix": 42,
  "Tocino Mix": 42,
  "Tomato Sauce": 20,
  "Crispy Fry": 24,
  "Coffee & Milk Powders": 15,
  "Eggs": 9.5,
  "Food Condense": 50,
  "Food Mixs Powder": 20,
  "Tender Juicy Hotdog": 55,
  "Small Soriso": 25,
  "Soriso": 50,
  "Spicy Soriso Small": 55,
  "Spicy Soriso": 55,
  "Fishball": 95,
  "Tempura": 95,
  "Whole Chicken": 185,
  "Leg Quarter": 185,
  "Chicken Breast": 215,
  "Chicken Neck": 130,
  "Chicken Backbone": 130,
  "Chicken Liver": 210,
  "Chicken Intestine": 110,
  "Chicken Feet": 110,
  "Chicken Head": 35,
  "Chicken Dugo": 45,
  "Chicken Butsi": 120,
  "Oil": 33,
  "Ketchup": 100
};

const elements = {
  productsGrid: document.querySelector("#products-grid"),
  productsHeading: document.querySelector("#products-heading"),
  productsStatus: document.querySelector("#products-status"),
  searchInput: document.querySelector("#site-search"),
  searchForm: document.querySelector("#search-form"),
  showAllLink: document.querySelector("#show-all-products"),
  categoryCards: Array.from(document.querySelectorAll(".category-card")),
  toast: document.querySelector("#cart-toast"),
  cloudStatus: document.querySelector("#cloud-status"),
  capitalBalance: document.querySelector("#capital-balance"),
  breakevenStatus: document.querySelector("#breakeven-status"),
  profitSummary: document.querySelector("#profit-summary"),
  saleForm: document.querySelector("#sale-form"),
  expenseForm: document.querySelector("#expense-form"),
  stockForm: document.querySelector("#stock-form"),
  saleProduct: document.querySelector("#sale-product"),
  saleQuantity: document.querySelector("#sale-quantity"),
  salePrice: document.querySelector("#sale-price"),
  expenseTitle: document.querySelector("#expense-title"),
  expenseAmount: document.querySelector("#expense-amount"),
  stockProduct: document.querySelector("#stock-product"),
  stockQuantity: document.querySelector("#stock-quantity"),
  unitButtons: Array.from(document.querySelectorAll(".unit-btn"))
};

const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
const isAdminPage = currentPage === "admin.html";
const isStorefrontPage = !isAdminPage;
const hasStorefrontGrid = Boolean(elements.productsGrid);
const hasStorefrontFilters = Boolean(elements.categoryCards.length);

let inventoryProducts = [];
let activeCategory = "Frozen Foods";
let searchTerm = "";
let showingAll = true;
let toastTimer;
let activeUnit = "pcs";
let salesRecords = readRecords(STORAGE_KEYS.sales);
let expenseRecords = readRecords(STORAGE_KEYS.expenses);

function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2
  }).format(Number(value) || 0);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const trimmed = String(value).trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function readRecords(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecords(key, records) {
  window.localStorage.setItem(key, JSON.stringify(records));
}

function inferCategoryFromName(name) {
  const normalized = String(name).toLowerCase();

  if (/(chicken|pork|beef|fish|bangus|siomai|frozen)/.test(normalized)) {
    return "Frozen Foods";
  }
  if (/(rice|sauce|corned|butter|pantry|canton)/.test(normalized)) {
    return "Retail Foods";
  }
  if (/(sachet|soap|coffee|biscuits|toothpaste|sari)/.test(normalized)) {
    return "Sari-Sari Items";
  }
  if (/(juice|soda|milk|tea|water|drink)/.test(normalized)) {
    return "Drinks & Beverages";
  }
  return "Fresh Produce";
}

function inferUnit(name) {
  const normalized = String(name).toLowerCase();
  return /(kg|kilo|pork|beef|chicken|vegetable|apples|bananas|tomatoes|calamansi|rice|produce|bangus)/.test(normalized)
    ? "kg"
    : "pcs";
}

function createPlaceholderImage(name, category) {
  const label = encodeURIComponent(name);
  const colorMap = {
    "Frozen Foods": "2f9a57",
    "Retail Foods": "8ab957",
    "Sari-Sari Items": "c3b35f",
    "Drinks & Beverages": "53b47a",
    "Fresh Produce": "5fa84f"
  };
  const color = colorMap[category] || "2f9a57";
  return `https://via.placeholder.com/640x420/${color}/ffffff?text=${label}`;
}

function normalizeName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function findMasterMatch(name) {
  const normalizedName = normalizeName(name);

  return MASTER_PRODUCTS.find((product) => normalizeName(product.name) === normalizedName) || null;
}

function getDefaultPrice(name) {
  return DEFAULT_PRICE_BY_NAME[name] ?? 0;
}

function buildMasterCatalog() {
  return MASTER_PRODUCTS.map((product, index) => {
    const defaultPrice = getDefaultPrice(product.name);
    return {
      id: `master-${index}`,
      ...product,
      defaultPrice,
      price_per_unit: defaultPrice,
      stock: product.stock ?? 0
    };
  });
}

function setCloudStatus(message, variant = "") {
  if (!elements.cloudStatus) {
    return;
  }

  elements.cloudStatus.textContent = message;
  elements.cloudStatus.classList.remove("is-online", "is-offline");

  if (variant) {
    elements.cloudStatus.classList.add(variant);
  }
}

function getVisibleProducts() {
  const matchesSearch = (product) =>
    !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = (product) =>
    showingAll || !hasStorefrontFilters || product.category === activeCategory;

  return inventoryProducts.filter((product) => matchesSearch(product) && matchesCategory(product));
}

function sortProductsForDisplay(products) {
  return [...products].sort((left, right) => left.name.localeCompare(right.name));
}

function updateCategoryState() {
  elements.categoryCards.forEach((card) => {
    const isActive = !showingAll && !searchTerm && card.dataset.category === activeCategory;
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });
}

function createProductCard(product) {
  const stockCopy = product.stock === null
    ? `0 ${product.unit} available`
    : `${formatStockQuantity(product.stock)} ${product.unit} available`;
  const isOutOfStock = product.stock !== null && product.stock <= 0;
  const isLowStock = product.stock !== null && product.stock > 0 && product.stock < 5;
  const displayPrice = product.price_per_unit
    ? parseFloat(product.price_per_unit).toFixed(2)
    : parseFloat(product.defaultPrice || 0).toFixed(2);

  return `
    <article class="product-card is-highlighted">
      <div class="product-image" style="background-image: linear-gradient(135deg, rgba(18, 118, 61, 0.1), rgba(155, 225, 93, 0.24)), url('${product.image}')"></div>
      <div class="product-content">
        <div class="product-meta">
          <p class="product-category">${escapeHtml(product.category)}</p>
          <p class="product-unit">${escapeHtml(product.unit)}</p>
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="stock-copy">${escapeHtml(stockCopy)}</p>
        ${isLowStock ? '<p class="stock-alert">Low Stock!</p>' : ""}
        <p class="price">₱${displayPrice}</p>
        <button type="button" data-product-name="${escapeHtml(product.name)}" ${isOutOfStock ? "disabled" : ""}>
          ${isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  `;
}

function formatPriceText(value) {
  const resolvedValue = sanitizeNumber(value);

  if (resolvedValue !== null && resolvedValue > 0) {
    return `\u20B1${parseFloat(resolvedValue).toFixed(2)}`;
  }

  return "\u20B10.00";
}
function formatStockQuantity(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return Number.isInteger(numericValue)
    ? String(numericValue)
    : numericValue.toFixed(2).replace(/\.?0+$/, "");
}

function updateStatus(count) {
  if (!elements.productsHeading || !elements.productsStatus) {
    return;
  }

  elements.productsHeading.textContent = isAdminPage ? "Store Inventory" : "Top Deals Today";

  if (searchTerm) {
    elements.productsStatus.textContent = `Showing ${count} item${count === 1 ? "" : "s"} for "${searchTerm}".`;
    return;
  }

  if (!showingAll && hasStorefrontFilters) {
    elements.productsStatus.textContent = `Showing ${count} item${count === 1 ? "" : "s"} in ${activeCategory}.`;
    return;
  }

  elements.productsStatus.textContent = `Showing all ${count} products.`;
}

function renderProducts() {
  if (!elements.productsGrid) {
    return;
  }

  const visibleProducts = getVisibleProducts();

  elements.productsGrid.innerHTML = visibleProducts
    .map((item) => {
      const stockCopy = `${formatStockQuantity(item.stock ?? 0)} ${item.unit || "pcs"} available`;
      const isOutOfStock = Number(item.stock ?? 0) <= 0;
      const isLowStock = Number(item.stock ?? 0) > 0 && Number(item.stock ?? 0) < 5;
      const displayPrice = `\u20B1${parseFloat(item.price_per_unit || item.defaultPrice || 0).toFixed(2)}`;

      return `
        <article class="product-card is-highlighted">
          <div class="product-image" style="background-image: linear-gradient(135deg, rgba(18, 118, 61, 0.1), rgba(155, 225, 93, 0.24)), url('${item.image}')"></div>
          <div class="product-content">
            <div class="product-meta">
              <p class="product-category">${escapeHtml(item.category)}</p>
              <p class="product-unit">${escapeHtml(item.unit || "pcs")}</p>
            </div>
            <h3>${escapeHtml(item.name)}</h3>
            <p class="stock-copy">${escapeHtml(stockCopy)}</p>
            ${isLowStock ? '<p class="stock-alert">Low Stock!</p>' : ""}
            <p class="price">${displayPrice}</p>
            <button type="button" data-product-name="${escapeHtml(item.name)}" ${isOutOfStock ? "disabled" : ""}>
              ${isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  updateStatus(visibleProducts.length);
  updateCategoryState();
}

function showToast(message, type = "success") {
  if (!elements.toast) {
    return;
  }

  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.toggle("is-error", type === "error");
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
    elements.toast.classList.remove("is-error");
  }, 3000);
}

function updateCapitalMetrics() {
  if (!isAdminPage || !elements.capitalBalance || !elements.breakevenStatus || !elements.profitSummary) {
    return;
  }

  const totalSales = salesRecords.reduce((sum, entry) => sum + (sanitizeNumber(entry.total) || 0), 0);
  const totalExpenses = expenseRecords.reduce((sum, entry) => sum + (sanitizeNumber(entry.amount) || 0), 0);
  const currentBalance = STARTING_CAPITAL - totalExpenses;
  const delta = totalSales - totalExpenses;

  elements.capitalBalance.textContent = formatCurrency(currentBalance);
  elements.breakevenStatus.classList.remove("is-positive", "is-negative", "is-neutral");

  if (delta > 0) {
    elements.breakevenStatus.textContent = `${formatCurrency(delta)} Net Profit`;
    elements.breakevenStatus.classList.add("is-positive");
    elements.profitSummary.textContent = `Sales of ${formatCurrency(totalSales)} are ahead of expenses by ${formatCurrency(delta)}.`;
    return;
  }

  if (delta < 0) {
    elements.breakevenStatus.textContent = `${formatCurrency(Math.abs(delta))} left before breakeven`;
    elements.breakevenStatus.classList.add("is-negative");
    elements.profitSummary.textContent = `Expenses total ${formatCurrency(totalExpenses)} while sales are ${formatCurrency(totalSales)}.`;
    return;
  }

  elements.breakevenStatus.textContent = "Status: Breakeven";
  elements.breakevenStatus.classList.add("is-neutral");
  elements.profitSummary.textContent = "Sales and expenses are currently balanced.";
}

function populateProductSelect(selectElement) {
  if (!selectElement) {
    return;
  }

  const previousValue = selectElement.value;
  const options = inventoryProducts
    .map((product) => `<option value="${escapeHtml(String(product.id))}">${escapeHtml(product.name)}</option>`)
    .join("");

  selectElement.innerHTML = `<option value="">Select an item</option>${options}`;

  if (inventoryProducts.some((product) => String(product.id) === previousValue)) {
    selectElement.value = previousValue;
  }
}

function populateAdminOptions() {
  populateProductSelect(elements.saleProduct);
  populateProductSelect(elements.stockProduct);
}

function setActiveUnit(unit) {
  activeUnit = unit;
  elements.unitButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.unit === unit);
  });

  if (!elements.saleQuantity) {
    return;
  }

  if (unit === "kg") {
    elements.saleQuantity.step = "0.01";
    elements.saleQuantity.placeholder = "0.00";
  } else {
    elements.saleQuantity.step = "1";
    elements.saleQuantity.placeholder = "0";
  }
}

function getProductById(id) {
  return inventoryProducts.find((product) => String(product.id) === String(id)) || null;
}

function syncSaleFormProduct() {
  const product = getProductById(elements.saleProduct?.value);

  if (!product || !elements.salePrice) {
    return;
  }

  elements.salePrice.value = String(product.price_per_unit || product.defaultPrice || "");
  setActiveUnit(product.unit || "pcs");
}

function fetchProducts() {
  inventoryProducts = sortProductsForDisplay(buildMasterCatalog());
  setCloudStatus("Local catalog only. Database is disconnected.", "is-offline");
  populateAdminOptions();
  renderProducts();
  updateCapitalMetrics();
}

async function handleSaleSubmit(event) {
  event.preventDefault();

  const product = getProductById(elements.saleProduct?.value);
  const quantity = sanitizeNumber(elements.saleQuantity?.value);
  const price = sanitizeNumber(elements.salePrice?.value);

  if (!product || activeUnit === "" || quantity === null || price === null || quantity <= 0 || price <= 0) {
    showToast("Please fill in all required details!", "error");
    return;
  }

  if (activeUnit === "pcs" && !Number.isInteger(quantity)) {
    showToast("Pieces must use a whole-number quantity.", "error");
    return;
  }

  if (product.stock !== null && quantity > product.stock) {
    showToast("Not enough stock available for that sale.", "error");
    return;
  }

  const nextStock = product.stock === null ? null : Number((product.stock - quantity).toFixed(2));
  const total = Number((quantity * price).toFixed(2));

  try {
    if (nextStock !== null) {
      product.stock = nextStock;
    }

    product.price_per_unit = price;
    salesRecords = [
      {
        id: crypto.randomUUID(),
        productId: product.id,
        productName: product.name,
        unit: activeUnit,
        quantity,
        price,
        total,
        createdAt: new Date().toISOString()
      },
      ...salesRecords
    ];

    writeRecords(STORAGE_KEYS.sales, salesRecords);
    updateCapitalMetrics();
    renderProducts();
    elements.saleForm.reset();
    setActiveUnit(product.unit || "pcs");
    showToast(`${product.name} sale recorded on this page.`);
  } catch {
    showToast("Sale could not be recorded. Please try again.", "error");
  }
}

function handleExpenseSubmit(event) {
  event.preventDefault();

  const title = elements.expenseTitle?.value.trim() || "";
  const amount = sanitizeNumber(elements.expenseAmount?.value);

  if (!title || amount === null || amount <= 0) {
    showToast("Please fill in all required details!", "error");
    return;
  }

  expenseRecords = [
    {
      id: crypto.randomUUID(),
      title,
      amount,
      createdAt: new Date().toISOString()
    },
    ...expenseRecords
  ];

  writeRecords(STORAGE_KEYS.expenses, expenseRecords);
  updateCapitalMetrics();
  elements.expenseForm.reset();
  showToast(`${title} expense added successfully.`);
}

function handleStockSubmit(event) {
  event.preventDefault();

  const product = getProductById(elements.stockProduct?.value);
  const quantity = sanitizeNumber(elements.stockQuantity?.value);

  if (!product || quantity === null || quantity <= 0) {
    showToast("Please fill in all required details!", "error");
    return;
  }

  const nextStock = Number(((product.stock || 0) + quantity).toFixed(2));

  product.stock = nextStock;
  renderProducts();
  elements.stockForm.reset();
  showToast(`${product.name} stock updated on this page.`);
}

function setupStorefrontInteractions() {
  if (!isStorefrontPage && !hasStorefrontGrid) {
    return;
  }

  if (elements.searchForm && elements.searchInput) {
    elements.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      searchTerm = elements.searchInput.value.trim();
      showingAll = false;
      renderProducts();
    });

    elements.searchInput.addEventListener("input", () => {
      searchTerm = elements.searchInput.value.trim();
      showingAll = false;
      renderProducts();
    });
  }

  if (elements.showAllLink) {
    elements.showAllLink.addEventListener("click", (event) => {
      event.preventDefault();
      showingAll = true;
      searchTerm = "";
      if (elements.searchInput) {
        elements.searchInput.value = "";
      }
      renderProducts();
    });
  }

  elements.categoryCards.forEach((card) => {
    const activateCategory = () => {
      activeCategory = card.dataset.category;
      showingAll = false;
      searchTerm = "";
      if (elements.searchInput) {
        elements.searchInput.value = "";
      }
      renderProducts();
      const shopSection = document.querySelector("#shop, #inventory-preview");
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    card.addEventListener("click", activateCategory);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateCategory();
      }
    });
  });

  if (elements.productsGrid) {
    elements.productsGrid.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-product-name]");
      if (!button) {
        return;
      }
      showToast(`${button.dataset.productName} added to your list! Visit H&TStore at the market to pick it up.`);
    });
  }
}

function setupAdminInteractions() {
  if (!isAdminPage) {
    return;
  }

  elements.unitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveUnit(button.dataset.unit);
    });
  });

  if (elements.saleProduct) {
    elements.saleProduct.addEventListener("change", syncSaleFormProduct);
  }

  if (elements.saleForm) {
    elements.saleForm.addEventListener("submit", handleSaleSubmit);
  }

  if (elements.expenseForm) {
    elements.expenseForm.addEventListener("submit", handleExpenseSubmit);
  }

  if (elements.stockForm) {
    elements.stockForm.addEventListener("submit", handleStockSubmit);
  }

  setActiveUnit("pcs");
}

setupStorefrontInteractions();
setupAdminInteractions();

if (isStorefrontPage || isAdminPage) {
  fetchProducts();
}






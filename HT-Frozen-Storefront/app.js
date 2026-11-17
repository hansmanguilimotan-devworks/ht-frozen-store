const SUPABASE_URL = "https://lsirfmnkycqeglfdmkco.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_uoCl_JsM4AiBX7HDy8LQow_IK-_YVrH";
const STARTING_CAPITAL = 100000;
const STORAGE_KEYS = {
  sales: "ht-sales-records",
  expenses: "ht-expense-records"
};

const MASTER_PRODUCTS = [
  { name: "Bola-Bola", category: "Frozen Foods", image: "./Images/Bola2.jpg", unit: "pcs", stock: 50 },
  { name: "Burger Patties", category: "Frozen Foods", image: "./Images/Burger Patties.jpg", unit: "pcs", stock: 22.5 },
  { name: "Burger Patties Cheese", category: "Frozen Foods", image: "./Images/BurgerPattieswithCheese.jpg", unit: "pcs", stock: 18 },
  { name: "Calderon Longanisa", category: "Frozen Foods", image: "./Images/Calderon.jpg", unit: "pcs", stock: 60 },
  { name: "Champion Cheese Hotdog", category: "Frozen Foods", image: "./Images/Champion Cheese.jpg", unit: "pcs", stock: 35 },
  { name: "Lumpia", category: "Frozen Foods", image: "./Images/LumpiaGreen.jpg", unit: "pcs", stock: 25 },
  { name: "Champion Hotdog", category: "Retail Foods", image: "./Images/Champion.jpg", unit: "pcs", stock: 12 },
  { name: "Chicken Hotdog", category: "Retail Foods", image: "./Images/Chicken Hotdog.jpg", unit: "pcs", stock: 44 },
  { name: "Cooked Ham", category: "Retail Foods", image: "./Images/Cooked Ham.jpg", unit: "pcs", stock: 90 },
  { name: "Happy Hotdog", category: "Retail Foods", image: "./Images/Happy.jpg", unit: "pcs", stock: 80 },
  { name: "Ngohiong", category: "Retail Foods", image: "./Images/Ngohiong.jpg", unit: "pcs", stock: 27 },
  { name: "Skinless", category: "Retail Foods", image: "./Images/Skinless.jpg", unit: "pcs", stock: 50 },
  { name: "Spam", category: "Sari-Sari Items", image: "./Images/Spam.jpg", unit: "pcs", stock: 36 },
  { name: "Sunny Hotdog", category: "Sari-Sari Items", image: "./Images/Sunny.jpg", unit: "pcs", stock: 72 },
  { name: "Sweet Ham", category: "Sari-Sari Items", image: "./Images/Sweet Ham.jpg", unit: "pcs", stock: 58 },
  { name: "3-in-1 Coffee Sticks", category: "Sari-Sari Items", image: "https://via.placeholder.com/640x420/c6ad53/ffffff?text=Coffee+Sticks", unit: "pcs", stock: 46 },
  { name: "Biscuits Variety Pack", category: "Sari-Sari Items", image: "https://via.placeholder.com/640x420/d2c07c/ffffff?text=Biscuits", unit: "pcs", stock: 41 },
  { name: "Toothpaste Saver Tube", category: "Sari-Sari Items", image: "https://via.placeholder.com/640x420/c8b467/ffffff?text=Toothpaste", unit: "pcs", stock: 39 },
  { name: "Tropical Juice Bundle", category: "Drinks & Beverages", image: "https://via.placeholder.com/640x420/53b47a/ffffff?text=Juice+Bundle", unit: "pcs", stock: 24 },
  { name: "Sparkling Soda Pack", category: "Drinks & Beverages", image: "https://via.placeholder.com/640x420/48a88d/ffffff?text=Soda+Pack", unit: "pcs", stock: 31 },
  { name: "Fresh Milk 1L", category: "Drinks & Beverages", image: "https://via.placeholder.com/640x420/55a9a0/ffffff?text=Fresh+Milk", unit: "pcs", stock: 29 },
  { name: "KenR Longanisa", category: "Drinks & Beverages", image: "./Images/Kenr.jpg", unit: "pcs", stock: 67 },
  { name: "Mineral Water Case", category: "Drinks & Beverages", image: "https://via.placeholder.com/640x420/69b2ad/ffffff?text=Mineral+Water", unit: "pcs", stock: 20 },
  { name: "Chocolate Drink Mix", category: "Drinks & Beverages", image: "https://via.placeholder.com/640x420/73af7b/ffffff?text=Chocolate+Drink", unit: "pcs", stock: 33 },
  { name: "Fresh Vegetable Value Set", category: "Fresh Produce", image: "https://via.placeholder.com/640x420/5fa84f/ffffff?text=Vegetable+Set", unit: "kg", stock: 16.5 },
  { name: "Crisp Romaine Lettuce", category: "Fresh Produce", image: "https://via.placeholder.com/640x420/6eb05a/ffffff?text=Romaine+Lettuce", unit: "pcs", stock: 26 },
  { name: "Sweet Red Apples", category: "Fresh Produce", image: "https://via.placeholder.com/640x420/8db95e/ffffff?text=Red+Apples", unit: "kg", stock: 21.25 },
  { name: "Ripe Cavendish Bananas", category: "Fresh Produce", image: "https://via.placeholder.com/640x420/99c05c/ffffff?text=Bananas", unit: "kg", stock: 30 },
  { name: "Vine Tomatoes Pack", category: "Fresh Produce", image: "https://via.placeholder.com/640x420/7aac4f/ffffff?text=Tomatoes", unit: "kg", stock: 19.5 },
  { name: "Green Calamansi Pouch", category: "Fresh Produce", image: "https://via.placeholder.com/640x420/84b652/ffffff?text=Calamansi", unit: "kg", stock: 14.75 }
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
  "Laundry Soap Bar": 32,
  "3-in-1 Coffee Sticks": 48,
  "Biscuits Variety Pack": 85,
  "Toothpaste Saver Tube": 54,
  "Tropical Juice Bundle": 120,
  "Sparkling Soda Pack": 99,
  "Fresh Milk 1L": 92,
  "Bottled Iced Tea": 35,
  "Mineral Water Case": 180,
  "Chocolate Drink Mix": 88,
  "Fresh Vegetable Value Set": 140,
  "Crisp Romaine Lettuce": 65,
  "Sweet Red Apples": 165,
  "Ripe Cavendish Bananas": 95,
  "Vine Tomatoes Pack": 110,
  "Green Calamansi Pouch": 75
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
let supabaseClient = null;
let inventoryChannel = null;
let isFetchingProducts = false;
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

function setupInventoryRealtime() {
  if (!supabaseClient || inventoryChannel) {
    return;
  }

  inventoryChannel = supabaseClient
    .channel("inventory-live-sync")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "inventory" },
      () => {
        fetchProducts();
      }
    )
    .subscribe();
}

function syncMasterProductsWithInventory(rows) {
  rows.forEach((row) => {
    const masterMatch = findMasterMatch(row.item_name || row.name);
    const dbPrice = sanitizeNumber(row.price_per_unit);
    const dbUnit = typeof row.unit === "string" && row.unit.trim() ? row.unit.trim().toLowerCase() : null;

    if (!masterMatch) {
      return;
    }

    if (dbPrice !== null && dbPrice > 0) {
      masterMatch.price_per_unit = dbPrice;
    }

    if (dbUnit) {
      masterMatch.unit = dbUnit;
    }
  });
}

function buildMasterCatalog() {
  return MASTER_PRODUCTS.map((product, index) => ({
    id: `master-${index}`,
    cloudId: null,
    ...product,
    defaultPrice: getDefaultPrice(product.name),
    price_per_unit: null,
    stock: 0
  }));
}

function mergeInventoryWithMasterCatalog(rows) {
  const catalog = buildMasterCatalog();
  const catalogByName = new Map(catalog.map((product) => [normalizeName(product.name), product]));
  const extras = [];

  rows.forEach((row, index) => {
    const mappedRow = mapInventoryRow(row, index);
    const key = normalizeName(mappedRow.name);
    const existing = catalogByName.get(key);

    if (existing) {
      existing.cloudId = mappedRow.cloudId;
      existing.id = mappedRow.cloudId ?? existing.id;
      existing.name = mappedRow.name;
      existing.category = mappedRow.category;
      existing.defaultPrice = existing.defaultPrice || mappedRow.defaultPrice || getDefaultPrice(existing.name);
      existing.price_per_unit = mappedRow.price_per_unit && mappedRow.price_per_unit > 0
        ? mappedRow.price_per_unit
        : existing.defaultPrice;
      existing.image = mappedRow.image || existing.image;
      existing.unit = mappedRow.unit || existing.unit;
      existing.stock = mappedRow.stock ?? 0;
      return;
    }

    extras.push({
      ...mappedRow,
      defaultPrice: mappedRow.defaultPrice || getDefaultPrice(mappedRow.name),
      price_per_unit: mappedRow.price_per_unit && mappedRow.price_per_unit > 0
        ? mappedRow.price_per_unit
        : (mappedRow.defaultPrice || getDefaultPrice(mappedRow.name)),
      unit: mappedRow.unit || "pcs",
      stock: mappedRow.stock ?? 0
    });
  });

  return sortProductsForDisplay([...catalog, ...extras]);
}

function mapInventoryRow(row, index) {
  const name = row.item_name || row.name || `Inventory Item ${index + 1}`;
  const masterMatch = findMasterMatch(name);
  const category = row.category || masterMatch?.category || inferCategoryFromName(name);
  const liveUnit = row.unit;
  const unit = typeof liveUnit === "string" && liveUnit.trim()
    ? liveUnit.trim().toLowerCase()
    : masterMatch?.unit || inferUnit(name);
  const pricePerUnit = sanitizeNumber(
    row.price_per_unit ?? row.price ?? row.unit_price ?? row.selling_price
  );
  const stock = sanitizeNumber(
    row.on_hand_quantity ?? row.stock_quantity ?? row.quantity_on_hand ?? row.stock
  );

  return {
    id: row.id ?? `cloud-${index}`,
    cloudId: row.id ?? null,
    name,
    category,
    defaultPrice: masterMatch?.defaultPrice || getDefaultPrice(name),
    price_per_unit: pricePerUnit,
    image: row.image_url || masterMatch?.image || createPlaceholderImage(name, category),
    unit,
    stock
  };
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

function createSupabaseClient() {
  const sdk = window.supabase;

  if (!sdk || typeof sdk.createClient !== "function") {
    setCloudStatus("Supabase client library did not load. Using local fallback inventory.", "is-offline");
    return null;
  }

  setCloudStatus("Connecting to Supabase inventory...");
  return sdk.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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

  elements.productsHeading.textContent = isAdminPage ? "Cloud Inventory" : "Top Deals Today";

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
      const displayPrice = item.cloudId !== null && item.price_per_unit !== null
        ? `\u20B1${parseFloat(item.price_per_unit).toFixed(2)}`
        : `\u20B1${parseFloat(item.defaultPrice || 0).toFixed(2)}`;

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

async function persistStockQuantity(product, nextStock) {
  if (!supabaseClient || product.cloudId === null) {
    return;
  }

  const { error } = await supabaseClient
    .from("inventory")
    .update({ on_hand_quantity: nextStock })
    .eq("id", product.cloudId);

  if (error) {
    throw error;
  }
}

async function fetchProducts() {
  if (isFetchingProducts) {
    return;
  }

  isFetchingProducts = true;
  supabaseClient = createSupabaseClient();

  inventoryProducts = sortProductsForDisplay(buildMasterCatalog());
  renderProducts();

  if (!supabaseClient) {
    setCloudStatus("Showing local fallback inventory.", "is-offline");
    populateAdminOptions();
    renderProducts();
    updateCapitalMetrics();
    isFetchingProducts = false;
    return;
  }

  try {
    const { data, error } = await supabaseClient.from("inventory").select("*");

    if (error) {
      throw error;
    }

    if (!Array.isArray(data)) {
      throw new Error("Inventory response was invalid.");
    }

    const masterCatalog = buildMasterCatalog();
    const catalogByName = new Map(masterCatalog.map((item) => [normalizeName(item.name), item]));

    data.forEach((row, index) => {
      const mappedRow = mapInventoryRow(row, index);
      const matchingItem = catalogByName.get(normalizeName(mappedRow.name));

      if (matchingItem) {
        matchingItem.cloudId = mappedRow.cloudId;
        matchingItem.id = mappedRow.cloudId ?? matchingItem.id;
        matchingItem.name = mappedRow.name;
        matchingItem.category = mappedRow.category;
        matchingItem.image = mappedRow.image || matchingItem.image;
        matchingItem.unit = mappedRow.unit || matchingItem.unit;
        matchingItem.stock = mappedRow.stock ?? 0;
        matchingItem.price_per_unit = mappedRow.price_per_unit;
        matchingItem.price = mappedRow.price_per_unit;
        return;
      }

      masterCatalog.push({
        ...mappedRow,
        defaultPrice: getDefaultPrice(mappedRow.name),
        price: mappedRow.price_per_unit,
        price_per_unit: mappedRow.price_per_unit
      });
    });

    inventoryProducts = sortProductsForDisplay(masterCatalog);
    setCloudStatus("Live inventory connected to Supabase.", "is-online");
    setupInventoryRealtime();
  } catch {
    setCloudStatus("Cloud inventory could not load. Showing local fallback catalog.", "is-offline");
    inventoryProducts = sortProductsForDisplay(buildMasterCatalog());
  }

  populateAdminOptions();
  renderProducts();
  updateCapitalMetrics();
  isFetchingProducts = false;
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
      await persistStockQuantity(product, nextStock);
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
    showToast(`${product.name} sale recorded and inventory updated.`);
  } catch {
    showToast("Sale could not be synced to inventory. Please try again.", "error");
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

async function handleStockSubmit(event) {
  event.preventDefault();

  const product = getProductById(elements.stockProduct?.value);
  const quantity = sanitizeNumber(elements.stockQuantity?.value);

  if (!product || quantity === null || quantity <= 0) {
    showToast("Please fill in all required details!", "error");
    return;
  }

  const nextStock = Number(((product.stock || 0) + quantity).toFixed(2));

  try {
    await persistStockQuantity(product, nextStock);
    product.stock = nextStock;
    renderProducts();
    elements.stockForm.reset();
    showToast(`${product.name} stock updated successfully.`);
  } catch {
    showToast("Stock update could not be synced to inventory.", "error");
  }
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
window.addEventListener("focus", () => {
  fetchProducts();
});

if (isStorefrontPage || isAdminPage) {
  fetchProducts();
}






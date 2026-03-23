const SUPABASE_URL = "https://lsirfmnkycqeglfdmkco.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_uoCl_JsM4AiBX7HDy8LQow_IK-_YVrH";
const supabaseClient = window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_ANON_KEY);
// If Supabase still reports old columns after this update, refresh the website twice to clear the schema cache.
// If sales.date was just added in Supabase, run NOTIFY pgrst, 'reload schema'; before testing saves again.

const INITIAL_INVESTMENT_CATEGORY = "Initial Investment";

const PRODUCT_CATALOG = [
  { name: "Hotdog", price: 25, unit: "pcs" },
  { name: "Siomai", price: 50, unit: "pcs" },
  { name: "Chicken", price: 220, unit: "kg" },
  { name: "Pork", price: 280, unit: "kg" },
  { name: "Eggs", price: 9, unit: "pcs" },
  { name: "Coffee", price: 15, unit: "pcs" },
  { name: "Rice", price: 55, unit: "kg" },
  { name: "Sugar", price: 42, unit: "kg" },
  { name: "Salt", price: 12, unit: "pcs" },
  { name: "Cooking Oil", price: 78, unit: "pcs" },
  { name: "Sardines", price: 28, unit: "pcs" },
  { name: "Corned Beef", price: 42, unit: "pcs" },
  { name: "Instant Noodles", price: 16, unit: "pcs" },
  { name: "Soy Sauce", price: 24, unit: "pcs" },
  { name: "Vinegar", price: 22, unit: "pcs" },
  { name: "Milk", price: 34, unit: "pcs" },
  { name: "Bread", price: 12, unit: "pcs" },
  { name: "Ice Cream", price: 35, unit: "pcs" },
  { name: "Fish Ball", price: 45, unit: "kg" },
  { name: "Soft Drinks", price: 25, unit: "pcs" },
];

const SORTED_PRODUCT_CATALOG = [...PRODUCT_CATALOG].sort((a, b) => a.name.localeCompare(b.name));
const QUICK_ADD_ITEMS = Object.fromEntries(
  PRODUCT_CATALOG.filter((item) => ["Hotdog", "Siomai", "Chicken", "Pork"].includes(item.name)).map((item) => [
    item.name,
    item.price,
  ])
);

const state = {
  sales: [],
  inventoryLog: [],
  expenses: [],
};

const salesForm = document.getElementById("salesForm");
const inventoryForm = document.getElementById("inventoryForm");
const expenseForm = document.getElementById("expenseForm");
const investmentForm = document.getElementById("investmentForm");
const printReportButton = document.getElementById("printReportButton");
const saveInvestmentButton = document.getElementById("saveInvestmentButton");
const addSaleButton = document.getElementById("addSaleButton");
const updateStockButton = document.getElementById("updateStockButton");
const addExpenseButton = document.getElementById("addExpenseButton");
const salesTable = document.getElementById("salesTable");
const inventoryTable = document.getElementById("inventoryTable");
const expensesTable = document.getElementById("expensesTable");
const snapshotGrid = document.querySelector(".snapshot-grid");

const salesTableBody = document.getElementById("salesTableBody");
const inventoryTableBody = document.getElementById("inventoryTableBody");
const inventoryLogTableBody = document.getElementById("inventoryLogTableBody");
const expenseTableBody = document.getElementById("expenseTableBody");
const emptyStateTemplate = document.getElementById("emptyStateTemplate");
const productCatalog = document.getElementById("productCatalog");
const toastStack = document.getElementById("toastStack");

const saleDate = document.getElementById("saleDate");
const saleItem = document.getElementById("saleItem");
const salePrice = document.getElementById("salePrice");
const saleQuantity = document.getElementById("saleQuantity");
const saleUnitToggle = document.getElementById("saleUnitToggle");
const inventoryDate = document.getElementById("inventoryDate");
const inventoryItem = document.getElementById("inventoryItem");
const inventoryQuantity = document.getElementById("inventoryQuantity");
const inventoryType = document.getElementById("inventoryType");
const inventoryUnitCost = document.getElementById("inventoryUnitCost");
const inventoryUnitToggle = document.getElementById("inventoryUnitToggle");
const expenseDate = document.getElementById("expenseDate");
const initialInvestmentInput = document.getElementById("initialInvestment");
const quickAddButtons = document.querySelectorAll("[data-quick-item]");
const printTimestamp = document.getElementById("printTimestamp");
const recoveryCard = document.getElementById("recoveryCard");

const currency = new Intl.NumberFormat("en-PH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

let currentSaleUnit = "pcs";
let currentInventoryUnit = "pcs";

setDefaultDates();
renderProductCatalog();
attachEvents();
initializeApp();

async function initializeApp() {
  if (!supabaseClient) {
    showToast("Error: Supabase client failed to load. Check your internet connection and reload the page.", "error");
    return;
  }

  try {
    await reloadCloudData();
  } catch (error) {
    handleCloudError(
      "Could not load cloud data from Supabase. Please double-check that your tables include the expected columns.",
      error
    );
  }
}

function attachEvents() {
  salesForm.addEventListener("submit", handleSaleSubmit);
  inventoryForm.addEventListener("submit", handleInventorySubmit);
  expenseForm.addEventListener("submit", handleExpenseSubmit);
  investmentForm.addEventListener("submit", handleInvestmentSubmit);
  addSaleButton.addEventListener("click", handleSaleSubmit);
  updateStockButton.addEventListener("click", handleInventorySubmit);
  addExpenseButton.addEventListener("click", handleExpenseSubmit);
  saveInvestmentButton.addEventListener("click", handleInvestmentSubmit);
  initialInvestmentInput.addEventListener("input", updateInvestmentButtonState);
  salesTableBody.addEventListener("click", handleSalesTableClick);
  inventoryLogTableBody.addEventListener("click", handleInventoryTableClick);
  expenseTableBody.addEventListener("click", handleExpensesTableClick);
  saleItem.addEventListener("input", handleSaleItemLookup);
  saleItem.addEventListener("change", handleSaleItemLookup);
  inventoryItem.addEventListener("input", handleInventoryItemLookup);
  inventoryItem.addEventListener("change", handleInventoryItemLookup);
  inventoryType.addEventListener("change", handleInventoryTypeChange);
  saleUnitToggle.addEventListener("click", () => toggleUnit("sale"));
  inventoryUnitToggle.addEventListener("click", () => toggleUnit("inventory"));
  printReportButton.addEventListener("click", handlePrintReport);
  quickAddButtons.forEach((button) => {
    button.addEventListener("click", handleQuickAddClick);
  });
  [salesForm, inventoryForm, expenseForm].forEach((form) => {
    form.addEventListener("input", clearFieldErrorOnEdit);
    form.addEventListener("change", clearFieldErrorOnEdit);
  });
}

function setDefaultDates() {
  const today = getLocalDateValue();
  saleDate.value = today;
  inventoryDate.value = today;
  expenseDate.value = today;
  handleInventoryTypeChange();
  resetUnitToggles();
  updateInvestmentButtonState();
}

async function reloadCloudData() {
  const [salesRows, inventoryRows, expenseRows] = await Promise.all([
    fetchTable("sales"),
    fetchTable("inventory"),
    fetchTable("expenses"),
  ]);

  state.sales = salesRows.map(mapSaleRow).sort(sortByDateDesc);
  state.inventoryLog = inventoryRows.map(mapInventoryRow).sort((a, b) => a.item.localeCompare(b.item));
  state.expenses = expenseRows.map(mapExpenseRow).sort(sortByDateDesc);

  initialInvestmentInput.value = getInitialInvestmentAmount() || "";
  updateInvestmentButtonState();
  render();
}

async function fetchTable(table) {
  const { data, error } = await supabaseClient.from(table).select("*");
  if (error) {
    throw error;
  }
  return data ?? [];
}

async function handleSaleSubmit(event) {
  event?.preventDefault();

  if (!validateRequiredFields([saleDate, saleItem, saleQuantity, salePrice])) {
    return;
  }

  const quantity = Number(saleQuantity.value);
  const itemName = saleItem.value.trim();
  const price = Number(salePrice.value);
  const saleEntry = {
    date: saleDate.value,
    item: itemName,
    quantity,
    price,
    unit: currentSaleUnit,
  };

  try {
    const stockRecord = await getInventoryRecord(itemName);
    const availableStock = Number(stockRecord?.on_hand_quantity ?? 0);

    if (quantity > availableStock) {
      showToast(
        `Insufficient Stock! You only have ${formatQuantity(availableStock, stockRecord?.unit || currentSaleUnit)} left.`,
        "error"
      );
      return;
    }

    await insertRows("sales", [toSaleRow(saleEntry)]);
    await adjustInventoryQuantity({
      itemName,
      unit: currentSaleUnit,
      quantityDelta: -quantity,
      reorderLevel: getExistingReorderLevel(itemName),
    });
    await reloadCloudData();
    salesForm.reset();
    saleDate.value = getLocalDateValue();
    resetUnitToggles();
    showToast("Sale Saved!", "success");
  } catch (error) {
    handleCloudError("Could not save the sale to Supabase.", error);
  }
}

async function handleInventorySubmit(event) {
  event?.preventDefault();

  if (
    !validateRequiredFields([
      inventoryDate,
      inventoryItem,
      inventoryType,
      inventoryQuantity,
      inventoryUnitCost,
      document.getElementById("inventoryReorder"),
    ])
  ) {
    return;
  }

  const entry = {
    date: inventoryDate.value,
    item: inventoryItem.value.trim(),
    type: inventoryType.value,
    quantity: Number(inventoryQuantity.value),
    unitCost: Number(inventoryUnitCost.value) || 0,
    unit: currentInventoryUnit,
    reorderLevel: Number(document.getElementById("inventoryReorder").value),
  };

  if (entry.type === "in" && entry.quantity * entry.unitCost > getCurrentBalance()) {
    showToast("Warning: This expense exceeds your current investment balance!", "error");
  }

  try {
    const signedQuantity =
      entry.type === "in" ? entry.quantity : entry.type === "out" || entry.type === "spoilage" ? -entry.quantity : 0;

    await adjustInventoryQuantity({
      itemName: entry.item,
      unit: entry.unit,
      quantityDelta: signedQuantity,
      reorderLevel: entry.reorderLevel,
    });

    if (entry.type === "in") {
      const expenseEntry = createAutoExpenseFromStockIn(entry);
      await insertRows("expenses", [toExpenseRow(expenseEntry)]);
    }

    await reloadCloudData();
    inventoryForm.reset();
    inventoryDate.value = getLocalDateValue();
    document.getElementById("inventoryReorder").value = 5;
    handleInventoryTypeChange();
    resetUnitToggles();
    showToast("Stock Updated!", "success");
  } catch (error) {
    handleCloudError("Could not save the inventory update to Supabase.", error);
  }
}

async function handleExpenseSubmit(event) {
  event?.preventDefault();

  if (!validateRequiredFields([expenseDate, document.getElementById("expenseCategory"), document.getElementById("expenseAmount")])) {
    return;
  }

  const entry = {
    date: expenseDate.value,
    category: document.getElementById("expenseCategory").value,
    note: document.getElementById("expenseNote").value.trim(),
    amount: Number(document.getElementById("expenseAmount").value),
    autoGenerated: false,
    inventoryId: null,
  };

  if (entry.amount > getCurrentBalance()) {
    showToast("Warning: This expense exceeds your current investment balance!", "error");
  }

  try {
    await insertRows("expenses", [toExpenseRow(entry)]);
    await reloadCloudData();
    expenseForm.reset();
    expenseDate.value = getLocalDateValue();
    showToast("Expense Added!", "success");
  } catch (error) {
    handleCloudError("Could not save the expense to Supabase.", error);
  }
}

async function handleInvestmentSubmit(event) {
  event?.preventDefault();

  if (!validateRequiredFields([initialInvestmentInput])) {
    return;
  }

  const investmentAmount = Number(initialInvestmentInput.value) || 0;

  try {
    await supabaseClient.from("expenses").delete().eq("category", INITIAL_INVESTMENT_CATEGORY);

    if (investmentAmount > 0) {
      const investmentEntry = {
        date: getLocalDateValue(),
        category: INITIAL_INVESTMENT_CATEGORY,
        note: "Business Capital",
        amount: investmentAmount,
        autoGenerated: false,
        inventoryId: null,
      };
      await insertRows("expenses", [toExpenseRow(investmentEntry)]);
    }

    await reloadCloudData();
    showToast("Investment Saved!", "success");
  } catch (error) {
    handleCloudError("Could not save the total business investment.", error);
  }
}

function handleInventoryTypeChange() {
  const requiresCost = inventoryType.value === "in";
  inventoryUnitCost.required = requiresCost;
  inventoryUnitCost.disabled = !requiresCost;
  if (!requiresCost) {
    inventoryUnitCost.value = "";
  }
}

function handleQuickAddClick(event) {
  const itemName = event.currentTarget.dataset.quickItem;
  saleItem.value = itemName;
  salePrice.value = QUICK_ADD_ITEMS[itemName].toFixed(2);
  saleItem.focus();
}

async function handleSalesTableClick(event) {
  const button = event.target.closest("[data-delete-sale]");
  if (!button) {
    return;
  }

  const saleId = button.dataset.deleteSale;
  const saleEntry = state.sales.find((entry) => entry.id === saleId);

  try {
    await supabaseClient.from("sales").delete().eq("id", saleId);
    if (saleEntry) {
      await adjustInventoryQuantity({
        itemName: saleEntry.item,
        unit: saleEntry.unit || "pcs",
        quantityDelta: saleEntry.quantity,
        reorderLevel: getExistingReorderLevel(saleEntry.item),
      });
    }
    await reloadCloudData();
    showToast("Sale Deleted.", "success");
  } catch (error) {
    handleCloudError("Could not delete the sale from Supabase.", error);
  }
}

async function handleInventoryTableClick(event) {
  const button = event.target.closest("[data-delete-inventory]");
  if (!button) {
    return;
  }

  const inventoryId = button.dataset.deleteInventory;
  const inventoryEntry = state.inventoryLog.find((entry) => entry.id === inventoryId);

  try {
    await supabaseClient.from("inventory").delete().eq("id", inventoryId);
    if (inventoryEntry?.lastExpenseId) {
      await supabaseClient.from("expenses").delete().eq("id", inventoryEntry.lastExpenseId);
    }
    await reloadCloudData();
    showToast("Inventory Entry Deleted.", "success");
  } catch (error) {
    handleCloudError("Could not delete the inventory row from Supabase.", error);
  }
}

async function handleExpensesTableClick(event) {
  const button = event.target.closest("[data-delete-expense]");
  if (!button) {
    return;
  }

  try {
    await supabaseClient.from("expenses").delete().eq("id", button.dataset.deleteExpense);
    await reloadCloudData();
    showToast("Expense Deleted.", "success");
  } catch (error) {
    handleCloudError("Could not delete the expense from Supabase.", error);
  }
}

function handleSaleItemLookup() {
  const match = findCatalogItem(saleItem.value);
  if (!match) {
    return;
  }

  saleItem.value = match.name;
  salePrice.value = match.price.toFixed(2);
}

function handleInventoryItemLookup() {
  const match = findCatalogItem(inventoryItem.value);
  if (!match) {
    return;
  }

  inventoryItem.value = match.name;
}

function handlePrintReport() {
  updatePrintTimestamp();
  const printWindow = window.open("", "_blank", "width=960,height=900");
  if (!printWindow) {
    return;
  }

  const printDocument = buildPrintDocument();
  printWindow.document.open();
  printWindow.document.write(printDocument);
  printWindow.document.close();
}

function render() {
  updatePrintTimestamp();
  renderDashboard();
  renderSales();
  renderInventory();
  renderExpenses();
}

function renderDashboard() {
  const today = getLocalDateValue();
  const initialInvestment = getInitialInvestmentAmount();
  const operatingExpenses = getOperatingExpenses();
  const totalSales = sum(state.sales, (entry) => calculateLineTotal(entry));
  const totalExpenses = sum(operatingExpenses, (entry) => entry.amount);
  const currentCapitalInvestment = initialInvestment;
  const netProfit = totalSales - totalExpenses;
  const profitLossStatus = netProfit;

  const todaysSales = sum(
    state.sales.filter((entry) => entry.date === today),
    (entry) => calculateLineTotal(entry)
  );
  const todaysExpenses = sum(
    operatingExpenses.filter((entry) => entry.date === today),
    (entry) => entry.amount
  );
  const todaysProfit = todaysSales - todaysExpenses;

  const inventorySnapshot = buildInventorySnapshot();
  const lowStockItems = inventorySnapshot.filter((item) => item.onHand <= item.reorderLevel);

  setText("todaySales", formatCurrency(todaysSales));
  setText("todayExpenses", formatCurrency(todaysExpenses));
  setText("todayProfit", formatCurrency(todaysProfit));
  setText("currentCapitalInvestment", formatCurrency(currentCapitalInvestment));
  setText("snapshotSales", formatCurrency(todaysSales));
  setText("snapshotExpenses", formatCurrency(todaysExpenses));
  setText("snapshotCash", formatCurrency(todaysProfit));
  setText("investmentRecovery", formatCurrency(Math.abs(profitLossStatus)));
  setText("totalSales", formatCurrency(totalSales));
  setText("totalExpenses", formatCurrency(totalExpenses));
  setText("netProfit", formatCurrency(netProfit));
  setText("lowStockCount", String(lowStockItems.length));

  renderCapitalInvestmentCard();
  renderInvestmentRecovery(profitLossStatus, totalSales, totalExpenses);
  renderBreakeven(netProfit, totalSales, totalExpenses);
}

function renderBreakeven(netProfit, totalSales, totalExpenses) {
  const progressText = document.getElementById("breakevenText");
  const progressBar = document.getElementById("breakevenBar");
  const progressLabel = document.getElementById("breakevenLabel");

  if (totalSales === 0 && totalExpenses === 0) {
    progressText.textContent = "Status: Breakeven";
    progressLabel.textContent = "Breakeven";
    progressText.style.color = "var(--brand-deep)";
    progressLabel.style.color = "var(--brand-deep)";
    progressBar.style.width = "100%";
    return;
  }

  const percent = totalExpenses > 0 ? Math.max(0, Math.min((totalSales / totalExpenses) * 100, 100)) : 100;

  if (netProfit < 0) {
    progressText.textContent = `${formatCurrency(Math.abs(netProfit))} left before breakeven`;
    progressLabel.textContent = "Below Breakeven";
    progressText.style.color = "var(--danger)";
    progressLabel.style.color = "var(--danger)";
  } else if (netProfit > 0) {
    progressText.textContent = `${formatCurrency(netProfit)} Profit`;
    progressLabel.textContent = "Pure Profit";
    progressText.style.color = "#1c8a3f";
    progressLabel.style.color = "#1c8a3f";
  } else {
    progressText.textContent = "Status: Breakeven";
    progressLabel.textContent = "Breakeven";
    progressText.style.color = "var(--brand-deep)";
    progressLabel.style.color = "var(--brand-deep)";
  }

  progressBar.style.width = `${percent}%`;
}

function renderCapitalInvestmentCard() {
  const capitalCard = document.getElementById("currentCapitalInvestment")?.closest(".snapshot-card");
  capitalCard?.classList.add("snapshot-card--neutral");
}

function renderInvestmentRecovery(value, totalSales, totalExpenses) {
  const label = document.getElementById("investmentRecoveryLabel");
  const healthProgressBar = document.getElementById("healthProgressBar");
  recoveryCard.classList.remove("snapshot-card--negative", "snapshot-card--positive");
  const percent = totalExpenses > 0 ? Math.max(0, Math.min((totalSales / totalExpenses) * 100, 100)) : 100;
  healthProgressBar.style.width = `${percent}%`;

  if (value < 0) {
    recoveryCard.classList.add("snapshot-card--negative");
    label.textContent = "Left before breakeven";
    healthProgressBar.style.background = "linear-gradient(90deg, #d37a71, var(--danger))";
    return;
  }

  recoveryCard.classList.add("snapshot-card--positive");
  label.textContent = value > 0 ? "Pure Profit" : "Status: Breakeven";
  healthProgressBar.style.background = "linear-gradient(90deg, #8ebf7b, var(--brand))";
}

function renderSales() {
  if (!state.sales.length) {
    renderEmptyState(salesTableBody, 5);
    return;
  }

  salesTableBody.innerHTML = state.sales
    .slice(0, 8)
    .map(
      (entry) => `
        <tr>
          <td>${entry.date}</td>
          <td>${escapeHtml(entry.item)}</td>
          <td>${formatQuantity(entry.quantity, entry.unit || "pcs")}</td>
          <td>${formatCurrency(calculateLineTotal(entry))}</td>
          <td>${getDeleteButtonMarkup("sale", entry.id)}</td>
        </tr>
      `
    )
    .join("");
}

function renderInventory() {
  const snapshot = buildInventorySnapshot();

  if (!snapshot.length) {
    renderEmptyState(inventoryTableBody, 4);
  } else {
    inventoryTableBody.innerHTML = snapshot
      .sort((a, b) => a.item.localeCompare(b.item))
      .map((item) => {
        const status = getStockStatus(item.onHand, item.reorderLevel);
        return `
          <tr class="${status.isLow ? "inventory-row--low" : ""}">
            <td>${escapeHtml(item.item)}</td>
            <td class="on-hand-value">${formatQuantity(item.onHand, item.unit || "pcs")}</td>
            <td>${item.reorderLevel}</td>
            <td><span class="status-badge ${status.className}">${status.label}</span></td>
          </tr>
        `;
      })
      .join("");
  }

  if (!state.inventoryLog.length) {
    renderEmptyState(inventoryLogTableBody, 5);
    return;
  }

  inventoryLogTableBody.innerHTML = state.inventoryLog
    .slice(0, 10)
    .map(
      (entry) => `
        <tr>
          <td>-</td>
          <td>${escapeHtml(entry.item)}</td>
          <td>Current Stock</td>
          <td>${formatQuantity(entry.quantity, entry.unit || "pcs")}</td>
          <td>${getDeleteButtonMarkup("inventory", entry.id)}</td>
        </tr>
      `
    )
    .join("");
}

function renderExpenses() {
  const operatingExpenses = getOperatingExpenses();

  if (!operatingExpenses.length) {
    renderEmptyState(expenseTableBody, 5);
    return;
  }

  expenseTableBody.innerHTML = operatingExpenses
    .slice(0, 8)
    .map(
      (entry) => `
        <tr>
          <td>${entry.date}</td>
          <td>${escapeHtml(entry.category)}</td>
          <td>${escapeHtml(entry.note || "-")}</td>
          <td>${formatCurrency(entry.amount)}</td>
          <td>${getDeleteButtonMarkup("expense", entry.id)}</td>
        </tr>
      `
    )
    .join("");
}

function buildInventorySnapshot() {
  return state.inventoryLog.map((entry) => ({
    item: entry.item,
    onHand: entry.quantity,
    unit: entry.unit || "pcs",
    reorderLevel: entry.reorderLevel,
  }));
}

function getStockStatus(onHand, reorderLevel) {
  if (onHand <= 0) {
    return { label: "Out of Stock", className: "status-badge--out", isLow: false };
  }
  if (onHand <= reorderLevel) {
    return { label: "Low Stock", className: "status-badge--low", isLow: true };
  }
  return { label: "Good Stock", className: "status-badge--ok", isLow: false };
}

function renderEmptyState(target, colspan = 4) {
  const row = emptyStateTemplate.content.firstElementChild.cloneNode(true);
  row.firstElementChild.colSpan = colspan;
  target.replaceChildren(row);
}

function getDeleteButtonMarkup(type, id) {
  const attributeMap = {
    sale: "data-delete-sale",
    inventory: "data-delete-inventory",
    expense: "data-delete-expense",
  };

  const attribute = attributeMap[type];
  return `
    <button type="button" class="button button--icon" ${attribute}="${id}" aria-label="Delete ${type}">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 7h2v8h-2v-8Zm4 0h2v8h-2v-8ZM7 10h2v8H7v-8Zm-1 10h12l1-12H5l1 12Z"></path>
      </svg>
    </button>
  `;
}

function sum(items, mapper) {
  return items.reduce((total, item) => total + mapper(item), 0);
}

function formatCurrency(value) {
  return `PHP ${currency.format(value)}`;
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function getLocalDateValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().split("T")[0];
}

function renderProductCatalog() {
  productCatalog.innerHTML = SORTED_PRODUCT_CATALOG.map(
    (item) => `<option value="${escapeHtml(item.name)}"></option>`
  ).join("");
}

function findCatalogItem(itemName) {
  return SORTED_PRODUCT_CATALOG.find(
    (item) => item.name.toLowerCase() === itemName.trim().toLowerCase()
  );
}

function updatePrintTimestamp() {
  const now = new Date();
  printTimestamp.textContent = `Report generated: ${now.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })} ${now.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

function resetUnitToggles() {
  currentSaleUnit = "pcs";
  currentInventoryUnit = "pcs";
  updateUnitToggleButton(saleUnitToggle, currentSaleUnit);
  updateUnitToggleButton(inventoryUnitToggle, currentInventoryUnit);
}

function updateInvestmentButtonState() {
  const hasValue = Number(initialInvestmentInput.value) > 0;
  saveInvestmentButton.disabled = !hasValue;
  saveInvestmentButton.classList.toggle("button--hidden", !hasValue);
}

function toggleUnit(target) {
  if (target === "sale") {
    currentSaleUnit = currentSaleUnit === "pcs" ? "kg" : "pcs";
    updateUnitToggleButton(saleUnitToggle, currentSaleUnit);
    return;
  }

  currentInventoryUnit = currentInventoryUnit === "pcs" ? "kg" : "pcs";
  updateUnitToggleButton(inventoryUnitToggle, currentInventoryUnit);
}

function updateUnitToggleButton(button, unit) {
  button.dataset.unit = unit;
  button.textContent = unit;
  button.classList.remove("unit-toggle--pcs", "unit-toggle--kg");
  button.classList.add(unit === "kg" ? "unit-toggle--kg" : "unit-toggle--pcs");
}

function calculateLineTotal(entry) {
  return entry.quantity * entry.price;
}

function formatQuantity(quantity, unit) {
  const displayQuantity = Number.isInteger(quantity)
    ? String(quantity)
    : Number(quantity).toFixed(2).replace(/\.?0+$/, "");
  return `${displayQuantity} ${unit}`;
}

function buildPrintDocument() {
  lockPrintTables();

  const salesMarkup = createPrintableTableMarkup(salesTable, "Sales");
  const inventoryMarkup = createPrintableTableMarkup(inventoryTable, "Inventory");
  const expensesMarkup = createPrintableTableMarkup(expensesTable, "Expenses");
  const summaryMarkup = createPrintableSummaryMarkup();
  const timestamp = escapeHtml(printTimestamp.textContent);

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H&T Frozen Foods Store Daily Report</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #000000;
        font-family: Arial, sans-serif;
      }
      body {
        padding: 24px;
      }
      .print-shell, .print-header, .print-summary, .print-section {
        display: block;
        width: 100%;
        margin-bottom: 24px;
        page-break-inside: avoid;
      }
      .print-title {
        margin: 0 0 8px;
        font-size: 28px;
        font-weight: 800;
      }
      .print-subtitle, .print-timestamp {
        margin: 0;
        font-size: 14px;
      }
      .print-card {
        display: block;
        width: 100%;
        padding: 12px 14px;
        margin-bottom: 12px;
        border: 1px solid #000;
        background: #fff;
        box-sizing: border-box;
      }
      .print-card strong {
        display: block;
        margin-top: 6px;
        font-size: 24px;
      }
      .print-section h2 {
        margin: 0 0 10px;
        font-size: 18px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        background: #fff;
      }
      th, td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
        vertical-align: top;
        background: #fff;
        color: #000;
      }
      @media print {
        html, body {
          overflow: visible !important;
          height: auto !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="print-shell">
      <section class="print-header">
        <h1 class="print-title">H&amp;T Frozen Foods Store</h1>
        <p class="print-subtitle">Track daily sales, stock, expenses, and profit in one clear view.</p>
        <p class="print-timestamp">${timestamp}</p>
      </section>
      ${summaryMarkup}
      ${salesMarkup}
      ${inventoryMarkup}
      ${expensesMarkup}
    </div>
    <script>
      window.addEventListener("load", function () {
        setTimeout(function () {
          window.print();
        }, 300);
      });
      window.addEventListener("afterprint", function () {
        window.close();
      });
    </script>
  </body>
  </html>`;
}

function lockPrintTables() {
  [salesTable, inventoryTable, expensesTable].forEach((table) => {
    if (table) {
      table.innerHTML = table.innerHTML;
    }
  });
}

function createPrintableSummaryMarkup() {
  if (!snapshotGrid) {
    return "";
  }

  const cards = Array.from(snapshotGrid.querySelectorAll(".snapshot-card"))
    .map((card) => {
      const label = escapeHtml(card.querySelector("span")?.textContent?.trim() || "");
      const value = escapeHtml(card.querySelector("strong")?.textContent?.trim() || "");
      return `<article class="print-card"><span>${label}</span><strong>${value}</strong></article>`;
    })
    .join("");

  return `<section class="print-summary">${cards}</section>`;
}

function createPrintableTableMarkup(table, title) {
  if (!table) {
    return "";
  }

  const clonedTable = table.cloneNode(true);
  removeActionColumn(clonedTable);

  return `<section class="print-section"><h2>${escapeHtml(title)}</h2>${clonedTable.outerHTML}</section>`;
}

function removeActionColumn(table) {
  const headerRow = table.querySelector("thead tr");
  if (headerRow?.lastElementChild) {
    headerRow.lastElementChild.remove();
  }

  table.querySelectorAll("tbody tr").forEach((row) => {
    if (row.lastElementChild) {
      row.lastElementChild.remove();
    }
  });
}

function getInitialInvestmentAmount() {
  return sum(
    state.expenses.filter((entry) => entry.category === INITIAL_INVESTMENT_CATEGORY),
    (entry) => entry.amount
  );
}

function getOperatingExpenses() {
  return state.expenses.filter((entry) => entry.category !== INITIAL_INVESTMENT_CATEGORY);
}

function getCurrentBalance() {
  const initialInvestment = getInitialInvestmentAmount();
  const operatingExpenses = sum(getOperatingExpenses(), (entry) => entry.amount);
  return initialInvestment - operatingExpenses;
}

function createAutoExpenseFromStockIn(entry) {
  return {
    date: entry.date,
    category: "Inventory Purchase",
    note: `Auto from stock in: ${entry.item} x ${entry.quantity} ${entry.unit}`,
    amount: entry.quantity * entry.unitCost,
  };
}

function getExistingReorderLevel(itemName) {
  const matchingEntry = state.inventoryLog.find(
    (entry) => entry.item.toLowerCase() === itemName.toLowerCase()
  );
  return matchingEntry?.reorderLevel ?? 5;
}

async function insertRows(table, rows) {
  const { error } = await supabaseClient.from(table).insert(rows);
  if (error) {
    throw error;
  }
}

async function getInventoryRecord(itemName) {
  const { data, error } = await supabaseClient
    .from("inventory")
    .select("*")
    .eq("item_name", itemName)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function adjustInventoryQuantity({ itemName, unit, quantityDelta, reorderLevel }) {
  const data = await getInventoryRecord(itemName);

  const currentQuantity = Number(data?.on_hand_quantity ?? 0);
  const nextQuantity = currentQuantity + quantityDelta;
  const payload = {
    item_name: itemName,
    on_hand_quantity: nextQuantity,
    unit,
    reorder_level: data?.reorder_level ?? reorderLevel ?? 5,
  };

  if (data?.id) {
    const { error: updateError } = await supabaseClient.from("inventory").update(payload).eq("id", data.id);
    if (updateError) {
      throw updateError;
    }
    return;
  }

  const { error: insertError } = await supabaseClient.from("inventory").insert([payload]);
  if (insertError) {
    throw insertError;
  }
}

function mapSaleRow(row) {
  return {
    id: row.id,
    date: row.date ?? row.sale_date,
    item: row.item_name ?? row.item,
    quantity: Number(row.quantity),
    price: Number(row.price_per_unit ?? row.price),
    unit: row.unit || "pcs",
  };
}

function mapInventoryRow(row) {
  return {
    id: row.id,
    item: row.item_name ?? row.item,
    quantity: Number(row.on_hand_quantity ?? row.quantity ?? 0),
    unit: row.unit || "pcs",
    reorderLevel: Number(row.reorder_level ?? 5),
    lastExpenseId: null,
  };
}

function mapExpenseRow(row) {
  return {
    id: row.id,
    date: row.date,
    category: row.category,
    note: row.description ?? row.notes ?? row.note ?? "",
    amount: Number(row.amount),
  };
}

function toSaleRow(entry) {
  return {
    date: entry.date,
    item_name: entry.item,
    quantity: entry.quantity,
    unit: entry.unit,
    price_per_unit: entry.price,
    total_price: calculateLineTotal(entry),
  };
}

function toExpenseRow(entry) {
  return {
    date: entry.date,
    category: entry.category,
    description: entry.note,
    amount: entry.amount,
  };
}

function sortByDateDesc(a, b) {
  return `${b.date}-${b.id}`.localeCompare(`${a.date}-${a.id}`);
}

function handleCloudError(message, error) {
  console.error(message, error);
  showToast(`Error: ${error?.message || message}`, "error");
}

function validateRequiredFields(fields) {
  clearFieldErrors(fields);

  const invalidFields = fields.filter((field) => {
    if (!field) {
      return false;
    }

    const rawValue = field.value ?? "";
    const value = typeof rawValue === "string" ? rawValue.trim() : String(rawValue).trim();

    if (field.type === "number") {
      return value === "" || Number.isNaN(Number(value));
    }

    return value === "";
  });

  if (!invalidFields.length) {
    return true;
  }

  invalidFields.forEach((field) => field.classList.add("field-error"));
  invalidFields[0].focus();
  showToast("Please fill in all required details before saving.", "error");
  return false;
}

function clearFieldErrors(fields) {
  fields.forEach((field) => field?.classList?.remove("field-error"));
}

function clearFieldErrorOnEdit(event) {
  event.target?.classList?.remove("field-error");
}

function showToast(message, type = "success") {
  if (!toastStack) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toastStack.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("toast--exit");
    window.setTimeout(() => {
      toast.remove();
    }, 220);
  }, 3000);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

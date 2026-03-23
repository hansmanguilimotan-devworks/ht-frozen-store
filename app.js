const STORAGE_KEY = "frozen-store-finance";
const PRODUCT_CATALOG = [
  { name: "Hotdog", price: 25 },
  { name: "Siomai", price: 50 },
  { name: "Chicken", price: 220 },
  { name: "Pork", price: 280 },
  { name: "Eggs", price: 9 },
  { name: "Coffee", price: 15 },
  { name: "Rice", price: 55 },
  { name: "Sugar", price: 42 },
  { name: "Salt", price: 12 },
  { name: "Cooking Oil", price: 78 },
  { name: "Sardines", price: 28 },
  { name: "Corned Beef", price: 42 },
  { name: "Instant Noodles", price: 16 },
  { name: "Soy Sauce", price: 24 },
  { name: "Vinegar", price: 22 },
  { name: "Milk", price: 34 },
  { name: "Bread", price: 12 },
  { name: "Ice Cream", price: 35 },
  { name: "Fish Ball", price: 45 },
  { name: "Soft Drinks", price: 25 },
];
const SORTED_PRODUCT_CATALOG = [...PRODUCT_CATALOG].sort((a, b) => a.name.localeCompare(b.name));
const QUICK_ADD_ITEMS = Object.fromEntries(
  PRODUCT_CATALOG.filter((item) => ["Hotdog", "Siomai", "Chicken", "Pork"].includes(item.name)).map((item) => [
    item.name,
    item.price,
  ])
);

const state = loadState();

const salesForm = document.getElementById("salesForm");
const inventoryForm = document.getElementById("inventoryForm");
const expenseForm = document.getElementById("expenseForm");
const investmentForm = document.getElementById("investmentForm");
const printReportButton = document.getElementById("printReportButton");
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

const saleDate = document.getElementById("saleDate");
const saleItem = document.getElementById("saleItem");
const salePrice = document.getElementById("salePrice");
const inventoryDate = document.getElementById("inventoryDate");
const expenseDate = document.getElementById("expenseDate");
const initialInvestmentInput = document.getElementById("initialInvestment");
const quickAddButtons = document.querySelectorAll("[data-quick-item]");
const printTimestamp = document.getElementById("printTimestamp");

const currency = new Intl.NumberFormat("en-PH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

setDefaultDates();
renderProductCatalog();
attachEvents();
render();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const base = {
    sales: [],
    inventoryLog: [],
    expenses: [],
    initialInvestment: 0,
  };

  if (!saved) {
    return base;
  }

  try {
    return { ...base, ...JSON.parse(saved) };
  } catch (error) {
    console.warn("Could not read saved data:", error);
    return base;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function attachEvents() {
  salesForm.addEventListener("submit", handleSaleSubmit);
  inventoryForm.addEventListener("submit", handleInventorySubmit);
  expenseForm.addEventListener("submit", handleExpenseSubmit);
  investmentForm.addEventListener("submit", handleInvestmentSubmit);
  salesTableBody.addEventListener("click", handleSalesTableClick);
  inventoryLogTableBody.addEventListener("click", handleInventoryTableClick);
  expenseTableBody.addEventListener("click", handleExpensesTableClick);
  saleItem.addEventListener("input", handleSaleItemLookup);
  saleItem.addEventListener("change", handleSaleItemLookup);
  printReportButton.addEventListener("click", handlePrintReport);
  quickAddButtons.forEach((button) => {
    button.addEventListener("click", handleQuickAddClick);
  });
}

function setDefaultDates() {
  const today = getLocalDateValue();
  saleDate.value = today;
  inventoryDate.value = today;
  expenseDate.value = today;
  initialInvestmentInput.value = state.initialInvestment || "";
}

function handleSaleSubmit(event) {
  event.preventDefault();

  const quantity = Number(document.getElementById("saleQuantity").value);
  const itemName = document.getElementById("saleItem").value.trim();
  const entry = {
    id: crypto.randomUUID(),
    date: document.getElementById("saleDate").value,
    item: itemName,
    quantity,
    price: Number(document.getElementById("salePrice").value),
  };

  state.sales.unshift(entry);
  state.inventoryLog.unshift(createAutoStockOutEntry(entry, quantity, itemName));
  saveState();
  salesForm.reset();
  saleDate.value = getLocalDateValue();
  render();
}

function handleInventorySubmit(event) {
  event.preventDefault();

  const entry = {
    id: crypto.randomUUID(),
    date: document.getElementById("inventoryDate").value,
    item: document.getElementById("inventoryItem").value.trim(),
    type: document.getElementById("inventoryType").value,
    quantity: Number(document.getElementById("inventoryQuantity").value),
    reorderLevel: Number(document.getElementById("inventoryReorder").value),
  };

  state.inventoryLog.unshift(entry);
  saveState();
  inventoryForm.reset();
  inventoryDate.value = getLocalDateValue();
  document.getElementById("inventoryReorder").value = 5;
  render();
}

function handleExpenseSubmit(event) {
  event.preventDefault();

  const entry = {
    id: crypto.randomUUID(),
    date: document.getElementById("expenseDate").value,
    category: document.getElementById("expenseCategory").value,
    note: document.getElementById("expenseNote").value.trim(),
    amount: Number(document.getElementById("expenseAmount").value),
  };

  state.expenses.unshift(entry);
  saveState();
  expenseForm.reset();
  expenseDate.value = getLocalDateValue();
  render();
}

function handleInvestmentSubmit(event) {
  event.preventDefault();
  state.initialInvestment = Number(initialInvestmentInput.value) || 0;
  saveState();
  render();
}

function handleQuickAddClick(event) {
  const itemName = event.currentTarget.dataset.quickItem;
  const price = QUICK_ADD_ITEMS[itemName];

  saleItem.value = itemName;
  salePrice.value = price.toFixed(2);
  saleItem.focus();
}

function handleSalesTableClick(event) {
  const button = event.target.closest("[data-delete-sale]");
  if (!button) {
    return;
  }

  const saleId = button.dataset.deleteSale;
  state.sales = state.sales.filter((entry) => entry.id !== saleId);
  state.inventoryLog = state.inventoryLog.filter(
    (entry) => !(entry.autoGenerated && entry.saleId === saleId)
  );
  saveState();
  render();
}

function handleInventoryTableClick(event) {
  const button = event.target.closest("[data-delete-inventory]");
  if (!button) {
    return;
  }

  state.inventoryLog = state.inventoryLog.filter((entry) => entry.id !== button.dataset.deleteInventory);
  saveState();
  render();
}

function handleExpensesTableClick(event) {
  const button = event.target.closest("[data-delete-expense]");
  if (!button) {
    return;
  }

  state.expenses = state.expenses.filter((entry) => entry.id !== button.dataset.deleteExpense);
  saveState();
  render();
}

function handleSaleItemLookup() {
  const match = findCatalogItem(saleItem.value);
  if (!match) {
    return;
  }

  saleItem.value = match.name;
  salePrice.value = match.price.toFixed(2);
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
  const totalSales = sum(state.sales, (entry) => entry.quantity * entry.price);
  const totalExpenses = sum(state.expenses, (entry) => entry.amount);
  const netProfit = totalSales - totalExpenses;

  const todaysSales = sum(
    state.sales.filter((entry) => entry.date === today),
    (entry) => entry.quantity * entry.price
  );
  const todaysExpenses = sum(
    state.expenses.filter((entry) => entry.date === today),
    (entry) => entry.amount
  );
  const todaysProfit = todaysSales - todaysExpenses;

  const inventorySnapshot = buildInventorySnapshot();
  const lowStockItems = inventorySnapshot.filter((item) => item.onHand <= item.reorderLevel);

  setText("todaySales", formatCurrency(todaysSales));
  setText("todayExpenses", formatCurrency(todaysExpenses));
  setText("todayProfit", formatCurrency(todaysProfit));
  setText("snapshotSales", formatCurrency(todaysSales));
  setText("snapshotExpenses", formatCurrency(todaysExpenses));
  setText("snapshotCash", formatCurrency(todaysProfit));
  setText("totalSales", formatCurrency(totalSales));
  setText("totalExpenses", formatCurrency(totalExpenses));
  setText("netProfit", formatCurrency(netProfit));
  setText("lowStockCount", String(lowStockItems.length));

  renderBreakeven(netProfit);
}

function renderBreakeven(netProfit) {
  const target = state.initialInvestment;
  const progressText = document.getElementById("breakevenText");
  const progressBar = document.getElementById("breakevenBar");
  const progressLabel = document.getElementById("breakevenLabel");

  if (!target) {
    progressText.textContent = "Add your initial investment to calculate progress.";
    progressBar.style.width = "0%";
    progressLabel.textContent = "0% recovered";
    return;
  }

  const percent = Math.max(0, Math.min((netProfit / target) * 100, 100));
  const remaining = target - netProfit;

  progressText.textContent =
    remaining > 0
      ? `${formatCurrency(Math.max(remaining, 0))} left before breakeven.`
      : `The stall has passed breakeven by ${formatCurrency(Math.abs(remaining))}.`;
  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `${percent.toFixed(1)}% recovered`;
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
          <td>${entry.quantity}</td>
          <td>${formatCurrency(entry.quantity * entry.price)}</td>
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
            <td class="on-hand-value">${item.onHand}</td>
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
          <td>${entry.date}</td>
          <td>${escapeHtml(entry.item)}</td>
          <td>${formatMovementType(entry.type)}</td>
          <td>${entry.quantity}</td>
          <td>${getDeleteButtonMarkup("inventory", entry.id)}</td>
        </tr>
      `
    )
    .join("");
}

function renderExpenses() {
  if (!state.expenses.length) {
    renderEmptyState(expenseTableBody, 5);
    return;
  }

  expenseTableBody.innerHTML = state.expenses
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
  const items = new Map();

  state.inventoryLog.forEach((entry) => {
    const current = items.get(entry.item) || {
      item: entry.item,
      onHand: 0,
      reorderLevel: entry.reorderLevel,
    };

    if (entry.type === "in") {
      current.onHand += entry.quantity;
    } else {
      current.onHand -= entry.quantity;
    }

    current.reorderLevel = entry.reorderLevel;
    items.set(entry.item, current);
  });

  return Array.from(items.values());
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

function sum(items, mapper) {
  return items.reduce((total, item) => total + mapper(item), 0);
}

function formatCurrency(value) {
  return `₱${currency.format(value)}`;
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

function formatMovementType(type) {
  if (type === "in") {
    return "Stock In";
  }

  if (type === "out") {
    return "Stock Out";
  }

  return "Spoilage";
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

function lockPrintTables() {
  const tables = [salesTable, inventoryTable, expensesTable];
  tables.forEach((table) => {
    if (!table) {
      return;
    }

    const currentHtml = table.innerHTML;
    table.innerHTML = currentHtml;
  });
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

      .print-shell {
        display: block;
      }

      .print-header,
      .print-summary,
      .print-section {
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

      .print-subtitle,
      .print-timestamp {
        margin: 0;
        font-size: 14px;
      }

      .print-summary-grid {
        display: block;
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

      .print-card span,
      .print-card strong,
      .print-section h2,
      table,
      th,
      td {
        color: #000 !important;
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

      thead {
        page-break-inside: avoid;
      }

      th,
      td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
        vertical-align: top;
        background: #fff;
      }

      th:last-child,
      td:last-child {
        display: none;
      }

      @media print {
        html, body {
          overflow: visible !important;
          height: auto !important;
          background: #fff !important;
          color: #000 !important;
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

function createPrintableSummaryMarkup() {
  if (!snapshotGrid) {
    return "";
  }

  const cards = Array.from(snapshotGrid.querySelectorAll(".snapshot-card"))
    .map((card) => {
      const label = escapeHtml(card.querySelector("span")?.textContent?.trim() || "");
      const value = escapeHtml(card.querySelector("strong")?.textContent?.trim() || "");
      return `
        <article class="print-card">
          <span>${label}</span>
          <strong>${value}</strong>
        </article>
      `;
    })
    .join("");

  return `<section class="print-summary"><div class="print-summary-grid">${cards}</div></section>`;
}

function createPrintableTableMarkup(table, title) {
  if (!table) {
    return "";
  }

  const clonedTable = table.cloneNode(true);
  removeActionColumn(clonedTable);

  return `
    <section class="print-section">
      <h2>${escapeHtml(title)}</h2>
      ${clonedTable.outerHTML}
    </section>
  `;
}

function removeActionColumn(table) {
  const headerRow = table.querySelector("thead tr");
  if (headerRow && headerRow.lastElementChild) {
    headerRow.lastElementChild.remove();
  }

  table.querySelectorAll("tbody tr").forEach((row) => {
    if (row.lastElementChild) {
      row.lastElementChild.remove();
    }
  });
}

function createAutoStockOutEntry(saleEntry, quantity, itemName) {
  return {
    id: crypto.randomUUID(),
    date: saleEntry.date,
    item: itemName,
    type: "out",
    quantity,
    reorderLevel: getExistingReorderLevel(itemName),
    autoGenerated: true,
    saleId: saleEntry.id,
  };
}

function getExistingReorderLevel(itemName) {
  const matchingEntry = state.inventoryLog.find(
    (entry) => entry.item.toLowerCase() === itemName.toLowerCase()
  );
  return matchingEntry?.reorderLevel ?? 5;
}

function getDeleteButtonMarkup(type, id) {
  const attributeMap = {
    sale: "data-delete-sale",
    expense: "data-delete-expense",
    inventory: "data-delete-inventory",
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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

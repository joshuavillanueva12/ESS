//admin panel
    const displayArea = document.getElementById("displayArea");
const pageTitle = document.getElementById("pageTitle");

// Button references
const stocksBtn = document.getElementById("stocksBtn");
const cashiersBtn = document.getElementById("cashiersBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Change display based on selection
stocksBtn.addEventListener("click", () => {
  pageTitle.textContent = "Product Stocks";
  displayArea.innerHTML = `
    <h2>📦 Product Stocks</h2>
    <p>Manage and update available store products here.</p>
    <ul>
      <li>Shirts - 120 pcs</li>
      <li>Pants - 80 pcs</li>
      <li>Shoes - 50 pcs</li>
      <li>Accessories - 65 pcs</li>
    </ul>
  `;
});

cashiersBtn.addEventListener("click", () => {
  pageTitle.textContent = "Cashier Employees";
  displayArea.innerHTML = `
    <h2>👨‍💼 Cashier Employees</h2>
    <p>View and manage cashier accounts below.</p>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width:100%;">
      <thead style="background:#e2e8f0;">
        <tr><th>ID</th><th>Name</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td>CSH-001</td><td>Maria Lopez</td><td>Active</td></tr>
        <tr><td>CSH-002</td><td>John Cruz</td><td>Active</td></tr>
        <tr><td>CSH-003</td><td>Ana Dela Peña</td><td>On Leave</td></tr>
      </tbody>
    </table>
  `;
});

// Logout button (demo)
logoutBtn.addEventListener("click", () => {
  alert("Logging out...");
  window.location.href = "index-login.html"; // balik sa login page
});

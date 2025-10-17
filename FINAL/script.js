
  // --- SWITCH FORM LOGIC ---
  const adminBtn = document.getElementById('adminBtn');
  const cashierBtn = document.getElementById('cashierBtn');
  const adminForm = document.getElementById('adminForm');
  const cashierForm = document.getElementById('cashierForm');

  adminBtn.addEventListener('click', () => {
    adminBtn.classList.add('active');
    cashierBtn.classList.remove('active');
    adminForm.classList.remove('hidden');
    cashierForm.classList.add('hidden');
  });

  cashierBtn.addEventListener('click', () => {
    cashierBtn.classList.add('active');
    adminBtn.classList.remove('active');
    cashierForm.classList.remove('hidden');
    adminForm.classList.add('hidden');
  });

  // --- ADMIN LOGIN ---
  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('adminUser').value.trim();
    const password = document.getElementById('adminPass').value.trim();

    // ✅ Sample admin credentials
    const adminUser = "admin";
    const adminPass = "1234";

    if (username === adminUser && password === adminPass) {
      alert("Welcome, Admin!");
      window.location.href = "temporaryDATA.html";
    } else {
      alert("Invalid admin username or password.");
    }
  });

  // --- CASHIER LOGIN ---
  cashierForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('cashierId').value.trim();
    const pin = document.getElementById('cashierPin').value.trim();

    // ✅ Sample cashier credentials
    const cashierId = "CSH-001";
    const cashierPin = "0000";

    if (id === cashierId && pin === cashierPin) {
      alert("Welcome, Cashier!");
      window.location.href = "index-casher.html";
    } else {
      alert("Invalid Cashier ID or PIN.");
    }
  });

  // --- OPTIONAL: Year in footer ---
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();


document.addEventListener('DOMContentLoaded', () => {
  // ================= AUTHENTICATION =================
  const authScreen = document.getElementById('authScreen');
  const appContainer = document.getElementById('appContainer');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginMessage = document.getElementById('loginMessage');
  const registerMessage = document.getElementById('registerMessage');

  const headerUserName = document.getElementById('headerUserName');
  const sidebarUserName = document.getElementById('sidebarUserName');
  const welcomeTitle = document.getElementById('welcomeTitle');
  const logoutBtn = document.getElementById('logoutBtn');

  // Demo account. Registered accounts are also saved locally.
  const demoAccount = {
    name: 'Alex Morgan',
    email: 'student@academia.com',
    password: '123456'
  };

  function getAccounts() {
    try {
      return JSON.parse(localStorage.getItem('academiaAccounts')) || [];
    } catch {
      return [];
    }
  }

  function saveAccounts(accounts) {
    localStorage.setItem('academiaAccounts', JSON.stringify(accounts));
  }

  function getAllAccounts() {
    const accounts = getAccounts();
    const hasDemo = accounts.some(
      account => account.email.toLowerCase() === demoAccount.email.toLowerCase()
    );

    if (!hasDemo) {
      accounts.push(demoAccount);
      saveAccounts(accounts);
    }

    return accounts;
  }

  function setLoggedInUser(account) {
    localStorage.setItem('academiaCurrentUser', JSON.stringify(account));
  }

  function getLoggedInUser() {
    try {
      return JSON.parse(localStorage.getItem('academiaCurrentUser'));
    } catch {
      return null;
    }
  }

  function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `auth-message ${type}`;
  }

  function updateUserUI(user) {
    const firstName = user.name.trim().split(/\s+/)[0] || 'Student';

    if (headerUserName) headerUserName.textContent = firstName;
    if (sidebarUserName) sidebarUserName.textContent = user.name;
    if (welcomeTitle) welcomeTitle.textContent = `Welcome back, ${firstName}! 👋`;
  }

  function showDashboard(user) {
    updateUserUI(user);
    authScreen.classList.add('hidden');
    appContainer.classList.remove('locked');
    document.body.classList.remove('auth-active');
  }

  function showLogin() {
    appContainer.classList.add('locked');
    authScreen.classList.remove('hidden');
    document.body.classList.add('auth-active');

    loginForm.reset();
    registerForm.reset();
    loginMessage.textContent = '';
    registerMessage.textContent = '';
  }

  // Auth tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.authTarget;

      document.querySelectorAll('.auth-tab').forEach(item => {
        item.classList.toggle('active', item === tab);
      });

      document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.toggle('active', form.id === target);
      });

      loginMessage.textContent = '';
      registerMessage.textContent = '';
    });
  });

  // Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const accounts = getAllAccounts();
    const account = accounts.find(
      item => item.email.toLowerCase() === email && item.password === password
    );

    if (!account) {
      showMessage(loginMessage, 'Invalid email or password.', 'error');
      return;
    }

    setLoggedInUser(account);
    showMessage(loginMessage, 'Login successful!', 'success');

    setTimeout(() => {
      showDashboard(account);
    }, 300);
  });

  // Register
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (name.length < 2) {
      showMessage(registerMessage, 'Please enter your full name.', 'error');
      return;
    }

    if (password.length < 6) {
      showMessage(registerMessage, 'Password must be at least 6 characters.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showMessage(registerMessage, 'Passwords do not match.', 'error');
      return;
    }

    const accounts = getAllAccounts();

    if (accounts.some(account => account.email.toLowerCase() === email)) {
      showMessage(registerMessage, 'An account with this email already exists.', 'error');
      return;
    }

    const newAccount = { name, email, password };
    accounts.push(newAccount);
    saveAccounts(accounts);
    setLoggedInUser(newAccount);

    showMessage(registerMessage, 'Account created successfully!', 'success');

    setTimeout(() => {
      showDashboard(newAccount);
    }, 300);
  });

  // Show / hide password
  document.querySelectorAll('.password-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.password);
      const icon = button.querySelector('i');
      const showing = input.type === 'text';

      input.type = showing ? 'password' : 'text';
      icon.className = showing ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
      button.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    });
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('academiaCurrentUser');
    showLogin();
  });

  // Check existing session
  const currentUser = getLoggedInUser();
  if (currentUser) {
    showDashboard(currentUser);
  } else {
    showLogin();
  }

  // ================= NAVIGATION =================
  const navLinks = document.querySelectorAll('.nav-link, .switch-tab');
  const viewPanels = document.querySelectorAll('.view-panel');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-target');

      document.querySelectorAll('.nav-link').forEach(nav => {
        nav.classList.toggle('active', nav.getAttribute('data-target') === targetView);
      });

      viewPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `view-${targetView}`);
      });
    });
  });

  // ================= DARK MODE =================
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn.querySelector('i');

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });

  // ================= NOTIFICATIONS =================
  const notifBtn = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    notifDropdown.classList.remove('show');
  });

  // ================= POMODORO TIMER =================
  let timerInterval = null;
  let timeRemaining = 25 * 60;
  let isRunning = false;

  const timerDisplay = document.getElementById('timer');
  const startBtn = document.getElementById('startTimerBtn');
  const resetBtn = document.getElementById('resetTimerBtn');

  function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) {
      clearInterval(timerInterval);
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
      isRunning = false;
    } else {
      isRunning = true;
      startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';

      timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
          timeRemaining--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          alert('Focus session complete! Take a break.');
          timeRemaining = 25 * 60;
          updateTimerDisplay();
          startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
          isRunning = false;
        }
      }, 1000);
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    timeRemaining = 25 * 60;
    updateTimerDisplay();
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
  });

  // ================= TASK / ASSIGNMENT TRACKER =================
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('confirmAddTask');
  const taskList = document.getElementById('taskList');

  function createTaskElement(title) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox">
      <span class="task-title"></span>
      <span class="task-tag bg-purple">General</span>
      <button class="delete-task-btn"><i class="fa-solid fa-trash"></i></button>
    `;

    li.querySelector('.task-title').textContent = title;

    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed', checkbox.checked);
    });

    const deleteBtn = li.querySelector('.delete-task-btn');
    deleteBtn.addEventListener('click', () => li.remove());

    return li;
  }

  addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();

    if (text) {
      taskList.appendChild(createTaskElement(text));
      taskInput.value = '';
    }
  });

  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  document.querySelectorAll('.task-item').forEach(item => {
    const checkbox = item.querySelector('.task-checkbox');
    const deleteBtn = item.querySelector('.delete-task-btn');

    checkbox?.addEventListener('change', () => {
      item.classList.toggle('completed', checkbox.checked);
    });

    deleteBtn?.addEventListener('click', () => item.remove());
  });

  // ================= CHART.JS =================
  const activityCanvas = document.getElementById('activityChart');
  const performanceCanvas = document.getElementById('performanceChart');

  if (typeof Chart !== 'undefined' && activityCanvas) {
    const ctxActivity = activityCanvas.getContext('2d');

    new Chart(ctxActivity, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Study Hours',
          data: [2.5, 4, 3, 5, 2, 6, 1.5],
          backgroundColor: '#4f46e5',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  if (typeof Chart !== 'undefined' && performanceCanvas) {
    const ctxPerformance = performanceCanvas.getContext('2d');

    new Chart(ctxPerformance, {
      type: 'line',
      data: {
        labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
        datasets: [{
          label: 'GPA',
          data: [3.5, 3.65, 3.78, 3.85],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 2.0, max: 4.0 }
        }
      }
    });
  }
});

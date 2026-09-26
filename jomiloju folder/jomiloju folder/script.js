/* ============================================================
   CodeCraft Academy — Shared Functionality
   ============================================================ */

// ---------- Mobile Navigation ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Quote Database ----------
const QUOTES = [
  { text: "Every expert was once a beginner.", author: "H. Jackson Brown Jr.", category: "Learning" },
  { text: "Great websites start with simple ideas.", author: "CodeCraft", category: "Creativity" },
  { text: "Don't be afraid to make mistakes. Code, break it, fix it, and learn.", author: "CodeCraft", category: "Persistence" },
  { text: "The best way to learn coding is to build.", author: "CodeCraft", category: "Learning" },
  { text: "Your first website doesn't have to be perfect. It just has to exist.", author: "CodeCraft", category: "Growth" },
  { text: "Small progress is still progress.", author: "CodeCraft", category: "Persistence" },
  { text: "Learn the basics. Practice the fundamentals. Build something amazing.", author: "CodeCraft", category: "Learning" },
  { text: "Code is not about memorizing everything. It's about learning how to solve problems.", author: "CodeCraft", category: "Learning" },
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie", category: "Learning" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "Discipline" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde", category: "Failure" },
  { text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel", category: "Creativity" },
  { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann", category: "Coding" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House", category: "Coding" },
  { text: "Fix the cause, not the symptom.", author: "Steve Maguire", category: "Discipline" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "Discipline" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck", category: "Discipline" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine", category: "Learning" },
  { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay", category: "Learning" },
  { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates", category: "Coding" },
  { text: "It's not a bug – it's an undocumented feature.", author: "Anonymous", category: "Coding" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds", category: "Discipline" },
  { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry", category: "Creativity" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson", category: "Discipline" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs", category: "Coding" },
  { text: "Learning to code is learning to create and innovate.", author: "CodeCraft", category: "Creativity" },
  { text: "Failure is the condiment that gives success its flavor.", author: "Truman Capote", category: "Failure" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes", category: "Growth" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar", category: "Growth" },
  { text: "Every line of code you write is a step forward.", author: "CodeCraft", category: "Persistence" },
];

// ---------- Random Quote Helper ----------
function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

// ---------- Daily Motivation ----------
const dailyQuoteEl = document.getElementById('dailyQuote');
const dailyAuthorEl = document.getElementById('dailyAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const motivationBtn = document.getElementById('motivationBtn');

function updateDailyQuote() {
  if (!dailyQuoteEl) return;
  const q = getRandomQuote();
  dailyQuoteEl.style.opacity = '0';
  setTimeout(() => {
    dailyQuoteEl.textContent = `"${q.text}"`;
    if (dailyAuthorEl) dailyAuthorEl.textContent = `— ${q.author}`;
    dailyQuoteEl.style.opacity = '1';
  }, 300);
}

if (newQuoteBtn) newQuoteBtn.addEventListener('click', updateDailyQuote);
if (motivationBtn) motivationBtn.addEventListener('click', updateDailyQuote);

// Initialize on page load
updateDailyQuote();

// ---------- Code Playground ----------
const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const previewFrame = document.getElementById('previewFrame');
const runCodeBtn = document.getElementById('runCodeBtn');

function runCode() {
  if (!previewFrame || !htmlEditor || !cssEditor) return;
  const html = htmlEditor.value;
  const css = cssEditor.value;
  const doc = `<!DOCTYPE html>
<html>
<head><style>${css}</style></head>
<body>${html}</body>
</html>`;
  previewFrame.srcdoc = doc;
}

if (runCodeBtn) {
  runCodeBtn.addEventListener('click', runCode);
}

// Auto-run on load if playground exists
if (previewFrame && htmlEditor) {
  runCode();
}

// ---------- Progress System (localStorage) ----------
function initProgress() {
  const progressData = JSON.parse(localStorage.getItem('cca_progress') || '{}');
  const defaults = { html: 70, css: 50, projects: 30, lessonsCompleted: 7 };
  const data = { ...defaults, ...progressData };

  document.querySelectorAll('[data-progress]').forEach(el => {
    const key = el.dataset.progress;
    const fill = el.querySelector('.progress-card__fill');
    const percent = el.querySelector('.progress-card__percent');
    if (fill && data[key] !== undefined) {
      setTimeout(() => { fill.style.width = `${data[key]}%`; }, 200);
      if (percent) percent.textContent = `${data[key]}%`;
    }
  });

  const lessonsEl = document.getElementById('lessonsCompleted');
  if (lessonsEl) lessonsEl.textContent = `${data.lessonsCompleted}/20`;
}

initProgress();

// ---------- Fade-in on Scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---------- Quote Wall ----------
const quoteWallGrid = document.getElementById('quoteWallGrid');
const quoteWallFilters = document.getElementById('quoteWallFilters');
const showRandomQuoteBtn = document.getElementById('showRandomQuoteBtn');

function renderQuoteWall(filter = 'All') {
  if (!quoteWallGrid) return;
  const filtered = filter === 'All' ? QUOTES : QUOTES.filter(q => q.category === filter);
  quoteWallGrid.innerHTML = filtered.map(q => `
    <div class="quote-wall__item" data-category="${q.category}">
      <p class="quote-wall__text">"${q.text}"</p>
      <span class="quote-wall__category">${q.category} — ${q.author}</span>
    </div>
  `).join('');

  quoteWallGrid.querySelectorAll('.quote-wall__item').forEach(item => {
    item.addEventListener('click', () => {
      quoteWallGrid.querySelectorAll('.quote-wall__item').forEach(i =>
        i.classList.remove('quote-wall__item--highlight'));
      item.classList.add('quote-wall__item--highlight');
    });
  });
}

if (quoteWallFilters) {
  quoteWallFilters.addEventListener('click', (e) => {
    if (e.target.classList.contains('quote-wall__filter')) {
      quoteWallFilters.querySelectorAll('.quote-wall__filter').forEach(f =>
        f.classList.remove('quote-wall__filter--active'));
      e.target.classList.add('quote-wall__filter--active');
      renderQuoteWall(e.dataset.filter);
    }
  });
}

if (showRandomQuoteBtn) {
  showRandomQuoteBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.quote-wall__item');
    items.forEach(i => i.classList.remove('quote-wall__item--highlight'));
    const random = items[Math.floor(Math.random() * items.length)];
    if (random) {
      random.classList.add('quote-wall__item--highlight');
      random.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

renderQuoteWall();
/* ============================================================
   Auth — Sign Up & Login (localStorage)
   ============================================================ */

const authTabs = document.querySelectorAll('.auth-tab');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const authSuccess = document.getElementById('authSuccess');

// ---------- Tab Switching ----------
function switchTab(target) {
  authTabs.forEach(t => t.classList.toggle('auth-tab--active', t.dataset.tab === target));
  if (signupForm) signupForm.classList.toggle('auth-form--active', target === 'signup');
  if (loginForm) loginForm.classList.toggle('auth-form--active', target === 'login');
  if (authSuccess) authSuccess.classList.remove('auth-success--show');
}

authTabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

document.querySelectorAll('[data-switch]').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.switch));
});

// ---------- Helpers ----------
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors(prefix) {
  document.querySelectorAll(`[id^="${prefix}"][id$="Error"]`).forEach(el => el.textContent = '');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------- SIGN UP ----------
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('signup');

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const age = document.getElementById('signupAge').value.trim();
    const password = document.getElementById('signupPassword').value;
    let valid = true;

    if (name.length < 2) {
      showError('signupNameError', 'Please enter your full name.');
      valid = false;
    }
    if (!isValidEmail(email)) {
      showError('signupEmailError', 'Please enter a valid email address.');
      valid = false;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 120) {
      showError('signupAgeError', 'Please enter a valid age (10–120).');
      valid = false;
    }
    if (password.length < 6) {
      showError('signupPasswordError', 'Password must be at least 6 characters.');
      valid = false;
    }
    if (!valid) return;

    const users = JSON.parse(localStorage.getItem('cca_users') || '[]');
    if (users.some(u => u.email === email)) {
      showError('signupEmailError', 'This email is already registered. Try logging in.');
      return;
    }

    users.push({ name, email, age: ageNum, password, createdAt: new Date().toISOString() });
    localStorage.setItem('cca_users', JSON.stringify(users));
    localStorage.setItem('cca_current_user', JSON.stringify({ name, email, age: ageNum }));

    signupForm.classList.remove('auth-form--active');
    authSuccess.classList.add('auth-success--show');
    document.getElementById('authSuccessTitle').textContent = `Welcome, ${name.split(' ')[0]}!`;
    document.getElementById('authSuccessDesc').textContent = "Your account is ready. Let's start learning.";
  });
}
// ---------- LOGIN ----------
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('login');

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let valid = true;

    if (!isValidEmail(email)) {
      showError('loginEmailError', 'Please enter a valid email address.');
      valid = false;
    }
    if (password.length < 1) {
      showError('loginPasswordError', 'Please enter your password.');
      valid = false;
    }
    if (!valid) return;

    const users = JSON.parse(localStorage.getItem('cca_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      showError('loginEmailError', 'No account found with that email and password.');
      return;
    }

    localStorage.setItem('cca_current_user', JSON.stringify({ name: user.name, email: user.email, age: user.age }));

    loginForm.classList.remove('auth-form--active');
    authSuccess.classList.add('auth-success--show');
    document.getElementById('authSuccessTitle').textContent = `Welcome back, ${user.name.split(' ')[0]}!`;
    document.getElementById('authSuccessDesc').textContent = 'Ready to continue your learning journey?';
  });
}
/* ============================================================
   DASHBOARD — User Profile & Progress
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  console.log("Dashboard script running...");

  const notLoggedIn = document.getElementById('notLoggedIn');
  const dashboardContent = document.getElementById('dashboardContent');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('cca_current_user') || 'null');

  if (!currentUser) {
    console.log("No user logged in");
    if (notLoggedIn) notLoggedIn.style.display = 'block';
    if (dashboardContent) dashboardContent.style.display = 'none';
    return;
  }

  console.log("User found:", currentUser.name);

  // Show dashboard
  if (notLoggedIn) notLoggedIn.style.display = 'none';
  if (dashboardContent) dashboardContent.style.display = 'block';

  // Populate user info
  document.getElementById('userName').textContent = currentUser.name;
  document.getElementById('userEmail').textContent = currentUser.email;
  document.getElementById('userAge').textContent = `Age: ${currentUser.age}`;
  
  // Get avatar initial
  const initial = currentUser.name.charAt(0).toUpperCase();
  document.getElementById('userAvatar').textContent = initial;

  // Calculate join date
  const users = JSON.parse(localStorage.getItem('cca_users') || '[]');
  const user = users.find(u => u.email === currentUser.email);
  if (user && user.createdAt) {
    const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    document.getElementById('userJoined').textContent = `Joined: ${joinDate}`;
  } else {
    document.getElementById('userJoined').textContent = 'Joined: Recently';
  }

  // Load progress data
  const progressData = JSON.parse(localStorage.getItem('cca_progress') || '{}');
  const htmlPercent = progressData.html || 0;
  const cssPercent = progressData.css || 0;
  const projectsPercent = progressData.projects || 0;

  document.getElementById('htmlProgress').textContent = `${htmlPercent}%`;
  document.getElementById('htmlFill').style.width = `${htmlPercent}%`;
  
  document.getElementById('cssProgress').textContent = `${cssPercent}%`;
  document.getElementById('cssFill').style.width = `${cssPercent}%`;
  
  document.getElementById('projectsProgress').textContent = `${projectsPercent}%`;
  document.getElementById('projectsFill').style.width = `${projectsPercent}%`;

  // Stats
  const lessonsCompleted = Math.round((htmlPercent + cssPercent) / 20);
  document.getElementById('lessonsCompleted').textContent = lessonsCompleted;
  document.getElementById('quizScore').textContent = '8/10'; // Placeholder
  document.getElementById('projectsBuilt').textContent = Math.round(projectsPercent / 25);

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('cca_current_user');
        window.location.href = 'index.html';
      }
    });
  }
});


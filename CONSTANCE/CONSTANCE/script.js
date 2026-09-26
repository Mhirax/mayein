document.addEventListener('DOMContentLoaded', function() {
  // 1. Initialize all features
  initThemeToggle();
  initMobileNavigation();
  initDropdowns();
  initConditionsFilter(); // Works with your hardcoded HTML
  initQuiz();
});

/* =========================================
   1. DARK MODE (FIXED)
   ========================================= */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  // Check for saved theme
  const savedTheme = localStorage.getItem('medicare-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('medicare-theme', newTheme);
  });
}

/* =========================================
   2. MOBILE MENU
   ========================================= */
function initMobileNavigation() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileMenuClose');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobileMenuBackdrop');

  if (!menuBtn || !menu || !backdrop) return;

  function openMenu() {
    menu.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  // Close menu when a link is clicked
  document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
}

/* =========================================
   3. DESKTOP DROPDOWNS
   ========================================= */
function initDropdowns() {
  document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Close all others
      document.querySelectorAll('.dropdown-toggle').forEach(function(t) {
        t.setAttribute('aria-expanded', 'false');
      });
      
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.dropdown-toggle').forEach(function(t) {
        t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* =========================================
   4. SEARCH & FILTER (FOR HARDCODED HTML)
   ========================================= */
function initConditionsFilter() {
  const searchInput = document.getElementById('condition-search');
  const filterBar = document.getElementById('filterBar');
  const cards = document.querySelectorAll('#diseaseGrid .info-card');

  if (!searchInput || !filterBar || cards.length === 0) return;

  function filterCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeChip = filterBar.querySelector('.chip.active');
    const category = activeChip ? activeChip.dataset.filter : 'all';

    cards.forEach(function(card) {
      const cardCategory = card.dataset.category;
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (category === 'all' || cardCategory === category);
      const matchesSearch = (searchTerm === '' || cardText.includes(searchTerm));

      if (matchesCategory && matchesSearch) {
        card.style.display = ''; // Show
      } else {
        card.style.display = 'none'; // Hide
      }
    });
  }

  // Listen to search input
  searchInput.addEventListener('input', filterCards);

  // Listen to filter buttons
  filterBar.addEventListener('click', function(e) {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    filterBar.querySelectorAll('.chip').forEach(function(c) {
      c.classList.remove('active');
    });
    chip.classList.add('active');
    filterCards();
  });
}

/* =========================================
   5. QUIZ PAGE
   ========================================= */
function initQuiz() {
  const qText = document.getElementById('qText');
  if (!qText) return; // Only run on quiz page

  const questions = [
    {q: 'Which is a warning sign of a heart attack?', options: ['Frequent urination', 'Chest pain and pressure', 'Blurred vision', 'Joint pain'], answer: 1},
    {q: 'What does FAST stand for in stroke recognition?', options: ['Food, Activity, Sleep, Time', 'Face, Arms, Speech, Time', 'Fast, Alert, Strong, Tough', 'Fever, Ache, Sweating, Tired'], answer: 1},
    {q: 'Malaria is primarily transmitted by:', options: ['Contaminated water', 'Mosquito bites', 'Airborne droplets', 'Direct contact'], answer: 1},
    {q: 'Which food is richest in iron to help prevent anaemia?', options: ['White rice', 'Leafy green vegetables', 'Sugary drinks', 'Butter'], answer: 1},
    {q: 'How many hours of sleep do adults generally need?', options: ['3–4 hours', '5–6 hours', '7–9 hours', '10–12 hours'], answer: 2},
    {q: 'The BEST way to prevent cholera is:', options: ['Eating spicy food', 'Drinking clean, treated water', 'Sleeping under a net', 'Taking vitamins'], answer: 1},
    {q: 'A persistent cough lasting more than 3 weeks may indicate:', options: ['Common cold', 'Tuberculosis (TB)', 'Allergies', 'Asthma only'], answer: 1},
    {q: 'Which is NOT a pillar of disease prevention?', options: ['Balanced nutrition', 'Regular exercise', 'Skipping meals', 'Vaccination'], answer: 2},
    {q: 'Hypertension is often called:', options: ['The loud disease', 'The silent killer', 'The fast fever', 'The sugar sickness'], answer: 1},
    {q: 'In first aid for burns, you should first:', options: ['Apply butter', 'Apply toothpaste', 'Cool under running water', 'Cover with wool'], answer: 2}
  ];

  let currentQ = 0, score = 0, selected = null;
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('nextBtn');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const quizBody = document.getElementById('quizBody');
  const quizResult = document.getElementById('quizResult');

  function loadQuestion() {
    const q = questions[currentQ];
    qText.textContent = (currentQ + 1) + '. ' + q.q;
    optionsEl.innerHTML = '';
    selected = null;
    nextBtn.disabled = true;
    nextBtn.textContent = currentQ === questions.length - 1 ? 'See Results' : 'Next →';
    progressFill.style.width = ((currentQ) / questions.length * 100) + '%';
    progressText.textContent = 'Question ' + (currentQ + 1) + ' of ' + questions.length;

    q.options.forEach(function(opt, i) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline';
      btn.style.justifyContent = 'flex-start';
      btn.style.textAlign = 'left';
      btn.textContent = opt;
      btn.addEventListener('click', function() {
        optionsEl.querySelectorAll('button').forEach(function(b) {
          b.style.backgroundColor = '';
          b.style.borderColor = '';
          b.style.color = '';
        });
        btn.style.backgroundColor = 'var(--color-bg-alt)';
        btn.style.borderColor = 'var(--color-primary)';
        btn.style.color = 'var(--color-primary)';
        selected = i;
        nextBtn.disabled = false;
      });
      optionsEl.appendChild(btn);
    });
  }

  nextBtn.addEventListener('click', function() {
    if (selected === null) return;
    const q = questions[currentQ];
    const opts = optionsEl.querySelectorAll('button');
    opts.forEach(function(o, i) {
      o.disabled = true;
      if (i === q.answer) {
        o.style.backgroundColor = 'rgba(5, 150, 105, 0.1)';
        o.style.borderColor = 'var(--color-accent)';
        o.style.color = 'var(--color-accent)';
      } else if (i === selected) {
        o.style.backgroundColor = 'rgba(185, 28, 28, 0.1)';
        o.style.borderColor = 'var(--color-danger)';
        o.style.color = 'var(--color-danger)';
      }
    });
    if (selected === q.answer) score++;
    
    setTimeout(function() {
      currentQ++;
      if (currentQ < questions.length) loadQuestion();
      else showResults();
    }, 1000);
  });

  function showResults() {
    progressFill.style.width = '100%';
    quizBody.style.display = 'none';
    quizResult.style.display = 'block';
    document.getElementById('scoreCircle').textContent = score + '/' + questions.length;
    
    const pct = score / questions.length;
    let title = '', msg = '';
    if (pct === 1) { title = 'Perfect Score!'; msg = 'You are a health knowledge champion!'; }
    else if (pct >= 0.7) { title = 'Great Job!'; msg = 'You have solid health awareness.'; }
    else if (pct >= 0.5) { title = 'Good Effort!'; msg = 'You know the basics.'; }
    else { title = 'Keep Learning!'; msg = 'Explore our content and try again!'; }
    
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultText').textContent = msg;
  }

  document.getElementById('restartBtn').addEventListener('click', function() {
    currentQ = 0; score = 0;
    quizBody.style.display = 'block';
    quizResult.style.display = 'none';
    loadQuestion();
  });

  loadQuestion();
}
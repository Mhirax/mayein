document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. HERO ANIMATION TRIGGER (Instant)
       ========================================= */
    const hero = document.getElementById('hero');
    if (hero) {
        setTimeout(() => hero.classList.add('loaded'), 100);
    }

    /* =========================================
       2. DARK MODE
       ========================================= */
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) html.setAttribute('data-theme', savedTheme);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.setAttribute('data-theme', 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    /* =========================================
       3. CUSTOM CURSOR & SCROLL PROGRESS
       ========================================= */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouch && cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px';
        });
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15; ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();
        document.querySelectorAll('a, button, .project-card, .service-card, .skill-badge, .filter-btn, input, textarea, select').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0%';
        }, { passive: true });
    }

    /* =========================================
       4. INTERACTIONS (Magnetic, Glow, Tilt)
       ========================================= */
    if (!isTouch) {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; });
        });

        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
            });
        });

        document.addEventListener('mousemove', (e) => {
            document.querySelectorAll('.project-card').forEach(card => {
                const rect = card.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    card.style.transform = `translateY(-6px) perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
                } else {
                    card.style.transform = '';
                }
            });
        });
    }

    /* =========================================
       5. NAVIGATION
       ========================================= */
    const navHeader = document.getElementById('navHeader');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navHeader) {
        window.addEventListener('scroll', () => {
            navHeader.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });
        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* =========================================
       6. SCROLL REVEAL ANIMATIONS
       ========================================= */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), parseInt(entry.target.getAttribute('data-delay') || 0));
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    /* =========================================
       7. PROJECTS DATA & LOGIC
       ========================================= */
    const projects = [
        {
            id: 1,
            title: "Football Zone",
            category: "Sports",
            description: "An editorial-style sports platform delivering news, match fixtures, and player insights with a modern, magazine-inspired interface.",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
            technologies: ["UI/UX Design", "Responsive Layout", "Frontend"],
            url: "https://football-zone--tayoemmanuel500.replit.app",
            challenge: "Create a dynamic, magazine-style layout that handles dense sports data without feeling cluttered.",
            solution: "Implemented a clean grid system, bold typography, and clear visual hierarchy to make match fixtures and news easily scannable.",
            features: ["Live match fixtures", "Player insight profiles", "Editorial news layout", "Fully responsive design"],
            results: "A highly engaging, fast-loading platform that delivers sports content with premium editorial aesthetics."
        },
        {
            id: 2,
            title: "Contemporary Art Portfolio",
            category: "Creative",
            description: "A premium, dark-themed editorial art gallery featuring immersive lightboxes, dynamic filtering, and smooth page transitions.",
            image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1000&auto=format&fit=crop",
            technologies: ["HTML5", "CSS3", "JavaScript"],
            url: "art-portfolio.html",
            challenge: "Design a digital gallery that respects the artwork while providing a modern, immersive browsing experience.",
            solution: "Built a dark-themed, minimalist interface with smooth CSS transitions, custom lightboxes, and category filtering to let the art take center stage.",
            features: ["Immersive lightbox gallery", "Dynamic category filtering", "Smooth page transitions", "Dark-themed aesthetic"],
            results: "A visually striking portfolio that elevates the perceived value of the artwork and provides a seamless user journey."
        }
    ];

    const categories = ['All', ...new Set(projects.map(p => p.category))];
    const filterBar = document.getElementById('filterBar');
    
    if (filterBar) {
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn' + (cat === 'All' ? ' active' : '');
            btn.textContent = cat;
            btn.setAttribute('aria-selected', cat === 'All');
            btn.addEventListener('click', () => filterProjects(cat, btn));
            filterBar.appendChild(btn);
        });
    }

    function renderProjects(list, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        list.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-card filtering-in reveal-up revealed';
            card.setAttribute('data-id', project.id);
            card.innerHTML = `
                <div class="project-image-wrapper"><img src="${project.image}" alt="${project.title} Preview"></div>
                <div class="project-card-content">
                    <div class="project-card-meta">${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-desc">${project.description}</p>
                    <a href="${project.url}" target="_blank" class="project-card-link">View Live Site <span>&rarr;</span></a>
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderProjects(projects, 'projectsGrid');

    function filterProjects(category, activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected', 'false'); });
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-selected', 'true');

        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        const filtered = category === 'All' ? projects : projects.filter(p => p.category === category);

        grid.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('filtering-in');
            card.classList.add('filtering-out');
        });

        setTimeout(() => renderProjects(filtered, 'projectsGrid'), 350);
    }

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    if (modal && modalClose) {
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
    }

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const project = projects.find(p => p.id === parseInt(card.getAttribute('data-id')));
            if (project) openModal(project);
        }
    });

    function openModal(project) {
        if (!modalBody || !modal) return;
        modalBody.innerHTML = `
            <div class="modal-image"><img src="${project.image}" alt="${project.title}"></div>
            <span class="modal-category">${project.category}</span>
            <h2>${project.title}</h2>
            <div class="modal-section"><p>${project.description}</p></div>
            ${project.challenge ? `<div class="modal-section"><h4>Challenge</h4><p>${project.challenge}</p></div>` : ''}
            ${project.solution ? `<div class="modal-section"><h4>Solution</h4><p>${project.solution}</p></div>` : ''}
            ${project.features ? `<div class="modal-section"><h4>Features</h4><ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul></div>` : ''}
            <div class="modal-section"><h4>Technologies</h4><div class="modal-techs">${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div></div>
            ${project.results ? `<div class="modal-section"><h4>Results</h4><p>${project.results}</p></div>` : ''}
            <a href="${project.url}" target="_blank" class="modal-link">Visit Live Site <span>&rarr;</span></a>
        `;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
{
    id: 11,
    title: "Your New Project",
    category: "New Category",  // or use existing category
    description: "Brief description",
    image: "path/to/image.jpg",
    url: "link-to-project"
}
    /* =========================================
       8. CONTACT FORM VALIDATION
       ========================================= */
    const form = document.getElementById('contactForm');
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        function getOrCreateError(input) {
            let errorEl = input.nextElementSibling;
            if (!errorEl || !errorEl.classList.contains('form-error')) {
                errorEl = document.createElement('span');
                errorEl.className = 'form-error';
                input.parentNode.insertBefore(errorEl, input.nextSibling);
            }
            return errorEl;
        }

        function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
        function showError(input, msg) { input.classList.add('error'); input.classList.remove('valid'); getOrCreateError(input).textContent = msg; }
        function showValid(input) { input.classList.remove('error'); input.classList.add('valid'); getOrCreateError(input).textContent = ''; }
        function clearError(input) { getOrCreateError(input).textContent = ''; }

        nameInput.addEventListener('blur', () => { if(!nameInput.value.trim()) showError(nameInput, 'Please enter your name.'); else showValid(nameInput); });
        emailInput.addEventListener('blur', () => { if(!isValidEmail(emailInput.value.trim())) showError(emailInput, 'Please enter a valid email.'); else showValid(emailInput); });
        messageInput.addEventListener('blur', () => { if(messageInput.value.trim().length < 10) showError(messageInput, 'Message should be at least 10 characters.'); else showValid(messageInput); });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            if(!nameInput.value.trim()) { showError(nameInput, 'Please enter your name.'); isValid = false; }
            if(!isValidEmail(emailInput.value.trim())) { showError(emailInput, 'Please enter a valid email.'); isValid = false; }
            if(messageInput.value.trim().length < 10) { showError(messageInput, 'Message should be at least 10 characters.'); isValid = false; }

            if(!isValid) return;

            const btnText = submitBtn.textContent;
            submitBtn.disabled = true; 
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                submitBtn.disabled = false; 
                submitBtn.textContent = btnText;
                submitBtn.style.opacity = '1';
                
                let successMsg = form.querySelector('.form-success');
                if (!successMsg) {
                    successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.textContent = '✓ Message sent successfully! I will be in touch soon.';
                    form.appendChild(successMsg);
                }
                successMsg.style.display = 'block';
                
                form.reset();
                [nameInput, emailInput, messageInput].forEach(i => { i.classList.remove('valid', 'error'); clearError(i); });
                
                setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
            }, 1500);
        });
    }
});
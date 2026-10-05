/* ============================================================
   MAYEIN — homepage behaviour
   Everything animated here runs through the easing helpers in
   section 1, so timing stays consistent across the page.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     1. EASING + ANIMATION ENGINE
     t is always normalised progress from 0 to 1.
     ========================================================== */
  var Ease = {
    inQuad:    function (t) { return t * t; },
    outQuad:   function (t) { return t * (2 - t); },
    inOutQuad: function (t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    inOutCubic: function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    outCubic:  function (t) { return 1 - Math.pow(1 - t, 3); },
    outExpo:   function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  };

  /**
   * Runs a requestAnimationFrame tween.
   * onUpdate receives the eased value (0 → 1); onDone fires at the end.
   * Returns a cancel function.
   */
  function animate(duration, easing, onUpdate, onDone) {
    if (reduceMotion) {
      onUpdate(1);
      if (onDone) onDone();
      return function () {};
    }

    var start = performance.now();
    var frame;
    var cancelled = false;

    function step(now) {
      if (cancelled) return;
      var t = Math.min((now - start) / duration, 1);
      onUpdate(easing(t));
      if (t < 1) {
        frame = requestAnimationFrame(step);
      } else if (onDone) {
        onDone();
      }
    }

    frame = requestAnimationFrame(step);

    return function cancel() {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ==========================================================
     2. SCROLL REVEAL
     Adds .is-visible once an element scrolls into view; the CSS
     transition carries it in with an ease-out curve.
     ========================================================== */
  function initReveal() {
    var items = $$('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    items.forEach(function (el) {
      var delay = el.getAttribute('data-reveal-delay');
      if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================
     3. HERO CAROUSEL
     Crossfade + slow zoom, autoplay, arrows, dots, keyboard,
     swipe, and a pause whenever the tab or pointer leaves.
     ========================================================== */
  function initHero() {
    var hero   = $('#hero');
    if (!hero) return;

    var slides = $$('.hero__slide', hero);
    var dotsEl = $('#heroDots');
    var prev   = $('#heroPrev');
    var next   = $('#heroNext');
    if (slides.length < 2) return;

    var index    = 0;
    var timer    = null;
    var DELAY    = 6000;
    var paused   = false;

    /* build the dots */
    var dots = slides.map(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'hero__dot' + (i === 0 ? ' is-active' : '');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsEl.appendChild(dot);
      return dot;
    });

    function goTo(n) {
      var target = (n + slides.length) % slides.length;
      if (target === index) return;

      slides[index].classList.remove('is-active');
      dots[index].classList.remove('is-active');
      dots[index].setAttribute('aria-selected', 'false');

      index = target;

      slides[index].classList.add('is-active');
      dots[index].classList.add('is-active');
      dots[index].setAttribute('aria-selected', 'true');
    }

    function play() {
      if (reduceMotion || paused) return;
      stop();
      timer = setInterval(function () { goTo(index + 1); }, DELAY);
    }
    function stop()    { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); play(); }

    prev.addEventListener('click', function () { goTo(index - 1); restart(); });
    next.addEventListener('click', function () { goTo(index + 1); restart(); });

    hero.addEventListener('mouseenter', function () { paused = true;  stop(); });
    hero.addEventListener('mouseleave', function () { paused = false; play(); });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else play();
    });

    /* keyboard, once the carousel has focus */
    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { goTo(index - 1); restart(); }
      if (e.key === 'ArrowRight') { goTo(index + 1); restart(); }
    });

    /* swipe */
    var startX = null;
    hero.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      stop();
    }, { passive: true });

    hero.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) goTo(dx < 0 ? index + 1 : index - 1);
      startX = null;
      play();
    }, { passive: true });

    play();
  }

  /* ==========================================================
     4. IMPACT COUNTERS
     Counts up with an ease-out curve the first time the stats
     scroll into view.
     ========================================================== */
  function initCounters() {
    var nums = $$('[data-count-to]');
    if (!nums.length) return;

    function run(el) {
      var target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
      var dur = 1600 + Math.min(target, 30000) / 30;

      /* plain digits, no thousands separator — matches the reference */
      animate(dur, Ease.outExpo, function (v) {
        el.textContent = String(Math.round(target * v));
      }, function () {
        el.textContent = String(target);
      });
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(run);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================
     5. HEADER, NAV, DROPDOWNS, SEARCH
     ========================================================== */
  /* must match the nav collapse breakpoint in style.css */
  var NAV_BREAKPOINT = 1100;

  function initHeader() {
    var header = $('#siteHeader');
    var toggle = $('#navToggle');
    var nav    = $('#primaryNav');

    /* shadow once the page leaves the top */
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle('is-stuck', window.scrollY > 12);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* burger */
    function closeNav() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    /* dropdowns */
    var items = $$('.has-dropdown');

    items.forEach(function (item) {
      var btn = $('.nav__link--toggle', item);

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          $('.nav__link--toggle', other).setAttribute('aria-expanded', 'false');
        });
        if (open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      /* hover opens them on desktop only; below NAV_BREAKPOINT the
         menu is a tap-to-open / tap-to-close accordion */
      item.addEventListener('mouseenter', function () {
        if (window.innerWidth > NAV_BREAKPOINT) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
      item.addEventListener('mouseleave', function () {
        if (window.innerWidth > NAV_BREAKPOINT) {
          item.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    /* close every open dropdown */
    function closeDropdowns() {
      items.forEach(function (item) {
        item.classList.remove('is-open');
        $('.nav__link--toggle', item).setAttribute('aria-expanded', 'false');
      });
    }

    /* click-away + escape */
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        closeDropdowns();
        closeNav();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeDropdowns();
      closeNav();
    });

    /* a plain menu link closes the whole panel on mobile */
    $$('.nav__list a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDropdowns();
        closeNav();
      });
    });

    return { closeNav: closeNav, header: header };
  }

  /* ==========================================================
     6. SMOOTH SCROLL  (ease-in-out, offset for the sticky header)
     ========================================================== */
  function initSmoothScroll(api) {
    function scrollToY(destination, duration) {
      var startY = window.pageYOffset;
      var diff   = destination - startY;
      if (!diff) return;

      animate(duration || 850, Ease.inOutCubic, function (v) {
        window.scrollTo(0, startY + diff * v);
      });
    }

    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;

        var target = document.getElementById(id.slice(1));
        if (!target) return;

        e.preventDefault();
        if (api && api.closeNav) api.closeNav();

        var headerH = api && api.header ? api.header.offsetHeight : 0;
        var y = target.getBoundingClientRect().top + window.pageYOffset - headerH + 1;
        scrollToY(Math.max(y, 0));
      });
    });

    /* back to top */
    var toTop = $('#toTop');
    if (!toTop) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        toTop.classList.toggle('is-visible', window.scrollY > 600);
        ticking = false;
      });
    }, { passive: true });

    toTop.addEventListener('click', function () { scrollToY(0, 900); });
  }

  /* ==========================================================
     7. NEWSLETTER (Mailchimp)
     Validates the address, then hands off to Mailchimp's own
     endpoint. While the form action is still the placeholder it
     refuses to post, so nothing is silently lost.
     ========================================================== */
  var MC_PLACEHOLDER = 'MAILCHIMP_FORM_ACTION_URL';

  function initNewsletter() {
    var form = $('#newsletterForm');
    if (!form) return;

    var input = $('#nlEmail', form);
    var msg   = $('#newsletterMsg');

    function say(text, kind) {
      msg.textContent = text;
      msg.className = 'newsletter__msg is-' + kind;
    }
    function clear() {
      msg.textContent = '';
      msg.className = 'newsletter__msg';
    }

    form.addEventListener('submit', function (e) {
      var value = input.value.trim();

      /* shape check only — Mailchimp does the authoritative validation */
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        e.preventDefault();
        input.classList.add('is-invalid');
        say('Please enter a valid email address.', 'error');
        input.focus();
        return;
      }

      input.classList.remove('is-invalid');

      if (form.getAttribute('action').indexOf(MC_PLACEHOLDER) !== -1) {
        e.preventDefault();
        say('Newsletter signup is not connected yet — add the Mailchimp form URL in index.html.', 'note');
        if (window.console) {
          console.warn('[newsletter] form action is still ' + MC_PLACEHOLDER + '; nothing was submitted.');
        }
        return;
      }

      say('Opening Mailchimp to confirm your subscription…', 'ok');
    });

    input.addEventListener('input', function () {
      input.classList.remove('is-invalid');
      if (msg.classList.contains('is-error')) clear();
    });
  }

  /* ==========================================================
     8. BOOT
     ========================================================== */
  function init() {
    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    var headerApi = initHeader();
    initReveal();
    initHero();
    initCounters();
    initNewsletter();
    initSmoothScroll(headerApi);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

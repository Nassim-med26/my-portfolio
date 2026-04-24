/* =========================================================
   NASSIM HAMAIDIA — PORTFOLIO JAVASCRIPT
   Scroll effects · Nav · Animations · Interactions
   ========================================================= */

(function () {
  'use strict';

  // ─── YEAR ──────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── NAVBAR SCROLL ─────────────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 48) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ─── ACTIVE NAV LINK ───────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveNavLink() {
    let currentId = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentId}`
      );
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  setActiveNavLink();

  // ─── MOBILE MENU ───────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // close on outside click
    document.addEventListener('click', e => {
      if (
        mobileMenu.classList.contains('open') &&
        !navbar.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── SCROLL REVEAL ─────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ─── SMOOTH SCROLL FOR ALL ANCHORS ─────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── SKILL PILLS HOVER RIPPLE ──────────────────────────
  document.querySelectorAll('.pill, .project-tags span').forEach(pill => {
    pill.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
    });
    pill.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });

  // ─── PROJECT CARD TILT EFFECT ──────────────────────────
  const projectCards = document.querySelectorAll('.project-card');

  function tiltCard(e, card) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  }

  function resetCard(card) {
    card.style.transform = '';
  }

  // Only on non-touch devices
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouch) {
    projectCards.forEach(card => {
      card.addEventListener('mousemove', e => tiltCard(e, card));
      card.addEventListener('mouseleave', () => resetCard(card));
    });
  }

  // ─── BENTO CARDS HOVER GLOW ────────────────────────────
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.style.setProperty('--mouse-x', `${x}%`);
      this.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // ─── CONSOLE EASTER EGG ────────────────────────────────
  console.log(
    '%c Med Nassim Hamaidia — Portfolio',
    'background: linear-gradient(135deg, #4f8ef7, #7c6af7); color: white; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 14px;'
  );
  console.log(
    '%c hamaidiamednassim@gmail.com · github.com/Nassim-med26',
    'color: #8a8aa8; font-size: 12px; padding: 4px;'
  );

})();

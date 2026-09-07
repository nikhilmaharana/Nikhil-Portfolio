/**
 * main.js — page-level interaction: entry screen, nav, mobile menu,
 * orientation (Recruiter / Client / Explore), and a single
 * scroll-reveal pass on section entry.
 */
(function () {
  // ---------- Entry screen ----------
  const entry = document.getElementById('entry');
  const enterBtn = document.getElementById('enterBtn');
  function dismissEntry() {
    entry.classList.add('hidden');
    document.body.style.overflow = '';
  }
  enterBtn.addEventListener('click', dismissEntry);
  // Progressive: if user starts scrolling/interacting before clicking, let them through.
  window.addEventListener('wheel', dismissEntry, { once: true, passive: true });
  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.body.style.overflow = entry.classList.contains('hidden') ? '' : 'hidden'; }, 50);
  window.addEventListener('keydown', function onFirstKey(e) {
    if (e.key === 'Enter' || e.key === ' ') dismissEntry();
  }, { once: true });

  // ---------- Mobile nav ----------
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  navToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  // ---------- Orientation modes (Recruiter / Client / Explore) ----------
  // Everything stays reachable; this just reorders which sections lead.
  const ORDER = {
    explore:   ['about', 'journey', 'experience', 'tech', 'projects', 'experiments', 'signal', 'beyond', 'future', 'resume', 'social', 'contact'],
    recruiter: ['experience', 'tech', 'projects', 'resume', 'journey', 'about', 'social', 'experiments', 'signal', 'beyond', 'future', 'contact'],
    client:    ['projects', 'tech', 'experience', 'about', 'contact', 'journey', 'resume', 'experiments', 'signal', 'beyond', 'future', 'social'],
  };
  const main = document.getElementById('main');
  const orientationBtns = document.querySelectorAll('.orientation-btn');

  function applyOrder(mode) {
    const order = ORDER[mode] || ORDER.explore;
    order.forEach((id) => {
      const section = document.getElementById(id);
      if (section) main.appendChild(section);
    });
    // footer always last
    const footer = document.querySelector('.site-footer');
    if (footer) main.appendChild(footer);
  }

  orientationBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      orientationBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyOrder(btn.dataset.mode);
    });
  });

  // ---------- Scroll reveal (single, restrained pass) ----------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.section').forEach((s) => revealObserver.observe(s));
  } else {
    document.querySelectorAll('.section').forEach((s) => s.classList.add('in-view'));
  }

  // ---------- Nav background intensifies on scroll ----------
  const nav = document.getElementById('siteNav');
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 40) nav.style.background = 'rgba(10,11,13,0.92)';
      else nav.style.background = 'linear-gradient(to bottom, rgba(10,11,13,0.92), rgba(10,11,13,0))';
    },
    { passive: true }
  );
})();

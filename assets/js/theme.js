// NeoLearn Institute — theme toggle + persistence
(function () {
  const root = document.documentElement;
  const toggleBtnId = 'themeToggle';
  const storageKey = 'theme';

  // Init theme from storage or system preference
  const stored = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-bs-theme', theme);

  function updateToggleUI(current) {
    const btn = document.getElementById(toggleBtnId);
    if (!btn) return;
    const icon = btn.querySelector('[data-icon]');
    const label = btn.querySelector('.visually-hidden');
    const isDark = current === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    if (icon) {
      icon.className = isDark ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
      icon.setAttribute('aria-hidden', 'true');
    }
    if (label) {
      label.textContent = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }
    btn.title = isDark ? 'Light theme' : 'Dark theme';
  }

  window.addEventListener('DOMContentLoaded', function () {
    updateToggleUI(theme);
    const btn = document.getElementById(toggleBtnId);
    if (btn) {
      btn.addEventListener('click', function () {
        theme = root.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-bs-theme', theme);
        localStorage.setItem(storageKey, theme);
        updateToggleUI(theme);
      });
    }

    // Optional: update aria-current on nav as user scrolls
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a[data-nav]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((lnk) => {
              const target = lnk.getAttribute('href')?.replace('#', '');
              if (target === id) {
                lnk.setAttribute('aria-current', 'page');
              } else {
                lnk.removeAttribute('aria-current');
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
    );
    sections.forEach((s) => observer.observe(s));
  });
})();

(function () {
  const page = document.body;
  const storageKey = 'devtools-theme';

  function updateThemeButtons(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      button.textContent = nextTheme === 'light' ? 'Giao diện sáng' : 'Giao diện tối';
      button.setAttribute('aria-label', `Chuyển sang ${button.textContent.toLowerCase()}`);
    });
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    updateThemeButtons(theme);
  }

  const savedTheme = localStorage.getItem(storageKey);
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  document.addEventListener('click', event => {
    if (!event.target.closest('[data-theme-toggle]')) return;
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(storageKey, theme);
    applyTheme(theme);
  });

  if (!page.dataset.toolName) return;

  const name = page.dataset.toolName;
  const category = page.dataset.toolCategory || 'DevTools Mini';
  const description = page.dataset.toolDescription || '';

  document.title = `${name} | DevTools Mini`;
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="site-header"><div class="shell">
      <a class="brand" href="index.html"><span class="brand-mark">&gt;_</span><span>DevTools Mini</span></a>
      <div class="header-actions"><button class="theme-toggle" type="button" data-theme-toggle></button><a class="back-link" href="index.html">← Tất cả công cụ</a></div>
    </div></header>
  `);
  updateThemeButtons(document.documentElement.dataset.theme);

  const intro = document.querySelector('[data-tool-intro]');
  if (intro) intro.innerHTML = `<div class="eyebrow">${category}</div><h1>${name}</h1><p>${description}</p>`;
}());

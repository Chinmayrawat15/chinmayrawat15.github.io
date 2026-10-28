(function () {
  // Theme toggle (persisted per browser; falls back to the OS preference)
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function label() {
    if (!btn) return;
    btn.querySelector('span').textContent = current() === 'dark' ? 'Light mode' : 'Dark mode';
  }
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) {}
  label();
  if (btn) btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });

  // "Show all news"
  var news = document.querySelector('.news');
  var more = document.getElementById('news-more');
  if (news && more) {
    if (news.children.length <= 6) more.hidden = true;
    more.addEventListener('click', function () {
      var collapsed = news.classList.toggle('collapsed');
      more.textContent = collapsed ? 'Show all news' : 'Show fewer';
    });
  }

  // Scroll-spy for the sidebar nav
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var active = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          active = en.target.id;
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + active); });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }
})();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const header = document.querySelector('.site-header');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const articleCards = [...document.querySelectorAll('.article-preview')];
const searchInput = document.querySelector('#blog-search');
const noResults = document.querySelector('#no-results');

let activeCategory = 'all';

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

function filterArticles() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  articleCards.forEach((card) => {
    const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    const shouldShow = matchesCategory && matchesSearch;
    card.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  noResults.hidden = visibleCount !== 0;
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navigation.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12), { passive: true });

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    filterArticles();
  });
});

searchInput.addEventListener('input', filterArticles);
document.querySelector('#current-year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const header = document.querySelector('.site-header');
const progressBar = document.querySelector('#reading-progress-bar');
const copyButton = document.querySelector('#copy-article-link');
const tocLinks = [...document.querySelectorAll('.toc a')];
const sections = tocLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
  header.classList.toggle('scrolled', window.scrollY > 12);
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
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    tocLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-25% 0px -65% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyButton.textContent = 'Link copied';
  } catch {
    copyButton.textContent = 'Copy unavailable';
  }
  window.setTimeout(() => { copyButton.textContent = 'Copy article link'; }, 1800);
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

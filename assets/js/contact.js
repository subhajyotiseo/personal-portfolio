const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const header = document.querySelector('.site-header');
const contactForm = document.querySelector('#contact-page-form');
const formStatus = document.querySelector('#contact-form-status');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
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
document.querySelector('#current-year').textContent = new Date().getFullYear();

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Professional enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\n` +
    `Email: ${data.get('email')}\n` +
    `Company: ${data.get('company') || 'Not provided'}\n` +
    `Website: ${data.get('website') || 'Not provided'}\n\n` +
    `${data.get('message')}`
  );

  formStatus.textContent = 'Opening your email application…';
  window.location.href = `mailto:hello@subhajyoti.com?subject=${subject}&body=${body}`;
});

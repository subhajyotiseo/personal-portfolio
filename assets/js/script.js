const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const header = document.querySelector('.site-header');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const auditForm = document.querySelector('#audit-form');
const contactWebsite = document.querySelector('#contact-form input[name="website"]');

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

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 12);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelector('#current-year').textContent = new Date().getFullYear();

auditForm.addEventListener('submit', (event) => {
  event.preventDefault();
  contactWebsite.value = document.querySelector('#audit-url').value;
  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  window.setTimeout(() => document.querySelector('#contact-form input[name="name"]').focus(), 500);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`SEO enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nWebsite: ${data.get('website') || 'Not provided'}\n\n${data.get('message')}`
  );

  formStatus.textContent = 'Opening your email app…';
  window.location.href = `mailto:hello@subhajyoti.com?subject=${subject}&body=${body}`;
});

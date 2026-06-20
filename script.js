const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#primary-navigation');

const setMenuOpen = (isOpen) => {
  if (!navToggle || !navMenu) {
    return;
  }

  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  navMenu.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  setMenuOpen(!isOpen);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
  }
});

window.matchMedia('(min-width: 680px)').addEventListener('change', (event) => {
  if (event.matches) {
    setMenuOpen(false);
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));

    if (!target) {
      return;
    }

    event.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
});

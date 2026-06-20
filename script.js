document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));

    if (!target) {
      return;
    }

    event.preventDefault();
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

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

const contactForm = document.querySelector('.contact-form');

const contactValidators = {
  name: (value) => value.trim() ? '' : 'Ingresa tu nombre.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Ingresa un correo válido.',
  phone: (value) => {
    const phone = value.trim();

    if (!phone) {
      return '';
    }

    return /^\+?[0-9\s()-]{8,20}$/.test(phone) ? '' : 'Ingresa un teléfono válido o deja el campo vacío.';
  },
  message: (value) => value.trim() ? '' : 'Escribe tu mensaje.',
  privacy: (_value, field) => field.checked ? '' : 'Debes aceptar la política de privacidad.',
};

const setFieldError = (field, message) => {
  const error = document.querySelector(`#${field.id}-error`);

  field.setAttribute('aria-invalid', String(Boolean(message)));

  if (error) {
    error.textContent = message;
  }
};

const validateContactForm = () => {
  if (!contactForm) {
    return false;
  }

  let isValid = true;

  Object.entries(contactValidators).forEach(([fieldName, validator]) => {
    const field = contactForm.elements[fieldName];
    const message = validator(field.value, field);

    setFieldError(field, message);
    isValid = isValid && !message;
  });

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = !isValid;

  return isValid;
};

if (contactForm) {
  contactForm.addEventListener('input', validateContactForm);
  contactForm.addEventListener('change', validateContactForm);
  contactForm.addEventListener('submit', (event) => {
    if (!validateContactForm()) {
      event.preventDefault();
    }
  });

  validateContactForm();
}

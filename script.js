const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

function updateActiveNav() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function revealOnScroll() {
  const revealElements = document.querySelectorAll('.section-reveal');

  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add('visible');
    }
  });
}

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
}

function closeMenuOnLink() {
  if (window.innerWidth <= 768 && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
  }
}

function initTypeWriter(text, element, speed = 70) {
  if (!element) return;
  let index = 0;
  element.textContent = '';

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index += 1;
      setTimeout(type, speed);
    }
  }

  type();
}

window.addEventListener('scroll', () => {
  updateActiveNav();
  revealOnScroll();
});

window.addEventListener('load', () => {
  updateActiveNav();
  revealOnScroll();
  initTypeWriter('Front-end web developer crafting modern, responsive websites', document.querySelector('.hero-copy h2'), 40);
});

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach(link => {
  link.addEventListener('click', closeMenuOnLink);
});

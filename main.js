/* ========================
   ARTE MAGIA — main.js
   ======================== */

// ── Año en el footer ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Generar estrellas animadas ──
(function generarEstrellas() {
  const contenedor = document.getElementById('stars');
  if (!contenedor) return;
  for (let i = 0; i < 120; i++) {
    const estrella = document.createElement('div');
    estrella.classList.add('star');
    estrella.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      --dur:   ${2 + Math.random() * 4}s;
      --delay: ${Math.random() * 5}s;
      width:  ${Math.random() < 0.2 ? 3 : 2}px;
      height: ${Math.random() < 0.2 ? 3 : 2}px;
    `;
    contenedor.appendChild(estrella);
  }
})();

// ── Menú hamburguesa (móvil) ──
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const abierto = navMenu.classList.contains('open');
  hamburger.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// ── Navbar: fondo más opaco al hacer scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(6, 6, 15, 0.97)';
  } else {
    navbar.style.background = 'rgba(10, 10, 18, 0.85)';
  }
});

// ── Animación al entrar en pantalla (Intersection Observer) ──
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Aplicar animación de entrada a tarjetas y secciones
document.querySelectorAll('.card, .section-header, .video-placeholder, .contact-form').forEach(el => {
  el.classList.add('fade-in');
  observador.observe(el);
});

// ── Formulario de contacto ──
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-enviar');
  const msg = document.getElementById('form-msg');

  btn.textContent = 'Enviando... ✨';
  btn.disabled = true;

  // Simulación de envío (aquí irá la lógica real con Formspree o EmailJS)
  setTimeout(() => {
    msg.textContent = 'Mensaje recibido. El universo ya está conspirando para responderte.';
    msg.style.display = 'block';
    btn.textContent = 'Enviado ✦';
    e.target.reset();

    setTimeout(() => {
      btn.textContent = 'Enviar Mensaje ✦';
      btn.disabled = false;
      msg.style.display = 'none';
    }, 5000);
  }, 1200);
});

// ── Enlace activo en navbar según sección visible ──
const secciones = document.querySelectorAll('section[id]');
const linksNav  = document.querySelectorAll('.nav-link');

const observadorNav = new IntersectionObserver(
  (entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        linksNav.forEach(link => link.classList.remove('active'));
        const linkActivo = document.querySelector(`.nav-link[href="#${entrada.target.id}"]`);
        linkActivo?.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

secciones.forEach(sec => observadorNav.observe(sec));

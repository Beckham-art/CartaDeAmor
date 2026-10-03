/* ============================================
   FLORES AMARILLAS — JavaScript Principal
   Corazones flotantes, scroll reveal, sorpresa final
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. PRELOADER
  // =============================================
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2200);
  });
  // Fallback en caso de que 'load' ya haya pasado
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3500);


  // =============================================
  // 2. CORAZONES FLOTANTES EN EL FONDO
  // =============================================
  const heartsContainer = document.querySelector('.floating-hearts-container');
  const heartSymbols = ['♥', '♡', '❤', '💕', '💗', '🤍', '🩷'];
  const heartColors = [
    'rgba(201, 80, 107, 0.6)',
    'rgba(232, 160, 180, 0.5)',
    'rgba(212, 168, 83, 0.4)',
    'rgba(139, 26, 43, 0.35)',
    'rgba(240, 212, 138, 0.5)',
    'rgba(248, 232, 238, 0.7)',
  ];

  function createHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    const size = Math.random() * 22 + 12;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * 5;
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];

    heart.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      color: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    heartsContainer.appendChild(heart);

    // Remover el corazón cuando termine su animación
    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }

  // Crear corazones periódicamente
  setInterval(createHeart, 1200);
  // Crear unos cuantos al inicio
  for (let i = 0; i < 8; i++) {
    setTimeout(createHeart, i * 400);
  }


  // =============================================
  // 3. SCROLL REVEAL (Fade-in al hacer scroll)
  // =============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Dejar de observar una vez revelado
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // =============================================
  // 4. NAVEGACIÓN CON EFECTO SCROLL
  // =============================================
  const nav = document.querySelector('.nav-romantic');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });


  // =============================================
  // 5. PARTÍCULAS DORADAS (Sparkles)
  // =============================================
  function createSparkles(container, count) {
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
      container.appendChild(sparkle);
    }
  }

  // Agregar sparkles al hero y al finale
  const hero = document.querySelector('.hero');
  const finale = document.querySelector('.finale-section');
  if (hero) createSparkles(hero, 15);
  if (finale) createSparkles(finale, 10);


  // =============================================
  // 6. SORPRESA FINAL — FLORES AMARILLAS
  // =============================================
  const surpriseBtn = document.getElementById('surprise-btn');
  const finaleReveal = document.getElementById('finale-reveal');
  const finalePrelude = document.querySelector('.finale-prelude');

  if (surpriseBtn && finaleReveal) {
    surpriseBtn.addEventListener('click', () => {
      // Desencadenar la lluvia de pétalos
      createPetalBurst();

      // Ocultar el botón y el texto previo
      finalePrelude.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      finalePrelude.style.opacity = '0';
      finalePrelude.style.transform = 'translateY(-20px)';

      setTimeout(() => {
        finalePrelude.style.display = 'none';
        finaleReveal.classList.add('active');

        // Scroll suave hacia la revelación
        setTimeout(() => {
          finaleReveal.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 300);
      }, 700);
    });
  }


  // =============================================
  // 7. LLUVIA DE PÉTALOS
  // =============================================
  function createPetalBurst() {
    const burstContainer = document.createElement('div');
    burstContainer.classList.add('petal-burst');
    document.body.appendChild(burstContainer);

    const petals = ['🌸', '🌼', '💛', '✨', '🌻', '💐', '🪻'];
    const petalCount = 60;

    for (let i = 0; i < petalCount; i++) {
      setTimeout(() => {
        const petal = document.createElement('span');
        petal.classList.add('petal');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];

        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const size = Math.random() * 1.5 + 1;
        const delay = Math.random() * 0.5;

        petal.style.cssText = `
          left: ${left}%;
          font-size: ${size}rem;
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
        `;

        burstContainer.appendChild(petal);

        setTimeout(() => petal.remove(), (duration + delay) * 1000);
      }, i * 50);
    }

    // Remover el contenedor después
    setTimeout(() => burstContainer.remove(), 8000);
  }


  // =============================================
  // 8. CONTADOR DE AMOR (Días juntos) — Opcional
  // =============================================
  const counterEl = document.getElementById('love-counter');
  if (counterEl) {
    // Modifica esta fecha al inicio de su relación
    const startDate = new Date('2024-01-01');
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    counterEl.textContent = diffDays.toLocaleString();
  }


  // =============================================
  // 9. EFECTO TYPEWRITER EN LA CARTA FINAL
  // =============================================
  const typewriterElements = document.querySelectorAll('.typewriter-text');

  const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.getAttribute('data-text');
        if (text && !el.classList.contains('typed')) {
          el.classList.add('typed');
          typeText(el, text, 0);
        }
        typewriterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  typewriterElements.forEach(el => typewriterObserver.observe(el));

  function typeText(element, text, index) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => typeText(element, text, index + 1), 50);
    }
  }


  // =============================================
  // 10. POLAROID TILT INTERACTIVO
  // =============================================
  const polaroids = document.querySelectorAll('.polaroid');

  polaroids.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // =============================================
  // 11. SMOOTH SCROLL PARA LOS LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});

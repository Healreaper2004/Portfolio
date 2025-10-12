// simple site scripts: mobile menu, smooth scroll, reveal on scroll, contact form handler
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu toggle
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenu && navLinks) {
    function toggleMobileMenu() {
      mobileMenu.classList.toggle('open');
      navLinks.classList.toggle('show');
    }

    mobileMenu.addEventListener('click', toggleMobileMenu);
    mobileMenu.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') toggleMobileMenu();
    });

    // close when a nav link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          mobileMenu.classList.remove('open');
        }
      });
    });
  }

  // Dark/Light Mode Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
  }

  // smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', this.getAttribute('href'));
      }
    });
  });

  // reveal on scroll for elements with .reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    // fallback: show all
    reveals.forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }

  // contact form handler
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (form && formStatus) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.className = 'form-status error';
        return;
      }

      formStatus.textContent = 'Sending...';
      formStatus.className = 'form-status';
      setTimeout(() => {
        formStatus.textContent = 'Thanks — your message has been received. I will get back to you soon!';
        formStatus.className = 'form-status success';
        form.reset();
      }, 800);
    });
  }
});

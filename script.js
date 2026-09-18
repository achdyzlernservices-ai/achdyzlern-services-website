const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const form = document.getElementById('lead-form');
const formStatus = document.getElementById('form-status');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach((a) => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = 'Sending your enquiry...';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      formStatus.textContent = 'Thank you — your enquiry has been sent successfully.';
    } catch (error) {
      formStatus.textContent = 'Your enquiry could not be sent immediately. Please contact us directly on WhatsApp or email.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }

});

/* Contact form: submit in the background so the visitor stays on the page
   and gets a clear confirmation. Replaces the old mailto: behaviour, which
   silently did nothing on most mobile browsers. */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    status.textContent = form.dataset.sending;
    status.className = 'form-status is-sending';
    button.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('bad status');
      form.reset();
      status.textContent = form.dataset.success;
      status.className = 'form-status is-success';
    }).catch(function () {
      status.textContent = form.dataset.error;
      status.className = 'form-status is-error';
    }).then(function () {
      button.disabled = false;
    });
  });
});

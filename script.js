
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

  var messages = {
    es: {
      title: 'Versión en desarrollo',
      text: 'La versión completa de este sitio web está actualmente disponible en inglés. Las traducciones al español se están revisando y ampliando para garantizar la máxima precisión y claridad profesional. Algunas secciones pueden seguir apareciendo en inglés o actualizarse próximamente.',
      continueText: 'Continuar en español',
      backText: 'Volver al inglés'
    },
    sr: {
      title: 'Verzija u izradi',
      text: 'Kompletna verzija ove internet stranice trenutno je dostupna na engleskom jeziku. Srpski prevodi se trenutno pregledaju i proširuju kako bi se obezbedila maksimalna tačnost i profesionalna jasnoća. Neki delovi mogu i dalje biti prikazani na engleskom jeziku ili biti ažurirani uskoro.',
      continueText: 'Nastavi na srpskom',
      backText: 'Nazad na engleski'
    }
  };

  function showLanguageModal(lang, href) {
    var msg = messages[lang];
    if (!msg) { window.location.href = href; return; }
    var overlay = document.createElement('div');
    overlay.className = 'language-modal-overlay';
    overlay.innerHTML = '<div class="language-modal" role="dialog" aria-modal="true" aria-labelledby="language-modal-title">' +
      '<button class="language-modal-close" type="button" aria-label="Close">×</button>' +
      '<p class="eyebrow">Language</p>' +
      '<h2 id="language-modal-title">' + msg.title + '</h2>' +
      '<p>' + msg.text + '</p>' +
      '<div class="language-modal-actions"><a class="cta-beige" href="' + href + '">' + msg.continueText + '</a><button type="button" class="outline-button">' + msg.backText + '</button></div>' +
      '</div>';
    document.body.appendChild(overlay);
    function close(){ overlay.remove(); }
    overlay.querySelector('.language-modal-close').addEventListener('click', close);
    overlay.querySelector('button.outline-button').addEventListener('click', close);
    overlay.addEventListener('click', function(e){ if(e.target === overlay) close(); });
  }

  document.querySelectorAll('.language-switch a[data-lang-warning]').forEach(function(link){
    link.addEventListener('click', function(e){
      var lang = link.getAttribute('data-lang-warning');
      if (link.classList.contains('lang-active')) return;
      e.preventDefault();
      showLanguageModal(lang, link.getAttribute('href'));
    });
  });
});

/* ==========================================================================
   Bascule de langue FR / EN

   Deux fichiers jumeaux, une même fiche : cheatsheet.html (fr) et
   cheatsheet.en.html (en). Le bouton [data-locale-toggle] est un vrai lien
   vers le jumeau — clic droit, nouvel onglet et impression fonctionnent.

   Le choix est retenu dans ce navigateur, et les liens sortants du hub vers
   la fiche (index.html) sont réécrits vers la version retenue. Aucune
   redirection automatique : on ne déplace jamais le lecteur sous ses pieds.
   ========================================================================== */
(function () {
  var KEY = 'vibeiq-locale';
  var PAGES = { fr: 'cheatsheet.html', en: 'cheatsheet.en.html' };
  var LABELS = { fr: 'Français', en: 'English' };
  var OTHER = { fr: 'en', en: 'fr' };
  var TITLES = {
    fr: 'Read this cheat sheet in English.',
    en: 'Lire cette fiche en français.'
  };

  function pageLocale() {
    var l = (document.documentElement.getAttribute('lang') || 'fr').slice(0, 2);
    return l === 'en' ? 'en' : 'fr';
  }

  function preferred() {
    try {
      var v = localStorage.getItem(KEY);
      return (v === 'fr' || v === 'en') ? v : null;
    } catch (e) {
      return null;
    }
  }

  function remember(loc) {
    try { localStorage.setItem(KEY, loc); } catch (e) {}
  }

  /* Le bouton de la fiche : il pointe vers le jumeau et annonce sa cible. */
  function paintToggles() {
    var here = pageLocale();
    var there = OTHER[here];
    var els = document.querySelectorAll('[data-locale-toggle]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      el.setAttribute('href', PAGES[there]);
      el.setAttribute('hreflang', there);
      el.setAttribute('lang', there);
      el.setAttribute('title', TITLES[here]);
      el.setAttribute('aria-label', TITLES[here]);
      el.innerHTML = '<span aria-hidden="true">⇄</span> ' + LABELS[there];
    }
  }

  /* Le hub : les liens vers la fiche suivent la langue retenue. */
  function retargetHubLinks() {
    var want = preferred();
    if (!want) return;
    var links = document.querySelectorAll('a[href$="' + PAGES.fr + '"], a[href$="' + PAGES.en + '"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (links[i].hasAttribute('data-locale-toggle')) continue;
      links[i].setAttribute('href', href.replace(/cheatsheet(\.en)?\.html$/, PAGES[want]));
      links[i].setAttribute('hreflang', want);
    }
  }

  function init() {
    paintToggles();
    retargetHubLinks();
  }

  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-locale-toggle]') : null;
    if (!t) return;
    remember(OTHER[pageLocale()]); // on suit le lien : la cible devient le choix
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.VibeIQLocale = {
    current: pageLocale, preferred: preferred, remember: remember, pages: PAGES
  };
})();

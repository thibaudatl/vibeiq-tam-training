/* ==========================================================================
   Thème jour / nuit piloté par l'heure de New York

   Trois modes, dans cet ordre au clic : Auto → Jour → Nuit → Auto.
   - Auto  : nuit de 19 h à 6 h 59 à New York (America/New_York), jour sinon.
             L'heure est celle de NYC quelle que soit la timezone du lecteur,
             et le passage à l'heure d'été est géré par Intl, pas par un offset.
   - Jour / Nuit : choix explicite, retenu dans ce navigateur.

   Le script pose data-theme="light" | "dark" sur <html> avant le rendu du
   body, donc pas de flash. Il se relit chaque minute pour basculer tout seul
   au coucher du soleil sur la côte est.
   ========================================================================== */
(function () {
  var KEY = 'vibeiq-theme-mode';
  var TZ = 'America/New_York';
  var NIGHT_FROM = 19;   // 19 h ET → nuit
  var NIGHT_UNTIL = 7;   //  7 h ET → jour
  var LABELS = { auto: 'Auto', light: 'Jour', dark: 'Nuit' };
  var ICONS = { auto: '◐', light: '☀', dark: '☾' };

  var fmt = null;
  try {
    fmt = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', hour12: false });
  } catch (e) {
    fmt = null; // navigateur sans base de timezones : on retombe sur l'heure locale
  }

  function etHour() {
    if (!fmt) return new Date().getHours();
    var h = parseInt(fmt.format(new Date()), 10);
    return isNaN(h) ? new Date().getHours() : (h === 24 ? 0 : h);
  }

  function isNight() {
    var h = etHour();
    return h >= NIGHT_FROM || h < NIGHT_UNTIL;
  }

  function mode() {
    try {
      var m = localStorage.getItem(KEY);
      return (m === 'light' || m === 'dark' || m === 'auto') ? m : 'auto';
    } catch (e) {
      return 'auto';
    }
  }

  function resolved() {
    var m = mode();
    return m === 'auto' ? (isNight() ? 'dark' : 'light') : m;
  }

  function paint() {
    document.documentElement.setAttribute('data-theme', resolved());
  }

  function refreshControls() {
    var m = mode();
    var h = etHour();
    var hh = (h < 10 ? '0' : '') + h;
    var nyc = hh + ':00 NYC';
    var els = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      el.innerHTML = '<span aria-hidden="true">' + ICONS[m] + '</span> Thème : ' + LABELS[m] +
        '<span class="et">' + nyc + '</span>';
      el.setAttribute('title',
        'Thème ' + LABELS[m] + '. Il est ' + hh + ' h à New York, donc ' +
        (isNight() ? 'nuit' : 'jour') + ' en mode Auto. Cliquer pour changer.');
      el.setAttribute('aria-label', 'Thème : ' + LABELS[m] + '. Changer de thème.');
    }
  }

  function apply() {
    paint();
    refreshControls();
  }

  function cycle() {
    var order = ['auto', 'light', 'dark'];
    var next = order[(order.indexOf(mode()) + 1) % order.length];
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply();
  }

  paint(); // avant le premier rendu

  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-theme-toggle]') : null;
    if (!t) return;
    e.preventDefault();
    cycle();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  setInterval(apply, 60000); // bascule automatique à 7 h et 19 h ET

  window.VibeIQTheme = {
    apply: apply, cycle: cycle, mode: mode, resolved: resolved,
    isNight: isNight, etHour: etHour, timezone: TZ,
    nightWindow: [NIGHT_FROM, NIGHT_UNTIL]
  };
})();

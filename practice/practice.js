/* ==========================================================================
   Shared behaviour for the four practice pages.

   Deliberately small. These are documents, not an application: no routing, no
   state, no framework. Three things only —

   1. the mobile nav drawer,
   2. "Expand all" / "Collapse all" over the <details> blocks in the article,
   3. marking the current section in the sidebar as you scroll.

   Everything works with the script absent: the drawer is only needed below
   900px, <details> open on click by themselves, and the sidebar links are
   plain anchors.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Mobile nav drawer ------------------------------------------------ */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest && t.closest('[data-nav-toggle]')) {
      document.body.classList.toggle('nav-open');
      return;
    }
    if (t.classList && t.classList.contains('scrim')) {
      document.body.classList.remove('nav-open');
      return;
    }
    // Following a link inside the drawer should close it.
    if (t.closest && t.closest('.sidebar a')) {
      document.body.classList.remove('nav-open');
    }
  });

  /* ---- Expand / collapse all -------------------------------------------
     One button per page, placed under the agenda. It toggles every <details>
     inside <main>, so the sidebar and the drawer are never affected. The
     label follows the state rather than the click count, which keeps it
     honest after the reader has opened blocks by hand. */
  var btn = document.querySelector('[data-expand-all]');
  if (btn) {
    var scope = document.querySelector('.col') || document;
    var all = function () { return scope.querySelectorAll('details'); };
    var sync = function () {
      var d = all(), open = 0, i;
      for (i = 0; i < d.length; i++) { if (d[i].open) open++; }
      btn.textContent = (open === d.length && d.length)
        ? 'Collapse all sections'
        : 'Expand all sections';
      btn.setAttribute('aria-expanded', open === d.length && d.length ? 'true' : 'false');
    };
    btn.addEventListener('click', function () {
      var d = all(), i;
      var opening = btn.getAttribute('aria-expanded') !== 'true';
      for (i = 0; i < d.length; i++) { d[i].open = opening; }
      sync();
    });
    scope.addEventListener('toggle', sync, true);
    sync();
  }

  /* ---- Current section in the sidebar -----------------------------------
     Cheap and approximate on purpose: the heading nearest the top of the
     viewport wins. No IntersectionObserver, no polyfill, no layout thrash
     beyond one getBoundingClientRect per heading per scroll frame. */
  var links = [].slice.call(document.querySelectorAll('.sub a[href^="#"]'));
  if (links.length) {
    var targets = links.map(function (a) {
      return { a: a, el: document.getElementById(a.getAttribute('href').slice(1)) };
    }).filter(function (t) { return t.el; });

    var ticking = false;
    var mark = function () {
      ticking = false;
      var best = null;
      for (var i = 0; i < targets.length; i++) {
        var top = targets[i].el.getBoundingClientRect().top;
        if (top - 90 <= 0) best = targets[i];
      }
      for (var j = 0; j < targets.length; j++) {
        targets[j].a.classList.toggle('here', best === targets[j]);
      }
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(mark); }
    }, { passive: true });
    mark();
  }
})();

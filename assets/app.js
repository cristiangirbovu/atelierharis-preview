// Atelier Haris: meniul, filtrele catalogului, fereastra de comandă și formularele.
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Meniul pe ecrane înguste
  var burger = $('.burger'), meniu = $('#meniu');
  if (burger && meniu) {
    burger.addEventListener('click', function () {
      var d = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', d);
      burger.setAttribute('aria-label', d ? 'Închide meniul' : 'Deschide meniul');
      meniu.classList.toggle('deschis', d);
    });
  }

  // Catalogul: filtre pe direcție, categorie și tip; starea stă în adresă (?directie=&categorie=&tip=)
  var filtre = $('[data-filtre]'), grila = $('[data-catalog]');
  if (filtre && grila) {
    var carduri = $$('.card-produs', grila), nr = $('[data-nr]'), gol = $('[data-gol]');
    var q = new URLSearchParams(location.search);
    var stare = { directie: q.get('directie') || '', categorie: q.get('categorie') || '', tip: q.get('tip') || '' };
    var aplica = function (scrieAdresa) {
      $$('.filtru-sub', filtre).forEach(function (g) { g.hidden = g.getAttribute('data-pentru') !== stare.directie; });
      $$('.pastila', filtre).forEach(function (b) {
        var f = b.getAttribute('data-f'), vizibil = !b.closest('.filtru-sub') || b.closest('.filtru-sub').getAttribute('data-pentru') === stare.directie;
        b.setAttribute('aria-pressed', vizibil && stare[f] === b.getAttribute('data-v') ? 'true' : 'false');
      });
      var n = 0;
      carduri.forEach(function (c) {
        var ok = (!stare.directie || c.dataset.directie === stare.directie) && (!stare.categorie || c.dataset.categorie === stare.categorie) && (!stare.tip || c.dataset.tip === stare.tip);
        c.hidden = !ok; if (ok) n++;
      });
      if (nr) nr.textContent = n;
      if (gol) gol.hidden = n > 0;
      if (scrieAdresa) {
        var p = new URLSearchParams();
        Object.keys(stare).forEach(function (k) { if (stare[k]) p.set(k, stare[k]); });
        history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
      }
    };
    filtre.addEventListener('click', function (e) {
      var b = e.target.closest('.pastila'); if (!b) return;
      var f = b.getAttribute('data-f'), v = b.getAttribute('data-v');
      stare[f] = v;
      if (f === 'directie') { stare.categorie = ''; stare.tip = ''; }
      aplica(true);
    });
    aplica(false);
  }

  // Pagina de produs: opțiunile alese ajung în mesajul de WhatsApp și în rezumatul comenzii
  var optiuni = $('[data-optiuni]'), wa = $('[data-wa]'), rezumat = $('[data-rezumat]');
  var textOptiuni = function () {
    if (!optiuni) return '';
    return $$('select', optiuni).map(function (s) { return s.labels[0].textContent + ': ' + s.value; }).join(', ');
  };
  var actualizeaza = function () {
    var t = textOptiuni();
    if (wa) {
      var href = wa.getAttribute('href').split('?')[0];
      wa.setAttribute('href', href + '?text=' + encodeURIComponent(wa.getAttribute('data-wa') + (t ? ' ' + t + '.' : '')));
    }
    if (rezumat) rezumat.textContent = t;
  };
  if (optiuni) { optiuni.addEventListener('change', actualizeaza); actualizeaza(); }

  // Fereastra de comandă
  $$('[data-deschide]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = document.getElementById(b.getAttribute('data-deschide'));
      if (!d) return;
      actualizeaza();
      var cant = $('#c-cant', d); if (cant && !cant.value) cant.value = 1;
      if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    });
  });
  $$('dialog').forEach(function (d) {
    $$('[data-inchide]', d).forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });

  // Formularele: validare în pagină; trimiterea efectivă se leagă la lansare (endpoint-ul serverului)
  $$('form[data-formular]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var primul = null;
      $$('.mesaj-eroare', f).forEach(function (m) { m.remove(); });
      $$('input, select, textarea', f).forEach(function (el) {
        el.classList.remove('eroare');
        if (el.type === 'hidden' || el.checkValidity()) return;
        el.classList.add('eroare');
        var m = document.createElement('span'); m.className = 'mesaj-eroare';
        m.textContent = el.type === 'checkbox' ? 'Bifați pentru a continua.' : el.validity.typeMismatch ? 'Verificați formatul.' : 'Completați acest câmp.';
        (el.type === 'checkbox' ? el.parentNode : el.parentNode).appendChild(m);
        if (!primul) primul = el;
      });
      if (primul) { primul.focus(); return; }
      var date = new FormData(f);
      if (optiuni && f.dataset.formular === 'comanda') date.append('optiuni', textOptiuni());
      var endpoint = f.getAttribute('action');
      var gata = function () { f.classList.add('trimis'); var ok = $('.form-ok', f); ok.hidden = false; ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (!endpoint) { gata(); return; }
      fetch(endpoint, { method: 'POST', body: date }).then(function (r) { if (!r.ok) throw new Error(r.status); gata(); }).catch(function () {
        alert('Cererea nu a putut fi trimisă. Vă rugăm să ne sunați sau să ne scrieți pe WhatsApp.');
      });
    });
  });
})();

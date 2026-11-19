// Atelier Haris: meniul, antetul, aparițiile la derulare, catalogul, galeria, comanda și formularele.
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var linistit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cuHover = window.matchMedia('(hover: hover)').matches;

  // ---------- Meniul pe ecrane înguste
  var burger = $('.burger'), meniu = $('#meniu');
  if (burger && meniu) {
    burger.addEventListener('click', function () {
      var d = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', d);
      burger.setAttribute('aria-label', d ? 'Închide meniul' : 'Deschide meniul');
      meniu.classList.toggle('deschis', d);
    });
  }

  // ---------- Antetul (micșorat după derulare, ascuns la coborâre), butonul WhatsApp, fotografia de deschidere
  var antet = $('.antet'), wa = $('.wa-plutitor'), filtreSus = $('.filtre'), erouFoto = $('.erou-foto');
  var ultimY = window.scrollY, programat = false;
  var laDerulare = function () {
    programat = false;
    var y = window.scrollY, jos = y > ultimY;
    if (antet) {
      antet.classList.toggle('derulat', y > 12);
      var ascunde = jos && y > 420 && !(meniu && meniu.classList.contains('deschis'));
      if (Math.abs(y - ultimY) > 4) antet.classList.toggle('ascuns', ascunde);
      if (filtreSus) filtreSus.classList.toggle('sus', antet.classList.contains('ascuns'));
    }
    if (wa) wa.classList.toggle('vizibil', y > window.innerHeight * 0.4);
    if (erouFoto && !linistit && cuHover && y < window.innerHeight * 1.2) erouFoto.style.transform = 'translate3d(0,' + (y * 0.06).toFixed(1) + 'px,0)';
    ultimY = y;
  };
  window.addEventListener('scroll', function () { if (!programat) { programat = true; requestAnimationFrame(laDerulare); } }, { passive: true });
  laDerulare();

  // ---------- Aparițiile la derulare (fără conținut lung de citit)
  var SEL = '.cap-sectiune, .card-directie, .grila-produse > .card-produs, .pasi li, .puncte li, .sectiune .doua > *, .banda-in > *, .lista-articole li, .galerie-atelier > *, .contact-card, .sectiune-centru .wrap > *, .subsol-grila > *';
  var tinte = $$(SEL).filter(function (el) { return !el.closest('.erou'); });
  tinte.forEach(function (el) {
    var frati = Array.prototype.filter.call(el.parentNode.children, function (x) { return tinte.indexOf(x) > -1; });
    el.style.setProperty('--i', Math.min(frati.indexOf(el), 6));
    el.classList.add('rv');
  });
  if ('IntersectionObserver' in window && !linistit) {
    var io = new IntersectionObserver(function (intrari) {
      intrari.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    tinte.forEach(function (el) { io.observe(el); });
  } else {
    tinte.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- Catalogul: filtre pe direcție, categorie și tip; starea stă în adresă
  var filtre = $('[data-filtre]'), grila = $('[data-catalog]');
  if (filtre && grila) {
    var carduri = $$('.card-produs', grila), nr = $('[data-nr]'), gol = $('[data-gol]');
    var q = new URLSearchParams(location.search);
    var stare = { directie: q.get('directie') || '', categorie: q.get('categorie') || '', tip: q.get('tip') || '' };
    var aplica = function (interactiv) {
      $$('.filtru-sub', filtre).forEach(function (g) { g.hidden = g.getAttribute('data-pentru') !== stare.directie; });
      $$('.pastila', filtre).forEach(function (b) {
        var f = b.getAttribute('data-f'), sub = b.closest('.filtru-sub'), vizibil = !sub || sub.getAttribute('data-pentru') === stare.directie;
        b.setAttribute('aria-pressed', vizibil && stare[f] === b.getAttribute('data-v') ? 'true' : 'false');
      });
      var n = 0;
      carduri.forEach(function (c) {
        var ok = (!stare.directie || c.dataset.directie === stare.directie) && (!stare.categorie || c.dataset.categorie === stare.categorie) && (!stare.tip || c.dataset.tip === stare.tip);
        c.hidden = !ok;
        c.classList.remove('reapare');
        if (ok) {
          if (interactiv && !linistit) { c.style.setProperty('--i', Math.min(n, 10)); void c.offsetWidth; c.classList.add('reapare', 'in'); }
          n++;
        }
      });
      if (nr) nr.textContent = n;
      if (gol) gol.hidden = n > 0;
      if (interactiv) {
        var p = new URLSearchParams();
        Object.keys(stare).forEach(function (k) { if (stare[k]) p.set(k, stare[k]); });
        history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
        var sus = grila.getBoundingClientRect().top + window.scrollY - 180;
        if (window.scrollY > sus) window.scrollTo({ top: sus, behavior: linistit ? 'auto' : 'smooth' });
      }
    };
    filtre.addEventListener('click', function (e) {
      var b = e.target.closest('.pastila'); if (!b) return;
      var f = b.getAttribute('data-f'), v = b.getAttribute('data-v');
      if (stare[f] === v && f !== 'directie') return;
      stare[f] = v;
      if (f === 'directie') { stare.categorie = ''; stare.tip = ''; }
      aplica(true);
    });
    aplica(false);
  }

  // ---------- Galeria produsului: miniaturile schimbă imaginea mare; zoom la trecerea cu mouse-ul
  var mare = $('[data-galerie]');
  if (mare) {
    var mici = $$('.galerie-mic');
    mici.forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.getAttribute('aria-current') === 'true') return;
        mici.forEach(function (x) { x.removeAttribute('aria-current'); });
        b.setAttribute('aria-current', 'true');
        var nou = b.querySelector('.foto').cloneNode(true);
        var img = nou.querySelector('img'); if (img) { img.removeAttribute('loading'); }
        mare.classList.add('schimba');
        setTimeout(function () {
          mare.innerHTML = ''; mare.appendChild(nou);
          requestAnimationFrame(function () { mare.classList.remove('schimba'); });
        }, linistit ? 0 : 220);
      });
    });
    if (cuHover) {
      mare.addEventListener('mousemove', function (e) {
        if (!mare.querySelector('.foto-img')) return;
        var r = mare.getBoundingClientRect();
        mare.style.setProperty('--zx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        mare.style.setProperty('--zy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
        mare.classList.add('zoom');
      });
      mare.addEventListener('mouseleave', function () { mare.classList.remove('zoom'); });
    }
  }

  // ---------- Opțiunile produsului: valoarea aleasă ajunge în titlu, în mesajul de WhatsApp și în rezumatul comenzii
  var optiuni = $('[data-optiuni]'), waProdus = $('[data-wa]'), rezumat = $('[data-rezumat]');
  var textOptiuni = function () {
    if (!optiuni) return '';
    return $$('.alegere', optiuni).map(function (g) {
      var ales = g.querySelector('input:checked');
      return g.querySelector('legend').firstChild.textContent.replace(':', '').trim() + ': ' + (ales ? ales.value : '');
    }).join(', ');
  };
  var actualizeaza = function () {
    if (optiuni) $$('.alegere', optiuni).forEach(function (g) { var a = g.querySelector('input:checked'); var v = g.querySelector('[data-val]'); if (a && v) v.textContent = a.value; });
    var t = textOptiuni();
    if (waProdus) {
      var href = waProdus.getAttribute('href').split('?')[0];
      waProdus.setAttribute('href', href + '?text=' + encodeURIComponent(waProdus.getAttribute('data-wa') + (t ? ' ' + t + '.' : '')));
    }
    if (rezumat) rezumat.textContent = t;
  };
  if (optiuni) { optiuni.addEventListener('change', actualizeaza); actualizeaza(); }

  // ---------- Bara de comandă pe telefon: apare după ce butoanele principale ies din ecran
  var bara = $('[data-bara]'), actiuniProdus = $('.actiuni-produs');
  if (bara && actiuniProdus && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      var arata = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
      bara.classList.toggle('vizibila', arata);
      bara.setAttribute('aria-hidden', arata ? 'false' : 'true');
      var bb = bara.querySelector('button'); if (bb) bb.tabIndex = arata ? 0 : -1;
      if (wa) wa.classList.toggle('ridicat', arata && getComputedStyle(bara).display !== 'none');
    }).observe(actiuniProdus);
  }

  // ---------- Fereastra de comandă
  var inchide = function (d) {
    if (linistit) { d.close(); return; }
    d.classList.add('iese');
    setTimeout(function () { d.classList.remove('iese'); d.close(); }, 240);
  };
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
    $$('[data-inchide]', d).forEach(function (b) { b.addEventListener('click', function () { inchide(d); }); });
    d.addEventListener('click', function (e) { if (e.target === d) inchide(d); });
    d.addEventListener('cancel', function (e) { e.preventDefault(); inchide(d); });
  });

  // ---------- Formularele: validare în pagină; trimiterea efectivă se leagă la lansare (atributul action)
  $$('form[data-formular]').forEach(function (f) {
    $$('input, select, textarea', f).forEach(function (el) {
      el.addEventListener('input', function () {
        if (!el.classList.contains('eroare') || !el.checkValidity()) return;
        el.classList.remove('eroare');
        var m = el.parentNode.querySelector('.mesaj-eroare'); if (m) m.remove();
      });
    });
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
        el.parentNode.appendChild(m);
        if (!primul) primul = el;
      });
      if (primul) { primul.focus(); return; }
      var date = new FormData(f);
      if (optiuni && f.dataset.formular === 'comanda') date.append('optiuni', textOptiuni());
      var endpoint = f.getAttribute('action');
      var gata = function () { f.classList.add('trimis'); var ok = $('.form-ok', f); ok.hidden = false; ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (!endpoint) { gata(); return; }
      fetch(endpoint, { method: 'POST', body: date }).then(function (r) { if (!r.ok) throw new Error(r.status); gata(); }).catch(function () {
        var m = document.createElement('p'); m.className = 'mesaj-eroare'; m.textContent = 'Cererea nu a putut fi trimisă. Vă rugăm să ne sunați sau să ne scrieți pe WhatsApp.'; f.appendChild(m);
      });
    });
  });
})();

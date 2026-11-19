// Generatorul site-ului Atelier Haris: node src/build.js [--prod]
// Scrie toate paginile din src/content.js și src/legal.js, plus 404.html, robots.txt și sitemap.xml.
const fs = require('fs');
const path = require('path');
const { SITE, LIVRARE, DIRECTII, PRODUSE, NAV, ACASA, ATELIER, CONTACT } = require('./content.js');
const { LEGAL } = require('./legal.js');

const PROD = process.argv.includes('--prod');
const ROOT = path.join(__dirname, '..');
const SITE_URL = PROD ? SITE.domeniu : 'https://cristiangirbovu.github.io/atelierharis-preview';
const AN = new Date().getFullYear();
const AZI = new Date().toISOString().slice(0, 10);
const VER = Date.now().toString(36).slice(-6);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const lei = (n) => `${n.toLocaleString('ro-RO')} lei`;
const link = (rel, slug) => (slug ? `${rel}${slug}/` : rel);
const abs = (slug) => `${SITE_URL}/${slug ? slug + '/' : ''}`;
const dir = (id) => DIRECTII.find((d) => d.id === id);
const catNume = (p) => { const d = dir(p.directie); const c = d.categorii.find((x) => x.id === p.categorie); return c ? c.nume : ''; };
const tipNume = (p) => { const d = dir(p.directie); const t = d.tipuri.find((x) => x.id === p.tip); return t ? t.nume : ''; };
const prodSlug = (p) => `catalog/${p.slug}`;
// Sloturile de fotografie ale unui produs, pe direcție (marcajele locurilor goale)
const SLOTURI = {
  traditional: [
    { t: 'Poză produs', d: 'Produsul întreg, pe fundal alb, din față' },
    { t: 'Poză detaliu', d: 'Broderia de aproape, se vede firul' },
    { t: 'Poză purtat', d: 'Pe o persoană, încadrare de la umeri în jos' },
    { t: 'Poză spate', d: 'Produsul întreg, din spate' },
  ],
  liturgic: [
    { t: 'Poză produs', d: 'Piesa întreagă, pe fundal alb' },
    { t: 'Poză detaliu', d: 'Firul auriu de aproape' },
    { t: 'Poză în context', d: 'În biserică sau pe Sfânta Masă' },
    { t: 'Poză chenar', d: 'Chenarul sau ciucurii, de aproape' },
  ],
};
// Fotografiile produsului se preiau singure din assets/img/site/<slug>-<n>-1200.jpg (pregătite cu tools/imagini-produs.js)
const imgProdus = (p, i) => (fs.existsSync(path.join(ROOT, `assets/img/site/${p.slug}-${i + 1}-1200.jpg`)) ? { src: `${p.slug}-${i + 1}-1200.jpg`, mic: `${p.slug}-${i + 1}-600.jpg`, w: 1200, h: 1500 } : null);

// ---------- Pictograme
const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
const icWa = (s = 20) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${WA_PATH}"/></svg>`;
const icTel = (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M6.6 3.5h-2a1.5 1.5 0 0 0-1.5 1.6c.6 8.2 7.6 15.2 15.8 15.8a1.5 1.5 0 0 0 1.6-1.5v-2.1a1 1 0 0 0-.7-1l-3.3-1.1a1 1 0 0 0-1.1.3l-1.3 1.6a12.4 12.4 0 0 1-5.6-5.6l1.6-1.3a1 1 0 0 0 .3-1.1L8.3 4.2a1 1 0 0 0-1-.7Z"/></svg>`;
const icMail = (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5.5" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m3.8 6.5 8.2 6.4 8.2-6.4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
const romb = '<span class="romb" aria-hidden="true"></span>';
const fir = `<div class="fir" aria-hidden="true"><span></span>${romb}<span></span></div>`;

const waHref = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const WA_GENERAL = waHref('Bună ziua, aș dori informații despre o lucrare brodată.');

// ---------- Fotografiile și locurile de fotografie
// tonul: ivoar / piatra / grena; raportul: '4/5', '1/1', '3/2', '16/9'
// m = marcajul locului gol { t: tipul pozei, d: ce/cine apare }; se afișează doar pe preview, niciodată cu --prod
// img = { src, w, h } (cale relativă la assets/img/site/) când există fotografia
const MARCAJE = !PROD;
const foto = (alt, { r = '4/5', ton = 'ivoar', cls = '', m = null, img = null, rel = '', eager = false } = {}) => {
  if (img) return `<div class="foto foto-img ${cls}" style="aspect-ratio:${r}"><img src="${rel}assets/img/site/${img.src}"${img.mic ? ` srcset="${rel}assets/img/site/${img.mic} 600w, ${rel}assets/img/site/${img.src} 1200w" sizes="(min-width: 900px) 50vw, 100vw"` : ""} alt="${esc(alt)}" width="${img.w}" height="${img.h}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></div>`;
  const marcaj = MARCAJE && m ? `<span class="marcaj"><span class="marcaj-t">${esc(m.t)}</span>${m.d ? `<span class="marcaj-d">${esc(m.d)}</span>` : ''}</span>` : '';
  return `<div class="foto foto-${ton}${marcaj ? ' foto-marcat' : ''} ${cls}" style="aspect-ratio:${r}" role="img" aria-label="${esc(alt)}">${marcaj}</div>`;
};

// ---------- Date structurate
const jsonld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const ORG = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${SITE_URL}/#atelier`,
  name: SITE.nume, slogan: SITE.slogan, url: `${SITE_URL}/`, telephone: SITE.telefonTel, email: SITE.email,
  logo: `${SITE_URL}/assets/img/haris-logo-pos.svg`,
  address: { '@type': 'PostalAddress', addressLocality: SITE.oras, addressCountry: 'RO' },
  areaServed: 'RO', priceRange: '180 - 4.800 lei',
};
const crumbsLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.nume, item: c.url })) });

// ---------- Cadrul paginii
function head(page, rel, ld) {
  const url = page.slug === '404.html' ? `${SITE_URL}/404.html` : abs(page.slug);
  return `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${PROD && !page.noindex ? '' : '<meta name="robots" content="noindex, nofollow">\n'}<link rel="canonical" href="${url}">
<meta property="og:type" content="${page.tipOg || 'website'}">
<meta property="og:locale" content="ro_RO">
<meta property="og:site_name" content="${SITE.nume}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#6B1D2A">
<link rel="icon" href="${rel}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${rel}assets/fonts/cormorant-garamond-500-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${rel}assets/fonts/lato-400-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${rel}assets/style.css?v=${VER}">
${[ORG, ...(ld || [])].map(jsonld).join('\n')}
</head>`;
}

function antet(rel, activ) {
  const nav = NAV.map((n) => `<a href="${link(rel, n.slug)}"${activ === n.slug ? ' aria-current="page"' : ''}>${n.nume}</a>`).join('');
  return `<header class="antet">
  <div class="wrap antet-in">
    <a class="marca" href="${rel}" aria-label="Atelier Haris, prima pagină">
      <img class="marca-simbol" src="${rel}assets/img/haris-simbol-pos.svg" alt="" width="59" height="48">
      <img class="marca-nume" src="${rel}assets/img/haris-nume-pos.svg" alt="Atelier Haris" width="118" height="48">
    </a>
    <nav class="meniu" id="meniu" aria-label="Meniul principal">${nav}</nav>
    <a class="btn btn-mic antet-cta" href="${link(rel, 'contact')}">Cerere de ofertă</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="meniu" aria-label="Deschide meniul"><span></span><span></span></button>
  </div>
</header>`;
}

function subsol(rel) {
  const col = (t, items) => `<div class="subsol-col"><p class="subsol-t">${t}</p><ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  return `<footer class="subsol">
  <div class="wrap">
    <div class="subsol-grila">
      <div class="subsol-marca">
        <img src="${rel}assets/img/haris-logo-neg.svg" alt="Atelier Haris" width="110" height="129">
        <p>${SITE.slogan}</p>
      </div>
      ${col('Atelierul', DIRECTII.map((d) => `<a href="${link(rel, d.slug)}">${d.nume}</a>`).concat([`<a href="${link(rel, 'catalog')}">Catalog</a>`, `<a href="${link(rel, 'atelierul')}">Despre atelier</a>`]))}
      ${col('Contact', [`<a href="tel:${SITE.telefonTel}">${SITE.telefon}</a>`, `<a href="${WA_GENERAL}" rel="noopener">WhatsApp</a>`, `<a href="mailto:${SITE.email}">${SITE.email}</a>`, `${SITE.oras}, ${SITE.program.toLowerCase()}`])}
      ${col('Informații', [`<a href="${link(rel, 'termeni-si-conditii')}">Termeni și condiții</a>`, `<a href="${link(rel, 'politica-de-confidentialitate')}">Politica de confidențialitate</a>`, `<a href="${link(rel, 'politica-cookie-uri')}">Politica de cookie-uri</a>`, '<a href="https://anpc.ro/" rel="noopener">ANPC</a>', '<a href="https://consumer-redress.ec.europa.eu/" rel="noopener">Soluționarea online a litigiilor</a>'])}
    </div>
    <div class="subsol-jos">
      <p>© ${AN} ${SITE.nume}. ${SITE.firma.denumire}, CUI ${SITE.firma.cui}, ${SITE.firma.reg}.</p>
      <p>Livrăm în toată țara și în străinătate.</p>
    </div>
  </div>
</footer>
<a class="wa-plutitor" href="${WA_GENERAL}" rel="noopener" aria-label="Scrieți-ne pe WhatsApp">${icWa(26)}</a>`;
}

function pagina(page, corp, { rel = '../', activ = '', ld = [] } = {}) {
  return `${head(page, rel, ld)}
<body>
<a class="sari" href="#continut">Sari la conținut</a>
<div class="cq">
${antet(rel, activ)}
<main id="continut">
${corp}
</main>
${subsol(rel)}
</div>
<script src="${rel}assets/app.js?v=${VER}" defer></script>
</body>
</html>
`;
}

function scrie(slug, html) {
  const f = slug === '' ? path.join(ROOT, 'index.html') : slug.endsWith('.html') ? path.join(ROOT, slug) : path.join(ROOT, slug, 'index.html');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
  PAGINI.push(slug);
}
const PAGINI = [];

// ---------- Componente
const firimituri = (rel, items) => `<nav class="firimituri" aria-label="Unde vă aflați"><ol>${items.map((c, i) => (i === items.length - 1 ? `<li aria-current="page">${esc(c.nume)}</li>` : `<li><a href="${c.href}">${esc(c.nume)}</a></li>`)).join('')}</ol></nav>`;

const cardProdus = (rel, p) => `<article class="card-produs" data-directie="${p.directie}" data-categorie="${p.categorie}" data-tip="${p.tip || ''}">
  <a href="${link(rel, prodSlug(p))}">
    <div class="card-media">${foto(p.nume, { r: '4/5', ton: p.directie === 'liturgic' ? 'piatra' : 'ivoar', m: { t: 'Poză produs', d: 'Fundal alb, din față' }, img: imgProdus(p, 0), rel })}${imgProdus(p, 2) ? foto(`${p.nume}, purtat`, { r: '4/5', img: imgProdus(p, 2), rel, cls: 'foto-hover' }) : ''}<span class="card-vezi" aria-hidden="true">Vedeți modelul</span></div>
    <p class="card-cat">${esc(catNume(p))}</p>
    <h3>${esc(p.nume)}</h3>
    <p class="card-pret">${lei(p.pret)}</p>
  </a>
</article>`;

const blocPasi = (pasi, titlu = 'Cum comandați') => `<section class="sectiune">
  <div class="wrap">
    <h2>${titlu}</h2>
    <ol class="pasi">${pasi.map((p, i) => `<li><span class="pas-nr">${String(i + 1).padStart(2, '0')}</span><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></li>`).join('')}</ol>
  </div>
</section>`;

const blocPuncte = (puncte) => `<ul class="puncte">${puncte.map((p) => `<li>${romb}<h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></li>`).join('')}</ul>`;

const bandaFinala = (rel, titlu = 'Aveți un model în minte?', text = 'Trimiteți-ne o fotografie sau o descriere. Vă spunem cum îl putem broda, cât costă și când este gata.') => `<section class="banda">
  <div class="wrap banda-in">
    <div>
      <h2>${esc(titlu)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="actiuni">
      <a class="btn btn-ivoar" href="${link(rel, 'contact')}">Cerere de ofertă</a>
      <a class="btn btn-contur-ivoar" href="${WA_GENERAL}" rel="noopener">${icWa(18)} WhatsApp</a>
    </div>
  </div>
</section>`;

const PASI_COMANDA = ACASA.pasi;

// ---------- Formulare
const camp = (id, label, { type = 'text', req = false, auto = '', ph = '', full = false } = {}) => `<div class="camp${full ? ' camp-lat' : ''}"><label for="${id}">${label}${req ? '' : ' <span class="opt">(opțional)</span>'}</label><input id="${id}" name="${id}" type="${type}"${req ? ' required' : ''}${auto ? ` autocomplete="${auto}"` : ''}${ph ? ` placeholder="${esc(ph)}"` : ''}></div>`;
const zona = (id, label, { req = false, ph = '' } = {}) => `<div class="camp camp-lat"><label for="${id}">${label}${req ? '' : ' <span class="opt">(opțional)</span>'}</label><textarea id="${id}" name="${id}" rows="4"${req ? ' required' : ''}${ph ? ` placeholder="${esc(ph)}"` : ''}></textarea></div>`;
const selectie = (id, label, optiuni, { req = true } = {}) => `<div class="camp"><label for="${id}">${label}</label><select id="${id}" name="${id}"${req ? ' required' : ''}>${optiuni.map((o) => `<option>${esc(o)}</option>`).join('')}</select></div>`;
const acord = (rel, id) => `<div class="camp camp-lat camp-acord"><input id="${id}" name="${id}" type="checkbox" required><label for="${id}">Am citit <a href="${link(rel, 'termeni-si-conditii')}">termenii și condițiile</a> și <a href="${link(rel, 'politica-de-confidentialitate')}">politica de confidențialitate</a>.</label></div>`;
const CULORI = { 'Grena': '#6B1D2A', 'Auriu': '#B8955A', 'Verde': '#2F4A3A', 'Albastru': '#26405F', 'Roșu': '#A3262E', 'Negru': '#2B1519', 'Negru cu roșu': 'linear-gradient(135deg,#2B1519 50%,#A3262E 50%)', 'Auriu pe grena': 'linear-gradient(135deg,#B8955A 50%,#6B1D2A 50%)', 'Auriu pe alb': 'linear-gradient(135deg,#B8955A 50%,#FBF8F3 50%)', 'Auriu pe albastru': 'linear-gradient(135deg,#B8955A 50%,#26405F 50%)', 'Argintiu pe albastru': 'linear-gradient(135deg,#BFC3C7 50%,#26405F 50%)' };
const alegere = (id, label, optiuni, { mostre = false } = {}) => `<fieldset class="alegere" data-alegere="${id}"><legend>${label}: <span class="alegere-val" data-val>${esc(optiuni[0])}</span></legend><div class="alegere-opt">${optiuni.map((o, i) => `<label class="pastila-opt${mostre ? ' cu-mostra' : ''}"><input type="radio" name="${id}" value="${esc(o)}"${i === 0 ? ' checked' : ''}>${mostre ? `<span class="mostra" style="background:${CULORI[o] || '#D9CFBF'}"></span>` : ''}<span>${esc(o)}</span></label>`).join('')}</div></fieldset>`;
const multumire = (text) => `<div class="form-ok" role="status" hidden><p class="form-ok-t">Vă mulțumim!</p><p>${text}</p></div>`;

// ---------- Prima pagină
function acasa() {
  const rel = '';
  const vedete = PRODUSE.filter((p) => p.vedeta).slice(0, 4);
  const corp = `
<section class="erou">
  <div class="wrap erou-in">
    <div class="erou-text">
      <p class="eticheta">Atelier de broderie, ${SITE.oras}</p>
      <h1 class="titlu-mare">${ACASA.h1.split(' ').map((w, i) => `<span class="cuv"><span style="--i:${i}">${esc(w)}</span></span>`).join(' ')}</h1>
      <span class="cusatura" aria-hidden="true"></span>
      <p class="lead">${esc(ACASA.sub)}</p>
      <div class="actiuni">
        <a class="btn" href="${link(rel, 'catalog')}">Vedeți catalogul</a>
        <a class="btn btn-contur" href="${link(rel, 'contact')}">Cerere de ofertă</a>
      </div>
      <ul class="erou-fapte">
        <li>Prețuri afișate</li>
        <li>Gata în ${SITE.termen}</li>
        <li>Livrare în toată țara</li>
      </ul>
    </div>
    <div class="erou-foto">
      ${foto('Detaliu de broderie cu romburi, lucrat în fir grena și auriu', { r: '4/5', ton: 'piatra', m: { t: 'Poză de deschidere', d: 'Broderie de aproape, lumină naturală, fără persoane' }, img: ACASA.erouImg, rel, eager: true })}
    </div>
  </div>
</section>

<section class="sectiune">
  <div class="wrap">
    <div class="cap-sectiune">
      <h2>Trei feluri de a broda</h2>
      <p>Aceeași grijă pentru fir, pentru haina de purtat, pentru altar și pentru numele firmei dumneavoastră.</p>
    </div>
    <div class="directii">
      ${DIRECTII.map((d, i) => `<a class="card-directie" href="${link(rel, d.slug)}">
        <div class="card-directie-media">${foto(d.nume, { r: '4/5', ton: ['ivoar', 'grena', 'piatra'][i], m: d.marcaj, img: d.img, rel })}</div>
        <h3>${d.nume}</h3>
        <p>${esc(d.scurt)}</p>
        <span class="legatura">Descoperiți</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="sectiune sectiune-ivoar">
  <div class="wrap">
    <div class="cap-sectiune cap-rand">
      <h2>Din catalog</h2>
      <a class="legatura" href="${link(rel, 'catalog')}">Tot catalogul</a>
    </div>
    <div class="grila-produse">${vedete.map((p) => cardProdus(rel, p)).join('')}</div>
  </div>
</section>

${blocPasi(PASI_COMANDA)}

<section class="sectiune sectiune-ivoar">
  <div class="wrap doua">
    <div>${foto('Doamna Gina, la masa de lucru din atelier', { r: '4/5', ton: 'piatra', m: { t: 'Portret', d: 'Doamna Gina la masa de lucru, lumină naturală' } })}</div>
    <div class="doua-text">
      <h2>${ACASA.atelier.t}</h2>
      <p>${esc(ACASA.atelier.d)}</p>
      <p>${esc(ATELIER.lead)}</p>
      <a class="legatura" href="${link(rel, 'atelierul')}">Despre atelier</a>
    </div>
  </div>
</section>

${bandaFinala(rel)}`;
  scrie('', pagina({ slug: '', title: ACASA.title, description: ACASA.description }, corp, { rel, activ: '' }));
}

// ---------- Paginile direcțiilor
function paginaDirectie(d) {
  const rel = '../';
  const produse = PRODUSE.filter((p) => p.directie === d.id);
  const crumbs = [{ nume: 'Acasă', href: rel, url: abs('') }, { nume: d.nume, url: abs(d.slug) }];
  let corp = `
<section class="cap-pagina">
  <div class="wrap">
    ${firimituri(rel, crumbs)}
    <div class="doua doua-cap">
      <div class="doua-text">
        <h1>${esc(d.h1)}</h1>
        <p class="lead">${esc(d.intro)}</p>
        <div class="actiuni">
          ${d.id === 'firme' ? `<a class="btn" href="#oferta">Cereți o ofertă</a>` : `<a class="btn" href="${link(rel, 'catalog')}?directie=${d.id}">Vedeți modelele</a>`}
          <a class="btn btn-contur" href="${waHref(`Bună ziua, aș dori informații despre ${d.nume.toLowerCase()}.`)}" rel="noopener">${icWa(18)} WhatsApp</a>
        </div>
      </div>
      <div>${foto(d.nume, { r: '4/5', ton: d.id === 'liturgic' ? 'grena' : 'piatra', m: d.marcaj, img: d.img, rel, eager: true })}</div>
    </div>
  </div>
</section>

<section class="sectiune">
  <div class="wrap">${blocPuncte(d.puncte)}</div>
</section>`;

  if (d.id === 'firme') {
    corp += `
<section class="sectiune sectiune-ivoar">
  <div class="wrap doua">
    <div class="doua-text">
      <h2>Ce brodăm</h2>
      <p>Lucrăm pe articolele aduse de dumneavoastră sau pe articole procurate de noi, la alegere.</p>
    </div>
    <ul class="lista-articole">${d.articole.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
  </div>
</section>

${blocPasi(d.pasi, 'Cum lucrăm')}

<section class="sectiune sectiune-ivoar" id="oferta">
  <div class="wrap doua">
    <div class="doua-text">
      <h2>Cerere de ofertă pentru firme</h2>
      <p>Completați câteva detalii și atașați logoul. Vă trimitem prețul pe bucată și termenul de execuție în aceeași zi lucrătoare.</p>
      <ul class="contact-direct">
        <li><a href="tel:${SITE.telefonTel}">${icTel()} ${SITE.telefon}</a></li>
        <li><a href="mailto:${SITE.email}">${icMail()} ${SITE.email}</a></li>
      </ul>
    </div>
    <form class="formular" data-formular="firme" novalidate>
      <div class="campuri">
        ${camp('f-nume', 'Numele dumneavoastră', { req: true, auto: 'name' })}
        ${camp('f-firma', 'Firma', { req: true, auto: 'organization' })}
        ${camp('f-tel', 'Telefon', { type: 'tel', req: true, auto: 'tel' })}
        ${camp('f-email', 'Email', { type: 'email', req: true, auto: 'email' })}
        ${selectie('f-articol', 'Articolul', d.articole.concat(['Altceva']))}
        ${camp('f-cant', 'Cantitatea', { type: 'number', req: true, ph: 'de exemplu 50' })}
        <div class="camp camp-lat"><label for="f-logo">Logoul <span class="opt">(opțional: SVG, PDF, PNG)</span></label><input id="f-logo" name="f-logo" type="file" accept=".svg,.pdf,.png,.jpg,.jpeg,.ai,.eps"></div>
        ${zona('f-mesaj', 'Detalii', { ph: 'Locul broderiei, mărimea logoului, culorile, termenul dorit' })}
        ${acord(rel, 'f-acord')}
      </div>
      <button class="btn" type="submit">Trimiteți cererea</button>
      ${multumire('Am primit cererea dumneavoastră. Vă trimitem oferta în aceeași zi lucrătoare.')}
    </form>
  </div>
</section>`;
  } else {
    const filtre = d.categorii.map((c) => `<a class="pastila" href="${link(rel, 'catalog')}?directie=${d.id}&amp;categorie=${c.id}">${esc(c.nume)}</a>`).join('');
    corp += `
<section class="sectiune sectiune-ivoar">
  <div class="wrap">
    <div class="cap-sectiune cap-rand">
      <h2>Modelele noastre</h2>
      <a class="legatura" href="${link(rel, 'catalog')}?directie=${d.id}">În catalog</a>
    </div>
    <div class="pastile">${filtre}</div>
    <div class="grila-produse">${produse.map((p) => cardProdus(rel, p)).join('')}</div>
  </div>
</section>

${blocPasi(PASI_COMANDA)}`;
  }
  corp += bandaFinala(rel, d.id === 'liturgic' ? 'Pregătiți o danie pentru biserică?' : undefined, d.id === 'liturgic' ? 'Spuneți-ne ce piese doriți și inscripția de brodat. Vă trimitem modelele potrivite, prețul și termenul.' : undefined);
  scrie(d.slug, pagina({ slug: d.slug, title: d.title, description: d.description }, corp, { rel, activ: d.slug, ld: [crumbsLd(crumbs)] }));
}

// ---------- Catalogul
function catalog() {
  const rel = '../';
  const dirs = DIRECTII.filter((d) => d.id !== 'firme');
  const crumbs = [{ nume: 'Acasă', href: rel, url: abs('') }, { nume: 'Catalog', url: abs('catalog') }];
  const corp = `
<section class="cap-pagina cap-scurt">
  <div class="wrap">
    ${firimituri(rel, crumbs)}
    <h1>Catalog</h1>
    <p class="lead">Toate modelele, cu prețul afișat. Fiecare se poate adapta în culoarea firului și în mărimea dorită.</p>
  </div>
</section>
<section class="sectiune sectiune-catalog">
  <div class="wrap">
    <div class="filtre" data-filtre>
      <div class="filtru" role="group" aria-label="Direcția">
        <button type="button" class="pastila" data-f="directie" data-v="" aria-pressed="true">Toate</button>
        ${dirs.map((d) => `<button type="button" class="pastila" data-f="directie" data-v="${d.id}" aria-pressed="false">${d.nume}</button>`).join('')}
      </div>
      ${dirs.map((d) => `<div class="filtru filtru-sub" role="group" aria-label="Categoria" data-pentru="${d.id}" hidden>
        <button type="button" class="pastila pastila-mica" data-f="categorie" data-v="" aria-pressed="true">Toate</button>
        ${d.categorii.map((c) => `<button type="button" class="pastila pastila-mica" data-f="categorie" data-v="${c.id}" aria-pressed="false">${esc(c.nume)}</button>`).join('')}
      </div>${d.tipuri.length ? `<div class="filtru filtru-sub" role="group" aria-label="Tipul" data-pentru="${d.id}" hidden>
        <button type="button" class="pastila pastila-mica" data-f="tip" data-v="" aria-pressed="true">Toate</button>
        ${d.tipuri.map((t) => `<button type="button" class="pastila pastila-mica" data-f="tip" data-v="${t.id}" aria-pressed="false">${esc(t.nume)}</button>`).join('')}
      </div>` : ''}`).join('')}
      <p class="filtre-nr" aria-live="polite"><span data-nr>${PRODUSE.length}</span> modele</p>
    </div>
    <div class="grila-produse" data-catalog>${PRODUSE.map((p) => cardProdus(rel, p)).join('')}</div>
    <p class="catalog-gol" data-gol hidden>Nu avem încă modele în această categorie. <a href="${link(rel, 'contact')}">Scrieți-ne</a> și vă spunem ce putem broda.</p>
  </div>
</section>
${bandaFinala(rel, 'Nu găsiți modelul căutat?')}`;
  scrie('catalog', pagina({ slug: 'catalog', title: 'Catalog: port tradițional și broderie liturgică, cu prețuri | Atelier Haris', description: 'Catalogul Atelier Haris: cămăși, rochii și fuste cu motive tradiționale, veșminte și acoperăminte liturgice, cu prețurile afișate. Execuție în 15 zile.' }, corp, { rel, activ: 'catalog', ld: [crumbsLd(crumbs)] }));
}

// ---------- Paginile de produs
function paginaProdus(p) {
  const rel = '../../';
  const d = dir(p.directie);
  const slug = prodSlug(p);
  const crumbs = [{ nume: 'Acasă', href: rel, url: abs('') }, { nume: 'Catalog', href: link(rel, 'catalog'), url: abs('catalog') }, { nume: d.nume, href: link(rel, d.slug), url: abs(d.slug) }, { nume: p.nume, url: abs(slug) }];
  const ton = p.directie === 'liturgic' ? 'piatra' : 'ivoar';
  const sl = SLOTURI[p.directie];
  const ingrijire = p.directie === 'liturgic' ? 'Curățare chimică delicată. Se păstrează întins sau pe umeraș lat, ferit de lumina directă.' : 'Spălare la 30°, pe dos, cu detergent pentru rufe delicate. Se calcă pe dos, fără abur direct pe broderie.';
  const msgWa = `Bună ziua, aș dori să comand: ${p.nume} (${lei(p.pret)}).`;
  const similare = PRODUSE.filter((x) => x.directie === p.directie && x.slug !== p.slug).slice(0, 4);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.nume, description: p.scurt, url: abs(slug), category: `${d.nume} > ${catNume(p)}`,
    brand: { '@type': 'Brand', name: SITE.nume }, material: p.material,
    offers: { '@type': 'Offer', price: p.pret, priceCurrency: 'RON', availability: 'https://schema.org/MadeToOrder', url: abs(slug), seller: { '@id': `${SITE_URL}/#atelier` } },
  };
  const corp = `
<section class="produs">
  <div class="wrap">
    ${firimituri(rel, crumbs)}
    <div class="produs-grila">
      <div class="galerie">
        <div class="galerie-mare" data-galerie>${foto(p.nume, { r: '4/5', ton, m: sl[0], img: imgProdus(p, 0), rel, eager: true })}</div>
        <div class="galerie-mici">${sl.map((s, i) => `<button type="button" class="galerie-mic" data-i="${i}" aria-label="${esc(s.t)}: ${esc(s.d)}"${i === 0 ? ' aria-current="true"' : ''}>${foto(`${p.nume}, ${s.t.toLowerCase()}`, { r: '4/5', ton: i === 1 ? (ton === 'piatra' ? 'grena' : 'piatra') : ton, m: s, img: imgProdus(p, i), rel })}</button>`).join('')}</div>
      </div>
      <div class="produs-info">
        <p class="eticheta"><a href="${link(rel, d.slug)}">${d.nume}</a> · ${esc(catNume(p))}</p>
        <h1>${esc(p.nume)}</h1>
        <p class="produs-pret">${lei(p.pret)}</p>
        <p>${esc(p.scurt)}</p>
        <div class="optiuni" data-optiuni>
          ${p.culori.length ? alegere('o-culoare', 'Culoarea', p.culori, { mostre: true }) : ''}
          ${p.marimi.length ? alegere('o-marime', 'Mărimea', p.marimi) : ''}
        </div>
        <div class="actiuni actiuni-produs">
          <button class="btn" type="button" data-deschide="comanda">Comandați</button>
          <a class="btn btn-contur" href="${waHref(msgWa)}" data-wa="${esc(msgWa)}" rel="noopener">${icWa(18)} WhatsApp</a>
          <a class="btn btn-text" href="tel:${SITE.telefonTel}">${icTel()} ${SITE.telefon}</a>
        </div>
        <ul class="produs-fapte">
          <li><strong>Execuție:</strong> aproximativ ${SITE.termen} de la confirmare</li>
          <li><strong>Livrare:</strong> ${lei(LIVRARE.cost)} în România, gratuit peste ${lei(LIVRARE.pragGratuit)}</li>
          <li><strong>Plata:</strong> ramburs sau transfer bancar, fără plată online</li>
        </ul>
        <div class="detalii">
          <details open><summary>Descriere</summary><p>${esc(p.scurt)} Fiecare piesă se brodează după confirmarea comenzii, în culoarea aleasă de dumneavoastră.</p></details>
          <details><summary>Materiale</summary><p>${esc(p.material)}.</p></details>
          <details><summary>Îngrijire</summary><p>${ingrijire}</p></details>
          <details><summary>Adaptări</summary><p>Putem schimba culoarea firului, dimensiunile sau putem adăuga o inscripție. Scrieți-ne ce doriți, iar prețul adaptării vi-l comunicăm înainte de execuție.</p></details>
        </div>
      </div>
    </div>
  </div>
</section>

${similare.length ? `<section class="sectiune sectiune-ivoar">
  <div class="wrap">
    <div class="cap-sectiune cap-rand"><h2>Alte modele</h2><a class="legatura" href="${link(rel, 'catalog')}?directie=${p.directie}">${d.nume}</a></div>
    <div class="grila-produse">${similare.map((x) => cardProdus(rel, x)).join('')}</div>
  </div>
</section>` : ''}

<div class="bara-comanda" data-bara aria-hidden="true">
  <div><p class="bara-nume">${esc(p.nume)}</p><p class="bara-pret">${lei(p.pret)}</p></div>
  <button class="btn btn-mic" type="button" data-deschide="comanda" tabindex="-1">Comandați</button>
</div>

<dialog class="fereastra" id="comanda" aria-labelledby="comanda-t">
  <form class="formular" data-formular="comanda" novalidate>
    <div class="fereastra-cap">
      <h2 id="comanda-t">Comandă</h2>
      <button class="inchide" type="button" data-inchide aria-label="Închide">×</button>
    </div>
    <div class="comanda-rezumat">
      ${foto(p.nume, { r: '1/1', ton, img: imgProdus(p, 0), rel })}
      <div><p class="comanda-nume">${esc(p.nume)}</p><p class="comanda-optiuni" data-rezumat></p><p class="comanda-pret">${lei(p.pret)}</p></div>
    </div>
    <input type="hidden" name="produs" value="${esc(p.slug)}">
    <div class="campuri">
      ${camp('c-nume', 'Nume și prenume', { req: true, auto: 'name' })}
      ${camp('c-tel', 'Telefon', { type: 'tel', req: true, auto: 'tel' })}
      ${camp('c-email', 'Email', { type: 'email', req: true, auto: 'email' })}
      ${selectie('c-tara', 'Țara de livrare', ['România', 'Altă țară'])}
      ${camp('c-adresa', 'Adresa de livrare', { req: true, auto: 'street-address', full: true, ph: 'Strada, numărul, localitatea, județul' })}
      ${camp('c-cant', 'Bucăți', { type: 'number', req: true })}
      ${zona('c-obs', 'Observații', { ph: 'Măsuri, inscripție, termen dorit' })}
      ${acord(rel, 'c-acord')}
    </div>
    <p class="nota-form">Nu plătiți acum. Vă sunăm pentru confirmare, apoi lucrarea intră în execuție.</p>
    <button class="btn btn-lat" type="submit">Trimiteți comanda</button>
    ${multumire('Am primit comanda dumneavoastră. Vă sunăm în aceeași zi lucrătoare pentru confirmare.')}
  </form>
</dialog>`;
  scrie(slug, pagina({ slug, title: `${p.nume} | Atelier Haris`, description: `${p.scurt} ${lei(p.pret)}, execuție în ${SITE.termen}, livrare în toată țara.`, tipOg: 'product' }, corp, { rel, activ: 'catalog', ld: [crumbsLd(crumbs), ld] }));
}

// ---------- Atelierul
function atelier() {
  const rel = '../';
  const crumbs = [{ nume: 'Acasă', href: rel, url: abs('') }, { nume: 'Atelierul', url: abs('atelierul') }];
  const corp = `
<section class="cap-pagina">
  <div class="wrap">
    ${firimituri(rel, crumbs)}
    <div class="doua doua-cap">
      <div class="doua-text">
        <h1>${ATELIER.h1}</h1>
        <p class="lead">${esc(ATELIER.lead)}</p>
        ${ATELIER.paragrafe.map((t) => `<p>${esc(t)}</p>`).join('')}
      </div>
      <div>${foto('Doamna Gina, în atelier', { r: '4/5', ton: 'piatra', m: { t: 'Portret', d: 'Doamna Gina în atelier, lângă mașina de brodat' } })}</div>
    </div>
  </div>
</section>
<section class="sectiune sectiune-ivoar">
  <div class="wrap">${blocPuncte(ATELIER.valori)}</div>
</section>
<section class="sectiune">
  <div class="wrap galerie-atelier">
    ${foto('Mașina de brodat în lucru', { r: '3/2', ton: 'ivoar', m: { t: 'Poză atelier', d: 'Mașina de brodat în lucru, de aproape' } })}
    ${foto('Fire de bumbac și fir metalic, pregătite pentru o comandă', { r: '3/2', ton: 'grena', m: { t: 'Poză materiale', d: 'Mosoare de fir și pânzeturi, pe masa de lucru' } })}
    ${foto('Detaliu de broderie pe pânză de in', { r: '3/2', ton: 'piatra', m: { t: 'Poză detaliu', d: 'Mâinile Doamnei Gina finisând o piesă' } })}
  </div>
</section>
<section class="sectiune sectiune-centru">
  <div class="wrap">
    ${fir}
    <img class="logo-mare" src="${rel}assets/img/haris-logo-pos.svg" alt="Atelier Haris" width="180" height="210" loading="lazy">
    <p class="slogan">${SITE.slogan}</p>
  </div>
</section>
${bandaFinala(rel)}`;
  scrie('atelierul', pagina({ slug: 'atelierul', title: ATELIER.title, description: ATELIER.description }, corp, { rel, activ: 'atelierul', ld: [crumbsLd(crumbs)] }));
}

// ---------- Contact
function contact() {
  const rel = '../';
  const crumbs = [{ nume: 'Acasă', href: rel, url: abs('') }, { nume: 'Contact', url: abs('contact') }];
  const corp = `
<section class="cap-pagina cap-scurt">
  <div class="wrap">
    ${firimituri(rel, crumbs)}
    <h1>${CONTACT.h1}</h1>
    <p class="lead">${esc(CONTACT.lead)}</p>
  </div>
</section>
<section class="sectiune sectiune-contact">
  <div class="wrap doua doua-contact">
    <form class="formular" data-formular="oferta" novalidate>
      <div class="campuri">
        ${selectie('o-tip', 'Despre ce este vorba', ['Un model din catalog', 'Un model adaptat sau o idee proprie', 'Broderie liturgică', 'Broderie pentru firme', 'Altceva'])}
        ${camp('o-nume', 'Numele dumneavoastră', { req: true, auto: 'name' })}
        ${camp('o-tel', 'Telefon', { type: 'tel', req: true, auto: 'tel' })}
        ${camp('o-email', 'Email', { type: 'email', req: true, auto: 'email' })}
        ${zona('o-mesaj', 'Mesajul', { req: true, ph: 'Ce doriți să brodăm, în ce culori, pentru când' })}
        <div class="camp camp-lat"><label for="o-fisier">Fotografie sau schiță <span class="opt">(opțional)</span></label><input id="o-fisier" name="o-fisier" type="file" accept="image/*,.pdf"></div>
        ${acord(rel, 'o-acord')}
      </div>
      <button class="btn" type="submit">Trimiteți cererea</button>
      ${multumire('Am primit cererea dumneavoastră. Vă răspundem în aceeași zi lucrătoare.')}
    </form>
    <aside class="contact-card">
      <h2>Ne găsiți și aici</h2>
      <ul class="contact-direct">
        <li><a href="tel:${SITE.telefonTel}">${icTel()} ${SITE.telefon}</a></li>
        <li><a href="${WA_GENERAL}" rel="noopener">${icWa(18)} WhatsApp</a></li>
        <li><a href="mailto:${SITE.email}">${icMail()} ${SITE.email}</a></li>
      </ul>
      <dl class="contact-date">
        <dt>Atelierul</dt><dd>${SITE.oras}</dd>
        <dt>Program</dt><dd>${SITE.program}</dd>
        <dt>Livrare</dt><dd>În toată țara și în străinătate, prin curier</dd>
      </dl>
    </aside>
  </div>
</section>`;
  scrie('contact', pagina({ slug: 'contact', title: CONTACT.title, description: CONTACT.description }, corp, { rel, activ: 'contact', ld: [crumbsLd(crumbs)] }));
}

// ---------- Paginile legale
function legale() {
  const rel = '../';
  for (const L of LEGAL) {
    const crumbs = [{ nume: 'Acasă', href: rel, url: abs('') }, { nume: L.h1, url: abs(L.slug) }];
    const corp = `
<section class="cap-pagina cap-scurt">
  <div class="wrap wrap-text">
    ${firimituri(rel, crumbs)}
    <h1>${L.h1}</h1>
    <p class="actualizat">Actualizată la ${new Date().toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
  </div>
</section>
<section class="sectiune sectiune-text">
  <div class="wrap wrap-text text-lung">
    ${L.sectiuni.map(([t, ps]) => `<h2>${esc(t)}</h2>${ps.map((x) => `<p>${esc(x)}</p>`).join('')}`).join('\n    ')}
  </div>
</section>`;
    scrie(L.slug, pagina({ slug: L.slug, title: L.title, description: L.description }, corp, { rel, ld: [crumbsLd(crumbs)] }));
  }
}

// ---------- 404, robots, sitemap
function p404() {
  const rel = '/' + (PROD ? '' : 'atelierharis-preview/');
  const corp = `
<section class="cap-pagina sectiune-centru">
  <div class="wrap">
    ${fir}
    <h1>Pagina nu există</h1>
    <p class="lead">Adresa poate fi greșită sau pagina a fost mutată.</p>
    <div class="actiuni actiuni-centru"><a class="btn" href="${rel}">Prima pagină</a><a class="btn btn-contur" href="${rel}catalog/">Catalogul</a></div>
  </div>
</section>`;
  scrie('404.html', pagina({ slug: '404.html', title: 'Pagina nu există | Atelier Haris', description: 'Pagina căutată nu există.', noindex: true }, corp, { rel }));
}

function fisiere() {
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), PROD ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
  const urls = PAGINI.filter((s) => s !== '404.html').map((s) => `  <url><loc>${abs(s)}</loc><lastmod>${AZI}</lastmod></url>`).join('\n');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}

acasa();
DIRECTII.forEach(paginaDirectie);
catalog();
PRODUSE.forEach(paginaProdus);
atelier();
contact();
legale();
p404();
fisiere();
console.log(`${PROD ? 'producție' : 'preview'}: ${PAGINI.length} pagini, ${SITE_URL}`);

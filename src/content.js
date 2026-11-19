// Textele și datele site-ului Atelier Haris. Datele de contact, firma, livrarea și produsele sunt provizorii (schelet),
// se înlocuiesc aici cu cele reale, într-un singur loc.

const SITE = {
  nume: 'Atelier Haris',
  slogan: 'Cusut cu har.',
  domeniu: 'https://atelierharis.ro',
  oras: 'București',
  telefon: '0700 000 000',
  telefonTel: '+40700000000',
  whatsapp: '40700000000',
  email: 'contact@atelierharis.ro',
  program: 'Luni - vineri, 9:00 - 18:00',
  termen: '15 zile',
  firma: {
    denumire: 'ATELIER HARIS S.R.L.',
    cui: '00000000',
    reg: 'J2026000000000',
    sediu: 'București, Sector 4',
  },
};

const LIVRARE = {
  curier: 'Curier rapid, în toată țara',
  cost: 25,
  pragGratuit: 800,
  diaspora: 'Pentru livrările în afara țării, costul curierului se comunică la confirmarea comenzii.',
  plata: ['Ramburs, la primirea coletului', 'Transfer bancar, după confirmarea comenzii'],
};

// Cele trei direcții ale atelierului
const DIRECTII = [
  {
    id: 'traditional',
    slug: 'port-traditional',
    nume: 'Port tradițional',
    scurt: 'Haine de purtat zi de zi, cu motive din portul românesc.',
    title: 'Port tradițional brodat: cămăși, rochii și fuste | Atelier Haris',
    description: 'Cămăși, rochii și fuste cu motive tradiționale brodate, pentru femei, bărbați și copii. Modele adaptate în culori și mărimi, livrate în toată țara.',
    h1: 'Port tradițional, de purtat în fiecare zi',
    intro: 'Cămăși, rochii și fuste croite pentru viața de azi, cu motivele portului românesc brodate pe guler, piept și mâneci. Pentru femei, bărbați și copii, în culorile și mărimile pe care le alegeți.',
    categorii: [
      { id: 'femei', nume: 'Femei' },
      { id: 'barbati', nume: 'Bărbați' },
      { id: 'copii', nume: 'Copii' },
    ],
    tipuri: [
      { id: 'camasi', nume: 'Cămăși' },
      { id: 'rochii', nume: 'Rochii' },
      { id: 'fuste', nume: 'Fuste' },
    ],
    puncte: [
      { t: 'Motive din port', d: 'Romburi, spice, brăduți și flori de câmp, așezate pe guler, piept și mâneci, ca în cămășile de odinioară.' },
      { t: 'Croite pentru azi', d: 'Tăieturi comode, materiale care se spală ușor, haine pe care le purtați la birou, la drum sau la sărbătoare.' },
      { t: 'Adaptate pentru dumneavoastră', d: 'Alegeți culoarea firului și mărimea; pentru copii lucrăm după vârstă sau după măsurile trimise.' },
    ],
  },
  {
    id: 'liturgic',
    slug: 'broderie-liturgica',
    nume: 'Broderie liturgică',
    scurt: 'Veșminte și acoperăminte pentru Sfântul Altar.',
    title: 'Broderie liturgică: veșminte preoțești, epitrahile, acoperăminte | Atelier Haris',
    description: 'Veșminte preoțești, epitrahile, acoperăminte pentru Sfintele Vase, dvere și veșminte pentru Sfânta Masă, brodate cu fir auriu. Pentru parohii și mănăstiri din toată țara.',
    h1: 'Broderie liturgică, lucrată cu evlavie',
    intro: 'Veșminte preoțești, epitrahile, acoperăminte pentru Sfintele Vase, dvere și veșminte pentru Sfânta Masă, brodate cu fir auriu pe brocart și catifea. Lucrăm pentru parohii, mănăstiri și pentru credincioșii care doresc să facă o danie.',
    categorii: [
      { id: 'vesminte-preotesti', nume: 'Veșminte preoțești' },
      { id: 'epitrahile', nume: 'Epitrahile' },
      { id: 'sfanta-masa', nume: 'Veșminte pentru Sfânta Masă' },
      { id: 'acoperaminte', nume: 'Acoperăminte pentru Sfintele Vase' },
      { id: 'dvere', nume: 'Dvere' },
      { id: 'semne-evanghelie', nume: 'Semne pentru Evanghelie' },
      { id: 'ripide', nume: 'Ripide' },
    ],
    tipuri: [],
    puncte: [
      { t: 'Fir auriu și argintiu', d: 'Cruci, chenare și motive vegetale brodate des, care își păstrează strălucirea în timp.' },
      { t: 'Seturi întregi', d: 'Veșmintele, epitrahilul și acoperămintele se pot lucra în același model, pentru un altar unitar.' },
      { t: 'Pentru danii', d: 'Brodăm inscripția dorită, cu numele celor pomeniți, pe dveră sau pe acoperăminte.' },
    ],
  },
  {
    id: 'firme',
    slug: 'broderie-pentru-firme',
    nume: 'Broderie pentru firme',
    scurt: 'Logo brodat pe uniforme, tricouri și textile de prezentare.',
    title: 'Broderie pentru firme: logo brodat pe uniforme și textile | Atelier Haris',
    description: 'Logo brodat pe tricouri polo, cămăși, șorțuri, prosoape și uniforme, la comandă. Cerere de ofertă în funcție de articol și cantitate.',
    h1: 'Broderie pentru firme, cu logoul dumneavoastră',
    intro: 'Brodăm logoul firmei pe uniforme, tricouri polo, cămăși, șorțuri, prosoape și textile de prezentare. Lucrăm după fișierul logoului, cu proba aprobată de dumneavoastră înainte de execuție.',
    categorii: [],
    tipuri: [],
    articole: ['Tricouri polo', 'Cămăși și bluze', 'Șorțuri și uniforme', 'Halate', 'Prosoape și halate de baie', 'Șepci', 'Textile de prezentare'],
    pasi: [
      { t: 'Trimiteți logoul', d: 'Ne trimiteți fișierul logoului, articolele dorite și cantitatea.' },
      { t: 'Primiți oferta', d: 'Vă răspundem cu prețul pe bucată și termenul de execuție.' },
      { t: 'Aprobați proba', d: 'Brodăm o probă și o fotografiem; începem seria după aprobarea dumneavoastră.' },
      { t: 'Livrăm comanda', d: 'Livrăm prin curier, oriunde în țară.' },
    ],
    puncte: [
      { t: 'Fidel logoului', d: 'Culorile firului se aleg după culorile mărcii dumneavoastră, iar detaliile fine se adaptează pentru broderie.' },
      { t: 'De la o bucată la serii', d: 'Lucrăm atât comenzi mici, pentru o echipă, cât și serii pentru evenimente și magazine.' },
      { t: 'Rezistent la spălare', d: 'Broderia rămâne curată după spălări repetate, fără să se decoloreze ca imprimarea.' },
    ],
  },
];

// Produsele (catalog provizoriu, pentru schelet)
const PRODUSE = [
  { slug: 'camasa-femei-altita-romburi', nume: 'Cămașă de femei cu altiță în romburi', directie: 'traditional', categorie: 'femei', tip: 'camasi', pret: 690,
    scurt: 'Cămașă din pânză de bumbac, cu altiță în romburi pe umăr și încrețul brodat la gât.',
    marimi: ['XS', 'S', 'M', 'L', 'XL'], culori: ['Grena', 'Negru cu roșu', 'Albastru'], material: 'Pânză de bumbac 100%, fir de bumbac mercerizat', vedeta: true },
  { slug: 'rochie-zi-motiv-spice', nume: 'Rochie de zi cu motiv de spice', directie: 'traditional', categorie: 'femei', tip: 'rochii', pret: 840,
    scurt: 'Rochie midi din in, cu spice brodate pe piept și pe tivul mânecilor.',
    marimi: ['S', 'M', 'L', 'XL'], culori: ['Auriu', 'Grena', 'Verde'], material: 'In 100%, fir de bumbac', vedeta: true },
  { slug: 'fusta-midi-brau-brodat', nume: 'Fustă midi cu brâu brodat', directie: 'traditional', categorie: 'femei', tip: 'fuste', pret: 520,
    scurt: 'Fustă evazată din bumbac, cu brâu lat brodat în motiv de vrâste.',
    marimi: ['S', 'M', 'L'], culori: ['Grena', 'Verde'], material: 'Bumbac 100%, fir de bumbac' },
  { slug: 'camasa-barbati-guler-brodat', nume: 'Cămașă de bărbați cu guler brodat', directie: 'traditional', categorie: 'barbati', tip: 'camasi', pret: 640,
    scurt: 'Cămașă cu tăietură dreaptă, cu motiv geometric brodat pe guler și la manșete.',
    marimi: ['M', 'L', 'XL', 'XXL'], culori: ['Grena', 'Negru', 'Albastru'], material: 'Pânză de bumbac 100%, fir de bumbac mercerizat', vedeta: true },
  { slug: 'camasa-barbati-piept-trei-randuri', nume: 'Cămașă de bărbați cu piept în trei rânduri', directie: 'traditional', categorie: 'barbati', tip: 'camasi', pret: 720,
    scurt: 'Cămașă de sărbătoare, cu trei rânduri de broderie pe piept, în stilul cămășilor de Muscel.',
    marimi: ['M', 'L', 'XL', 'XXL'], culori: ['Negru cu roșu', 'Grena'], material: 'Pânză de bumbac 100%, fir de bumbac' },
  { slug: 'rochita-fetita-flori-camp', nume: 'Rochiță de fetiță cu flori de câmp', directie: 'traditional', categorie: 'copii', tip: 'rochii', pret: 390,
    scurt: 'Rochiță din bumbac moale, cu flori de câmp brodate pe piept.',
    marimi: ['2 ani', '4 ani', '6 ani', '8 ani', '10 ani'], culori: ['Roșu', 'Albastru'], material: 'Bumbac 100%, fir de bumbac' },
  { slug: 'camasuta-baietel-bradut', nume: 'Cămășuță de băiețel cu motiv de brăduț', directie: 'traditional', categorie: 'copii', tip: 'camasi', pret: 340,
    scurt: 'Cămășuță cu brăduți brodați pe piept, pentru serbări și sărbători.',
    marimi: ['2 ani', '4 ani', '6 ani', '8 ani', '10 ani'], culori: ['Roșu', 'Verde'], material: 'Bumbac 100%, fir de bumbac' },

  { slug: 'epitrahil-cruci-fir-auriu', nume: 'Epitrahil cu cruci brodate în fir auriu', directie: 'liturgic', categorie: 'epitrahile', pret: 1450,
    scurt: 'Epitrahil din brocart, cu șapte cruci brodate în fir auriu și ciucuri lucrați manual.',
    marimi: [], culori: ['Auriu pe grena', 'Auriu pe alb', 'Auriu pe albastru'], material: 'Brocart, fir metalic auriu, căptușeală de bumbac', vedeta: true },
  { slug: 'set-vesminte-preotesti-brocart', nume: 'Set de veșminte preoțești din brocart', directie: 'liturgic', categorie: 'vesminte-preotesti', pret: 4800,
    scurt: 'Set complet: felon, epitrahil, brâu, rucavițe și bederniță, în același model brodat.',
    marimi: ['După măsurile trimise'], culori: ['Auriu pe grena', 'Auriu pe alb', 'Argintiu pe albastru'], material: 'Brocart, fir metalic, căptușeală de bumbac', vedeta: true },
  { slug: 'vesmant-sfanta-masa-cruce', nume: 'Veșmânt pentru Sfânta Masă cu cruce centrală', directie: 'liturgic', categorie: 'sfanta-masa', pret: 1800,
    scurt: 'Veșmânt din catifea, cu cruce brodată în centru și chenar de viță de vie.',
    marimi: ['După dimensiunile Sfintei Mese'], culori: ['Auriu pe grena', 'Auriu pe alb'], material: 'Catifea, fir metalic auriu' },
  { slug: 'acoperaminte-sfintele-vase-set', nume: 'Acoperăminte pentru Sfintele Vase, set de trei', directie: 'liturgic', categorie: 'acoperaminte', pret: 1200,
    scurt: 'Două acoperăminte mici și aer, brodate în același model, cu chenar auriu.',
    marimi: [], culori: ['Auriu pe grena', 'Auriu pe alb', 'Auriu pe albastru'], material: 'Brocart, fir metalic auriu' },
  { slug: 'dvera-chenar-vita-de-vie', nume: 'Dveră cu chenar de viță de vie', directie: 'liturgic', categorie: 'dvere', pret: 2400,
    scurt: 'Dveră pentru Ușile Împărătești, cu cruce centrală și chenar de viță de vie.',
    marimi: ['După dimensiunile ușilor'], culori: ['Auriu pe grena', 'Auriu pe albastru'], material: 'Catifea, fir metalic auriu' },
  { slug: 'semn-sfanta-evanghelie', nume: 'Semn pentru Sfânta Evanghelie', directie: 'liturgic', categorie: 'semne-evanghelie', pret: 180,
    scurt: 'Semn de carte din panglică de brocart, cu cruce brodată și ciucure.',
    marimi: [], culori: ['Auriu pe grena', 'Auriu pe alb'], material: 'Brocart, fir metalic auriu' },
  { slug: 'ripide-brodate-pereche', nume: 'Ripide brodate pe catifea, pereche', directie: 'liturgic', categorie: 'ripide', pret: 2600,
    scurt: 'Pereche de ripide cu chipuri de serafimi brodate pe catifea, pentru procesiuni.',
    marimi: [], culori: ['Auriu pe grena', 'Auriu pe albastru'], material: 'Catifea, fir metalic auriu' },
];

const NAV = [
  { nume: 'Port tradițional', slug: 'port-traditional' },
  { nume: 'Broderie liturgică', slug: 'broderie-liturgica' },
  { nume: 'Broderie pentru firme', slug: 'broderie-pentru-firme' },
  { nume: 'Catalog', slug: 'catalog' },
  { nume: 'Atelierul', slug: 'atelierul' },
  { nume: 'Contact', slug: 'contact' },
];

const ACASA = {
  title: 'Atelier Haris, atelier de broderie din București | Cusut cu har.',
  description: 'Atelier de broderie din București: port tradițional, broderie liturgică și logo brodat pentru firme. Prețuri afișate, execuție în 15 zile, livrare în toată țara.',
  h1: 'Cusut cu har.',
  sub: 'Atelier de broderie din București. Lucrăm port tradițional de purtat zi de zi, veșminte și acoperăminte pentru Sfântul Altar și broderie cu logoul firmei dumneavoastră.',
  pasi: [
    { t: 'Alegeți modelul', d: 'Din catalog, cu prețul afișat, sau ne trimiteți ideea dumneavoastră.' },
    { t: 'Îl adaptăm', d: 'Stabilim împreună culorile firului și mărimea.' },
    { t: 'Îl brodăm', d: 'Lucrarea este gata în aproximativ 15 zile.' },
    { t: 'Îl primiți acasă', d: 'Livrăm prin curier, în toată țara și în străinătate.' },
  ],
  atelier: {
    t: 'Doamna Gina și atelierul',
    d: 'În spatele fiecărei lucrări stă Doamna Gina, care alege firul, potrivește modelul și verifică fiecare cusătură înainte ca piesa să plece spre dumneavoastră.',
  },
};

const ATELIER = {
  title: 'Atelierul și Doamna Gina | Atelier Haris',
  description: 'Atelier Haris este un atelier de broderie din București, condus de Doamna Gina. Broderie computerizată de precizie, materiale alese și grijă pentru fiecare piesă.',
  h1: 'Atelierul',
  lead: 'Haris vine din grecescul „charis”, har. Ne-am ales numele pentru că, în meșteșugul nostru, harul se vede în răbdarea cu care se așază fiecare fir.',
  paragrafe: [
    'Atelierul a pornit în 2026, în București, din dragostea Doamnei Gina pentru cusăturile din lada de zestre a familiei. De la cămășile purtate la sărbători până la veșmintele din biserica satului, broderia a fost mereu aproape.',
    'Astăzi lucrăm cu mașini de brodat de precizie, care ne permit să reproducem fidel motivele vechi și să păstrăm aceeași calitate de la prima la ultima piesă. Desenul, alegerea firului și verificarea finală rămân lucru de mână.',
    'Fiecare comandă trece prin mâinile Doamnei Gina: ea potrivește modelul, alege culorile împreună cu dumneavoastră și verifică piesa înainte de livrare.',
  ],
  valori: [
    { t: 'Motive cu înțeles', d: 'Rombul, crucea, spicul și pomul vieții au fiecare povestea lor; le folosim cu grijă pentru sensul pe care îl poartă.' },
    { t: 'Materiale alese', d: 'Pânză de bumbac și in pentru port, brocart și catifea pentru veșminte, fir de bumbac mercerizat și fir metalic.' },
    { t: 'Prețuri la vedere', d: 'Prețul fiecărui produs este afișat în catalog; știți de la început cât costă lucrarea.' },
  ],
};

const CONTACT = {
  title: 'Cerere de ofertă și contact | Atelier Haris',
  description: 'Scrieți-ne pentru o comandă, o lucrare adaptată sau o ofertă pentru firma dumneavoastră. Telefon, WhatsApp și formular de cerere de ofertă.',
  h1: 'Cerere de ofertă și contact',
  lead: 'Spuneți-ne ce doriți să brodăm. Vă răspundem în aceeași zi lucrătoare, cu prețul și termenul de execuție.',
};

module.exports = { SITE, LIVRARE, DIRECTII, PRODUSE, NAV, ACASA, ATELIER, CONTACT };

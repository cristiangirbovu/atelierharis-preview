// Paginile legale. Textele folosesc datele din content.js (firma, contact, livrare).
const { SITE, LIVRARE } = require('./content.js');
const F = SITE.firma;
const lei = (n) => `${n.toLocaleString('ro-RO')} lei`;

const operator = `${F.denumire}, cu sediul în ${F.sediu}, CUI ${F.cui}, nr. de ordine în Registrul Comerțului ${F.reg}`;

const LEGAL = [
  {
    slug: 'termeni-si-conditii',
    title: 'Termeni și condiții | Atelier Haris',
    description: 'Condițiile în care se plasează, se execută și se livrează comenzile Atelier Haris: prețuri, plată, livrare, retur și garanția lucrărilor.',
    h1: 'Termeni și condiții',
    sectiuni: [
      ['Cine suntem', [`Site-ul atelierharis.ro este administrat de ${operator}. Ne puteți scrie la ${SITE.email} sau ne puteți suna la ${SITE.telefon}, ${SITE.program.toLowerCase()}.`]],
      ['Comenzile', [
        'Comanda se transmite prin formularul de pe pagina produsului, prin telefon sau pe WhatsApp. Pe site nu se face plată online.',
        'După primirea comenzii vă contactăm pentru confirmare: stabilim culoarea firului, mărimea sau dimensiunile, prețul final și data livrării. Comanda devine fermă după această confirmare.',
        `Termenul obișnuit de execuție este de ${SITE.termen} de la confirmare. Pentru lucrările mari sau pentru serii, termenul se stabilește la confirmare.`,
      ]],
      ['Prețurile', [
        'Prețurile afișate în catalog sunt în lei și sunt prețurile finale ale produselor. Costul livrării se adaugă separat, după regulile de mai jos.',
        'Pentru lucrările adaptate peste modelul din catalog (dimensiuni speciale, inscripții, logo), prețul se comunică în oferta transmisă înainte de execuție.',
      ]],
      ['Plata', [`Puteți plăti în unul din modurile următoare: ${LIVRARE.plata.map((p) => p.toLowerCase()).join('; ')}. Pentru lucrările realizate după măsurile sau cerințele dumneavoastră putem solicita un avans, comunicat la confirmare.`]],
      ['Livrarea', [
        `${LIVRARE.curier}. Costul livrării în România este de ${lei(LIVRARE.cost)}; pentru comenzile de peste ${lei(LIVRARE.pragGratuit)}, livrarea este gratuită.`,
        LIVRARE.diaspora,
      ]],
      ['Dreptul de retragere și returul', [
        'Pentru produsele din catalog, comandate în mărimile și culorile standard, aveți dreptul de a vă retrage din contract în 14 zile de la primire, fără a indica motivul. Ne anunțați la adresa de email de mai sus, iar produsul se returnează nepurtat, în starea în care l-ați primit. Costul returului este suportat de dumneavoastră; banii se restituie în cel mult 14 zile de la primirea produsului.',
        'Potrivit art. 16 lit. c) din OUG nr. 34/2014, dreptul de retragere nu se aplică produselor realizate după specificațiile dumneavoastră sau personalizate în mod clar: lucrări pe măsură, culori sau dimensiuni adaptate, inscripții și logo brodat.',
      ]],
      ['Garanția lucrării', ['Dacă o piesă are un defect de execuție, ne anunțați în 30 de zile de la primire și o refacem sau o reparăm fără cost. Nu intră în garanție uzura normală și deteriorările produse prin spălare sau întreținere contrară instrucțiunilor de pe etichetă.']],
      ['Litigii', ['Orice neînțelegere o rezolvăm mai întâi pe cale amiabilă. Vă puteți adresa și Autorității Naționale pentru Protecția Consumatorilor (anpc.ro) sau platformei europene de soluționare online a litigiilor (SOL).']],
    ],
  },
  {
    slug: 'politica-de-confidentialitate',
    title: 'Politica de confidențialitate | Atelier Haris',
    description: 'Ce date personale prelucrează Atelier Haris când trimiteți o comandă sau o cerere de ofertă, în ce scop, cât timp le păstrăm și ce drepturi aveți.',
    h1: 'Politica de confidențialitate',
    sectiuni: [
      ['Operatorul datelor', [`Operatorul datelor personale este ${operator}. Pentru orice întrebare despre datele dumneavoastră ne scrieți la ${SITE.email}.`]],
      ['Ce date prelucrăm', [
        'Când trimiteți o comandă sau o cerere de ofertă: numele, telefonul, adresa de email, adresa de livrare, detaliile comenzii și fișierele pe care ni le trimiteți (de exemplu logoul firmei).',
        'Când ne scrieți pe WhatsApp sau ne sunați: numărul de telefon și conținutul conversației.',
      ]],
      ['De ce le prelucrăm', [
        'Pentru a vă răspunde, a confirma și a executa comanda și pentru a o livra (temeiul: executarea contractului, art. 6 alin. (1) lit. b) din Regulamentul (UE) 2016/679).',
        'Pentru emiterea facturilor și păstrarea documentelor contabile (temeiul: obligația legală, art. 6 alin. (1) lit. c)).',
      ]],
      ['Cui le transmitem', ['Datele ajung doar la furnizorii care ne ajută să vă servim: firma de curierat, furnizorul de găzduire a site-ului și a bazei de date și contabilul nostru. Nu vindem și nu închiriem datele dumneavoastră.']],
      ['Cât timp le păstrăm', ['Datele din cererile care nu devin comenzi se șterg după 12 luni. Datele din comenzi se păstrează cât prevede legislația contabilă.']],
      ['Drepturile dumneavoastră', ['Aveți dreptul de acces, de rectificare, de ștergere, de restricționare a prelucrării, de portabilitate și de opoziție. Ne scrieți la adresa de mai sus și vă răspundem în cel mult o lună. Aveți și dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (dataprotection.ro).']],
    ],
  },
  {
    slug: 'politica-cookie-uri',
    title: 'Politica de cookie-uri | Atelier Haris',
    description: 'Ce cookie-uri folosește site-ul atelierharis.ro și cum le puteți controla din browser.',
    h1: 'Politica de cookie-uri',
    sectiuni: [
      ['Ce sunt cookie-urile', ['Cookie-urile sunt fișiere mici pe care un site le salvează în browserul dumneavoastră, ca să funcționeze corect sau ca să înțeleagă cum este folosit.']],
      ['Ce folosim', ['Site-ul folosește doar cookie-uri și stocare locală strict necesare funcționării, de exemplu pentru a reține filtrele alese în catalog. Acestea nu vă identifică și nu necesită acordul dumneavoastră.']],
      ['Măsurarea vizitelor', ['Dacă vom folosi instrumente de măsurare a vizitelor, le vom activa doar după ce vă dați acordul, iar această pagină va fi actualizată cu lista lor.']],
      ['Cum le controlați', ['Puteți șterge sau bloca oricând cookie-urile din setările browserului. Blocarea celor strict necesare poate face ca unele funcții ale site-ului să nu meargă corect.']],
    ],
  },
];

module.exports = { LEGAL };

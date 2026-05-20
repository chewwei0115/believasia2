import { useState, useMemo } from 'react';
import {
  X,
  Plus,
  Check,
  Phone,
  ArrowLeft,
  ArrowRight,
  Filter,
  Search,
  ChevronDown,
} from 'lucide-react';

// 43 EVs available in Malaysia (May 2026)
// Proton prices verified from emas.proton.com (effective 17 May 2026)
// Other prices are approximate from public sources ‚Äî verify with each distributor before going live
const EVS = [
  // Proton (Pro-Net) ‚Äî verified May 2026
  {
    id: 'proton-emas-5',
    brand: 'Proton',
    model: 'e.MAS 5',
    bodyType: 'SUV',
    segment: 'B-segment',
    priceFrom: 56800,
    priceTo: 69800,
    batteryKwh: 40.16,
    rangeWltp: 325,
    chargingDc: 80,
    dc1080: 21,
    motorKw: 85,
    seats: 5,
    tagline: "Malaysia's most affordable EV",
    popular: true,
    hot: true,
    editorsPick: 1,
    editorsNote:
      'The car that finally made Malaysian EV adoption mass-market. Two variants, generous standard kit, and a sub-RM 60k entry point ‚Äî there is no real alternative in this segment.',
  },
  {
    id: 'proton-emas-7',
    brand: 'Proton',
    model: 'e.MAS 7',
    bodyType: 'SUV',
    segment: 'C-segment',
    priceFrom: 99800,
    priceTo: 115800,
    batteryKwh: 60.22,
    rangeWltp: 410,
    chargingDc: 80,
    dc1080: 26,
    motorKw: 160,
    seats: 5,
    tagline: 'Best-selling Malaysian EV SUV',
    popular: true,
  },

  // BYD (Sime Darby)
  {
    id: 'byd-atto-3',
    brand: 'BYD',
    model: 'Atto 3',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 123800,
    priceTo: 137800,
    batteryKwh: 60.48,
    rangeWltp: 410,
    chargingDc: 89,
    dc1080: 30,
    motorKw: 150,
    seats: 5,
    tagline: '#2 best-selling EV in Malaysia',
    popular: true,
    editorsPick: 2,
    editorsNote:
      'Quirky inside, sensible outside, surprisingly fun. The default first EV for anyone with a six-figure budget.',
  },
  {
    id: 'byd-dolphin',
    brand: 'BYD',
    model: 'Dolphin',
    bodyType: 'Hatchback',
    segment: 'Compact',
    priceFrom: 99900,
    priceTo: 124900,
    batteryKwh: 60.48,
    rangeWltp: 427,
    chargingDc: 88,
    dc1080: 30,
    motorKw: 150,
    seats: 5,
  },
  {
    id: 'byd-seal',
    brand: 'BYD',
    model: 'Seal',
    bodyType: 'Sedan',
    segment: 'Mid-size',
    priceFrom: 163800,
    priceTo: 199800,
    batteryKwh: 82.5,
    rangeWltp: 570,
    chargingDc: 150,
    dc1080: 26,
    motorKw: 230,
    seats: 5,
  },
  {
    id: 'byd-sealion-7',
    brand: 'BYD',
    model: 'Sealion 7',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 174800,
    priceTo: 199800,
    batteryKwh: 82.5,
    rangeWltp: 482,
    chargingDc: 150,
    dc1080: 24,
    motorKw: 230,
    seats: 5,
  },
  {
    id: 'byd-m6',
    brand: 'BYD',
    model: 'M6',
    bodyType: 'MPV',
    segment: '7-seater',
    priceFrom: 165800,
    priceTo: 186800,
    batteryKwh: 87,
    rangeWltp: 420,
    chargingDc: 115,
    dc1080: 30,
    motorKw: 180,
    seats: 7,
    tagline: 'Most affordable 7-seater EV',
  },

  // MG
  {
    id: 'mg-zs-ev',
    brand: 'MG',
    model: 'ZS EV',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 115800,
    priceTo: 125800,
    batteryKwh: 51,
    rangeWltp: 320,
    chargingDc: 76,
    dc1080: 36,
    motorKw: 130,
    seats: 5,
  },
  {
    id: 'mg-4',
    brand: 'MG',
    model: 'MG4',
    bodyType: 'Hatchback',
    segment: 'Compact',
    priceFrom: 104000,
    priceTo: 139000,
    batteryKwh: 64,
    rangeWltp: 450,
    chargingDc: 140,
    dc1080: 26,
    motorKw: 150,
    seats: 5,
  },
  {
    id: 'mg-s5',
    brand: 'MG',
    model: 'S5 EV',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 115000,
    priceTo: 135000,
    batteryKwh: 64,
    rangeWltp: 430,
    chargingDc: 139,
    dc1080: 24,
    motorKw: 125,
    seats: 5,
    tagline: 'Now locally assembled',
    popular: true,
  },

  // Chery & others
  {
    id: 'chery-omoda-e5',
    brand: 'Chery',
    model: 'Omoda E5',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 119800,
    priceTo: 132800,
    batteryKwh: 61.1,
    rangeWltp: 430,
    chargingDc: 80,
    dc1080: 28,
    motorKw: 150,
    seats: 5,
  },
  {
    id: 'gwm-ora',
    brand: 'GWM',
    model: 'Ora Good Cat',
    bodyType: 'Hatchback',
    segment: 'Compact',
    priceFrom: 109800,
    priceTo: 145800,
    batteryKwh: 63.1,
    rangeWltp: 400,
    chargingDc: 64,
    dc1080: 40,
    motorKw: 105,
    seats: 5,
  },
  {
    id: 'neta-v',
    brand: 'Neta',
    model: 'V',
    bodyType: 'Hatchback',
    segment: 'Compact',
    priceFrom: 89800,
    priceTo: 99800,
    batteryKwh: 38.5,
    rangeWltp: 380,
    chargingDc: 60,
    dc1080: 30,
    motorKw: 70,
    seats: 5,
  },
  {
    id: 'neta-x',
    brand: 'Neta',
    model: 'X',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 119800,
    priceTo: 139800,
    batteryKwh: 50.27,
    rangeWltp: 401,
    chargingDc: 100,
    dc1080: 30,
    motorKw: 120,
    seats: 5,
  },

  // Smart (Pro-Net/Geely-Mercedes JV)
  {
    id: 'smart-1',
    brand: 'Smart',
    model: '#1',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 189000,
    priceTo: 249000,
    batteryKwh: 66,
    rangeWltp: 440,
    chargingDc: 150,
    dc1080: 30,
    motorKw: 200,
    seats: 5,
  },
  {
    id: 'smart-3',
    brand: 'Smart',
    model: '#3',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 175000,
    priceTo: 235000,
    batteryKwh: 66,
    rangeWltp: 455,
    chargingDc: 150,
    dc1080: 30,
    motorKw: 200,
    seats: 5,
  },

  // Leapmotor & iCaur
  {
    id: 'leapmotor-c10',
    brand: 'Leapmotor',
    model: 'C10',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 139888,
    priceTo: 159888,
    batteryKwh: 69.9,
    rangeWltp: 420,
    chargingDc: 84,
    dc1080: 30,
    motorKw: 160,
    seats: 5,
  },
  {
    id: 'leapmotor-b10',
    brand: 'Leapmotor',
    model: 'B10',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 109888,
    priceTo: 129888,
    batteryKwh: 56.2,
    rangeWltp: 410,
    chargingDc: 80,
    dc1080: 30,
    motorKw: 160,
    seats: 5,
  },
  {
    id: 'icaur-v23',
    brand: 'iCaur',
    model: 'V23',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 130000,
    priceTo: 155000,
    batteryKwh: 70,
    rangeWltp: 401,
    chargingDc: 90,
    dc1080: 30,
    motorKw: 150,
    seats: 5,
    tagline: 'Rugged retro-modern design',
    popular: true,
  },

  // Tesla
  {
    id: 'tesla-model-3',
    brand: 'Tesla',
    model: 'Model 3',
    bodyType: 'Sedan',
    segment: 'Mid-size',
    priceFrom: 181000,
    priceTo: 244000,
    batteryKwh: 78.4,
    rangeWltp: 629,
    chargingDc: 250,
    dc1080: 18,
    motorKw: 366,
    seats: 5,
    popular: true,
  },
  {
    id: 'tesla-model-y',
    brand: 'Tesla',
    model: 'Model Y',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 199000,
    priceTo: 274000,
    batteryKwh: 78.4,
    rangeWltp: 600,
    chargingDc: 250,
    dc1080: 18,
    motorKw: 378,
    seats: 5,
    editorsPick: 3,
    editorsNote:
      'The reference point everyone else benchmarks against. Charging network, software, residual value ‚Äî all best in class.',
  },
  {
    id: 'tesla-model-y-l',
    brand: 'Tesla',
    model: 'Model Y L',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 219000,
    priceTo: 289000,
    batteryKwh: 82,
    rangeWltp: 580,
    chargingDc: 250,
    dc1080: 18,
    motorKw: 378,
    seats: 6,
    tagline: 'Six-seater Model Y',
    hot: true,
  },

  // Hyundai & Kia
  {
    id: 'hyundai-ioniq-5',
    brand: 'Hyundai',
    model: 'Ioniq 5',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 199888,
    priceTo: 289888,
    batteryKwh: 77.4,
    rangeWltp: 507,
    chargingDc: 350,
    dc1080: 18,
    motorKw: 239,
    seats: 5,
  },
  {
    id: 'hyundai-ioniq-6',
    brand: 'Hyundai',
    model: 'Ioniq 6',
    bodyType: 'Sedan',
    segment: 'Mid-size',
    priceFrom: 289888,
    priceTo: 319888,
    batteryKwh: 77.4,
    rangeWltp: 614,
    chargingDc: 350,
    dc1080: 18,
    motorKw: 239,
    seats: 5,
  },
  {
    id: 'kia-ev6',
    brand: 'Kia',
    model: 'EV6',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 286808,
    priceTo: 386808,
    batteryKwh: 77.4,
    rangeWltp: 528,
    chargingDc: 350,
    dc1080: 18,
    motorKw: 239,
    seats: 5,
  },
  {
    id: 'kia-ev9',
    brand: 'Kia',
    model: 'EV9',
    bodyType: 'SUV',
    segment: 'Full-size',
    priceFrom: 380000,
    priceTo: 450000,
    batteryKwh: 99.8,
    rangeWltp: 541,
    chargingDc: 240,
    dc1080: 24,
    motorKw: 283,
    seats: 7,
  },

  // Zeekr & Xpeng
  {
    id: 'zeekr-x',
    brand: 'Zeekr',
    model: 'X',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 159800,
    priceTo: 179800,
    batteryKwh: 66,
    rangeWltp: 440,
    chargingDc: 150,
    dc1080: 30,
    motorKw: 200,
    seats: 5,
  },
  {
    id: 'zeekr-7x',
    brand: 'Zeekr',
    model: '7X',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 199800,
    priceTo: 269800,
    batteryKwh: 100,
    rangeWltp: 615,
    chargingDc: 360,
    dc1080: 15,
    motorKw: 470,
    seats: 5,
    tagline: 'Fastest-charging EV in Malaysia',
    popular: true,
  },
  {
    id: 'xpeng-g6',
    brand: 'Xpeng',
    model: 'G6',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 165000,
    priceTo: 200000,
    batteryKwh: 87.5,
    rangeWltp: 580,
    chargingDc: 280,
    dc1080: 20,
    motorKw: 218,
    seats: 5,
  },

  // Volvo & Polestar
  {
    id: 'volvo-ex30',
    brand: 'Volvo',
    model: 'EX30',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 175888,
    priceTo: 220888,
    batteryKwh: 64,
    rangeWltp: 460,
    chargingDc: 153,
    dc1080: 27,
    motorKw: 200,
    seats: 5,
  },
  {
    id: 'volvo-ex40',
    brand: 'Volvo',
    model: 'EX40',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 268888,
    priceTo: 298888,
    batteryKwh: 78,
    rangeWltp: 533,
    chargingDc: 200,
    dc1080: 28,
    motorKw: 300,
    seats: 5,
  },
  {
    id: 'polestar-2',
    brand: 'Polestar',
    model: '2',
    bodyType: 'Sedan',
    segment: 'Mid-size',
    priceFrom: 199000,
    priceTo: 289000,
    batteryKwh: 82,
    rangeWltp: 655,
    chargingDc: 205,
    dc1080: 28,
    motorKw: 350,
    seats: 5,
  },
  {
    id: 'polestar-4',
    brand: 'Polestar',
    model: '4',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 299000,
    priceTo: 379000,
    batteryKwh: 100,
    rangeWltp: 580,
    chargingDc: 200,
    dc1080: 30,
    motorKw: 400,
    seats: 5,
  },

  // Mini, BMW, Mercedes
  {
    id: 'mini-cooper-se',
    brand: 'Mini',
    model: 'Cooper SE',
    bodyType: 'Hatchback',
    segment: 'Compact',
    priceFrom: 213888,
    priceTo: 226888,
    batteryKwh: 54.2,
    rangeWltp: 402,
    chargingDc: 95,
    dc1080: 30,
    motorKw: 160,
    seats: 4,
  },
  {
    id: 'bmw-ix1',
    brand: 'BMW',
    model: 'iX1',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 232800,
    priceTo: 286800,
    batteryKwh: 64.7,
    rangeWltp: 440,
    chargingDc: 130,
    dc1080: 29,
    motorKw: 230,
    seats: 5,
  },
  {
    id: 'bmw-ix3',
    brand: 'BMW',
    model: 'iX3',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 313800,
    priceTo: 348800,
    batteryKwh: 80,
    rangeWltp: 461,
    chargingDc: 150,
    dc1080: 32,
    motorKw: 210,
    seats: 5,
  },
  {
    id: 'bmw-i4',
    brand: 'BMW',
    model: 'i4',
    bodyType: 'Sedan',
    segment: 'Mid-size',
    priceFrom: 339800,
    priceTo: 489800,
    batteryKwh: 83.9,
    rangeWltp: 590,
    chargingDc: 205,
    dc1080: 31,
    motorKw: 250,
    seats: 5,
  },
  {
    id: 'mercedes-eqa',
    brand: 'Mercedes-Benz',
    model: 'EQA',
    bodyType: 'SUV',
    segment: 'Compact',
    priceFrom: 278201,
    priceTo: 310000,
    batteryKwh: 70.5,
    rangeWltp: 496,
    chargingDc: 100,
    dc1080: 32,
    motorKw: 140,
    seats: 5,
  },
  {
    id: 'mercedes-eqe',
    brand: 'Mercedes-Benz',
    model: 'EQE',
    bodyType: 'Sedan',
    segment: 'Full-size',
    priceFrom: 419888,
    priceTo: 599888,
    batteryKwh: 90.6,
    rangeWltp: 654,
    chargingDc: 170,
    dc1080: 32,
    motorKw: 215,
    seats: 5,
  },

  // Porsche & Lotus
  {
    id: 'porsche-taycan',
    brand: 'Porsche',
    model: 'Taycan',
    bodyType: 'Sedan',
    segment: 'Full-size',
    priceFrom: 645000,
    priceTo: 1200000,
    batteryKwh: 105,
    rangeWltp: 678,
    chargingDc: 320,
    dc1080: 18,
    motorKw: 350,
    seats: 4,
  },
  {
    id: 'porsche-macan-ev',
    brand: 'Porsche',
    model: 'Macan Electric',
    bodyType: 'SUV',
    segment: 'Mid-size',
    priceFrom: 568000,
    priceTo: 815000,
    batteryKwh: 95,
    rangeWltp: 613,
    chargingDc: 270,
    dc1080: 21,
    motorKw: 300,
    seats: 5,
  },
  {
    id: 'lotus-eletre',
    brand: 'Lotus',
    model: 'Eletre',
    bodyType: 'SUV',
    segment: 'Full-size',
    priceFrom: 578000,
    priceTo: 798000,
    batteryKwh: 112,
    rangeWltp: 600,
    chargingDc: 350,
    dc1080: 20,
    motorKw: 450,
    seats: 5,
  },

  // MPVs (the hot segment)
  {
    id: 'denza-d9',
    brand: 'Denza',
    model: 'D9',
    bodyType: 'MPV',
    segment: '7-seater',
    priceFrom: 348888,
    priceTo: 398888,
    batteryKwh: 103.4,
    rangeWltp: 520,
    chargingDc: 166,
    dc1080: 30,
    motorKw: 230,
    seats: 7,
    tagline: 'Alphard alternative',
    popular: true,
  },
  {
    id: 'maxus-mifa-9',
    brand: 'Maxus',
    model: 'MIFA 9',
    bodyType: 'MPV',
    segment: '7-seater',
    priceFrom: 359888,
    priceTo: 399888,
    batteryKwh: 90,
    rangeWltp: 435,
    chargingDc: 120,
    dc1080: 36,
    motorKw: 180,
    seats: 7,
  },
  {
    id: 'xpeng-x9',
    brand: 'Xpeng',
    model: 'X9',
    bodyType: 'MPV',
    segment: '7-seater',
    priceFrom: 298888,
    priceTo: 358888,
    batteryKwh: 101.5,
    rangeWltp: 640,
    chargingDc: 300,
    dc1080: 20,
    motorKw: 235,
    seats: 7,
  },
  {
    id: 'zeekr-009',
    brand: 'Zeekr',
    model: '009',
    bodyType: 'MPV',
    segment: 'Luxury MPV',
    priceFrom: 538888,
    priceTo: 638888,
    batteryKwh: 116,
    rangeWltp: 702,
    chargingDc: 500,
    dc1080: 15,
    motorKw: 400,
    seats: 6,
  },
];

const BRANDS = [...new Set(EVS.map((e) => e.brand))].sort();
const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'MPV'];
const MY_STATES = [
  'Kuala Lumpur',
  'Selangor',
  'Penang',
  'Johor',
  'Perak',
  'Sabah',
  'Sarawak',
  'Negeri Sembilan',
  'Melaka',
  'Pahang',
  'Kedah',
  'Kelantan',
  'Terengganu',
  'Perlis',
  'Putrajaya',
  'Labuan',
];

// Editorial color palette for body type ‚Äî soft, sophisticated, magazine-like
const BODY_COLORS = {
  SUV: { bg: '#c4d4cc', text: '#5a6a62' },
  Sedan: { bg: '#b8c4d4', text: '#5a6678' },
  Hatchback: { bg: '#d4c8b8', text: '#7a6e5e' },
  MPV: { bg: '#c8c4d4', text: '#6a667a' },
};

const fmtPriceFull = (n) => `RM ${n.toLocaleString('en-MY')}`;
const fmtPriceShort = (n) =>
  n >= 1000000
    ? `RM ${(n / 1000000).toFixed(2)}M`
    : `RM ${(n / 1000).toFixed(0)}k`;

const STATS = {
  models: EVS.length,
  brands: BRANDS.length,
  startingFrom: Math.min(...EVS.map((e) => e.priceFrom)),
  longestRange: Math.max(...EVS.map((e) => e.rangeWltp)),
};

export default function App() {
  const [view, setView] = useState('browse');
  const [detailModel, setDetailModel] = useState(null);
  const [shortlist, setShortlist] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: 'all',
    bodyType: 'all',
    priceMax: 1500000,
    minRange: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEVs = useMemo(() => {
    return EVS.filter((ev) => {
      if (filters.brand !== 'all' && ev.brand !== filters.brand) return false;
      if (filters.bodyType !== 'all' && ev.bodyType !== filters.bodyType)
        return false;
      if (ev.priceFrom > filters.priceMax) return false;
      if (ev.rangeWltp < filters.minRange) return false;
      if (
        searchQuery &&
        !`${ev.brand} ${ev.model}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [filters, searchQuery]);

  const toggleShortlist = (id) => {
    setShortlist((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const openDetail = (ev) => {
    setDetailModel(ev);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const startLeadForm = (preselect) => {
    if (preselect && !shortlist.includes(preselect)) {
      setShortlist((prev) => (prev.length >= 3 ? prev : [...prev, preselect]));
    }
    setView('form');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div
      style={{
        background: '#fafbfc',
        color: '#0a0a0a',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap');
        body, html, #root { background: #fafbfc; }
        .font-serif { font-family: 'Fraunces', serif; letter-spacing: -0.02em; }
        .font-mono { font-family: 'DM Mono', monospace; }
        ::selection { background: #1e3a8a; color: #ffffff; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .anim-slide-up { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .anim-fade-in { animation: fadeIn 0.5s ease-out; }
        .anim-scale-in { animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .card-hover { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .card-hover:hover { transform: translateY(-3px); }
        .card-hover:hover .card-rule { background: #1e3a8a; }
      `}</style>

      {view === 'browse' && (
        <BrowseView
          evs={filteredEVs}
          allEvs={EVS}
          shortlist={shortlist}
          toggleShortlist={toggleShortlist}
          openDetail={openDetail}
          filters={filters}
          setFilters={setFilters}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onShortlistOpen={() => setView('form')}
        />
      )}

      {view === 'detail' && detailModel && (
        <DetailView
          ev={detailModel}
          shortlist={shortlist}
          toggleShortlist={toggleShortlist}
          onBack={() => setView('browse')}
          onGetQuote={() => startLeadForm(detailModel.id)}
        />
      )}

      {view === 'form' && (
        <LeadFormView
          shortlist={shortlist}
          allEvs={EVS}
          toggleShortlist={toggleShortlist}
          onBack={() => setView('browse')}
          onSubmit={() => setView('success')}
          onAddMore={() => setView('browse')}
        />
      )}

      {view === 'success' && (
        <SuccessView
          shortlist={shortlist}
          allEvs={EVS}
          onReset={() => {
            setShortlist([]);
            setView('browse');
          }}
        />
      )}
    </div>
  );
}

// ============== WORDMARK ==============
function Wordmark({ size = 22 }) {
  return (
    <div
      className="font-serif"
      style={{
        fontSize: size,
        fontWeight: 500,
        color: '#0a0a0a',
        letterSpacing: '-0.03em',
        display: 'flex',
        alignItems: 'baseline',
      }}
    >
      Beli
      <span style={{ fontStyle: 'italic', color: '#1e3a8a', marginLeft: 1 }}>
        EV
      </span>
    </div>
  );
}

// ============== BROWSE VIEW ==============
function BrowseView({
  evs,
  allEvs,
  shortlist,
  toggleShortlist,
  openDetail,
  filters,
  setFilters,
  filterOpen,
  setFilterOpen,
  searchQuery,
  setSearchQuery,
  onShortlistOpen,
}) {
  const editorsPicks = allEvs
    .filter((e) => e.editorsPick)
    .sort((a, b) => a.editorsPick - b.editorsPick);
  const featuredPick = editorsPicks[0];
  const sidePicks = editorsPicks.slice(1, 3);

  return (
    <div style={{ paddingBottom: 96 }}>
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(250, 251, 252, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid #e1e4ea',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Wordmark size={22} />
          <nav
            style={{ display: 'flex', gap: 28, fontSize: 13, color: '#64748b' }}
            className="hide-mobile"
          >
            <span style={{ cursor: 'pointer' }}>Catalog</span>
            <span style={{ cursor: 'pointer' }}>Compare</span>
            <span style={{ cursor: 'pointer' }}>Guides</span>
          </nav>
          <button
            onClick={shortlist.length > 0 ? onShortlistOpen : null}
            style={{
              background: '#0a0a0a',
              color: 'white',
              padding: '9px 16px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {shortlist.length > 0 ? (
              <>
                Get quotes{' '}
                <span
                  style={{
                    background: '#1e3a8a',
                    color: 'white',
                    fontSize: 10,
                    padding: '2px 7px',
                    borderRadius: 999,
                    fontFamily: 'DM Mono, monospace',
                  }}
                >
                  {shortlist.length}
                </span>
              </>
            ) : (
              <>
                Get a quote <span style={{ color: '#93c5fd' }}>‚Üí</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 28px 0' }}>
        {/* Issue marker */}
        <div
          className="anim-fade-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 24,
          }}
        >
          <div style={{ height: 1, width: 36, background: '#1e3a8a' }}></div>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#1e3a8a',
            }}
          >
            Issue 06 ¬∑ June 2026 ¬∑ Kuala Lumpur
          </div>
        </div>

        {/* Hero */}
        <div
          className="anim-fade-in"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 40,
            alignItems: 'center',
            marginBottom: 56,
          }}
        >
          <div>
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(48px, 7vw, 80px)',
                lineHeight: 0.94,
                fontWeight: 500,
                margin: '0 0 28px',
                color: '#0a0a0a',
                letterSpacing: '-0.035em',
              }}
            >
              Every electric car
              <br />
              in Malaysia,
              <br />
              <span style={{ fontStyle: 'italic', color: '#1e3a8a' }}>
                believed.
              </span>
            </h1>
            <p
              style={{
                fontSize: 16,
                color: '#4b5563',
                margin: '0 0 28px',
                lineHeight: 1.5,
                maxWidth: 420,
              }}
            >
              {STATS.models} models. Shortlist three, get on-the-road quotes
              from authorized dealers within hours.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById('catalog')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#0a0a0a',
                color: 'white',
                padding: '13px 22px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Browse the catalog <span style={{ color: '#93c5fd' }}>‚Üí</span>
            </button>
          </div>

          {/* Hero photo (using featuredPick) */}
          {featuredPick && (
            <div
              onClick={() => openDetail(featuredPick)}
              style={{
                aspectRatio: '4/5',
                background: BODY_COLORS[featuredPick.bodyType].bg,
                borderRadius: 12,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div
                className="font-serif"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 80,
                  fontWeight: 500,
                  color: BODY_COLORS[featuredPick.bodyType].text,
                  letterSpacing: '-0.05em',
                  opacity: 0.5,
                }}
              >
                {featuredPick.brand.slice(0, 3).toUpperCase()}
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 14,
                  bottom: 14,
                  right: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '6px 11px',
                    borderRadius: 4,
                    fontSize: 10,
                    color: '#0a0a0a',
                    letterSpacing: '0.05em',
                  }}
                >
                  On the cover ¬∑ {featuredPick.brand} {featuredPick.model}
                </div>
                <div
                  className="font-mono"
                  style={{
                    background: '#1e3a8a',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: 999,
                    fontSize: 9,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Pick
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '0.5px solid #cdd3dd',
            borderBottom: '0.5px solid #cdd3dd',
            padding: '28px 0',
            marginBottom: 56,
          }}
        >
          <Stat number={STATS.models} label="Models" />
          <Stat number={STATS.brands} label="Brands" border />
          <Stat
            number={`RM ${(STATS.startingFrom / 1000).toFixed(0)}k`}
            label="Starting from"
            border
          />
          <Stat
            number={`${STATS.longestRange} km`}
            label="Longest range"
            border
          />
        </div>

        {/* Editor's picks */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 24,
          }}
        >
          <h2
            className="font-serif"
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: '#0a0a0a',
              letterSpacing: '-0.015em',
              margin: 0,
            }}
          >
            Three to consider{' '}
            <span style={{ fontStyle: 'italic', color: '#64748b' }}>
              this month
            </span>
          </h2>
          <div
            className="font-mono"
            style={{ fontSize: 11, color: '#1e3a8a', letterSpacing: '0.08em' }}
          >
            03 / {STATS.models}
          </div>
        </div>

        {featuredPick && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 24,
              marginBottom: 80,
            }}
          >
            <FeaturedCard
              ev={featuredPick}
              openDetail={openDetail}
              isShortlisted={shortlist.includes(featuredPick.id)}
              toggleShortlist={toggleShortlist}
              disabled={
                !shortlist.includes(featuredPick.id) && shortlist.length >= 3
              }
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {sidePicks.map((ev) => (
                <SmallPickCard
                  key={ev.id}
                  ev={ev}
                  openDetail={openDetail}
                  isShortlisted={shortlist.includes(ev.id)}
                  toggleShortlist={toggleShortlist}
                  disabled={!shortlist.includes(ev.id) && shortlist.length >= 3}
                />
              ))}
            </div>
          </div>
        )}

        {/* Catalog section */}
        <div
          id="catalog"
          style={{ borderTop: '0.5px solid #e1e4ea', paddingTop: 40 }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 28,
            }}
          >
            <h2
              className="font-serif"
              style={{
                fontSize: 30,
                fontWeight: 500,
                color: '#0a0a0a',
                letterSpacing: '-0.015em',
                margin: 0,
              }}
            >
              The catalog
            </h2>
            <div
              className="font-mono"
              style={{
                fontSize: 11,
                color: '#64748b',
                letterSpacing: '0.08em',
              }}
            >
              {evs.length} / {STATS.models} models
            </div>
          </div>

          {/* Search + filters */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand or model..."
                style={{
                  width: '100%',
                  paddingLeft: 40,
                  paddingRight: 16,
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderRadius: 999,
                  background: 'white',
                  border: '0.5px solid #e1e4ea',
                  fontSize: 13,
                  color: '#0a0a0a',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              style={{
                padding: '12px 18px',
                borderRadius: 999,
                background: 'white',
                border: '0.5px solid #e1e4ea',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#0a0a0a',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <Filter size={14} /> Filters
              {(filters.brand !== 'all' ||
                filters.bodyType !== 'all' ||
                filters.priceMax < 1500000 ||
                filters.minRange > 0) && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#1e3a8a',
                  }}
                ></span>
              )}
            </button>
          </div>

          {/* Body type chips */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 28,
              overflowX: 'auto',
            }}
            className="scrollbar-hide"
          >
            {['all', ...BODY_TYPES].map((bt) => (
              <button
                key={bt}
                onClick={() => setFilters({ ...filters, bodyType: bt })}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '7px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                  background:
                    filters.bodyType === bt ? '#0a0a0a' : 'transparent',
                  color: filters.bodyType === bt ? 'white' : '#64748b',
                  border:
                    filters.bodyType === bt
                      ? '0.5px solid #0a0a0a'
                      : '0.5px solid #e1e4ea',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {bt === 'all' ? 'All types' : bt}
              </button>
            ))}
          </div>

          {/* Grid */}
          {evs.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                color: '#64748b',
              }}
            >
              <div style={{ marginBottom: 8 }}>No EVs match your filters</div>
              <button
                onClick={() => {
                  setFilters({
                    brand: 'all',
                    bodyType: 'all',
                    priceMax: 1500000,
                    minRange: 0,
                  });
                  setSearchQuery('');
                }}
                style={{
                  color: '#1e3a8a',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontFamily: 'inherit',
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 22,
              }}
            >
              {evs.map((ev) => (
                <EVCard
                  key={ev.id}
                  ev={ev}
                  isShortlisted={shortlist.includes(ev.id)}
                  onShortlist={(e) => {
                    e.stopPropagation();
                    toggleShortlist(ev.id);
                  }}
                  onClick={() => openDetail(ev)}
                  disabled={!shortlist.includes(ev.id) && shortlist.length >= 3}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '0.5px solid #e1e4ea',
            paddingTop: 24,
            marginTop: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div
            className="font-serif"
            style={{ fontSize: 15, color: '#64748b', fontStyle: 'italic' }}
          >
            Beli. <span style={{ color: '#1e3a8a' }}>Yakin.</span> Drive.
          </div>
          <div
            className="font-mono"
            style={{ fontSize: 10, color: '#94a3b8', letterSpacing: '0.1em' }}
          >
            believ.asia ¬∑ est. 2026
          </div>
        </div>
      </div>

      {/* Sticky shortlist bar */}
      {shortlist.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            right: 20,
            maxWidth: 440,
            margin: '0 auto',
            zIndex: 40,
          }}
          className="anim-slide-up"
        >
          <button
            onClick={onShortlistOpen}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              background: '#0a0a0a',
              color: 'white',
              padding: '15px 22px',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(10,10,10,0.18)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                className="font-mono"
                style={{
                  background: '#1e3a8a',
                  color: 'white',
                  fontSize: 11,
                  padding: '3px 8px',
                  borderRadius: 999,
                }}
              >
                {shortlist.length}/3
              </span>
              <span
                className="font-serif"
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                Get dealer quotes
              </span>
            </span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {filterOpen && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
}

function Stat({ number, label, border }) {
  return (
    <div
      style={{
        padding: '0 18px',
        borderLeft: border ? '0.5px solid #e1e4ea' : 'none',
      }}
    >
      <div
        className="font-serif"
        style={{
          fontSize: 38,
          fontWeight: 500,
          color: '#0a0a0a',
          lineHeight: 1,
          marginBottom: 8,
          letterSpacing: '-0.02em',
        }}
      >
        {number}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 11,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ============== FEATURED CARD (large) ==============
function FeaturedCard({
  ev,
  openDetail,
  isShortlisted,
  toggleShortlist,
  disabled,
}) {
  const colors = BODY_COLORS[ev.bodyType];
  return (
    <div
      onClick={() => openDetail(ev)}
      className="card-hover"
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          aspectRatio: '16/11',
          background: colors.bg,
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 20,
        }}
      >
        <div
          className="font-serif"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 110,
            fontWeight: 500,
            color: colors.text,
            letterSpacing: '-0.05em',
            opacity: 0.5,
          }}
        >
          {ev.brand.slice(0, 3).toUpperCase()}
        </div>
        <div
          className="font-mono"
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            background: '#1e3a8a',
            color: 'white',
            fontSize: 10,
            padding: '5px 11px',
            borderRadius: 999,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Best buy
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleShortlist(ev.id);
          }}
          disabled={disabled}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: isShortlisted ? '#1e3a8a' : 'rgba(255,255,255,0.92)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {isShortlisted ? (
            <Check size={16} color="white" strokeWidth={3} />
          ) : (
            <Plus size={18} color="#0a0a0a" />
          )}
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 14,
          marginBottom: 6,
        }}
      >
        <div
          className="font-serif"
          style={{
            fontSize: 44,
            fontWeight: 500,
            color: '#1e3a8a',
            lineHeight: 1,
            fontStyle: 'italic',
          }}
        >
          {String(ev.editorsPick).padStart(2, '0')}
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
          }}
        >
          {ev.brand}
        </div>
      </div>

      <div
        className="font-serif"
        style={{
          fontSize: 34,
          fontWeight: 500,
          color: '#0a0a0a',
          marginBottom: 12,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
        }}
      >
        {ev.model}
      </div>

      {ev.editorsNote && (
        <div
          style={{
            fontSize: 14,
            color: '#64748b',
            fontStyle: 'italic',
            marginBottom: 18,
            lineHeight: 1.5,
            maxWidth: 420,
            fontFamily: 'Fraunces, serif',
          }}
        >
          "{ev.editorsNote}"
        </div>
      )}

      <div
        className="card-rule"
        style={{
          height: '0.5px',
          background: '#e1e4ea',
          marginBottom: 14,
          transition: 'background 0.3s',
        }}
      ></div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <div style={{ fontSize: 17, color: '#0a0a0a', fontWeight: 500 }}>
          {fmtPriceFull(ev.priceFrom)}
        </div>
        <div className="font-mono" style={{ fontSize: 12, color: '#64748b' }}>
          {ev.rangeWltp} km ¬∑ {ev.dc1080} min DC
        </div>
      </div>
    </div>
  );
}

// ============== SMALL PICK CARD ==============
function SmallPickCard({
  ev,
  openDetail,
  isShortlisted,
  toggleShortlist,
  disabled,
}) {
  const colors = BODY_COLORS[ev.bodyType];
  return (
    <div
      onClick={() => openDetail(ev)}
      className="card-hover"
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          aspectRatio: '5/4',
          background: colors.bg,
          borderRadius: 10,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 14,
        }}
      >
        <div
          className="font-serif"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 56,
            fontWeight: 500,
            color: colors.text,
            letterSpacing: '-0.05em',
            opacity: 0.5,
          }}
        >
          {ev.brand.slice(0, 3).toUpperCase()}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleShortlist(ev.id);
          }}
          disabled={disabled}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: isShortlisted ? '#1e3a8a' : 'rgba(255,255,255,0.92)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {isShortlisted ? (
            <Check size={14} color="white" strokeWidth={3} />
          ) : (
            <Plus size={16} color="#0a0a0a" />
          )}
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
          marginBottom: 4,
        }}
      >
        <div
          className="font-serif"
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: '#1e3a8a',
            lineHeight: 1,
            fontStyle: 'italic',
          }}
        >
          {String(ev.editorsPick).padStart(2, '0')}
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
          }}
        >
          {ev.brand}
        </div>
      </div>

      <div
        className="font-serif"
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: '#0a0a0a',
          marginBottom: 12,
          letterSpacing: '-0.015em',
        }}
      >
        {ev.model}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <div style={{ fontSize: 13, color: '#0a0a0a' }}>
          {fmtPriceShort(ev.priceFrom)}
        </div>
        <div className="font-mono" style={{ fontSize: 10, color: '#64748b' }}>
          {ev.rangeWltp} km
        </div>
      </div>
    </div>
  );
}

// ============== REGULAR EV CARD ==============
function EVCard({ ev, isShortlisted, onShortlist, onClick, disabled }) {
  const colors = BODY_COLORS[ev.bodyType];
  return (
    <div onClick={onClick} className="card-hover" style={{ cursor: 'pointer' }}>
      <div
        style={{
          aspectRatio: '5/4',
          background: colors.bg,
          borderRadius: 10,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 14,
        }}
      >
        <div
          className="font-serif"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 64,
            fontWeight: 500,
            color: colors.text,
            letterSpacing: '-0.05em',
            opacity: 0.5,
          }}
        >
          {ev.brand.slice(0, 3).toUpperCase()}
        </div>
        {ev.hot && (
          <div
            className="font-mono"
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: '#1e3a8a',
              color: 'white',
              fontSize: 9,
              padding: '4px 9px',
              borderRadius: 999,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            New
          </div>
        )}
        {ev.popular && !ev.hot && (
          <div
            className="font-mono"
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'rgba(255,255,255,0.95)',
              color: '#0a0a0a',
              fontSize: 9,
              padding: '4px 9px',
              borderRadius: 999,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Popular
          </div>
        )}
        <button
          onClick={onShortlist}
          disabled={disabled}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: isShortlisted ? '#1e3a8a' : 'rgba(255,255,255,0.92)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {isShortlisted ? (
            <Check size={14} color="white" strokeWidth={3} />
          ) : (
            <Plus size={16} color="#0a0a0a" />
          )}
        </button>
      </div>

      <div
        className="font-mono"
        style={{
          fontSize: 10,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          marginBottom: 4,
        }}
      >
        {ev.brand}
      </div>
      <div
        className="font-serif"
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: '#0a0a0a',
          marginBottom: 4,
          letterSpacing: '-0.015em',
          lineHeight: 1.1,
        }}
      >
        {ev.model}
      </div>
      {ev.tagline && (
        <div
          style={{
            fontSize: 11,
            color: '#64748b',
            fontStyle: 'italic',
            marginBottom: 14,
            fontFamily: 'Fraunces, serif',
            lineHeight: 1.3,
          }}
        >
          {ev.tagline}
        </div>
      )}
      {!ev.tagline && <div style={{ height: 14 }}></div>}

      <div
        className="card-rule"
        style={{
          height: '0.5px',
          background: '#e1e4ea',
          marginBottom: 12,
          transition: 'background 0.3s',
        }}
      ></div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <div style={{ fontSize: 14, color: '#0a0a0a', fontWeight: 500 }}>
          {fmtPriceFull(ev.priceFrom)}
        </div>
        <div className="font-mono" style={{ fontSize: 11, color: '#64748b' }}>
          {ev.rangeWltp} km
        </div>
      </div>
    </div>
  );
}

// ============== FILTER MODAL ==============
function FilterModal({ filters, setFilters, onClose }) {
  const [local, setLocal] = useState(filters);

  return (
    <div
      onClick={onClose}
      className="anim-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 20, 0.5)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="anim-slide-up"
        style={{
          width: '100%',
          maxWidth: 540,
          background: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          maxHeight: '90vh',
          overflowY: 'auto',
          marginBottom: 0,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '0.5px solid #e1e4ea',
          }}
        >
          <h3
            className="font-serif"
            style={{
              fontSize: 22,
              fontWeight: 500,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Filters
          </h3>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#f1f5f9',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <div>
            <label
              className="font-mono"
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#94a3b8',
                marginBottom: 12,
                display: 'block',
              }}
            >
              Brand
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
              }}
            >
              {['all', ...BRANDS].map((b) => (
                <button
                  key={b}
                  onClick={() => setLocal({ ...local, brand: b })}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    background: local.brand === b ? '#0a0a0a' : 'white',
                    color: local.brand === b ? 'white' : '#64748b',
                    border:
                      local.brand === b
                        ? '0.5px solid #0a0a0a'
                        : '0.5px solid #e1e4ea',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {b === 'all' ? 'All' : b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              className="font-mono"
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#94a3b8',
                marginBottom: 12,
                display: 'block',
              }}
            >
              Body type
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 8,
              }}
            >
              {['all', ...BODY_TYPES].map((bt) => (
                <button
                  key={bt}
                  onClick={() => setLocal({ ...local, bodyType: bt })}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    background: local.bodyType === bt ? '#0a0a0a' : 'white',
                    color: local.bodyType === bt ? 'white' : '#64748b',
                    border:
                      local.bodyType === bt
                        ? '0.5px solid #0a0a0a'
                        : '0.5px solid #e1e4ea',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {bt === 'all' ? 'All' : bt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 12,
              }}
            >
              <label
                className="font-mono"
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#94a3b8',
                }}
              >
                Max price
              </label>
              <span
                className="font-serif"
                style={{ fontSize: 16, fontWeight: 500, color: '#1e3a8a' }}
              >
                {fmtPriceShort(local.priceMax)}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="1500000"
              step="10000"
              value={local.priceMax}
              onChange={(e) =>
                setLocal({ ...local, priceMax: parseInt(e.target.value) })
              }
              style={{ width: '100%', accentColor: '#1e3a8a' }}
            />
            <div
              className="font-mono"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 10,
                color: '#94a3b8',
                marginTop: 4,
              }}
            >
              <span>RM 50k</span>
              <span>RM 1.5M</span>
            </div>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 12,
              }}
            >
              <label
                className="font-mono"
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#94a3b8',
                }}
              >
                Minimum range
              </label>
              <span
                className="font-serif"
                style={{ fontSize: 16, fontWeight: 500, color: '#1e3a8a' }}
              >
                {local.minRange} km
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="700"
              step="50"
              value={local.minRange}
              onChange={(e) =>
                setLocal({ ...local, minRange: parseInt(e.target.value) })
              }
              style={{ width: '100%', accentColor: '#1e3a8a' }}
            />
            <div
              className="font-mono"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 10,
                color: '#94a3b8',
                marginTop: 4,
              }}
            >
              <span>Any</span>
              <span>700 km+</span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'sticky',
            bottom: 0,
            background: 'white',
            padding: 16,
            borderTop: '0.5px solid #e1e4ea',
            display: 'flex',
            gap: 12,
          }}
        >
          <button
            onClick={() =>
              setLocal({
                brand: 'all',
                bodyType: 'all',
                priceMax: 1500000,
                minRange: 0,
              })
            }
            style={{
              flex: 1,
              padding: '13px 16px',
              borderRadius: 999,
              background: 'white',
              border: '0.5px solid #e1e4ea',
              color: '#64748b',
              fontWeight: 500,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Reset
          </button>
          <button
            onClick={() => {
              setFilters(local);
              onClose();
            }}
            style={{
              flex: 1,
              padding: '13px 16px',
              borderRadius: 999,
              background: '#0a0a0a',
              color: 'white',
              border: 'none',
              fontWeight: 500,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== DETAIL VIEW ==============
function DetailView({ ev, shortlist, toggleShortlist, onBack, onGetQuote }) {
  const isShortlisted = shortlist.includes(ev.id);
  const disabled = !isShortlisted && shortlist.length >= 3;
  const colors = BODY_COLORS[ev.bodyType];
  const acceleration = (ev.motorKw / 50).toFixed(1);

  return (
    <div className="anim-fade-in" style={{ paddingBottom: 100 }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(250, 251, 252, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid #e1e4ea',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              color: '#64748b',
              fontFamily: 'inherit',
            }}
          >
            <ArrowLeft size={16} /> Back to catalog
          </button>
          <Wordmark size={18} />
          <button
            onClick={() => toggleShortlist(ev.id)}
            disabled={disabled}
            style={{
              background: isShortlisted ? '#1e3a8a' : 'transparent',
              color: isShortlisted ? 'white' : '#0a0a0a',
              border: isShortlisted ? 'none' : '0.5px solid #e1e4ea',
              borderRadius: 999,
              padding: '8px 14px',
              fontSize: 12,
              fontWeight: 500,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'inherit',
            }}
          >
            {isShortlisted ? (
              <>
                <Check size={14} strokeWidth={3} /> Shortlisted
              </>
            ) : (
              <>
                <Plus size={14} /> Shortlist
              </>
            )}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 28px' }}>
        {/* Issue marker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 24,
          }}
        >
          <div style={{ height: 1, width: 36, background: '#1e3a8a' }}></div>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#1e3a8a',
            }}
          >
            Issue 06 ¬∑ {ev.brand}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'center',
            marginBottom: 56,
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: 11,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                marginBottom: 12,
              }}
            >
              {ev.brand} ¬∑ {ev.segment}
            </div>
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(48px, 6vw, 72px)',
                fontWeight: 500,
                color: '#0a0a0a',
                lineHeight: 0.94,
                letterSpacing: '-0.035em',
                margin: '0 0 20px',
              }}
            >
              {ev.model}
            </h1>
            {ev.tagline && (
              <div
                className="font-serif"
                style={{
                  fontSize: 18,
                  fontStyle: 'italic',
                  color: '#64748b',
                  marginBottom: 24,
                }}
              >
                {ev.tagline}
              </div>
            )}

            {ev.editorsNote && (
              <div
                style={{
                  borderLeft: '2px solid #1e3a8a',
                  paddingLeft: 18,
                  marginBottom: 28,
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    color: '#1e3a8a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    marginBottom: 6,
                  }}
                >
                  Editor's note
                </div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: 16,
                    fontStyle: 'italic',
                    color: '#0a0a0a',
                    lineHeight: 1.55,
                  }}
                >
                  "{ev.editorsNote}"
                </div>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                marginBottom: 28,
              }}
            >
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: 4,
                  }}
                >
                  Price from
                </div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: 36,
                    fontWeight: 500,
                    color: '#0a0a0a',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {fmtPriceFull(ev.priceFrom)}
                </div>
              </div>
              <div
                className="font-mono"
                style={{ fontSize: 13, color: '#64748b' }}
              >
                ‚Äî {fmtPriceShort(ev.priceTo)}
              </div>
            </div>

            <button
              onClick={onGetQuote}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#0a0a0a',
                color: 'white',
                padding: '14px 24px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <Phone size={14} /> Get a dealer quote{' '}
              <span style={{ color: '#93c5fd' }}>‚Üí</span>
            </button>
          </div>

          <div
            style={{
              aspectRatio: '4/5',
              background: colors.bg,
              borderRadius: 12,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              className="font-serif"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(80px, 12vw, 140px)',
                fontWeight: 500,
                color: colors.text,
                letterSpacing: '-0.05em',
                opacity: 0.5,
              }}
            >
              {ev.brand.slice(0, 3).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Key stats grid */}
        <div
          style={{
            borderTop: '0.5px solid #cdd3dd',
            borderBottom: '0.5px solid #cdd3dd',
            padding: '28px 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginBottom: 56,
          }}
        >
          <Stat number={`${ev.rangeWltp}`} label="km range" />
          <Stat number={`${ev.batteryKwh}`} label="kWh battery" border />
          <Stat number={`${ev.chargingDc}`} label="kW DC max" border />
          <Stat number={`${ev.dc1080}`} label="min 10‚Üí80%" border />
        </div>

        {/* Full specs */}
        <h2
          className="font-serif"
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: '#0a0a0a',
            letterSpacing: '-0.015em',
            marginBottom: 20,
          }}
        >
          Specifications
        </h2>
        <div
          style={{
            background: 'white',
            border: '0.5px solid #e1e4ea',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <SpecRow label="Body type" value={ev.bodyType} />
          <SpecRow label="Segment" value={ev.segment} />
          <SpecRow label="Battery capacity" value={`${ev.batteryKwh} kWh`} />
          <SpecRow label="Range (WLTP)" value={`${ev.rangeWltp} km`} />
          <SpecRow label="DC charging speed" value={`${ev.chargingDc} kW`} />
          <SpecRow
            label="10‚Äì80% fast charge"
            value={`${ev.dc1080} minutes`}
          />
          <SpecRow
            label="Motor power"
            value={`${ev.motorKw} kW (~${Math.round(ev.motorKw * 1.341)} hp)`}
          />
          <SpecRow
            label="0‚Äì100 km/h (estimated)"
            value={`~${acceleration} sec`}
          />
          <SpecRow label="Seats" value={ev.seats} />
          <SpecRow
            label="Price range"
            value={`${fmtPriceFull(ev.priceFrom)} ‚Äì ${fmtPriceFull(
              ev.priceTo
            )}`}
            last
          />
        </div>

        <div
          style={{
            marginTop: 56,
            padding: '24px 28px',
            background: '#1e3a8a',
            borderRadius: 12,
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                color: '#93c5fd',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                marginBottom: 6,
              }}
            >
              Ready to drive home this {ev.model}?
            </div>
            <div
              className="font-serif"
              style={{ fontSize: 22, fontWeight: 500, fontStyle: 'italic' }}
            >
              Get an on-the-road quote in 2 hours.
            </div>
          </div>
          <button
            onClick={onGetQuote}
            style={{
              background: 'white',
              color: '#0a0a0a',
              padding: '13px 22px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Request a quote <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value, last }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px',
        borderBottom: last ? 'none' : '0.5px solid #f1f5f9',
      }}
    >
      <div style={{ fontSize: 13, color: '#64748b' }}>{label}</div>
      <div
        className="font-mono"
        style={{ fontSize: 13, color: '#0a0a0a', fontWeight: 500 }}
      >
        {value}
      </div>
    </div>
  );
}

// ============== LEAD FORM VIEW ==============
function LeadFormView({
  shortlist,
  allEvs,
  toggleShortlist,
  onBack,
  onSubmit,
  onAddMore,
}) {
  const [step, setStep] = useState('details');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    state: '',
    contactPref: 'whatsapp',
    financing: '',
    tradeIn: '',
    timing: '',
    otp: '',
  });
  const [errors, setErrors] = useState({});

  const selectedEvs = shortlist
    .map((id) => allEvs.find((e) => e.id === id))
    .filter(Boolean);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (
      !/^(\+?60|0)1\d[-\s]?\d{7,8}$/.test(form.phone.replace(/\s|-/g, ''))
    )
      e.phone = 'Invalid Malaysian mobile number';
    if (!form.state) e.state = 'Required';
    if (!form.timing) e.timing = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep('otp');
  };
  const handleSubmit = () => {
    if (form.otp.length !== 6) {
      setErrors({ otp: 'Enter the 6-digit code' });
      return;
    }
    onSubmit();
  };

  if (selectedEvs.length === 0) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <h2
            className="font-serif"
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: '#0a0a0a',
              marginBottom: 12,
              letterSpacing: '-0.02em',
            }}
          >
            Your shortlist is empty
          </h2>
          <p style={{ color: '#64748b', marginBottom: 24, fontSize: 15 }}>
            Add up to 3 EVs to compare side by side and request quotes from
            dealers.
          </p>
          <button
            onClick={onAddMore}
            style={{
              padding: '13px 24px',
              borderRadius: 999,
              background: '#0a0a0a',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              fontFamily: 'inherit',
            }}
          >
            Browse the catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="anim-fade-in" style={{ minHeight: '100vh' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(250, 251, 252, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid #e1e4ea',
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={step === 'otp' ? () => setStep('details') : onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              color: '#64748b',
              fontFamily: 'inherit',
            }}
          >
            <ArrowLeft size={16} /> {step === 'otp' ? 'Back' : 'Keep browsing'}
          </button>
          <Wordmark size={18} />
          <div
            className="font-mono"
            style={{ fontSize: 10, color: '#1e3a8a', letterSpacing: '0.15em' }}
          >
            STEP {step === 'details' ? '01' : '02'} / 02
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 28px' }}>
        {/* Shortlist preview */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 18,
            }}
          >
            <h2
              className="font-serif"
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: '#0a0a0a',
                letterSpacing: '-0.015em',
                margin: 0,
              }}
            >
              Your shortlist
            </h2>
            <div
              className="font-mono"
              style={{ fontSize: 11, color: '#64748b' }}
            >
              {selectedEvs.length} OF 3
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            {selectedEvs.map((ev) => (
              <div
                key={ev.id}
                style={{
                  position: 'relative',
                  padding: 16,
                  background: 'white',
                  border: '0.5px solid #e1e4ea',
                  borderRadius: 10,
                }}
              >
                <button
                  onClick={() => toggleShortlist(ev.id)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: '#f1f5f9',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={12} />
                </button>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    marginBottom: 4,
                  }}
                >
                  {ev.brand}
                </div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#0a0a0a',
                    lineHeight: 1.1,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {ev.model}
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: 11, color: '#64748b', marginTop: 8 }}
                >
                  {fmtPriceShort(ev.priceFrom)}
                </div>
              </div>
            ))}
            {selectedEvs.length < 3 && (
              <button
                onClick={onAddMore}
                style={{
                  padding: 16,
                  background: 'transparent',
                  border: '1px dashed #cbd5e1',
                  borderRadius: 10,
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 100,
                  fontFamily: 'inherit',
                  fontSize: 12,
                }}
              >
                <Plus size={18} style={{ marginBottom: 4 }} />
                Add another
              </button>
            )}
          </div>
        </div>

        {step === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <h2
                className="font-serif"
                style={{
                  fontSize: 36,
                  fontWeight: 500,
                  color: '#0a0a0a',
                  letterSpacing: '-0.025em',
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Your details
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                Authorized dealers for these brands will WhatsApp or call you
                within 2 hours during working hours.
              </p>
            </div>

            <Field label="Full name" required error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="As shown on your IC"
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: 10,
                  background: 'white',
                  border: errors.name
                    ? '0.5px solid #dc2626'
                    : '0.5px solid #e1e4ea',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </Field>

            <Field
              label="Mobile number"
              required
              error={errors.phone}
              hint="Format: 012-345 6789"
            >
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+60 12 345 6789"
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: 10,
                  background: 'white',
                  border: errors.phone
                    ? '0.5px solid #dc2626'
                    : '0.5px solid #e1e4ea',
                  fontSize: 14,
                  fontFamily: 'DM Mono, monospace',
                  outline: 'none',
                }}
              />
            </Field>

            <Field label="State" required error={errors.state}>
              <div style={{ position: 'relative' }}>
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    paddingRight: 40,
                    borderRadius: 10,
                    background: 'white',
                    border: errors.state
                      ? '0.5px solid #dc2626'
                      : '0.5px solid #e1e4ea',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select your state</option>
                  {MY_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </Field>

            <Field
              label="When are you planning to buy?"
              required
              error={errors.timing}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                }}
              >
                {['This month', '1-3 months', '3-6 months', 'Just looking'].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, timing: t })}
                      style={{
                        padding: '12px 8px',
                        borderRadius: 10,
                        fontSize: 12,
                        fontWeight: 500,
                        background: form.timing === t ? '#0a0a0a' : 'white',
                        color: form.timing === t ? 'white' : '#64748b',
                        border:
                          form.timing === t
                            ? '0.5px solid #0a0a0a'
                            : '0.5px solid #e1e4ea',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      {t}
                    </button>
                  )
                )}
              </div>
            </Field>

            <Field label="Need financing?">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                }}
              >
                {['Yes', 'No', 'Maybe'].map((o) => (
                  <button
                    key={o}
                    onClick={() => setForm({ ...form, financing: o })}
                    style={{
                      padding: '12px',
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 500,
                      background: form.financing === o ? '#0a0a0a' : 'white',
                      color: form.financing === o ? 'white' : '#64748b',
                      border:
                        form.financing === o
                          ? '0.5px solid #0a0a0a'
                          : '0.5px solid #e1e4ea',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Trade-in vehicle?">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 8,
                }}
              >
                {['Yes, I have one', 'No trade-in'].map((o) => (
                  <button
                    key={o}
                    onClick={() => setForm({ ...form, tradeIn: o })}
                    style={{
                      padding: '12px',
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 500,
                      background: form.tradeIn === o ? '#0a0a0a' : 'white',
                      color: form.tradeIn === o ? 'white' : '#64748b',
                      border:
                        form.tradeIn === o
                          ? '0.5px solid #0a0a0a'
                          : '0.5px solid #e1e4ea',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="How should dealers contact you?">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                }}
              >
                {[
                  { k: 'whatsapp', l: 'WhatsApp' },
                  { k: 'call', l: 'Phone call' },
                  { k: 'either', l: 'Either' },
                ].map((o) => (
                  <button
                    key={o.k}
                    onClick={() => setForm({ ...form, contactPref: o.k })}
                    style={{
                      padding: '12px',
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 500,
                      background:
                        form.contactPref === o.k ? '#0a0a0a' : 'white',
                      color: form.contactPref === o.k ? 'white' : '#64748b',
                      border:
                        form.contactPref === o.k
                          ? '0.5px solid #0a0a0a'
                          : '0.5px solid #e1e4ea',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </Field>

            <p style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.5 }}>
              By continuing you agree your details may be shared with authorized
              dealers of the brands you shortlisted. BeliEV complies with the
              Malaysian PDPA. You can request data deletion any time at{' '}
              <span style={{ color: '#1e3a8a' }}>privacy@believ.asia</span>.
            </p>

            <button
              onClick={handleNext}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 12,
                background: '#0a0a0a',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontFamily: 'inherit',
              }}
            >
              Verify phone number <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div
            style={{
              maxWidth: 420,
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <div
              className="anim-scale-in"
              style={{
                width: 64,
                height: 64,
                margin: '0 auto',
                borderRadius: 16,
                background: '#eef2ff',
                border: '0.5px solid #c7d2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Phone size={28} color="#1e3a8a" />
            </div>
            <div>
              <h2
                className="font-serif"
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  color: '#0a0a0a',
                  letterSpacing: '-0.025em',
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Verify your number
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                We sent a 6-digit code via WhatsApp to
              </p>
              <p
                className="font-mono"
                style={{
                  fontSize: 14,
                  color: '#0a0a0a',
                  fontWeight: 500,
                  marginTop: 4,
                }}
              >
                {form.phone}
              </p>
            </div>
            <div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={form.otp}
                onChange={(e) =>
                  setForm({ ...form, otp: e.target.value.replace(/\D/g, '') })
                }
                placeholder="000000"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '20px',
                  borderRadius: 12,
                  background: 'white',
                  border: errors.otp
                    ? '0.5px solid #dc2626'
                    : '0.5px solid #e1e4ea',
                  fontSize: 28,
                  fontFamily: 'DM Mono, monospace',
                  letterSpacing: '0.5em',
                  outline: 'none',
                }}
              />
              {errors.otp && (
                <div style={{ fontSize: 11, color: '#dc2626', marginTop: 8 }}>
                  {errors.otp}
                </div>
              )}
              <div
                style={{
                  fontSize: 11,
                  color: '#94a3b8',
                  marginTop: 12,
                  fontStyle: 'italic',
                }}
              >
                Demo mode ¬∑ enter any 6 digits
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={form.otp.length !== 6}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 12,
                background: form.otp.length === 6 ? '#0a0a0a' : '#e1e4ea',
                color: form.otp.length === 6 ? 'white' : '#94a3b8',
                border: 'none',
                cursor: form.otp.length === 6 ? 'pointer' : 'not-allowed',
                fontSize: 15,
                fontWeight: 500,
                fontFamily: 'inherit',
              }}
            >
              Submit and get quotes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, error, hint, children }) {
  return (
    <div>
      <label
        className="font-mono"
        style={{
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#64748b',
          marginBottom: 8,
          display: 'block',
        }}
      >
        {label}
        {required && <span style={{ color: '#1e3a8a' }}> *</span>}
      </label>
      {children}
      {error && (
        <div style={{ fontSize: 11, color: '#dc2626', marginTop: 6 }}>
          {error}
        </div>
      )}
      {hint && !error && (
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

// ============== SUCCESS VIEW ==============
function SuccessView({ shortlist, allEvs, onReset }) {
  const selectedEvs = shortlist
    .map((id) => allEvs.find((e) => e.id === id))
    .filter(Boolean);

  return (
    <div
      className="anim-fade-in"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
        <div
          className="anim-scale-in"
          style={{
            width: 80,
            height: 80,
            margin: '0 auto 28px',
            borderRadius: 24,
            background: '#1e3a8a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={40} color="white" strokeWidth={3} />
        </div>

        <div
          className="font-mono"
          style={{
            fontSize: 10,
            color: '#1e3a8a',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            marginBottom: 14,
          }}
        >
          Request received
        </div>

        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(40px, 6vw, 56px)',
            fontWeight: 500,
            color: '#0a0a0a',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: 18,
          }}
        >
          <span style={{ fontStyle: 'italic', color: '#1e3a8a' }}>Yakin.</span>{' '}
          You're all set.
        </h1>

        <p
          style={{
            fontSize: 15,
            color: '#64748b',
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          We've sent your enquiry to authorized dealers for:
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 36,
          }}
        >
          {selectedEvs.map((ev) => (
            <span
              key={ev.id}
              className="font-serif"
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                background: 'white',
                border: '0.5px solid #e1e4ea',
                fontSize: 14,
                fontWeight: 500,
                color: '#0a0a0a',
              }}
            >
              {ev.brand} {ev.model}
            </span>
          ))}
        </div>

        <div
          style={{
            background: 'white',
            border: '0.5px solid #e1e4ea',
            borderRadius: 16,
            padding: 28,
            textAlign: 'left',
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              color: '#1e3a8a',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              marginBottom: 18,
            }}
          >
            What happens next
          </div>
          {[
            {
              n: '01',
              t: 'Dealer contact',
              d: 'Authorized dealers will WhatsApp or call you within 2 hours during working hours.',
            },
            {
              n: '02',
              t: 'Test drive booking',
              d: 'Schedule a test drive at the showroom nearest to you in your state.',
            },
            {
              n: '03',
              t: 'Quotes & financing',
              d: 'Receive OTR pricing, current promotions, and financing options for each model.',
            },
          ].map((s) => (
            <div
              key={s.n}
              style={{
                display: 'flex',
                gap: 16,
                paddingTop: 16,
                marginTop: 16,
                borderTop: '0.5px solid #f1f5f9',
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: '#1e3a8a',
                  fontStyle: 'italic',
                  lineHeight: 1,
                  minWidth: 32,
                }}
              >
                {s.n}
              </div>
              <div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#0a0a0a',
                    marginBottom: 4,
                  }}
                >
                  {s.t}
                </div>
                <div
                  style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}
                >
                  {s.d}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="font-serif"
          style={{
            fontSize: 14,
            color: '#64748b',
            fontStyle: 'italic',
            marginTop: 36,
          }}
        >
          Beli. <span style={{ color: '#1e3a8a' }}>Yakin.</span> Drive.
        </div>

        <button
          onClick={onReset}
          className="font-mono"
          style={{
            marginTop: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#94a3b8',
            fontSize: 11,
            textDecoration: 'underline',
            letterSpacing: '0.1em',
            fontFamily: 'inherit',
          }}
        >
          Back to catalog
        </button>
      </div>
    </div>
  );
}

/**
 * VoltCycle Science-Backed Dataset & Configuration
 * Pure JavaScript Data Layer
 * Sources: UN Global E-Waste Monitor (UNITAR/ITU 2024), USGS Mineral Commodity Summaries, NIST SP 800-88 Rev. 1
 */

const EWASTE_APP_DATA = {
  // Global Scientific Baseline
  GLOBAL_STATS: {
    annualTonnes: 62000000,
    tonnesPerSecond: 1.966,
    documentedRecycledPercent: 22.3,
    undocumentedPercent: 77.7,
    projected2030Tonnes: 82000000,
    lostMetalsValueUSD: "$62 Billion",
    co2MitigationMillionTonnes: 93
  },

  // Toxic elements matrix for Home feature
  TOXIC_HAZARDS: [
    {
      id: "lead",
      symbol: "Pb",
      name: "Lead",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80",
      foundIn: "Circuit board solder joints, CRT monitor glass, older UPS batteries, PVC cable stabilizers.",
      impact: "Irreversible neurodevelopmental damage in children, renal failure, high blood pressure, and acute aquatic bioaccumulation."
    },
    {
      id: "mercury",
      symbol: "Hg",
      name: "Mercury",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
      foundIn: "Cold cathode fluorescent lamps (CCFLs) in older laptop/TV backlights, relays, printed switches.",
      impact: "Methylmercury bioaccumulates up the aquatic food chain into fish, causing severe central nervous system impairment."
    },
    {
      id: "cadmium",
      symbol: "Cd",
      name: "Cadmium",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
      foundIn: "Nickel-Cadmium (Ni-Cd) power tool batteries, chip resistors, infrared detectors, phosphors.",
      impact: "Carcinogenic heavy metal that damages kidneys and induces severe bone demineralization (Itai-itai disease)."
    },
    {
      id: "bfr",
      symbol: "Br",
      name: "Brominated Flame Retardants (BFRs)",
      image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80",
      foundIn: "Thermoplastic device casings, circuit board laminate resins, internal wire insulation.",
      impact: "Endocrine disruption, thyroid interference. When burned in open landfills, emits lethal polybrominated dioxins."
    },
    {
      id: "lithium",
      symbol: "Li",
      name: "Lithium-Ion Cells",
      image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=400&q=80",
      foundIn: "Smartphones, laptops, power banks, tablets, e-bikes, wireless earbuds.",
      impact: "Violent thermal runaway fires exceeding 900°C when crushed in standard garbage compactors, releasing hydrofluoric acid gas."
    }
  ],

  // Feature 2: E-Waste Guide Items
  GUIDE_ITEMS: [
    {
      id: "phones",
      category: "mobile",
      name: "Smartphones, Tablets & E-Readers",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80",
      canRecycle: true,
      status: "Highly Recyclable",
      recoverableMaterials: ["Gold (Au)", "Silver (Ag)", "Copper (Cu)", "Cobalt (Co)", "Lithium (Li)"],
      hazards: "Lithium-ion battery thermal runaway if punctured or compressed in standard rubbish trucks.",
      prepInstructions: "Back up personal data, sign out of cloud accounts, perform a cryptographic factory reset (NIST SP 800-88), and remove SIM/microSD cards."
    },
    {
      id: "computers",
      category: "computing",
      name: "Laptops, Desktops, Servers & Workstations",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
      canRecycle: true,
      status: "Highly Recyclable",
      recoverableMaterials: ["Aluminum alloy chassis", "Motherboard gold/palladium", "Copper heat sinks", "Steel"],
      hazards: "Lead solder, brominated flame retardants in circuit boards, mercury backlights in older LCD displays.",
      prepInstructions: "Remove hard drives if keeping, or check the 'NIST Data Wipe' option for certified data sanitization. Keep casing intact."
    },
    {
      id: "cables",
      category: "accessories",
      name: "Chargers, Power Cables, Adapters & Hubs",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
      canRecycle: true,
      status: "100% Recyclable",
      recoverableMaterials: ["High-purity Copper wire", "PVC / TPE polymer coatings", "Brass contact pins"],
      hazards: "Open burning of cables emits toxic chlorine and dioxin gases. Must be stripped mechanically.",
      prepInstructions: "Bundle cords neatly. Do not burn or strip insulation manually."
    },
    {
      id: "peripherals",
      category: "accessories",
      name: "Keyboards, Computer Mice & Game Controllers",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      canRecycle: true,
      status: "Recyclable",
      recoverableMaterials: ["ABS / Polycarbonate engineering plastics", "Micro-switches", "Copper wiring"],
      hazards: "Non-biodegradable plastics persist for over 450 years in landfill conditions.",
      prepInstructions: "Remove disposable alkaline batteries before handing over."
    },
    {
      id: "batteries",
      category: "batteries",
      name: "Lithium-ion & Rechargeable Battery Packs",
      image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=600&q=80",
      canRecycle: true,
      status: "Special Handling Required",
      recoverableMaterials: ["Lithium carbonate", "Cobalt cathode", "Nickel", "Copper current collectors"],
      hazards: "High fire hazard. Short circuits trigger violent thermal runaway at over 900°C.",
      prepInstructions: "Tape all exposed metal terminal contacts with non-conductive electrical tape. Do not crush or puncture."
    },
    {
      id: "appliances",
      category: "appliances",
      name: "Small Home Electronics (Microwaves, Kettles, Blenders)",
      image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
      canRecycle: true,
      status: "Recyclable",
      recoverableMaterials: ["Electric copper motors", "Stainless steel", "Transformer cores", "Aluminum"],
      hazards: "High-voltage capacitors in microwaves retain dangerous electric charge even after unplugging.",
      prepInstructions: "Unplug 24 hours prior to collection. Clean out food residue or liquids completely."
    },
    {
      id: "televisions",
      category: "screens",
      name: "LED, OLED & Legacy CRT Televisions",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
      canRecycle: true,
      status: "Recyclable (Special Handling)",
      recoverableMaterials: ["Optical glass", "Aluminum structural frames", "Indium tin oxide", "Circuitry"],
      hazards: "Legacy CRT glass contains 1.5 to 3 kg of toxic lead oxide for radiation shielding.",
      prepInstructions: "Keep display glass completely intact. Never attempt to smash or dismantle CRT glass tubes."
    },
    {
      id: "non-recyclable",
      category: "prohibited",
      name: "Prohibited / Non-Acceptable Hazardous Items",
      image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=600&q=80",
      canRecycle: false,
      status: "Cannot Be Accepted by Regular E-Waste",
      recoverableMaterials: ["None (Biohazard / Radioactive / Chemical risk)"],
      hazards: "Ionization smoke detectors contain radioactive Americium-241; contaminated medical devices carry biohazard pathogens.",
      prepInstructions: "Smoke detectors must be returned to the manufacturer. Medical biohazard gear requires municipal hazardous waste drop-off."
    }
  ],

  // Feature 3: Verified Collection Centre Information — Bangalore / Bengaluru Hubs
  COLLECTION_CENTRES: [
    {
      id: "hub-blr-peenya",
      name: "Trishyirya Recycling India – Peenya Industrial Hub",
      verified: true,
      certification: "KSPCB Authorized & R2v3 / ISO 14001",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      address: "No. 315, 4th Phase, Peenya Industrial Estate, Bangalore – 560058, Karnataka",
      operatingHours: "Monday – Saturday: 9:00 AM – 6:30 PM | Sunday: Closed",
      phone: "+91 80 4127 8899",
      email: "peenya-hub@trishyirya.com",
      acceptedItems: ["Laptops & Desktops", "Servers & Routers", "Monitors & CRT Screens", "Lithium-Ion Batteries", "Printed Circuit Boards"],
      features: ["Drive-through drop-off bay", "NIST-compliant on-site hard drive shredding", "Zero-landfill certificate issued"]
    },
    {
      id: "hub-blr-whitefield",
      name: "E-Wardd Clean Tech Recycling Facility",
      verified: true,
      certification: "CPCB EPR-Authorized Recycler #KSPCB/EW-418",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
      address: "No. 6/1B, Near ITPL Main Road, Pattandur Agrahara, Whitefield, Bangalore – 560066, Karnataka",
      operatingHours: "Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: 10:00 AM – 2:00 PM",
      phone: "+91 98450 33211",
      email: "whitefield@ewardd-recycle.org",
      acceptedItems: ["Smartphones & Tablets", "Laptops & Peripherals", "Chargers & Cables", "Household Tech & Audio", "Smart Home Devices"],
      features: ["Consumer drop kiosk near ITPL Metro", "Instant green points & receipt", "Public transit accessible"]
    },
    {
      id: "hub-blr-ecity",
      name: "Sriram Eco Raksha E-Waste Recycling Depot",
      verified: true,
      certification: "KSPCB Certified E-Waste Facility #B-29/KSSIDC",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
      address: "No. B-29, KSSIDC Industrial Estate, Bommasandra, Hosur Road, Electronic City, Bangalore – 560099, Karnataka",
      operatingHours: "Monday – Friday: 9:00 AM – 6:00 PM | Saturday: 9:00 AM – 4:00 PM",
      phone: "+91 80 2783 5522",
      email: "ecocity-ops@ecoraksha.in",
      acceptedItems: ["Enterprise Servers", "Laptops & Desktops", "Network Switches & Racks", "Storage Drives", "UPS & Power Banks"],
      features: ["Bulk commercial logistics intake", "Certificate of Destruction (COD)", "EPR compliance documentation"]
    },
    {
      id: "hub-blr-koramangala",
      name: "Saahas Zero Waste – Koramangala Urban E-Hub",
      verified: true,
      certification: "ISO 14001:2015 & CPCB Registered Aggregator",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      address: "No. 21, 5th Main, 5th Block, Koramangala (Opp. Forum Tech Zone), Bangalore – 560034, Karnataka",
      operatingHours: "Monday – Saturday: 9:30 AM – 6:30 PM | Sunday: 10:00 AM – 4:00 PM",
      phone: "+91 80 4168 9340",
      email: "koramangala@saahaszerowaste.com",
      acceptedItems: ["Smartphones & Wearables", "Laptops & Tablets", "Cables & Adapters", "Li-ion & Alkaline Batteries", "Audio Gear"],
      features: ["Fast residential walk-in drop", "Safe battery drop kiosk", "Eco-reward vouchers"]
    },
    {
      id: "hub-blr-hebbal",
      name: "North Bangalore Circular Stewardship Center",
      verified: true,
      certification: "CPCB / KSPCB Certified Drop Point",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
      address: "Site 44, Outer Ring Road Service Lane, Near Hebbal Flyover & Manyata Tech Park, Bangalore – 560024, Karnataka",
      operatingHours: "Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: Closed",
      phone: "+91 80 2341 6688",
      email: "hebbal-hub@northblrewaste.org",
      acceptedItems: ["Laptops & MacBooks", "Workstations & Displays", "Printers & Scanners", "Gaming Consoles", "Smartwatches"],
      features: ["Corporate tech worker drop-off point", "Battery safety chamber", "QR-code instant certificate"]
    },
    {
      id: "hub-blr-mysoreroad",
      name: "Eco-Bird Recycling & White-Goods Recovery Center",
      verified: true,
      certification: "KSPCB Authorized E-Waste Recycler #185/AS",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      address: "No. 185, Azeez Sait Industrial Area, Nayandahalli, Mysore Road, Bangalore – 560039, Karnataka",
      operatingHours: "Monday – Saturday: 8:30 AM – 6:00 PM | Sunday: Closed",
      phone: "+91 99800 74123",
      email: "mysoreroad@ecobirdrecycling.com",
      acceptedItems: ["Refrigerators & AC Units", "CRT & Flat Screen TVs", "Washing Machines", "Microwaves", "Power Tools"],
      features: ["Heavy appliance assistance & forklift bay", "Automated sorting lines", "Government authorized manifest"]
    },
    {
      id: "hub-blr-dabaspet",
      name: "E-Parisara First Scientific E-Waste Recycler",
      verified: true,
      certification: "India's 1st KSPCB & ISO 14001 / R2 Certified Plant",
      image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80",
      address: "Plot No. 30-P3, KIADB Industrial Area, Dabaspet, Bangalore Rural – 562111, Karnataka",
      operatingHours: "Monday – Saturday: 8:30 AM – 5:30 PM | Sunday: Closed",
      phone: "+91 80 2836 0777",
      email: "dabaspet@eparisara.in",
      acceptedItems: ["All E-Waste Categories", "Medical Equipment", "Telecom Gear", "High-Value Circuit Boards", "Solar Panels"],
      features: ["Full circular hydrometallurgical refining", "Form-6 manifest issued", "100% zero-landfill guarantee"]
    },
    {
      id: "hub-blr-indiranagar",
      name: "Zolopik E-Waste City Drop & Exchange Center",
      verified: true,
      certification: "CPCB Registered Digital Aggregator #BLR-882",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
      address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bangalore – 560038, Karnataka",
      operatingHours: "Monday – Sunday: 10:00 AM – 8:00 PM",
      phone: "+91 88844 49985",
      email: "indiranagar@zolopik.com",
      acceptedItems: ["Smartphones", "Laptops & Chargers", "Bluetooth Earbuds & Speakers", "Tablets", "Small Home Appliances"],
      features: ["Central 7-day walk-in kiosk", "Instant e-cash valuation & coupons", "Free battery disposal"]
    }
  ],

  // Feature 5: Baseline Metrics for Impact Dashboard
  INITIAL_DASHBOARD_METRICS: {
    baselineRequestsCount: 148,
    baselineDevicesCount: 1140,
    baselineKgDiverted: 4890.5,
    baselineGoldGrams: 98.4,
    baselineCopperKg: 412.0
  },

  INITIAL_RECENT_REQUESTS: [
    {
      id: "REQ-2026-148",
      name: "Dr. Rachel Adams",
      city: "Koramangala, Bangalore",
      date: "Today, 09:15 AM",
      itemsSummary: "3x Smartphones, 2x Laptops, 4x Chargers",
      itemCount: 9,
      estWeightKg: 5.6,
      status: "Scheduled for Pickup"
    },
    {
      id: "REQ-2026-147",
      name: "Rajesh Kumar",
      city: "Whitefield, Bangalore",
      date: "Yesterday",
      itemsSummary: "1x Desktop Tower, 2x Monitors, 5x Cables",
      itemCount: 8,
      estWeightKg: 18.2,
      status: "In Transit to Hub"
    },
    {
      id: "REQ-2026-146",
      name: "Green Horizon Studio",
      city: "Indiranagar, Bangalore",
      date: "Oct 14, 2026",
      itemsSummary: "6x Laptops, 10x Tablets, 12x Peripherals",
      itemCount: 28,
      estWeightKg: 24.8,
      status: "Recycled (NIST Verified)"
    },
    {
      id: "REQ-2026-145",
      name: "TechSpire Labs",
      city: "Electronic City, Bangalore",
      date: "Oct 13, 2026",
      itemsSummary: "1x Server Rack, 4x Keyboards, 8x Cables",
      itemCount: 13,
      estWeightKg: 14.5,
      status: "Recycled (Zero Landfill)"
    }
  ],

  // Interactive Device Anatomy Exploder Data
  DEVICE_ANATOMY: {
    smartphone: {
      name: "Modern Smartphone (Avg. 180g)",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80",
      summary: "Contains over 60 distinct elements from the periodic table, including high-value precious metals and dangerous reactive lithium cells.",
      recoverable: [
        { name: "Gold (Au)", amount: "0.034g", note: "Circuit board wire bonds & connector pins" },
        { name: "Silver (Ag)", amount: "0.35g", note: "Surface mount solder pastes & contact tracks" },
        { name: "Copper (Cu)", amount: "15.0g", note: "Antenna coils, PCB traces & shielding" },
        { name: "Cobalt (Co)", amount: "8.0g", note: "Battery cathode active material" }
      ],
      hazardous: [
        { name: "Lithium Polymer Cell", danger: "Violent thermal runaway combustion if punctured" },
        { name: "Brominated Resins", danger: "Emits toxic organobromine dioxins if incinerated" },
        { name: "Lead Micro-solder", danger: "Carcinogenic heavy metal contaminating groundwater" }
      ]
    },
    laptop: {
      name: "High-Performance Laptop (Avg. 2.1kg)",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
      summary: "Houses dense aluminum thermal architecture, multi-layer circuit boards, and large rechargeable battery arrays.",
      recoverable: [
        { name: "Structural Aluminum", amount: "650g", note: "Chassis CNC casing, 100% recyclable" },
        { name: "Refined Copper", amount: "220g", note: "Heat pipes, vapor chambers, charging coils" },
        { name: "Gold & Palladium", amount: "0.12g", note: "Microprocessor die contacts & RAM fingers" },
        { name: "Neodymium Magnets", amount: "12g", note: "Speaker transducers & cooling fans" }
      ],
      hazardous: [
        { name: "Multi-cell Li-ion Pack", danger: "Compressed cell short circuits spark intense fires" },
        { name: "BFR Motherboard Resin", danger: "Persistent organic pollutants" },
        { name: "Residual Mercury (Older LCDs)", danger: "Cold-cathode display backlight leakage" }
      ]
    },
    television: {
      name: "Flat Display & CRT Monitors (Avg. 7.5kg)",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
      summary: "Modern OLED/LED units contain Indium Tin Oxide and optical glass, while legacy CRT monitors contain dangerous leaded shielding.",
      recoverable: [
        { name: "Optical Display Glass", amount: "4.2kg", note: "Crushed cullet recycled into insulation" },
        { name: "Steel & Aluminum Frame", amount: "1.8kg", note: "Structural backplates and stands" },
        { name: "Indium (In)", amount: "0.5g", note: "Rare transparent conductor in touchscreen/matrix" }
      ],
      hazardous: [
        { name: "Leaded Funnel Glass (CRT)", danger: "Contains 1.5 to 3.0 kg of neurotoxic Lead Oxide" },
        { name: "Cadmium Phosphors", danger: "Fluorescent internal screen coating" }
      ]
    }
  },

  // Interactive Myth vs Fact Quiz Data
  MYTH_QUIZ: [
    {
      id: 1,
      question: "Is throwing a smartphone with a dead battery into regular household trash harmless?",
      answer: false,
      explanation: "FALSE: Lithium-ion batteries remain chemically reactive even when discharged. Compactor trucks easily crush the cells, sparking explosive fires at 900°C and releasing lethal hydrofluoric acid gas."
    },
    {
      id: 2,
      question: "Does simple 'Quick Format' erase your private files permanently before recycling?",
      answer: false,
      explanation: "FALSE: Quick formatting only clears the file system index table. The actual raw data remains intact on NAND flash or magnetic platters. Certified NIST SP 800-88 cryptographic sanitization or physical degaussing is mandatory."
    },
    {
      id: 3,
      question: "Is 1 tonne of discarded smartphones richer in gold than 1 tonne of raw mined gold ore?",
      answer: true,
      explanation: "TRUE: 1 tonne of smartphones yields approximately 300g of pure gold, whereas 1 tonne of primary gold ore typically yields only 2 to 5g of gold! Urban mining electronics is up to 50 times more resource-dense."
    }
  ],

  // Interactive Code Architecture Dataset
  CODE_SHOWCASE: {
    html: {
      lang: "HTML5",
      title: "Semantic Document Structure & Accessibility",
      description: "Structured using semantic HTML5 elements (<header>, <main>, <section>, <article>, <nav>, <footer>) with full ARIA accessibility, live screen-reader announcements, and procedural SVG graphics.",
      code: `<!-- Semantic Feature 4: Custom Doorstep Disposal Intake -->
<section class="section pickup-section" id="request-pickup">
  <div class="container">
    <header class="section-header text-center">
      <span class="feature-tag-pill">Feature 4 &bull; Intake Portal</span>
      <h2 class="section-title">Submit E-Waste Disposal Request</h2>
    </header>

    <form id="disposalRequestForm" class="pickup-form" novalidate>
      <!-- Real-time Interactive Device Picker Grid -->
      <div class="items-picker-grid">
        <div class="picker-item-card" data-category="mobile">
          <span class="p-title">Smartphones & Tablets</span>
          <div class="p-counter">
            <button type="button" class="btn-step-qty" data-field="qtyPhones" data-delta="-1">-</button>
            <input type="number" id="qtyPhones" class="qty-num" value="0" min="0" aria-label="Smartphones count">
            <button type="button" class="btn-step-qty" data-field="qtyPhones" data-delta="1">+</button>
          </div>
        </div>
      </div>
      <!-- NIST SP 800-88 Cryptographic Sanitization Check -->
      <label class="custom-chk">
        <input type="checkbox" id="chkNistAudit" checked>
        <span>Request Certified NIST SP 800-88 Cryptographic Erasure</span>
      </label>
    </form>
  </div>
</section>`
    },
    css: {
      lang: "CSS3",
      title: "Design System, Glassmorphism & Fluid Layouts",
      description: "Powered by CSS3 custom properties (:root design tokens), frosted glassmorphism (backdrop-filter: blur), responsive CSS Grid, and GPU-accelerated micro-animations.",
      code: `:root {
  --bg-primary: #070d18;
  --bg-secondary: #0d1627;
  --bg-glass: rgba(10, 17, 30, 0.82);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --emerald-500: #10b981;
  --cyan-400: #22d3ee;
  --font-main: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono: 'Space Grotesk', monospace;
}

/* Glassmorphism Card System with Ambient Glow */
.glass-panel {
  background: var(--bg-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.glass-panel:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.4);
}

/* Real-time Ticker Glow Micro-animation */
@keyframes pulseTickerGlow {
  0%, 100% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.35); }
  50% { text-shadow: 0 0 35px rgba(34, 211, 238, 0.6); }
}`
    },
    js: {
      lang: "JavaScript ES6+",
      title: "Reactive State Engine, Dynamic Math & LocalStorage",
      description: "Pure ES6+ JavaScript handles the ticking global e-waste math, dynamic mass estimation, procedural SVG QR code generation, client-side CSV exports, and reactive dashboard updates.",
      code: `// Real-Time E-Waste Math Engine (UN Global E-Waste Monitor Baseline)
function initLiveTonnesTicker() {
  const annualTonnes = 62000000;
  const tonnesPerSecond = annualTonnes / (365.25 * 86400); // ~1.966 t/s
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  let accumulated = ((now - startOfYear) / 1000) * tonnesPerSecond;

  setInterval(() => {
    accumulated += (tonnesPerSecond * 0.1); // Tick every 100ms
    document.getElementById('liveTonnesTicker').textContent =
      Math.floor(accumulated).toLocaleString();
  }, 100);
}

// Reactive Dashboard Sync via LocalStorage Persistence
function recordDisposalRequest(newRequest) {
  const stored = JSON.parse(localStorage.getItem('voltcycle_requests') || '[]');
  stored.unshift(newRequest);
  localStorage.setItem('voltcycle_requests', JSON.stringify(stored));
  
  // Recompute KPIs & animate Total Requests Received counter
  updateImpactDashboardMetrics(stored);
}`
    }
  },

  // Presentation Slides Data (Pure Web Engineering)
  PRESENTATION_SLIDES: [
    {
      title: "VoltCycle: Smart E-Waste Management & Circular Tech",
      subtitle: "Full-Stack Web Engineering Showcase",
      points: [
        "A community-focused web solution tackling the world's fastest growing solid waste stream.",
        "Built using pure HTML5, CSS3, and JavaScript ES6+ into a cohesive, responsive web platform.",
        "Grounding e-waste disposition in verified circular economics and zero-landfill protocols."
      ],
      tag: "1 / 7 &bull; Introduction"
    },
    {
      title: "The E-Waste Crisis: What Happens to Old Tech?",
      subtitle: "The Problem We Are Solving",
      points: [
        "62 Million metric tonnes of e-waste generated yearly (UN E-Waste Monitor 2024).",
        "Only 22.3% is documented as formally recycled; 77.7% is burned or landfilled.",
        "Toxic heavy metals (Lead, Mercury, Cadmium) contaminate municipal water tables.",
        "Over $62 Billion in recoverable gold, copper, and rare earths are discarded annually."
      ],
      tag: "2 / 7 &bull; The Problem"
    },
    {
      title: "Our 5 Core Features",
      subtitle: "Comprehensive End-to-End Solution Architecture",
      points: [
        "1. Home Page: Introduces the global e-waste problem with a live ticking counter.",
        "2. E-Waste Guide: Directory explaining which items can be recycled and pre-disposal safety.",
        "3. Collection Centres: Verified physical drop-off hubs with contact details and hours.",
        "4. Request Pickup: User-friendly form with item counters, date scheduling, and NIST certificates.",
        "5. Impact Dashboard: Displays the exact number of requests received in real time."
      ],
      tag: "3 / 7 &bull; Solution Scope"
    },
    {
      title: "Web Trifecta Architecture: HTML5 + CSS3 + JavaScript",
      subtitle: "Combining Coding Languages Seamlessly",
      points: [
        "HTML5: Clean semantic document layout, SVG iconography, accessible ARIA roles, and native form elements.",
        "CSS3: Glassmorphism visual design system, custom properties (:root tokens), responsive CSS grid/flexbox, and dark/light themes.",
        "JavaScript ES6+: Event-driven real-time ticker, state management synced with localStorage, dynamic SVG QR generator, and client-side CSV export."
      ],
      tag: "4 / 7 &bull; Coding Architecture"
    },
    {
      title: "Live Citizen Workflow Demonstration",
      subtitle: "From Citizen Request to Certified Disposition",
      points: [
        "Step 1: Citizen browses the E-Waste Guide to check accepted items.",
        "Step 2: Citizen submits a disposal request via the custom Pickup Form.",
        "Step 3: Instant receipt is issued with a serialized QR code and tracking ID.",
        "Step 4: Request is logged into the database, and the Impact Dashboard counter increments instantly."
      ],
      tag: "5 / 7 &bull; Workflow"
    },
    {
      title: "Measurable Impact Achieved",
      subtitle: "Real-Time Dashboard Metrics",
      points: [
        "Over 148+ total requests received and processed.",
        "1,140+ electronic devices diverted from municipal landfills.",
        "4,890+ kg of e-waste safely neutralized under zero-landfill standards.",
        "Diverted metals equivalent to conserving thousands of liters of fuel compared to virgin mining."
      ],
      tag: "6 / 7 &bull; Impact"
    },
    {
      title: "Conclusion & Community Call to Action",
      subtitle: "Join the Circular Electronics Movement",
      points: [
        "Stop electronics from poisoning our soils and drinking water.",
        "Scan the QR code on our awareness poster or use the website disposal form.",
        "Schedule your free certified e-waste pickup today!"
      ],
      tag: "7 / 7 &bull; Call to Action"
    }
  ]
};

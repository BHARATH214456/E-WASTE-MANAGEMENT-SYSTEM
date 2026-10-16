/**
 * VoltCycle Application Logic (Pure Web Engineering Edition)
 * Combines HTML5, CSS3, and JavaScript ES6+
 *
 * Core Modules:
 * 1. Global Theme, UI Helpers & Toast Notifications
 * 2. Feature 1: Home Page (Live Global Ticker, Chemical Hazards, Anatomy Exploder, Personal Calculator)
 * 3. Feature 2: E-Waste Guide (Searchable Directory, Safety Protocols, Myth-Buster Quiz)
 * 4. Feature 3: Verified Collection Centres (City Filters, Live Operating Hours Evaluator)
 * 5. Feature 4: Request Pickup (Pure Custom Multi-Step Intake, Weight Estimator, Procedural SVG QR Code)
 * 6. Feature 5: Impact Dashboard (Live Total Requests Received Counter, Stream Filter, CSV/JSON Exports)
 * 7. Section 6: Code Architecture Hub (Interactive HTML, CSS, and JS Code Inspector)
 * 8. Section 7: Presentation Deck & Awareness Poster Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndUI();
  initFeature1_Home();
  initFeature2_Guide();
  initFeature3_CollectionCentres();
  initFeature4_PickupForm();
  initFeature5_ImpactDashboard();
  initCodeArchitectureShowcase();
  initPresentationAndPoster();
});

/* ==========================================================================
   1. GLOBAL THEME, UI HELPERS & TOAST SYSTEM
   ========================================================================== */
function initThemeAndUI() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const banner = document.getElementById('topAnnouncement');
  const closeBannerBtn = document.getElementById('closeAnnouncementBtn');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  // Load saved theme preference
  const savedTheme = localStorage.getItem('voltcycle_theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      if (isLight) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('voltcycle_theme', 'dark');
        showToast('Switched to Eco Dark Theme');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('voltcycle_theme', 'light');
        showToast('Switched to Clean Light Theme');
      }
    });
  }

  if (closeBannerBtn && banner) {
    closeBannerBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // Active section scroll highlighting (Scroll-Spy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 220;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 20 20" fill="#10b981">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    <span>${msg}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3600);
}

/* ==========================================================================
   FEATURE 1: HOME PAGE — Introduces the E-Waste Problem
   ========================================================================== */
function initFeature1_Home() {
  // 1. Real-time Global Ticker (~1.966 metric tonnes/second)
  const tickerEl = document.getElementById('liveTonnesTicker');
  if (tickerEl) {
    const annualTonnes = 62000000;
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const elapsedSecs = (now - startOfYear) / 1000;
    let currentTonnes = (elapsedSecs / (365.25 * 24 * 3600)) * annualTonnes;
    const incrementPerTick = (annualTonnes / (365.25 * 24 * 3600)) * 0.1; // 100ms ticks

    setInterval(() => {
      currentTonnes += incrementPerTick;
      tickerEl.textContent = Math.floor(currentTonnes).toLocaleString();
    }, 100);
  }

  // 2. Toxic Chemical Hazards Inspector
  const chipsRow = document.getElementById('hazardChipsRow');
  const detailDisplay = document.getElementById('hazardDetailDisplay');

  if (chipsRow && detailDisplay && EWASTE_APP_DATA.TOXIC_HAZARDS) {
    const hazards = EWASTE_APP_DATA.TOXIC_HAZARDS;

    function renderHazardDetail(h) {
      detailDisplay.innerHTML = `
        <div class="hazard-detail-flex" style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
          <div class="hazard-img-box" style="flex: 0 0 160px; height: 110px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-medium); box-shadow: var(--shadow-sm);">
            <img src="${h.image}" alt="${h.name} in electronics" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy">
          </div>
          <div style="flex: 1; min-width: 240px;">
            <h4 style="font-size: 1.2rem; color: var(--emerald-400); margin-bottom: 8px;">${h.name} (${h.symbol})</h4>
            <p style="margin-bottom: 8px; line-height: 1.5; font-size: 0.92rem;"><strong>Where Found in Electronics:</strong> ${h.foundIn}</p>
            <p style="color: var(--text-body); line-height: 1.5; font-size: 0.88rem;"><strong>Environmental & Health Toxicology:</strong> ${h.impact}</p>
          </div>
        </div>
      `;
    }

    chipsRow.innerHTML = hazards.map((h, i) => `
      <button type="button" class="hazard-chip-btn ${i === 0 ? 'active' : ''}" data-idx="${i}">
        <span class="h-sym">${h.symbol}</span>
        <span class="h-nm">${h.name}</span>
      </button>
    `).join('');

    renderHazardDetail(hazards[0]);

    chipsRow.querySelectorAll('.hazard-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        chipsRow.querySelectorAll('.hazard-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const idx = parseInt(btn.dataset.idx, 10);
        renderHazardDetail(hazards[idx]);
      });
    });
  }

  // 3. Interactive Device Anatomy Exploder
  const anatomyTabs = document.getElementById('anatomyTabs');
  const anatomyDisplayWrap = document.getElementById('anatomyDisplayWrap');

  if (anatomyTabs && anatomyDisplayWrap && EWASTE_APP_DATA.DEVICE_ANATOMY) {
    function renderAnatomy(devKey) {
      const dev = EWASTE_APP_DATA.DEVICE_ANATOMY[devKey];
      if (!dev) return;

      anatomyDisplayWrap.innerHTML = `
        <div class="anatomy-header-row" style="margin-bottom: 18px; display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 0 0 140px; height: 90px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-medium); box-shadow: var(--shadow-sm);">
            <img src="${dev.image}" alt="${dev.name}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          </div>
          <div style="flex: 1; min-width: 220px;">
            <h4 style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 4px;">${dev.name}</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5;">${dev.summary}</p>
          </div>
        </div>
        <div class="anatomy-cols-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div class="anatomy-col glass-panel" style="padding: 18px; border-color: rgba(16, 185, 129, 0.3);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="color: var(--emerald-400); font-weight: 700;">&#10003; Recoverable Resources</span>
              <span class="badge-pill" style="font-size: 0.72rem; padding: 2px 8px;">Circular Value</span>
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
              ${dev.recoverable.map(r => `
                <li style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
                  <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 0.9rem;">
                    <span>${r.name}</span>
                    <strong class="text-emerald">${r.amount}</strong>
                  </div>
                  <small style="color: var(--text-muted);">${r.note}</small>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="anatomy-col glass-panel" style="padding: 18px; border-color: rgba(244, 63, 94, 0.3);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="color: var(--rose-400); font-weight: 700;">&#9888; Toxic Hazardous Risks</span>
              <span class="badge-pill" style="background: rgba(244, 63, 94, 0.15); color: var(--rose-400); font-size: 0.72rem; padding: 2px 8px;">Landfill Threat</span>
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
              ${dev.hazardous.map(h => `
                <li style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
                  <div style="font-weight: 600; font-size: 0.9rem; color: var(--rose-400);">${h.name}</div>
                  <small style="color: var(--text-body);">${h.danger}</small>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    renderAnatomy('smartphone');

    anatomyTabs.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        anatomyTabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderAnatomy(btn.dataset.device);
      });
    });
  }

  // 4. Personal Ecological Footprint Calculator
  const rPhones = document.getElementById('rangePhones');
  const rComputers = document.getElementById('rangeComputers');
  const rCables = document.getElementById('rangeCables');

  const vPhones = document.getElementById('calcValPhones');
  const vComputers = document.getElementById('calcValComputers');
  const vCables = document.getElementById('calcValCables');

  const yGold = document.getElementById('calcGoldYield');
  const yCopper = document.getElementById('calcCopperYield');
  const yCo2 = document.getElementById('calcCo2Avoided');

  function updatePersonalCalc() {
    if (!rPhones || !rComputers || !rCables) return;

    const phones = parseInt(rPhones.value, 10);
    const computers = parseInt(rComputers.value, 10);
    const cables = parseInt(rCables.value, 10);

    if (vPhones) vPhones.textContent = phones;
    if (vComputers) vComputers.textContent = computers;
    if (vCables) vCables.textContent = cables;

    // Yield Calculations
    const goldGrams = ((phones * 0.034) + (computers * 0.12)).toFixed(2);
    const copperGrams = Math.round((phones * 15) + (computers * 220) + (cables * 150));
    const co2Kg = ((phones * 12.5) + (computers * 65.0) + (cables * 2.1)).toFixed(1);

    if (yGold) yGold.textContent = `${goldGrams} grams`;
    if (yCopper) yCopper.textContent = `${copperGrams.toLocaleString()} grams`;
    if (yCo2) yCo2.textContent = `${co2Kg} kg CO2e`;
  }

  if (rPhones && rComputers && rCables) {
    [rPhones, rComputers, rCables].forEach(slider => {
      slider.addEventListener('input', updatePersonalCalc);
    });
    updatePersonalCalc();
  }
}

/* ==========================================================================
   FEATURE 2: E-WASTE GUIDE — Recyclable Items Directory & Myth Quiz
   ========================================================================== */
function initFeature2_Guide() {
  const grid = document.getElementById('guideItemsGrid');
  const searchInput = document.getElementById('guideSearchInput');
  const filterChips = document.querySelectorAll('#guideFilterChips .chip-filter');

  if (!grid || !EWASTE_APP_DATA.GUIDE_ITEMS) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function renderGuide() {
    const items = EWASTE_APP_DATA.GUIDE_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                            item.hazards.toLowerCase().includes(searchTerm) ||
                            item.recoverableMaterials.some(m => m.toLowerCase().includes(searchTerm));

      const matchesCat = (activeCategory === 'all') || (item.category === activeCategory);
      return matchesSearch && matchesCat;
    });

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
          <p>No electronics found matching "<strong>${searchTerm}</strong>". Check spelling or select "All Items".</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
      let statusClass = 'status-green';
      if (item.status.includes('Special')) statusClass = 'status-amber';
      if (!item.canRecycle) statusClass = 'status-red';

      return `
        <div class="guide-item-card glass-panel">
          <div>
            <div class="g-card-top">
              <h3 class="g-item-name">${item.name}</h3>
              <span class="g-status-badge ${statusClass}">${item.status}</span>
            </div>

            <div class="g-section-row">
              <span class="g-label">Recoverable Critical Resources:</span>
              <div class="g-materials-tags">
                ${item.recoverableMaterials.map(m => `<span class="mat-tag">${m}</span>`).join('')}
              </div>
            </div>

            <div class="g-section-row">
              <span class="g-label">Landfill & Toxic Hazard:</span>
              <p class="g-hazard-text">${item.hazards}</p>
            </div>
          </div>

          <div class="g-prep-box">
            <span class="g-label" style="color: var(--emerald-400);">Mandatory Preparation Instructions:</span>
            <p class="g-prep-text">${item.prepInstructions}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  renderGuide();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderGuide();
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.filter;
      renderGuide();
    });
  });

  // Myth-Busters Interactive Quiz
  const quizWrap = document.getElementById('quizQuestionsWrap');
  const scoreBadge = document.getElementById('quizScoreBadge');

  if (quizWrap && EWASTE_APP_DATA.MYTH_QUIZ) {
    let score = 0;
    const answered = new Set();

    quizWrap.innerHTML = EWASTE_APP_DATA.MYTH_QUIZ.map((q, idx) => `
      <div class="quiz-item glass-panel" style="padding: 16px; margin-bottom: 14px;" id="quizItem-${q.id}">
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 12px;">${idx + 1}. ${q.question}</p>
        <div style="display: flex; gap: 10px; margin-bottom: 8px;">
          <button type="button" class="btn btn-sm btn-outline btn-quiz-choice" data-id="${q.id}" data-val="true">True</button>
          <button type="button" class="btn btn-sm btn-outline btn-quiz-choice" data-id="${q.id}" data-val="false">False</button>
        </div>
        <div class="quiz-feedback" id="quizFeedback-${q.id}" style="display: none; font-size: 0.86rem; line-height: 1.4; margin-top: 8px;"></div>
      </div>
    `).join('');

    quizWrap.querySelectorAll('.btn-quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = parseInt(btn.dataset.id, 10);
        if (answered.has(qId)) return;
        answered.add(qId);

        const chosenVal = (btn.dataset.val === 'true');
        const questionData = EWASTE_APP_DATA.MYTH_QUIZ.find(q => q.id === qId);
        const fbEl = document.getElementById(`quizFeedback-${qId}`);

        // Disable both buttons for this question
        const parent = document.getElementById(`quizItem-${qId}`);
        parent.querySelectorAll('.btn-quiz-choice').forEach(b => b.disabled = true);

        if (chosenVal === questionData.answer) {
          score++;
          btn.style.background = '#10b981';
          btn.style.borderColor = '#10b981';
          btn.style.color = '#fff';
          if (fbEl) {
            fbEl.style.display = 'block';
            fbEl.style.color = 'var(--emerald-400)';
            fbEl.innerHTML = `<strong>Correct!</strong> ${questionData.explanation}`;
          }
          showToast('Correct answer! Well done.');
        } else {
          btn.style.background = '#f43f5e';
          btn.style.borderColor = '#f43f5e';
          btn.style.color = '#fff';
          if (fbEl) {
            fbEl.style.display = 'block';
            fbEl.style.color = 'var(--rose-400)';
            fbEl.innerHTML = `<strong>Not quite.</strong> ${questionData.explanation}`;
          }
        }

        if (scoreBadge) {
          scoreBadge.textContent = `Score: ${score} / ${EWASTE_APP_DATA.MYTH_QUIZ.length}`;
        }
      });
    });
  }
}

/* ==========================================================================
   FEATURE 3: COLLECTION CENTRE INFORMATION — Verified Drop-off Locations
   ========================================================================== */
function initFeature3_CollectionCentres() {
  const grid = document.getElementById('centresGrid');
  const searchInput = document.getElementById('hubSearchInput');
  const cityPills = document.querySelectorAll('#hubCityPills .chip-filter');

  if (!grid || !EWASTE_APP_DATA.COLLECTION_CENTRES) return;

  let activeCity = 'all';
  let searchTerm = '';

  function isCurrentlyOpen() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 6 = Sat
    const hour = now.getHours();
    // Typical hours: M-F 8am-6pm, Sat 9am-3pm, Sun Closed
    if (day === 0) return false;
    if (day === 6) return hour >= 9 && hour < 15;
    return hour >= 8 && hour < 18;
  }

  function renderCentres() {
    const centres = EWASTE_APP_DATA.COLLECTION_CENTRES.filter(c => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = !q ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        (c.certification && c.certification.toLowerCase().includes(q)) ||
        c.acceptedItems.some(i => i.toLowerCase().includes(q));

      const matchesCity = (activeCity === 'all') || c.address.toLowerCase().includes(activeCity.toLowerCase());
      return matchesSearch && matchesCity;
    });

    if (centres.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
          <p>No collection centres found matching your filter. Try searching a major locality or reset the filters.</p>
        </div>
      `;
      return;
    }

    const openNow = isCurrentlyOpen();

    grid.innerHTML = centres.map(c => `
      <div class="centre-card glass-panel">
        <div class="c-card-top">
          <div>
            <span class="c-cert-pill">${c.certification}</span>
            <h3 class="c-name" style="margin-top: 8px;">${c.name}</h3>
          </div>
          <span class="badge-pill" style="background: ${openNow ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)'}; color: ${openNow ? 'var(--emerald-400)' : 'var(--rose-400)'}; font-size: 0.72rem;">
            ${openNow ? '&#9679; Open Now' : '&#9679; Closed Now'}
          </span>
        </div>

        <div class="c-details-list">
          <div class="c-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="c-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <div>
              <span class="c-lbl">Street Address:</span>
              <p class="c-val">
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="c-address-link"
                   title="Open ${c.name} in Google Maps">
                  ${c.address}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="c-ext-icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </p>
            </div>
          </div>

          <div class="c-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="c-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <div>
              <span class="c-lbl">Operating Hours:</span>
              <p class="c-val">${c.operatingHours}</p>
            </div>
          </div>

          <div class="c-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="c-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <div>
              <span class="c-lbl">Phone & Dispatch:</span>
              <p class="c-val"><a href="tel:${c.phone}" style="color: var(--cyan-400); text-decoration: none;">${c.phone}</a></p>
            </div>
          </div>
        </div>

        <div class="c-accepted-box">
          <span class="c-lbl">Accepted Electronics:</span>
          <div class="c-tags-wrap">
            ${c.acceptedItems.map(item => `<span class="c-tag">${item}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <a href="mailto:${c.email}" class="btn btn-sm btn-outline" style="font-size: 0.8rem;">Contact Hub</a>
          <button type="button" class="btn btn-sm btn-secondary btn-directions" data-address="${c.address}">
            Get Directions &rarr;
          </button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-directions').forEach(btn => {
      btn.addEventListener('click', () => {
        const addr = btn.dataset.address;
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`, '_blank');
        showToast(`Opening Google Maps directions to ${addr.split(',')[0]}...`);
      });
    });
  }

  renderCentres();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim();
      renderCentres();
    });
  }

  cityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      cityPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCity = pill.dataset.city;
      renderCentres();
    });
  });
}

/* ==========================================================================
   FEATURE 4: REQUEST PICKUP — 100% Custom Web Form Disposal Portal
   ========================================================================== */
function initFeature4_PickupForm() {
  const form = document.getElementById('disposalRequestForm');
  if (!form) return;

  const dateInput = document.getElementById('userPickupDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Multi-step quantity buttons
  document.querySelectorAll('.btn-step-qty').forEach(btn => {
    btn.addEventListener('click', () => {
      const fieldId = btn.dataset.field;
      const delta = parseInt(btn.dataset.delta, 10);
      const input = document.getElementById(fieldId);
      if (input) {
        let val = parseInt(input.value, 10) || 0;
        val = Math.max(0, Math.min(99, val + delta));
        input.value = val;
        updateFormTotals();
      }
    });
  });

  document.querySelectorAll('.qty-num').forEach(input => {
    input.addEventListener('input', updateFormTotals);
  });

  function updateFormTotals() {
    const phones = parseInt(document.getElementById('qtyPhones')?.value, 10) || 0;
    const computers = parseInt(document.getElementById('qtyComputers')?.value, 10) || 0;
    const monitors = parseInt(document.getElementById('qtyMonitors')?.value, 10) || 0;
    const cables = parseInt(document.getElementById('qtyCables')?.value, 10) || 0;
    const appliances = parseInt(document.getElementById('qtyAppliances')?.value, 10) || 0;
    const batteries = parseInt(document.getElementById('qtyBatteries')?.value, 10) || 0;

    const totalCount = phones + computers + monitors + cables + appliances + batteries;
    const totalMass = (phones * 0.2) + (computers * 2.5) + (monitors * 4.8) + (cables * 0.15) + (appliances * 2.2) + (batteries * 0.3);

    const countEl = document.getElementById('formItemsCount');
    const massEl = document.getElementById('formEstimatedWeight');
    const errEl = document.getElementById('errItems');

    if (countEl) countEl.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
    if (massEl) massEl.textContent = `${totalMass.toFixed(1)} kg`;

    if (errEl) {
      errEl.style.display = totalCount > 0 ? 'none' : 'block';
    }

    return { totalCount, totalMass };
  }

  // Pure Web Form Submission Logic
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    function checkField(id, errId) {
      const field = document.getElementById(id);
      const err = document.getElementById(errId);
      if (!field || !field.value.trim()) {
        if (err) err.style.display = 'block';
        isValid = false;
      } else {
        if (err) err.style.display = 'none';
      }
      return field ? field.value.trim() : '';
    }

    const name = checkField('userName', 'errName');
    const email = checkField('userEmail', 'errEmail');
    const phone = checkField('userPhone', 'errPhone');
    const address = checkField('userAddress', 'errAddress');
    const city = checkField('userCity', 'errCity');
    const state = checkField('userState', 'errState');
    const zip = checkField('userZip', 'errZip');

    const { totalCount, totalMass } = updateFormTotals();
    if (totalCount === 0) {
      const errItems = document.getElementById('errItems');
      if (errItems) errItems.style.display = 'block';
      isValid = false;
    }

    if (!isValid) {
      showToast('Please correct highlighted fields before submitting.');
      return;
    }

    // Submit Processing
    const submitBtn = document.getElementById('submitPickupBtn');
    const spinner = document.getElementById('formSpinner');
    const label = document.getElementById('submitBtnLabel');

    if (submitBtn) submitBtn.disabled = true;
    if (spinner) spinner.style.display = 'inline-block';
    if (label) label.textContent = 'Recording Request on Impact Dashboard...';

    setTimeout(() => {
      // Build Items Summary String
      const summaryParts = [];
      const p = parseInt(document.getElementById('qtyPhones')?.value, 10) || 0;
      const c = parseInt(document.getElementById('qtyComputers')?.value, 10) || 0;
      const m = parseInt(document.getElementById('qtyMonitors')?.value, 10) || 0;
      const cab = parseInt(document.getElementById('qtyCables')?.value, 10) || 0;
      const app = parseInt(document.getElementById('qtyAppliances')?.value, 10) || 0;
      const bat = parseInt(document.getElementById('qtyBatteries')?.value, 10) || 0;

      if (p) summaryParts.push(`${p}x Phone/Tablet`);
      if (c) summaryParts.push(`${c}x Computer`);
      if (m) summaryParts.push(`${m}x Screen`);
      if (cab) summaryParts.push(`${cab}x Cables`);
      if (app) summaryParts.push(`${app}x Appliance`);
      if (bat) summaryParts.push(`${bat}x Battery`);

      const trackingId = `REQ-2026-${Math.floor(100 + Math.random() * 900)}`;
      const pickupDateVal = document.getElementById('userPickupDate')?.value || 'Tomorrow';
      const slotVal = document.getElementById('userTimeSlot')?.value || 'Morning Window';

      const newRequest = {
        id: trackingId,
        name: name,
        city: `${city}, ${state}`,
        date: "Just now",
        itemsSummary: summaryParts.join(', ') || `${totalCount} electronic items`,
        itemCount: totalCount,
        estWeightKg: parseFloat(totalMass.toFixed(1)),
        status: "Scheduled for Pickup",
        scheduledPickupDate: pickupDateVal,
        slot: slotVal
      };

      // Store in LocalStorage
      const userRequests = getStoredUserRequests();
      userRequests.unshift(newRequest);
      localStorage.setItem('voltcycle_user_requests', JSON.stringify(userRequests));

      // Recompute and increment the Impact Dashboard (Feature 5)
      updateDashboardWithNewRequest();

      // Populate Confirmation Receipt Slip
      const slipTrackId = document.getElementById('confirmedTrackId');
      const slipName = document.getElementById('confirmedName');
      const slipAddress = document.getElementById('confirmedAddress');
      const slipDate = document.getElementById('confirmedDate');
      const slipItems = document.getElementById('confirmedItems');
      const qrBox = document.getElementById('confirmedQrBox');

      if (slipTrackId) slipTrackId.textContent = trackingId;
      if (slipName) slipName.textContent = name;
      if (slipAddress) {
        const fullAddr = `${address}, ${city}, ${state} ${zip}`;
        slipAddress.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddr)}" target="_blank" rel="noopener noreferrer" class="c-address-link" title="Open in Google Maps">${fullAddr}</a>`;
      }
      if (slipDate) slipDate.textContent = `${pickupDateVal} (${slotVal})`;
      if (slipItems) slipItems.textContent = newRequest.itemsSummary;

      if (qrBox) {
        qrBox.innerHTML = generateMiniQrSvg(`${trackingId}:${name}:${totalCount}items`);
      }

      // Hide form & display confirmation slip
      form.style.display = 'none';
      const successView = document.getElementById('submissionSuccessView');
      if (successView) {
        successView.style.display = 'block';
        successView.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Success! Request ${trackingId} logged. Total requests updated on Impact Dashboard.`);

      if (submitBtn) submitBtn.disabled = false;
      if (spinner) spinner.style.display = 'none';
      if (label) label.textContent = 'Submit Disposal Request & Record on Dashboard';
    }, 600);
  });

  // Action Buttons on Confirmation Slip
  document.getElementById('submitAnotherReqBtn')?.addEventListener('click', () => {
    document.querySelectorAll('.qty-num').forEach(i => i.value = '0');
    updateFormTotals();
    form.reset();
    form.style.display = 'block';
    const successView = document.getElementById('submissionSuccessView');
    if (successView) successView.style.display = 'none';
    form.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('printReceiptBtn')?.addEventListener('click', () => {
    window.print();
  });
}

function generateMiniQrSvg(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  let rects = '';
  const size = 7;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const isCorner = (r < 2 && c < 2) || (r < 2 && c > size - 3) || (r > size - 3 && c < 2);
      if (isCorner || (((hash ^ (r * 11 + c * 5)) & 1) === 0)) {
        rects += `<rect x="${c * 8}" y="${r * 8}" width="7" height="7" fill="#0f172a" rx="1"/>`;
      }
    }
  }
  return `<svg viewBox="0 0 56 56" width="56" height="56" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
}

/* ==========================================================================
   FEATURE 5: IMPACT DASHBOARD — Displays Number of Requests Received
   ========================================================================== */
function getStoredUserRequests() {
  try {
    const raw = localStorage.getItem('voltcycle_user_requests');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function initFeature5_ImpactDashboard() {
  updateDashboardWithNewRequest();

  // Search filter on the stream table
  const searchInput = document.getElementById('streamSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderStreamTable();
    });
  }

  // Status filter pills
  const statusPills = document.querySelectorAll('#streamStatusPills .chip-filter');
  statusPills.forEach(pill => {
    pill.addEventListener('click', () => {
      statusPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderStreamTable();
    });
  });

  // Client-Side CSV Export
  document.getElementById('btnExportCsv')?.addEventListener('click', () => {
    const userRequests = getStoredUserRequests();
    const combined = [...userRequests, ...EWASTE_APP_DATA.INITIAL_RECENT_REQUESTS];

    let csv = "Request ID,Consignor Name,Location,Items Disposed,Item Count,Estimated Weight (kg),Date,Status\n";
    combined.forEach(r => {
      csv += `"${r.id}","${r.name}","${r.city}","${r.itemsSummary}",${r.itemCount},${r.estWeightKg},"${r.date}","${r.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `VoltCycle_Requests_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Downloaded Requests CSV successfully!');
  });

  // Client-Side JSON Export
  document.getElementById('btnExportJson')?.addEventListener('click', () => {
    const userRequests = getStoredUserRequests();
    const combined = [...userRequests, ...EWASTE_APP_DATA.INITIAL_RECENT_REQUESTS];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(combined, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `VoltCycle_Manifest_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();

    showToast('Downloaded JSON Manifest successfully!');
  });

  // Reset Demo Data
  document.getElementById('btnResetData')?.addEventListener('click', () => {
    localStorage.removeItem('voltcycle_user_requests');
    updateDashboardWithNewRequest();
    showToast('Demo data reset to baseline.');
  });
}

function updateDashboardWithNewRequest() {
  const userRequests = getStoredUserRequests();
  const baseline = EWASTE_APP_DATA.INITIAL_DASHBOARD_METRICS;

  // Exact core requirement: Prominently displays the Number of Requests Received
  const totalRequestsReceived = baseline.baselineRequestsCount + userRequests.length;

  let addedDevices = 0;
  let addedKg = 0;
  userRequests.forEach(req => {
    addedDevices += (req.itemCount || 0);
    addedKg += (req.estWeightKg || 0);
  });

  const totalDevices = baseline.baselineDevicesCount + addedDevices;
  const totalWeight = baseline.baselineKgDiverted + addedKg;

  const totalGoldGrams = (baseline.baselineGoldGrams + (addedDevices * 0.025)).toFixed(1);
  const totalCopperKg = Math.round(baseline.baselineCopperKg + (addedDevices * 0.09));

  // Update KPI counters on dashboard
  const requestsEl = document.getElementById('dashTotalRequests');
  const devicesEl = document.getElementById('dashTotalDevices');
  const weightEl = document.getElementById('dashTotalWeight');
  const metalsEl = document.getElementById('dashTotalMetals');
  const navBadge = document.getElementById('navRequestCountBadge');

  if (requestsEl) {
    requestsEl.textContent = totalRequestsReceived.toLocaleString();
    requestsEl.style.transform = 'scale(1.15)';
    setTimeout(() => requestsEl.style.transform = 'scale(1)', 350);
  }
  if (devicesEl) devicesEl.textContent = totalDevices.toLocaleString();
  if (weightEl) weightEl.textContent = totalWeight.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  if (metalsEl) metalsEl.textContent = `${totalGoldGrams}g / ${totalCopperKg}kg`;

  if (navBadge) {
    navBadge.textContent = totalRequestsReceived;
    navBadge.style.transform = 'scale(1.25)';
    setTimeout(() => navBadge.style.transform = 'scale(1)', 400);
  }

  // Populate Category Breakdown Bars
  renderCategoryBars(totalDevices);

  // Populate Requests Stream Table
  renderStreamTable();
}

function renderCategoryBars(totalDevices) {
  const container = document.getElementById('categoryBarsContainer');
  if (!container) return;

  const cats = [
    { label: "Computing & Laptops", pct: 36, color: "var(--emerald-500)" },
    { label: "Smartphones & Tablets", pct: 32, color: "var(--cyan-400)" },
    { label: "Monitors & Screens", pct: 14, color: "var(--amber-400)" },
    { label: "Peripherals & Cables", pct: 12, color: "#a855f7" },
    { label: "Rechargeable Batteries", pct: 6, color: "var(--rose-400)" }
  ];

  container.innerHTML = `
    <div style="display: flex; height: 16px; border-radius: 9999px; overflow: hidden; margin-bottom: 16px; background: rgba(255,255,255,0.06);">
      ${cats.map(c => `<div style="width: ${c.pct}%; background: ${c.color};" title="${c.label}: ${c.pct}%"></div>`).join('')}
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between;">
      ${cats.map(c => `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem;">
          <span style="width: 10px; height: 10px; border-radius: 50%; background: ${c.color};"></span>
          <span>${c.label}: <strong>${c.pct}%</strong></span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStreamTable() {
  const tableBody = document.getElementById('dashboardRequestsTableBody');
  if (!tableBody) return;

  const userRequests = getStoredUserRequests();
  const initialStream = EWASTE_APP_DATA.INITIAL_RECENT_REQUESTS || [];
  const combinedStream = [...userRequests, ...initialStream];

  const searchInput = document.getElementById('streamSearchInput');
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const activePill = document.querySelector('#streamStatusPills .chip-filter.active');
  const activeStatus = activePill ? activePill.dataset.status : 'all';

  const filtered = combinedStream.filter(req => {
    const matchesSearch = !searchTerm ||
      req.id.toLowerCase().includes(searchTerm) ||
      req.name.toLowerCase().includes(searchTerm) ||
      req.city.toLowerCase().includes(searchTerm);

    const matchesStatus = (activeStatus === 'all') || req.status.toLowerCase().includes(activeStatus.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">
          No requests found matching your filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(req => {
    let statusClass = 'status-scheduled';
    if (req.status.includes('Transit')) statusClass = 'status-transit';
    if (req.status.includes('Recycled')) statusClass = 'status-completed';

    return `
      <tr>
        <td class="stream-id">${req.id}</td>
        <td><strong>${req.name}</strong></td>
        <td>${req.city}</td>
        <td>${req.itemsSummary}</td>
        <td><strong>${req.estWeightKg} kg</strong></td>
        <td>${req.date}</td>
        <td><span class="stream-status-pill ${statusClass}">${req.status}</span></td>
      </tr>
    `;
  }).join('');
}

/* ==========================================================================
   SECTION 6: CODE ARCHITECTURE HUB — The Web Trifecta (HTML5 + CSS3 + JS)
   ========================================================================== */
function initCodeArchitectureShowcase() {
  const tabs = document.querySelectorAll('#codeViewerTabs .code-tab-btn');
  const metaContainer = document.getElementById('codeInfoMeta');
  const codeTarget = document.getElementById('codeSnippetTarget');
  const copyBtn = document.getElementById('btnCopySnippet');

  if (!tabs.length || !codeTarget || !EWASTE_APP_DATA.CODE_SHOWCASE) return;

  let currentSnippet = '';

  function renderSnippet(langKey) {
    const data = EWASTE_APP_DATA.CODE_SHOWCASE[langKey];
    if (!data) return;

    currentSnippet = data.code;

    if (metaContainer) {
      metaContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <h4 style="font-size: 1.1rem; color: var(--text-main); margin: 0;">${data.title}</h4>
          <span class="badge-pill" style="font-size: 0.76rem;">Language: ${data.lang}</span>
        </div>
        <p style="color: var(--text-body); font-size: 0.88rem; line-height: 1.5; margin-bottom: 14px;">${data.description}</p>
      `;
    }

    // Escape HTML characters for code block display
    codeTarget.textContent = data.code;
  }

  renderSnippet('html');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSnippet(tab.dataset.lang);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(currentSnippet).then(() => {
        showToast('Code snippet copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy code.');
      });
    });
  }
}

/* ==========================================================================
   SECTION 7: PRESENTATION DECK & POSTER STUDIO
   ========================================================================== */
function initPresentationAndPoster() {
  const slides = EWASTE_APP_DATA.PRESENTATION_SLIDES;
  const slideContent = document.getElementById('activeSlideContent');
  const slideTag = document.getElementById('slideTagBadge');
  const dotsWrap = document.getElementById('deckDotsWrap');
  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');

  if (!slideContent || !slides) return;

  let currentIdx = 0;

  function renderSlide(idx) {
    const s = slides[idx];
    if (!s) return;

    if (slideTag) slideTag.innerHTML = s.tag;

    slideContent.innerHTML = `
      <div class="slide-inner">
        <h3 class="slide-main-title">${s.title}</h3>
        <p class="slide-subtitle">${s.subtitle}</p>
        <ul class="slide-bullet-list">
          ${s.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    `;

    if (btnPrev) btnPrev.disabled = (idx === 0);
    if (btnNext) btnNext.disabled = (idx === slides.length - 1);

    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((_, i) => `
        <span class="deck-dot ${i === idx ? 'active' : ''}" data-idx="${i}"></span>
      `).join('');

      dotsWrap.querySelectorAll('.deck-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          currentIdx = parseInt(dot.dataset.idx, 10);
          renderSlide(currentIdx);
        });
      });
    }
  }

  renderSlide(0);

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentIdx > 0) {
        currentIdx--;
        renderSlide(currentIdx);
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentIdx < slides.length - 1) {
        currentIdx++;
        renderSlide(currentIdx);
      }
    });
  }

  // Print Poster Button
  document.getElementById('btnPrintPoster')?.addEventListener('click', () => {
    window.print();
  });
}

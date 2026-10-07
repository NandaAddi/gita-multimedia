/* ============================================================
   ECO-EXPLORER — js/scenes/team.js
   Layar Pemilihan Tim Petualang (Arcade 3D Hero Stage & Smooth Carousel)
   ============================================================ */

let teamIdx = 0;
let teamKeyBound = false;

const TEAM_THEMES = {
  sawah: {
    podiumTop: '#10b981',
    podiumSide: '#064e3b',
    aura: 'rgba(16,185,129,.35)',
    accent: '#fef08a'
  },
  hutan: {
    podiumTop: '#d97706',
    podiumSide: '#78350f',
    aura: 'rgba(217,119,6,.35)',
    accent: '#fef3c7'
  },
  sungai: {
    podiumTop: '#0e7490',
    podiumSide: '#134e4a',
    aura: 'rgba(14,116,144,.35)',
    accent: '#ccfbf1'
  },
  laut: {
    podiumTop: '#0284c7',
    podiumSide: '#0c4a6e',
    aura: 'rgba(2,132,199,.35)',
    accent: '#e0f2fe'
  }
};

function buildTeam() {
  const saved = TEAMS.findIndex(t => t.id === G.team);
  teamIdx = saved >= 0 ? saved : 0;

  el('#scr-team').innerHTML = `
    <div class="ui">
      <!-- TOPBAR -->
      <div class="topbar">
        <button class="btn tb-btn" id="t-back">${ic('back', 24)} Judul</button>
        <div class="plaque">Pilih Kelompok Detektifmu</div>
        <div class="spacer"></div>
        <div class="tb-stars">${ic('star', 24)} <b>${totStars()}/48</b></div>
      </div>

      <!-- MAIN HERO SHOWCASE STAGE -->
      <div class="stage panel-deep" id="team-stage">
        <!-- ARCADE 3D NAV BUTTONS -->
        <button class="arrow prev arcade-arrow" id="t-prev" aria-label="Kelompok Sebelumnya">
          ${ic('back', 44)}
        </button>
        <button class="arrow next arcade-arrow" id="t-next" aria-label="Kelompok Berikutnya">
          ${ic('arrowR', 44)}
        </button>

        <!-- SLIDING HERO CARD INNER -->
        <div class="hero-inner-wrap" id="hero-wrap">
          <div class="hero-left">
            <div class="pedestal-stage">
              <div class="podium-aura" id="t-aura"></div>
              <canvas id="t-mascot" width="400" height="400"></canvas>
            </div>
            <div class="hero-name-plate" id="t-name"></div>
          </div>

          <div class="hero-right">
            <div class="hero-motto" id="t-motto"></div>
            <div class="hero-dossier" id="t-doss"></div>
            <div class="hero-spec" id="t-spec-box">
              <span class="spec-ic">${ic('medal', 30)}</span>
              <span class="spec-txt" id="t-spec"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM CONTROL BAR -->
      <div class="team-footer-bar">
        <div class="team-dock-pod" id="t-dock"></div>
        <button class="btn btn-gold btn-hero-pick" id="t-pick">
          ${ic('check', 28)} <span>Pilih Detektif Ini!</span>
        </button>
      </div>
    </div>
  `;

  // Navigation handlers
  const tBackBtn = el('#t-back');
  if (tBackBtn) {
    tBackBtn.onclick = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      sfx.back();
      go('title');
    };
  }

  el('#t-prev').onclick = () => navigateTeam(-1);
  el('#t-next').onclick = () => navigateTeam(1);

  // Swipe gesture handlers for IFP Touchscreen (Pointer Lock & Gesture Isolation)
  const stage = el('#team-stage');
  if (stage && !stage.hasAttribute('data-swipe-bound')) {
    stage.setAttribute('data-swipe-bound', 'true');
    // Proteksi debounce swipe carousel dan single-pointer tracking IFP
    stage.style.touchAction = 'pan-y';
    stage.style.userSelect = 'none';
    let startX = 0, startY = 0;
    let activeSwipePointerId = null;

    stage.addEventListener('pointerdown', (e) => {
      if (activeSwipePointerId !== null) return;
      activeSwipePointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
    });

    stage.addEventListener('pointerup', (e) => {
      if (e.pointerId !== activeSwipePointerId) return;
      activeSwipePointerId = null;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) navigateTeam(1);
        else navigateTeam(-1);
      }
    });

    stage.addEventListener('pointercancel', (e) => {
      if (e.pointerId === activeSwipePointerId) activeSwipePointerId = null;
    });
  }

  // Global Keyboard Navigation (Arrow Keys)
  if (!teamKeyBound) {
    teamKeyBound = true;
    window.addEventListener('keydown', (e) => {
      if (CUR !== 'team') return;
      if (e.key === 'ArrowRight') navigateTeam(1);
      else if (e.key === 'ArrowLeft') navigateTeam(-1);
    });
  }

  renderTeam('init');
  if (typeof playVO === 'function') playVO('vo_team_intro');
}

function navigateTeam(delta) {
  sfx.whoosh();
  teamIdx = (teamIdx + delta + TEAMS.length) % TEAMS.length;
  renderTeam(delta > 0 ? 'next' : 'prev');
}

function renderTeam(dir) {
  const t = TEAMS[teamIdx];
  const sm2 = MISSIONS.find(m => m.id === t.spec);
  const theme = TEAM_THEMES[t.id] || TEAM_THEMES.padi;

  // Update theme class on stage
  const stage = el('#team-stage');
  if (stage) {
    stage.className = 'stage panel-deep theme-' + t.id;
  }

  // Smooth slide transition
  const wrap = el('#hero-wrap');
  if (wrap && dir && dir !== 'init') {
    wrap.classList.remove('slide-from-right', 'slide-from-left');
    // Force reflow
    void wrap.offsetWidth;
    wrap.classList.add(dir === 'next' ? 'slide-from-right' : 'slide-from-left');
  }

  // Text contents
  el('#t-name').textContent = t.name;
  el('#t-motto').textContent = '"' + t.motto + '"';
  el('#t-doss').innerHTML = '<div class="doss-role">' + t.role + '</div><div class="doss-desc">' + t.dossier + '</div>';
  el('#t-spec').textContent = 'Keahlian: ' + t.perk.label + ' • Misi Spesialis: ' + (sm2 ? sm2.title : t.role);

  // Draw 3D Illuminated Podium & Mascot
  drawPodiumAndMascot(t, theme);

  // Render Bottom Dock Tiles with Group Numbers
  el('#t-dock').innerHTML = TEAMS.map((tm, i) => `
    <div class="dock-tile team-tile-${tm.id} ${i === teamIdx ? 'on' : ''}" data-i="${i}">
      <div class="dt-badge-header">
        <span class="dt-num">0${i + 1}</span>
        <span class="dt-name">${tm.name}</span>
      </div>
    </div>
  `).join('');

  els('#t-dock .dock-tile').forEach(d => {
    d.onclick = () => {
      const targetIdx = +d.dataset.i;
      if (targetIdx !== teamIdx) {
        const delta = targetIdx > teamIdx ? 1 : -1;
        teamIdx = targetIdx;
        sfx.whoosh();
        renderTeam(delta > 0 ? 'next' : 'prev');
      }
    };
  });

  // Main CTA button (Direct Access ke Menu 4 Misi Ekosistem)
  el('#t-pick').onclick = () => {
    G.team = t.id;
    NAV.biome = t.id;
    saveG();
    sfx.success();
    toast('Kelompokmu bertugas sebagai ' + t.name + '! Menuju Markas Misi...');
    if (typeof buildMissionMenu === 'function') buildMissionMenu();
    go('mission');
    if (typeof playVO === 'function') playVO('vo_team_' + t.id);
  };
}

window.animateTeamMascot = function(timeMs) {
  if (CUR !== 'team') return;
  const teamObj = TEAMS[teamIdx];
  if (!teamObj) return;
  const theme = TEAM_THEMES[teamObj.biome] || TEAM_THEMES.sawah;
  drawPodiumAndMascot(teamObj, theme, timeMs);
};

function drawPodiumAndMascot(teamObj, theme, timeMs = 0) {
  const cv = el('#t-mascot');
  if (!cv) return;
  const c = cv.getContext('2d');
  c.clearRect(0, 0, 400, 400);

  // 1. Soft Stage Shadow under Podium
  c.save();
  c.beginPath();
  c.ellipse(200, 345, 140, 30, 0, 0, Math.PI * 2);
  c.fillStyle = 'rgba(0,0,0,.45)';
  c.fill();
  c.restore();

  // 2. 3D Cylindrical Podium Base (Bevel & Depth)
  c.save();
  c.fillStyle = LG(c, 0, 290, 0, 335, theme.podiumSide, PAL.panelDeep);

  c.beginPath();
  c.moveTo(65, 300);
  c.lineTo(65, 325);
  c.ellipse(200, 325, 135, 26, 0, 0, Math.PI, false);
  c.lineTo(335, 300);
  c.ellipse(200, 300, 135, 26, 0, Math.PI, 0, true);
  c.closePath();
  c.fill();
  c.restore();

  // 3. Podium Top Surface
  c.save();
  c.fillStyle = RG(c, 200, 295, 135, theme.podiumTop, theme.podiumSide);
  c.beginPath();
  c.ellipse(200, 300, 135, 26, 0, 0, Math.PI * 2);
  c.fill();

  // 4. Specular Highlight Ring on Podium Surface
  c.lineWidth = 2.5;
  c.strokeStyle = 'rgba(255,255,255,.45)';
  c.beginPath();
  c.ellipse(200, 298, 126, 22, 0, 0, Math.PI * 2);
  c.stroke();
  c.restore();

  // 5. Mascot Vector Drawing with slight Scale-Up
  c.save();
  c.translate(200, 205);
  c.scale(1.15, 1.15);
  if (MASC[teamObj.mascot]) {
    MASC[teamObj.mascot](c, timeMs);
  }
  c.restore();
}

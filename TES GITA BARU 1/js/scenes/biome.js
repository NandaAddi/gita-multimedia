/* ============================================================
   ECO-EXPLORER — js/scenes/biome.js
   Layar Pemilihan Ekosistem (Stage Showcase Carousel Slider 4 Bioma)
   ============================================================ */

let PREVS = [];
let biomeIdx = 0;
let biomeKeyBound = false;

function drawPreview(p, t) {
  if (!p || !p.ctx) return;
  const s = Math.min(p.w / 1920, p.h / 1080);
  const ox = (p.w - 1920 * s) / 2;
  const oy = (p.h - 1080 * s) / 2;
  p.ctx.save();
  p.ctx.clearRect(0, 0, p.w, p.h);
  p.ctx.fillStyle = '#03211a';
  p.ctx.fillRect(0, 0, p.w, p.h);
  p.ctx.translate(ox, oy);
  p.ctx.scale(s, s);
  p.fn(p.ctx, t, p.fake);
  p.ctx.restore();
}

/* ================= LAYAR: BIOMA (STAGE CAROUSEL) ================= */
function buildBiome() {
  PREVS = [];
  // Default to saved biome if available, or first
  const savedIdx = BIOME_ORDER.indexOf(NAV.biome);
  biomeIdx = savedIdx >= 0 ? savedIdx : 0;

  el('#scr-biome').innerHTML = `
    <div class="ui">
      <!-- TOPBAR -->
      <div class="topbar">
        <button class="btn tb-btn" id="b-back">${ic('back', 24)} Tim</button>
        <div class="plaque">Pilih Ekosistem Nusantara</div>
        <div class="spacer"></div>
        <button class="btn tb-btn" id="b-kamus">${ic('book', 24)} Kamus Alam</button>
        <div class="tb-stars">${ic('star', 24)} <b>${totStars()}/24</b></div>
      </div>

      <!-- MAIN HERO BIOME SHOWCASE STAGE -->
      <div class="stage panel-deep" id="biome-stage">
        <!-- ARCADE 3D NAV BUTTONS -->
        <button class="arrow prev arcade-arrow" id="b-prev" aria-label="Ekosistem Sebelumnya">
          ${ic('back', 44)}
        </button>
        <button class="arrow next arcade-arrow" id="b-next" aria-label="Ekosistem Berikutnya">
          ${ic('arrowR', 44)}
        </button>

        <!-- SLIDING BIOME CARD INNER -->
        <div class="biome-inner-wrap" id="biome-wrap">
          <!-- LEFT COLUMN: CINEMATIC DIORAMA PREVIEW -->
          <div class="biome-left">
            <div class="biome-preview-frame">
              <canvas id="bp-hero" width="680" height="440"></canvas>
              <div class="biome-star-badge" id="b-star-badge"></div>
            </div>
            <div class="biome-name-plate" id="b-name"></div>
          </div>

          <!-- RIGHT COLUMN: ECOSYSTEM DOSSIER & TROPHIC CHAIN -->
          <div class="biome-right">
            <div class="bio-motto" id="b-tag"></div>
            <div class="bio-dossier">
              <div class="bio-doss-title" id="b-full-title"></div>
              <div class="bio-doss-desc" id="b-desc"></div>
            </div>

            <!-- HORIZONTAL TROPHIC CHAIN -->
            <div class="bio-chain-box">
              <div class="bio-chain-head">Rantai Makanan Utama Ekosistem:</div>
              <div class="bio-chain-row" id="b-chain-row"></div>
            </div>

            <!-- CTA BUTTON -->
            <div class="bio-cta-wrap" id="b-cta-wrap"></div>
          </div>
        </div>
      </div>

      <!-- BOTTOM 4 CAPSULE DOCK POD -->
      <div class="biome-footer-bar">
        <div class="biome-dock-pod" id="b-dock"></div>
      </div>
    </div>
  `;

  // Topbar Handlers
  el('#b-back').onclick = () => {
    sfx.click();
    buildTeam();
    go('team');
  };

  el('#b-kamus').onclick = () => {
    sfx.click();
    kamusModal(NAV.biome);
  };

  // Nav Arrows
  el('#b-prev').onclick = () => navigateBiome(-1);
  el('#b-next').onclick = () => navigateBiome(1);

  // Swipe Gesture for IFP Touchscreen
  const stage = el('#biome-stage');
  let startX = 0, startY = 0;
  stage.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });
  stage.addEventListener('pointerup', (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) navigateBiome(1);
      else navigateBiome(-1);
    }
  });

  // Global Keyboard Navigation
  if (!biomeKeyBound) {
    biomeKeyBound = true;
    window.addEventListener('keydown', (e) => {
      if (CUR !== 'biome') return;
      if (e.key === 'ArrowRight') navigateBiome(1);
      else if (e.key === 'ArrowLeft') navigateBiome(-1);
    });
  }

  renderBiome('init');
}

function navigateBiome(delta) {
  sfx.whoosh();
  biomeIdx = (biomeIdx + delta + BIOME_ORDER.length) % BIOME_ORDER.length;
  renderBiome(delta > 0 ? 'next' : 'prev');
}

function renderBiome(dir) {
  const k = BIOME_ORDER[biomeIdx];
  NAV.biome = k;
  const b = BIOMES[k];
  const un = unlocked(MISSIONS.findIndex(m => m.biome === k));
  const st = MISSIONS.filter(m => m.biome === k).reduce((s, m) => s + (G.stars[m.id] || 0), 0);

  // Update theme class on stage
  const stage = el('#biome-stage');
  if (stage) {
    stage.className = 'stage panel-deep theme-biome-' + k + (un ? '' : ' locked-biome');
  }

  // Smooth slide transition
  const wrap = el('#biome-wrap');
  if (wrap && dir && dir !== 'init') {
    wrap.classList.remove('slide-from-right', 'slide-from-left');
    void wrap.offsetWidth;
    wrap.classList.add(dir === 'next' ? 'slide-from-right' : 'slide-from-left');
  }

  // Update Left Diorama info
  el('#b-name').textContent = b.full;
  el('#b-star-badge').innerHTML = ic('star', 24) + ' <span>' + st + '/6 Bintang Diraih</span>';

  // Update Right column info
  el('#b-tag').textContent = '"' + b.tag + '"';
  el('#b-full-title').textContent = b.full;
  el('#b-desc').textContent = b.desc;

  // Render Horizontal Trophic Chain with Golden Arrows
  el('#b-chain-row').innerHTML = b.chain.map(x => `<span class="cp">${x}</span>`).join('<span class="ca">→</span>');

  // Render CTA Button
  const ctaWrap = el('#b-cta-wrap');
  if (un) {
    ctaWrap.innerHTML = `
      <button class="btn btn-gold btn-biome-enter" id="b-enter-btn">
        ${ic('arrowR', 28)} <span>Jelajahi ${b.name}</span>
      </button>
    `;
    el('#b-enter-btn').onclick = () => {
      sfx.click();
      buildMissionMenu(k);
      go('mission');
    };
  } else {
    ctaWrap.innerHTML = `
      <button class="btn btn-biome-locked" disabled>
        ${ic('lock', 26)} <span>Selesaikan Misi Ekosistem Sebelumnya</span>
      </button>
    `;
  }

  // Register Active Canvas to PREVS loop for 60 FPS animation
  PREVS = [];
  const cv = el('#bp-hero');
  if (cv && SCENE[k]) {
    PREVS.push({
      ctx: cv.getContext('2d'),
      fn: SCENE[k],
      fake: FAKE[k],
      w: 680,
      h: 440
    });
    // Trigger immediate first draw
    drawPreview(PREVS[0], typeof performance !== 'undefined' ? performance.now() : Date.now());
  }

  // Render 4 Capsule Dock Pod
  el('#b-dock').innerHTML = BIOME_ORDER.map((bKey, i) => {
    const bm = BIOMES[bKey];
    const isUn = unlocked(MISSIONS.findIndex(m => m.biome === bKey));
    const bStars = MISSIONS.filter(m => m.biome === bKey).reduce((s, m) => s + (G.stars[m.id] || 0), 0);
    const isActive = i === biomeIdx;

    return `
      <div class="biome-tile tile-${bKey} ${isActive ? 'on' : ''} ${isUn ? '' : 'locked'}" data-i="${i}">
        <div class="bt-header">
          <span class="bt-num">0${i + 1}</span>
          <span class="bt-name">${bm.name}</span>
        </div>
        <span class="bt-status">
          ${isUn ? (ic('star', 20) + ' ' + bStars + '/6 Bintang') : (ic('lock', 20) + ' Terkunci')}
        </span>
      </div>
    `;
  }).join('');

  els('#b-dock .biome-tile').forEach(d => {
    d.onclick = () => {
      const targetIdx = +d.dataset.i;
      if (targetIdx !== biomeIdx) {
        const delta = targetIdx > biomeIdx ? 1 : -1;
        biomeIdx = targetIdx;
        sfx.whoosh();
        renderBiome(delta > 0 ? 'next' : 'prev');
      }
    };
  });
}

/* ============================================================
   ECO-EXPLORER — js/scenes/mission-menu.js
   Menu 4 Misi (Grid Komparatif 2x2 IFP: 2 Alam vs 2 Manusia)
   & Modal Kamus Alam (Buku Catatan Detektif)
   ============================================================ */

function kamusModal(pre) {
  let b = pre && BIOME_ORDER.includes(pre) ? pre : (NAV.biome || 'sawah');
  const r = modal(
    '<h2>' + ic('book', 34) + ' Kamus Detektif Alam</h2>' +
    '<p>Sentuh istilah sains untuk membaca penjelasan ekologisnya. Gunakan untuk investigasi kasus!</p>' +
    '<div id="ktabs" style="display:flex;gap:12px;margin:8px 0 16px;flex-wrap:wrap"></div><div id="kbody"></div>'
  );

  function render() {
    r.querySelector('#ktabs').innerHTML = BIOME_ORDER.map(
      k => '<div class="ktab ' + (k === b ? 'on' : '') + '" data-k="' + k + '">' + BIOMES[k].name + '</div>'
    ).join('');

    r.querySelector('#kbody').innerHTML =
      '<div class="kdetail" id="kdet" style="margin-bottom:16px">Sentuh salah satu istilah sains di bawah untuk membaca penjelasannya…</div>' +
      '<div class="kgrid">' +
      KAMUS[b].map((k, i) =>
        '<div class="kcard" data-i="' + i + '"><h3>' + k[0] + '</h3><p>' + k[1] + '</p></div>'
      ).join('') +
      '</div>';

    r.querySelectorAll('.ktab').forEach(t => t.onclick = () => {
      b = t.dataset.k;
      sfx.click();
      render();
    });

    r.querySelectorAll('.kcard').forEach(cd => cd.onclick = () => {
      sfx.pop();
      const k = KAMUS[b][+cd.dataset.i];
      r.querySelector('#kdet').innerHTML =
        '<b style="color:#fef08a;font-family:Fredoka;font-size:29px">' + k[0] + '</b> — ' + k[2];
    });
  }

  render();
}

/* ================= LAYAR: MENU 4 MISI (GRID KOMPARATIF 2x2) ================= */
function buildMissionMenu(biomeKey) {
  el('#scr-mission').style.background = 'transparent'; // Enable glassmorphism background
  const b = biomeKey || NAV.biome || G.team || 'sawah';
  NAV.biome = b;

  const team = TEAMS.find(t => t.id === G.team) || TEAMS.find(t => t.id === b) || TEAMS[0];
  const bMissions = MISSIONS.filter(m => m.biome === b);
  const alamMissions = bMissions.filter(m => m.type === 'alam');
  const manusiaMissions = bMissions.filter(m => m.type === 'manusia');
  const sortedMissions = [...alamMissions, ...manusiaMissions];

  const groupStars = bMissions.reduce((s, m) => s + (G.stars[m.id] || 0), 0);

  function isUnlocked(m, list, subIdx) {
    if (subIdx === 0) return true;
    const prev = list[subIdx - 1];
    return (G.stars[prev.id] || 0) > 0;
  }

  function renderCard(m, list, subIdx, colLabel, globalIdx) {
    const st = G.stars[m.id] || 0;
    const un = isUnlocked(m, list, subIdx);
    const badgeColor = m.type === 'alam' ? '#047857' : '#b45309';
    const badgeIcon = m.type === 'alam' ? '🍃' : '⚠️';
    const badgeText = m.type === 'alam' ? 'TANTANGAN ALAM' : 'TANTANGAN MANUSIA';
    const glowColor = m.type === 'alam' ? 'rgba(4, 120, 87, 0.6)' : 'rgba(180, 83, 9, 0.6)';

    return `
      <div class="mcard carousel-slide ${un ? '' : 'locked'}" id="mcard-${globalIdx}" style="display:${globalIdx === 0 ? 'flex' : 'none'};flex-direction:column;width:100%;height:auto;padding:32px;border-radius:24px;background:rgba(15, 35, 25, 0.85);backdrop-filter:blur(16px);border:3px solid ${badgeColor};box-shadow:0 16px 40px ${glowColor}, inset 0 0 20px ${glowColor};transform:translateY(-10px);transition:all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
        <div class="mcard-badge" style="margin-top:-54px;background:${badgeColor};color:#fff;padding:8px 24px;border-radius:20px;font-family:var(--font-fun);align-self:center;margin-bottom:16px;font-size:24px;box-shadow:0 6px 12px rgba(0,0,0,0.4);border:2px solid rgba(255,255,255,0.2);">
           ${badgeIcon} ${badgeText}
        </div>
        <div class="mcard-header" style="flex-direction:column;text-align:center;gap:8px;margin-bottom:16px;">
          <div class="micon ${m.type}" style="width:90px;height:90px;margin:0 auto;font-size:48px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);border:2px solid ${badgeColor};">${ic(m.type === 'manusia' ? 'users' : BICON[m.biome], 48)}</div>
          <div class="mtype-wrap" style="align-items:center;">
            <div class="mcard-subnum" style="font-size:24px;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:1px;text-transform:uppercase;margin-top:12px;">${colLabel} • KASUS 0${subIdx + 1}</div>
            <div class="mtitle" style="font-size:38px;margin-top:6px;text-shadow:0 2px 4px rgba(0,0,0,0.5);">${m.title}</div>
          </div>
          <div class="mstars" style="font-size:40px;justify-content:center;margin-top:12px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));">
            ${[0, 1, 2].map(k => `<span class="${k < st ? '' : 'off'}">★</span>`).join('')}
          </div>
        </div>

        <div class="mbody" style="text-align:center;font-size:24px;margin-bottom:24px;flex:1;">
          <div class="mhead" style="margin-bottom:16px;color:#fff;line-height:1.4;">${m.headline}</div>
          <div class="mtask" style="color:#9fd8c3;background:rgba(0,0,0,0.3);padding:16px;border-radius:16px;border-left:6px solid ${badgeColor};text-align:left;line-height:1.4;"><b>Tugas:</b> ${m.task}</div>
        </div>

        <div class="mcard-action" style="margin-top:auto;padding-top:14px;margin-bottom:6px;">
          ${un
            ? `<button class="btn btn-gold go btn-mission-cta" data-id="${m.id}">
                 <span>${st ? 'Ulangi Kasus Ini' : 'Mulai Investigasi!'}</span> <span class="btn-emoji" style="-webkit-text-stroke:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4));">🚀</span>
               </button>`
            : `<button class="btn go btn-mission-cta" disabled>
                 ${ic('lock', 26)} <span>Selesaikan Kasus 0${subIdx} (Min. 1⭐)</span>
               </button>`
          }
        </div>
      </div>
    `;
  }

  el('#scr-mission').innerHTML = `
    <div class="ui">
      <!-- TOPBAR KOMANDO DETEKTIF -->
      <div class="topbar">
        <button class="btn tb-btn" id="m-back">${ic('back', 24)} Ganti Kelompok</button>
        <div class="plaque">${team.name} - Markas 4 Misi</div>
        <div class="spacer"></div>
        <button class="btn tb-btn" id="m-kamus">${ic('book', 24)} Kamus Alam</button>
        <div class="tb-stars">${ic('star', 24)} <b>${groupStars}/12 ⭐</b></div>
      </div>

      <!-- MAIN CAROUSEL -->
      <div class="mmenu" style="position:absolute;top:120px;bottom:30px;left:0;right:0;display:flex;align-items:center;justify-content:center;flex-direction:column;">
        
        <div style="display:flex;align-items:center;justify-content:center;width:100%;gap:40px;">
          <button class="btn btn-gold" id="car-prev" style="width:90px;height:90px;border-radius:50%;font-size:36px;padding:0;z-index:20;flex-shrink:0;">◀</button>
          
          <div class="carousel-track" style="width:840px;min-height:600px;display:flex;align-items:center;z-index:10;perspective:1000px;flex-shrink:0;">
            ${sortedMissions.map((m, idx) => {
              const list = m.type === 'alam' ? alamMissions : manusiaMissions;
              const subIdx = list.indexOf(m);
              const colLabel = m.type === 'alam' ? 'FAKTOR ALAM' : 'FAKTOR MANUSIA';
              return renderCard(m, list, subIdx, colLabel, idx);
            }).join('')}
          </div>

          <button class="btn btn-gold" id="car-next" style="width:90px;height:90px;border-radius:50%;font-size:36px;padding:0;z-index:20;flex-shrink:0;">▶</button>
        </div>
        
        <div class="carousel-dots" style="display:flex;gap:16px;margin-top:40px;background:rgba(0,0,0,0.4);padding:12px 24px;border-radius:30px;backdrop-filter:blur(8px);">
          ${sortedMissions.map((_, i) => `<div class="cdot" data-idx="${i}" style="width:20px;height:20px;border-radius:50%;background:${i === 0 ? 'var(--gold)' : 'rgba(255,255,255,0.3)'};cursor:pointer;transition:all 0.3s;box-shadow:0 2px 4px rgba(0,0,0,0.5);"></div>`).join('')}
        </div>
      </div>
    </div>
  `;

  let curSlide = 0;
  let carCooldown = false; // BUG FIX #5: Debounce carousel
  const slides = el('#scr-mission').querySelectorAll('.carousel-slide');
  const dots = el('#scr-mission').querySelectorAll('.cdot');
  
  function updateCar() {
    slides.forEach((s, i) => {
      if (i === curSlide) {
        s.style.display = 'flex';
        // Add a micro-animation pop-in
        s.style.animation = 'none';
        s.offsetHeight; /* trigger reflow */
        s.style.animation = 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
      } else {
        s.style.display = 'none';
      }
    });
    dots.forEach((d, i) => {
      d.style.background = i === curSlide ? 'var(--gold)' : 'rgba(255,255,255,0.3)';
      d.style.transform = i === curSlide ? 'scale(1.2)' : 'scale(1)';
    });
  }
  
  el('#car-prev').onclick = () => {
    if(carCooldown) return;
    carCooldown = true; setTimeout(() => carCooldown = false, 300);
    sfx.click();
    curSlide = (curSlide - 1 + slides.length) % slides.length;
    updateCar();
  };
  
  el('#car-next').onclick = () => {
    if(carCooldown) return;
    carCooldown = true; setTimeout(() => carCooldown = false, 300);
    sfx.click();
    curSlide = (curSlide + 1) % slides.length;
    updateCar();
  };
  
  dots.forEach((d, i) => {
    d.onclick = () => {
      sfx.click();
      curSlide = i;
      updateCar();
    };
  });

  el('#m-back').onclick = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    sfx.back();
    buildTeam();
    go('team');
  };
  el('#m-kamus').onclick = () => { sfx.click(); kamusModal(b); };

  el('#scr-mission').querySelectorAll('.go').forEach(btn => {
    btn.onclick = () => {
      // BUG FIX #6: Validasi ulang gembok saat klik (anti DevTools bypass)
      const mId = btn.dataset.id;
      if(!mId) return; // tombol disabled (locked)
      const targetM = bMissions.find(m => m.id === mId);
      if(targetM) {
        const mList = bMissions.filter(m => m.type === targetM.type);
        const mIdx = mList.indexOf(targetM);
        if(!isUnlocked(targetM, mList, mIdx)) {
          sfx.deny(); toast('Misi ini masih terkunci! Selesaikan kasus sebelumnya dulu.'); return;
        }
        sfx.success();
        openMission(targetM);
      }
    };
  });
}

function openMission(m) {
  if (!m) return;
  const r = modal(`
    <h2>${m.title}</h2>
    <p><b style="color:#fef08a;font-size:26px">${m.headline}</b></p>
    <p style="font-size:24px;line-height:1.5">${m.story}</p>
    <p style="color:#7fd4e8;font-family:Fredoka;font-size:25px;margin:8px 0">Tugas: ${m.task}</p>
    <div class="brief-t" style="font-size:25px;font-weight:700;color:var(--gold);margin-top:12px">Target Misi:</div>
    <ul style="font-size:24px;line-height:1.5">${m.targets.map(t => `<li>${t.l}</li>`).join('')}</ul>
    <p style="font-size:24px">Selesaikan dalam <b>≤ ${m.par} hari</b> untuk meraih 3 bintang. Batas waktu: ${m.par + 18} hari.</p>
    <p style="background:rgba(2,44,34,.7);border-radius:14px;padding:12px 20px;font-size:24px;color:var(--mint);box-shadow:inset 0 1px 0 rgba(255,255,255,.08)">
      💡 Tips Gita: ${m.tips[0]}
    </p>
    <div class="mrow" style="margin-top:16px">
      <button class="btn btn-gold" id="mf-go" style="font-size:27px;padding:16px 48px">Mulai Misi!</button>
    </div>
  `);

  if (r) {
    const btnGo = r.querySelector('#mf-go');
    if (btnGo) {
      btnGo.onclick = () => {
        sfx.click();
        closeModal();
        startSim(m);
      };
    }
  }
}

function startMission(mOrId) {
  const m = typeof mOrId === 'string' ? (typeof MISSIONS !== 'undefined' ? MISSIONS.find(x => x.id === mOrId) : null) : mOrId;
  if (m) openMission(m);
}
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
  const b = biomeKey || NAV.biome || G.team || 'sawah';
  NAV.biome = b;

  const team = TEAMS.find(t => t.id === G.team) || TEAMS.find(t => t.id === b) || TEAMS[0];
  const bMissions = MISSIONS.filter(m => m.biome === b);
  const alamMissions = bMissions.filter(m => m.type === 'alam');
  const manusiaMissions = bMissions.filter(m => m.type === 'manusia');

  // Hitung total bintang kelompok di bioma ini (Maksimal 12: 4 misi × 3 bintang)
  const groupStars = bMissions.reduce((s, m) => s + (G.stars[m.id] || 0), 0);

  // Sistem Progression Lock: 2 Jalur Paralel
  // Jalur Alam: Kasus 1 Alam selalu terbuka. Kasus 2 Alam terbuka jika Kasus 1 Alam memiliki >= 1 bintang.
  // Jalur Manusia: Kasus 1 Manusia selalu terbuka. Kasus 2 Manusia terbuka jika Kasus 1 Manusia memiliki >= 1 bintang.
  function isUnlocked(m, list, subIdx) {
    if (subIdx === 0) return true;
    const prev = list[subIdx - 1];
    return (G.stars[prev.id] || 0) > 0;
  }

  function renderCard(m, list, subIdx, colLabel) {
    const st = G.stars[m.id] || 0;
    const un = isUnlocked(m, list, subIdx);
    const prev = subIdx > 0 ? list[subIdx - 1] : null;

    return `
      <div class="mcard panel-deep ${un ? '' : 'locked'}">
        <div class="mcard-header">
          <div class="micon ${m.type}">${ic(m.type === 'manusia' ? 'users' : BICON[m.biome], 38)}</div>
          <div class="mtype-wrap">
            <div class="mcard-subnum">${colLabel} • KASUS 0${subIdx + 1}</div>
            <div class="mtitle">${m.title}</div>
          </div>
          <div class="mstars">
            ${[0, 1, 2].map(k => `<span class="${k < st ? '' : 'off'}">★</span>`).join('')}
          </div>
        </div>

        <div class="mbody">
          <div class="mhead">${m.headline}</div>
          <div class="mtask">Tugas: ${m.task}</div>
        </div>

        <div class="mcard-action">
          ${un
            ? `<button class="btn btn-gold go" data-id="${m.id}">
                 ${st ? 'Ulangi Kasus Ini' : 'Mulai Investigasi!'} 🚀
               </button>`
            : `<button class="btn go" disabled>
                 ${ic('lock', 22)} Selesaikan Kasus 0${subIdx} (Min. 1⭐)
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
        <div class="plaque">${team.name} — Markas 4 Misi</div>
        <div class="spacer"></div>
        <button class="btn tb-btn" id="m-kamus">${ic('book', 24)} Kamus Alam</button>
        <div class="tb-stars">${ic('star', 24)} <b>${groupStars}/12 ⭐</b></div>
      </div>

      <!-- MAIN 2x2 COMPARATIVE GRID -->
      <div class="mmenu">
        <div class="mgrid-2x2">
          <!-- KOLOM KIRI: 2 MISI ULAH ALAM -->
          <div class="mcol">
            <div class="mcol-header alam">
              ${ic('drop', 26)} <span>🍃 TANTANGAN ULAH ALAM (2 KASUS)</span>
            </div>
            ${alamMissions.map((m, idx) => renderCard(m, alamMissions, idx, 'FAKTOR ALAM')).join('')}
          </div>

          <!-- KOLOM KANAN: 2 MISI ULAH MANUSIA -->
          <div class="mcol">
            <div class="mcol-header manusia">
              ${ic('users', 26)} <span>⚠️ TANTANGAN ULAH MANUSIA (2 KASUS)</span>
            </div>
            ${manusiaMissions.map((m, idx) => renderCard(m, manusiaMissions, idx, 'FAKTOR MANUSIA')).join('')}
          </div>
        </div>

        <!-- FOOTER PROGRES INVESTIGASI -->
        <div class="mprog">
          Progres Investigasi ${team.name}: <b>${groupStars}/12 Bintang</b> • Total Seluruh Kelompok: <b>${totStars()}/48 ⭐</b>
        </div>
      </div>
    </div>
  `;

  // Back button navigates to Team Selection Screen (Switch Active Detective Group)
  el('#m-back').onclick = () => {
    sfx.click();
    buildTeam();
    go('team');
  };

  // Kamus Alam Modal
  el('#m-kamus').onclick = () => {
    sfx.click();
    kamusModal(b);
  };

  // Click on active mission CTA buttons
  els('.mcard .go[data-id]').forEach(btn => {
    btn.onclick = () => {
      sfx.click();
      const missionId = btn.dataset.id;
      const targetMission = MISSIONS.find(m => m.id === missionId);
      if (targetMission) openMission(targetMission);
    };
  });
}

function openMission(m) {
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

  r.querySelector('#mf-go').onclick = () => {
    sfx.click();
    closeModal();
    startSim(m);
  };

  speak('Misi dimulai. ' + m.task);
}

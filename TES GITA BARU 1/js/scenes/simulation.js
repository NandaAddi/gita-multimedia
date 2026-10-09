/* ============================================================
   ECO-EXPLORER — js/scenes/simulation.js
   Arena Simulasi, HUD, Timer, & Bridging Dialog Box
   ============================================================ */

let SIM = null;

let bridgeStep = 1;
function showBridgeDialog(m, team){
  const urlStep = new URLSearchParams(location.search).get('step');
  bridgeStep = urlStep ? parseInt(urlStep) : 1;
  const bdata = BRIDGE_DATA[m.id] || {
    step1: { title: m.title, text: m.story, gitaExpr: 'worried' },
    step2: { title: 'Rencana Aksi: '+m.headline, text: 'Langkah pertama: '+m.task, gitaExpr: 'talk' }
  };
  
  const box = el('#sim-bridge');
  if(!box) return;
  box.style.display = 'flex';

  // Preload kedua sequence animasi Gita di latar belakang
  if (typeof GitaSeq !== 'undefined' && GitaSeq.preload) {
    GitaSeq.preload({ folder: 'worried_loop', prefix: 'Comp 1_', pad: 5, ext: '.webp', frames: 60, fps: 12 });
    GitaSeq.preload({ folder: 'talking_loop', prefix: 'Comp 1_', pad: 5, ext: '.webp', frames: 60, fps: 12 });
  }

  function renderBridgeStep(){
    const cur = bridgeStep === 1 ? bdata.step1 : bdata.step2;
    const expr = cur.gitaExpr || (bridgeStep === 1 ? 'worried' : 'talk');
    const seqFolder = (expr === 'worried') ? 'worried_loop' : 'talking_loop';

    if (typeof GitaSeq !== 'undefined' && GitaSeq.play) {
      GitaSeq.play('#bridge-gita-box', {
        folder: seqFolder,
        prefix: 'Comp 1_',
        pad: 5,
        ext: '.webp',
        frames: 60,
        fps: 12,
        size: 210,
        showLoading: false,
        fallbackSVG: () => gitaSVG(200, expr)
      });
    } else {
      el('#bridge-gita-box').innerHTML = gitaSVG(130, expr);
    }
    el('#bridge-step-pill').innerHTML = 'Petunjuk Awal Misi &bull; Langkah ' + bridgeStep + ' dari 2';
    el('#bridge-title').textContent = cur.title;
    el('#bridge-text').innerHTML = cur.text;
    
    // Team shoutout on step 2
    if(bridgeStep === 2 && team){
      el('#bridge-team-shout').innerHTML = 'Tim andalan kita: <b style="color:#fef08a">' + team.name + '</b> (' + team.role + ') dengan keahlian <b>' + team.perk.label + '</b> siap beraksi!';
    } else {
      el('#bridge-team-shout').innerHTML = '';
    }
    
    // Team mascot canvas
    const cv = el('#bridge-mascot-cv');
    if(cv && team && MASC[team.mascot]){
      const c = cv.getContext('2d');
      c.clearRect(0,0,110,110);
      c.save();
      c.translate(55, 60);
      c.scale(0.35, 0.35);
      MASC[team.mascot](c);
      c.restore();
    }
    el('#bridge-team-name').textContent = team ? team.name : '';
    el('#bridge-team-role').textContent = team ? team.role : '';
    
    const btnNext = el('#bridge-btn-next');
    if(bridgeStep === 1){
      btnNext.innerHTML = 'Lanjut ' + ic('arrowR', 24);
      btnNext.className = 'btn btn-gold';
    } else {
      btnNext.innerHTML = ic('check', 26) + ' Ayo Pulihkan!';
      btnNext.className = 'btn btn-gold';
    }
    
    // Audio: chime pembuka hanya di langkah 1, suara Gita otomatis monofonik
    if (bridgeStep === 1) sfx.chime();
    const voKey = 'vo_bridge_' + m.id.replace('-', '') + '_s' + bridgeStep;
    if (typeof playVO === 'function') playVO(voKey);
  }

  el('#bridge-btn-next').onclick = () => {
    sfx.click();
    if(bridgeStep === 1){
      if(typeof stopVO === 'function') stopVO();
      bridgeStep = 2;
      renderBridgeStep();
    } else {
      closeBridgeDialog();
    }
  };

  el('#bridge-btn-skip').onclick = () => {
    sfx.click();
    closeBridgeDialog();
  };

  renderBridgeStep();
}

/* ================= ONBOARDING SPOTLIGHT PANEL TOUR (STANDAR IFP) =================
   4 Langkah Tur Interaktif: Target Misi -> Kondisi Ekosistem -> Keseimbangan Alam -> Dermaga Kartu Aksi
*/
let currentTourStep = 0;
let tourOverlayEl = null;
let tourCardEl = null;

function startPanelTour(onComplete) {
  if (!SIM) return;
  // Pastikan panel kiri, kanan, dan atas terbuka penuh saat tur
  SIM.ui.left = true;
  SIM.ui.right = true;
  SIM.ui.top = true;
  syncUITabs();

  const wasPaused = SIM.paused;
  SIM.paused = true;

  const tourSteps = [
    {
      target: '#sim-ui .hud-left',
      pos: 'pos-left',
      pill: 'Langkah 1/4',
      title: '🎯 Target Misi & Panduan Gita',
      body: 'Pantau sasaran yang harus kamu selesaikan di sini. <b>Gita</b> juga akan memberi arahan dan peringatan darurat jika ekosistem terancam!'
    },
    {
      target: '#sim-ui .hud-right',
      pos: 'pos-right',
      pill: 'Langkah 2/4',
      title: '📊 Kondisi Ekosistem',
      body: 'Perhatikan grafik populasi dan kadar lingkungan secara langsung. Warna <b>hijau</b> berarti sehat, dan <b>merah</b> berarti bahaya!'
    },
    {
      target: '#sim-ui .hpod',
      pos: 'pos-top',
      pill: 'Langkah 3/4',
      title: '❤️ Keseimbangan Alam & Hari',
      body: 'Jaga keseimbangan ekosistem agar tetap tinggi! Selesaikan misi sebelum <b>batas hari</b> berakhir agar mendapat 3 bintang.'
    },
    {
      target: '#sim-ui .sim-dock',
      pos: 'pos-bottom',
      pill: 'Langkah 4/4',
      title: '🃏 Dermaga Kartu Aksi',
      body: 'Pilih dan gunakan kartu aksi untuk memulihkan alam. Perhatikan <b>kuota pemakaian</b> dan waktu istirahat setiap aksi!'
    }
  ];

  cleanupPanelTour();

  const container = el('#scr-sim') || document.body;
  tourOverlayEl = document.createElement('div');
  tourOverlayEl.className = 'spotlight-overlay';
  container.appendChild(tourOverlayEl);

  currentTourStep = 0;

  function endTour() {
    cleanupPanelTour();
    if (SIM && SIM.m) {
      if (!G.toursSeen) G.toursSeen = {};
      G.toursSeen['tour_' + SIM.m.biome] = true;
      saveG();
    }
    sfx.success();
    if (onComplete) {
      onComplete();
    } else {
      if (SIM && !wasPaused && !SIM.done) {
        SIM.paused = false;
      }
    }
  }

  function renderStep(idx) {
    document.querySelectorAll('.spotlight-highlight').forEach(e => e.classList.remove('spotlight-highlight'));
    if (tourCardEl) {
      tourCardEl.remove();
      tourCardEl = null;
    }

    const step = tourSteps[idx];
    if (!step) {
      endTour();
      return;
    }

    const targetEl = document.querySelector(step.target);
    if (targetEl) {
      targetEl.classList.add('spotlight-highlight');
    }

    tourCardEl = document.createElement('div');
    tourCardEl.className = 'spotlight-guide-card ' + step.pos;
    const isLast = idx === tourSteps.length - 1;

    tourCardEl.innerHTML = '<div class="sgc-header">'
      + '<div class="sgc-kicker">' + gitaSVG(36, 'happy') + ' <span>Pengenalan Panel</span></div>'
      + '<span class="sgc-step-pill">' + step.pill + '</span>'
      + '</div>'
      + '<h3 class="sgc-title">' + step.title + '</h3>'
      + '<p class="sgc-body">' + step.body + '</p>'
      + '<div class="sgc-footer">'
      + '<button class="sgc-skip-btn" id="tour-skip-btn">Lewati Tur</button>'
      + '<button class="btn btn-gold sgc-next-btn" id="tour-next-btn">'
      + (isLast ? (ic('check', 24) + ' Selesai') : ('Lanjut ' + ic('arrowR', 22)))
      + '</button>'
      + '</div>';

    container.appendChild(tourCardEl);

    if (idx === 0) sfx.chime();
    else sfx.pop();

    const skipBtn = tourCardEl.querySelector('#tour-skip-btn');
    const nextBtn = tourCardEl.querySelector('#tour-next-btn');

    if (skipBtn) {
      skipBtn.onclick = () => {
        sfx.click();
        endTour();
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        sfx.click();
        if (isLast) {
          endTour();
        } else {
          currentTourStep++;
          renderStep(currentTourStep);
        }
      };
    }
  }

  renderStep(currentTourStep);
}

function cleanupPanelTour() {
  document.querySelectorAll('.spotlight-highlight').forEach(e => e.classList.remove('spotlight-highlight'));
  if (tourOverlayEl) {
    tourOverlayEl.remove();
    tourOverlayEl = null;
  }
  if (tourCardEl) {
    tourCardEl.remove();
    tourCardEl = null;
  }
}

function startDaySimulation(){
  if(!SIM || SIM.done) return;
  SIM.paused = false;
  if(SIM.timer) clearInterval(SIM.timer);
  SIM.timer = setInterval(simTick, 1500);
  sfx.success();
  toast('Hari 1 dimulai! Pilih kartu aksi pertamamu di bawah.');
}

function closeBridgeDialog(){
  if (typeof stopVO === 'function') stopVO();
  if (typeof GitaSeq !== 'undefined' && GitaSeq.stop) GitaSeq.stop('#bridge-gita-box');
  const box = el('#sim-bridge');
  if(box) box.style.display = 'none';
  // BUG FIX #7: Cegah timer bocor jika SIM sudah null/done
  if(SIM && !SIM.done){
    SIM.bridging = false;
    const tourKey = 'tour_' + SIM.m.biome;
    if(SIM.m.id.endsWith('-1') && (!G.toursSeen || !G.toursSeen[tourKey])){
      startPanelTour(() => {
        startDaySimulation();
      });
    } else {
      startDaySimulation();
    }
  }
}

function startSim(m){
 if(SIM&&SIM.timer)clearInterval(SIM.timer);
 const team=TEAMS.find(t=>t.id===G.team)||TEAMS[0];
 SIM={m,team,S:Object.assign({day:0},m.init),tgt:m.targets.map(()=>false),
  quota:m.actions.map(a=>a.quota+(team.perk.ids.includes(a.id)?1:0)),
  cdi:m.actions.map(a=>team.perk.ids.includes(a.id)?2:3),
  cool:m.actions.map(()=>0),paused:true,mp:0,done:false,voted:0,voteAt:[12,24,36],limit:m.par+18,
   ui:{left:true,right:true,top:true,leftDot:false},bridging:true,_cinematicLock:false};
 SIM.S.health=m.health(SIM.S);
 buildSimUI();go('sim');updateHUD();
 showBridgeDialog(m,team);}
function buildSimUI(){const m=SIM.m;
 el('#sim-ui').innerHTML='<div class="ui">'
 +'<div class="sim-topbar">'
 +'<button class="btn tb-btn" id="sim-back">'+ic('back',24)+' Berhenti</button>'
 +'<button class="btn tb-btn" id="sim-pause">'+ic('pause',24)+' Jeda</button>'
 +'<div class="day-chip">'+ic('clock',24)+' Hari <b id="day-n">0</b><span style="opacity:.6">/'+SIM.limit+'</span></div>'
 +'<div class="spacer"></div>'
 +'<button class="btn tb-btn" id="sim-help">'+ic('mag',24)+' Tips</button>'
 +'<button class="btn tb-btn" id="sim-kamus">'+ic('book',24)+' Kamus</button>'
 +'<button class="btn tb-btn snd-btn"></button>'
  +'<div class="tb-stars">'+ic('star',24)+' <b>'+totStars()+'/48</b></div>'
  +'<button class="btn tb-btn" id="sim-top-hide" title="Sembunyikan panel atas">▲</button></div>'
 +'<div class="hpod"><div class="r1"><span>Keseimbangan Ekosistem</span><span class="st" id="hp-val"></span></div>'
 +'<div class="hbar"><div id="hp-bar"></div></div></div>'
 +'<div class="hud-left">'
 +'<div class="panel-deep gita-card"><div class="gita-plaque">'+gitaSVG(66,'happy')+'<span class="tag">GITA</span></div>'
 +'<div class="gita-txt" id="gita-txt"></div></div>'
 +'<div class="panel-deep targets-card"><h3>'+ic('target',18)+' Target Misi</h3><div id="tgt-list"></div></div></div>'
 +'<div class="hud-right panel-deep"><div class="panel-title">'+ic('mag',24)+' Kondisi Ekosistem</div>'
 +'<div id="stat-rows"></div></div>'
 +'<div class="sim-dock"><div class="dock-ribbon">Pilih aksi — perhatikan kuota & masa istirahat. Klik baris kondisi untuk penjelasan!</div>'
 +'<div class="dock-slider-wrap" style="position:relative;display:flex;align-items:center;gap:18px;justify-content:center;">'
 +(m.actions.length > 4 ? '<button class="btn sim-arr left-arr" style="width:56px;height:90px;flex:none;border-radius:20px;font-size:24px;padding:0;z-index:10">◀</button>' : '')
 +'<div class="dock-grid" id="dock-grid" style="flex:auto;max-width:1400px;overflow:hidden;padding:12px;scroll-behavior:smooth;display:flex;gap:16px;justify-content:center;"></div>'
 +(m.actions.length > 4 ? '<button class="btn sim-arr right-arr" style="width:56px;height:90px;flex:none;border-radius:20px;font-size:24px;padding:0;z-index:10">▶</button>' : '')
 +'</div></div></div>';
 el('#sim-back').onclick=()=>{sfx.click();
  const r=modal('<h2>'+ic('back',34)+' Berhenti dari misi?</h2><p>Progres misi ini akan hilang dan kamu kembali ke peta misi.</p>'
   +'<div class="mrow"><button class="btn btn-ruby" id="ab-y">'+ic('back',24)+' Ya, Berhenti</button><button class="btn btn-gold" id="ab-n">'+ic('play',24)+' Lanjut Main</button></div>',true);
  r.querySelector('#ab-y').onclick=()=>{closeModal();leaveSim();buildMissionMenu(SIM?SIM.m.biome:NAV.biome);go('mission');};
  r.querySelector('#ab-n').onclick=()=>{sfx.click();closeModal();};};
  el('#sim-pause').onclick=function(){if(!SIM)return;SIM.paused=!SIM.paused;this.classList.toggle('pause-on',SIM.paused);
   this.innerHTML=SIM.paused?ic('play',24)+' Lanjut':ic('pause',24)+' Jeda';sfx.click();};
  el('#sim-top-hide').onclick=()=>toggleUIPanel('top');
 el('#sim-help').onclick=()=>{sfx.click();
  const r=modal('<h2>Tips Misi</h2>'+SIM.m.tips.map(t=>'<p>• '+t+'</p>').join('')
  +'<p style="color:#7fd4e8;font-family:Fredoka">Target waktu: ≤ '+SIM.m.par+' hari untuk 3 bintang.</p>'
  +'<div class="mrow">'
  +'<button class="btn btn-secondary" id="sim-replay-tour" style="font-size:24px;padding:12px 24px">🔍 Putar Tur Panel</button>'
  +'<button class="btn btn-gold" data-close>Mengerti!</button>'
  +'</div>');
  const repBtn = r.querySelector('#sim-replay-tour');
  if(repBtn) repBtn.onclick = () => { closeModal(); startPanelTour(); };
 };
 el('#sim-kamus').onclick=()=>{sfx.click();kamusModal(SIM.m.biome);};
 el('#sim-ui .snd-btn').onclick=toggleSound;
  // IFP Touchscreen & Pointer Management: Single Active Pointer Lock + Tap-to-Place
  clearCardSelection();
  resetTouchLock();
 el('#dock-grid').addEventListener('pointerdown', e => {
  // Palm rejection / multi-touch lock: abaikan jika ada pointer lain yang aktif
  if(activePointerId !== null && e.pointerId !== activePointerId) return;
  const card = e.target.closest('.dock-card');
  if(!card || !SIM) return;
  if(card.classList.contains('finish')){
   const b = e.target.closest('button');
   if(b) { sfx.click(); finishSim(); }
   return;
  }
  const allCards = Array.from(document.querySelectorAll('.dock-grid .dock-card:not(.finish)'));
  let i = allCards.indexOf(card);
  if(i === -1) return;
  
  if(SIM.done) { toast('Misi sudah selesai! Tekan tombol emas.'); return; }
  if(SIM.cool[i] > 0) { sfx.deny(); toast('Aksi masih istirahat.'); return; }
  if(SIM.quota[i] <= 0) { sfx.deny(); toast('Kuota sudah habis.'); return; }
  
  activePointerId = e.pointerId;
  activeDragIndex = i;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  isDragging = false;

  try {
    if(card.setPointerCapture) card.setPointerCapture(e.pointerId);
  } catch(err) {}

  if(pointerLockTimeout) clearTimeout(pointerLockTimeout);
  pointerLockTimeout = setTimeout(() => { resetTouchLock(); }, 8000);

  window.addEventListener('pointermove', onDragMove);
  window.addEventListener('pointerup', onDragEnd);
 });

  // Tap-to-Place pada area pemandangan alam (#scr-sim di atas dock)
  const simScreen = el('#scr-sim');
  if(!simScreen.hasAttribute('data-touch-tap-bound')){
    simScreen.setAttribute('data-touch-tap-bound', 'true');
    simScreen.addEventListener('pointerdown', e => {
      if(selectedCardIndex === -1 || !SIM) return;
      if(e.target.closest('.sim-dock, .hud-left, .hud-right, .sim-top, #sim-bridge, .edge-tab, .modal, .modal-dim')) return;
      const dock = document.querySelector('.sim-dock');
      const dockTop = dock ? dock.getBoundingClientRect().top : window.innerHeight - 200;
      if(e.clientY < dockTop) {
        const actIdx = selectedCardIndex;
        clearCardSelection();
        if(typeof doAction === 'function') {
          doAction(actIdx, e.clientX, e.clientY);
        }
      }
    });
  }
  const statRowsEl = el('#stat-rows');
  if (statRowsEl) {
    statRowsEl.onclick = e => {
      const r = e.target.closest('.srow');
      if (!r || !SIM) return;
      const s = SIM.m.stats.find(x => x[0] === r.dataset.k);
      if (s) { sfx.pop(); toast('<b>' + s[1] + '</b> — ' + s[4], 3600); }
    };
  }
  syncSound();buildHUD();updateHUD();}
function simTick(){if(!SIM||!Array.isArray(SIM.cool)||SIM.paused||SIM.mp>0||SIM.done)return;
 SIM.cool=SIM.cool.map(x=>Math.max(0,x-1));
 if(SIM.S.day>2&&Math.random()<.16){const ev=pick(EVENTS[SIM.m.biome]);ev.fx(SIM.S);toast('Peristiwa: '+ev.t);}
 SIM.m.tick(SIM.S);SIM.S.day++;simUpdate();}
function gitaLine(){const S=SIM.S,m=SIM.m;
 if(S.poison!==undefined&&S.poison>40)return 'Racunnya sangat pekat! Bersihkan racun dulu — ia membunuh pemangsa alami.';
 if(S.trap!==undefined&&S.trap>40)return 'Jerat pemburu masih banyak! Sita jeratnya dulu, baru lepas satwanya.';
 if(S.bomb!==undefined&&S.bomb>40)return 'Bom ikan masih menggedor karang! Kirim patroli sekarang!';
 if(S.gulma!==undefined&&S.gulma>40)return 'Eceng gondok menutupi sungai! Angkat gulmanya agar oksigen masuk.';
 if(S.heat!==undefined&&S.heat>55)return 'Air laut terlalu panas! Naungi karang agar tidak memutih.';
 if(S.water!==undefined&&S.water<35)return 'Air semakin sedikit! Alirkan air lebih dulu — semua makhluk hidup butuh air.';
  if(S.wereng!==undefined&&S.wereng>35)return 'Wereng cokelat melonjak! Lepas katak pemangsa dan semprot ekstrak mimba.';
  if(S.api!==undefined&&S.api>35)return 'Bara api rimba menyala! Padamkan titik api dan buat sekat bakar basah.';
  if(S.lumpur!==undefined&&S.lumpur>35)return 'Lumpur erosi menimbun sungai! Keruk lumpur dan tanam rumput vetiver di tebing.';
  if(S.storm!==undefined&&S.storm>35)return 'Ombak badai mematahkan karang! Pasang rangka spider terumbu dan bersihkan lamun.';
  if(S.net!==undefined&&S.net>35)return 'Jaring pukat trawl meratakan dasar karang! Sita pukat dan selamatkan penyu.';
 if(S.herb>S.prod*.45&&S.prod<45)return 'Pemakan tumbuhan terlalu banyak! Kembalikan pemangsanya agar seimbang.';
 if(S.health>=80)return 'Hebat! Ekosistem mulai seimbang. Pertahankan sampai semua target tercapai!';
 return pick(['Ayo, cegah kerusakan sebelum merembet ke rantai makanan!','Ingat: semua makhluk saling membutuhkan satu sama lain.','Setiap aksi ada batasnya — gunakan dengan tepat!','Buka Kamus Alam kalau menemukan istilah asing!']);}
function buildHUD(){if(!SIM)return;const m=SIM.m;
 SIM.hud={};const H=SIM.hud;
 H.dayN=el('#day-n');H.hpBar=el('#hp-bar');H.hpVal=el('#hp-val');H.gitaTxt=el('#gita-txt');
 const sr=el('#stat-rows');sr.innerHTML='';H.statBar=[];H.statVal=[];
 m.stats.forEach(s=>{
  const row=document.createElement('div');row.className='srow';row.dataset.k=s[0];
  row.innerHTML='<div class="si">'+ic(s[2],28)+'</div>'
   +'<div class="sn"><b>'+s[1]+'</b><div class="sbar"><i></i></div></div>'
   +'<div class="sv">0</div>';
  sr.appendChild(row);
  H.statBar.push(row.querySelector('.sbar i'));H.statVal.push(row.querySelector('.sv'));});
 const tl=el('#tgt-list');tl.innerHTML='';H.tgtRow=[];H.tgtB=[];
 m.targets.forEach((t,i)=>{
  const d=document.createElement('div');d.className='q-strip';
  d.innerHTML='<div class="b">'+(i+1)+'</div><span>'+t.l+'</span>';
  tl.appendChild(d);H.tgtRow.push(d);H.tgtB.push(d.querySelector('.b'));});
 const dg=el('#dock-grid');dg.innerHTML='';dg.style.justifyContent='center';dg.style.alignItems='center';H.dockCard=[];H.dockBtn=[];H.dockQ=[];H.dockCd=[];
   m.actions.forEach((a,i)=>{const per=SIM.team.perk.ids.includes(a.id);
   const d=document.createElement('div');d.className='dock-card';
   d.style.cssText = 'width:190px;min-width:190px;min-height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center;gap:4px;padding:14px;border-radius:20px;flex:none;cursor:grab;scroll-snap-align:center;touch-action:none;-webkit-user-drag:none;user-select:none;';
   d.innerHTML=(per?'<div class="perk-badge" style="position:absolute;top:-8px;right:-8px;background:var(--gold-btn);font-size:24px;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,0.5)">⭐</div>':'')
    +ic(a.ic,32)
    +'<div class="dc-tt" style="font-size:24px;line-height:1.2;margin-bottom:2px;font-weight:700">'+a.label+'</div>'
    +'<div class="dc-quota" style="justify-content:center;font-size:24px;gap:6px;margin-top:2px;font-weight:700">'+ic('target',22)+'<span class="q-n"></span></div>'
    +'<div class="mini-cd" style="width:100%"><i></i></div>'
    +'<div class="dc-btn" style="height:auto;font-size:24px;font-family:var(--font-fun);white-space:nowrap;margin-top:4px;min-height:28px"></div>';
  dg.appendChild(d);
  H.dockCard.push(d);H.dockBtn.push(d.querySelector('.dc-btn'));
  H.dockQ.push(d.querySelector('.q-n'));H.dockCd.push(d.querySelector('.mini-cd i'));});
 const fin=document.createElement('div');fin.className='dock-card finish';fin.style.display='none';fin.style.flex='none';fin.style.width='400px';
 fin.innerHTML='<div class="dc-top">'+ic('medal',32)
  +'<div><div class="dc-tt">Semua target tercapai!</div><div class="dc-role">Selesaikan misi & ikuti kuis</div></div></div>'
  +'<button class="btn btn-gold dc-btn" data-i="fin">Selesaikan Misi!</button>';
 dg.appendChild(fin);H.finishCard=fin;
 const ui=el('#sim-ui');
 ui.querySelectorAll('.edge-tab').forEach(e=>e.remove());
  const tL=document.createElement('div');tL.className='edge-tab left';tL.innerHTML=ic('target',30)+'<span class="dot"></span>';
  const tR=document.createElement('div');tR.className='edge-tab right';tR.innerHTML=ic('mag',30);
  const tT=document.createElement('div');tT.className='edge-tab top';tT.innerHTML='<span style="font-size:30px;line-height:1">▼</span>';
  tL.onclick=()=>toggleUIPanel('left');tR.onclick=()=>toggleUIPanel('right');tT.onclick=()=>toggleUIPanel('top');
  ui.appendChild(tL);ui.appendChild(tR);ui.appendChild(tT);
 const hl=ui.querySelector('.hud-left'),hr=ui.querySelector('.hud-right');
 if(hl&&!hl.querySelector('.panel-x')){const x=document.createElement('button');x.className='panel-x';x.textContent='×';x.onclick=()=>toggleUIPanel('left');hl.appendChild(x);}
 if(hr&&!hr.querySelector('.panel-x')){const x=document.createElement('button');x.className='panel-x';x.textContent='×';x.onclick=()=>toggleUIPanel('right');hr.appendChild(x);}
  const lArr = ui.querySelector('.left-arr');
  const rArr = ui.querySelector('.right-arr');
  if(lArr) lArr.onclick = () => { sfx.click(); el('#dock-grid').scrollBy({left: -284, behavior: 'smooth'}); };
  if(rArr) rArr.onclick = () => { sfx.click(); el('#dock-grid').scrollBy({left: 284, behavior: 'smooth'}); };
 syncUITabs();}
function syncUITabs(){if(!SIM||!SIM.ui)return;
 const L=document.querySelector('#sim-ui .hud-left'),R=document.querySelector('#sim-ui .hud-right');
 const tL=document.querySelector('#sim-ui .edge-tab.left'),tR=document.querySelector('#sim-ui .edge-tab.right');
 if(L)L.classList.toggle('collapsed',!SIM.ui.left);
 if(R)R.classList.toggle('collapsed',!SIM.ui.right);
  if(tL){tL.classList.toggle('show',!SIM.ui.left);
   const d=tL.querySelector('.dot');if(d)d.classList.toggle('show',!!(SIM.ui.leftDot&&!SIM.ui.left));}
  if(tR)tR.classList.toggle('show',!SIM.ui.right);
  const tb=document.querySelector('#sim-ui .sim-topbar'),hp=document.querySelector('#sim-ui .hpod'),tT=document.querySelector('#sim-ui .edge-tab.top');
  if(tb)tb.classList.toggle('collapsed',!SIM.ui.top);
  if(hp)hp.classList.toggle('collapsed',!SIM.ui.top);
  if(tT)tT.classList.toggle('show',!SIM.ui.top);}
function toggleUIPanel(side){if(!SIM||!SIM.ui)return;SIM.ui[side]=!SIM.ui[side];
 if(side==='left')SIM.ui.leftDot=false;sfx.click();syncUITabs();}
function updateHUD(){if(!SIM)return;const m=SIM.m,S=SIM.S;
 if(!SIM.hud||!SIM.hud.dayN)buildHUD();
 const H=SIM.hud;if(!H.dayN)return;
 H.dayN.textContent=S.day;
 const h=S.health;
 H.hpVal.textContent=h+'%';H.hpBar.style.width=h+'%';
 const hc=h>=75?'good':h>=55?'mid':h>=35?'warn':'danger';
 H.hpBar.className=hc;H.hpVal.className='st '+hc;
 m.stats.forEach((s,i)=>{const v=S[s[0]]||0,mx=STATMAX[s[0]]||100,f=c01(v/mx);
   const hh=s[3]===1?f:1-f,col=hh>.6?PAL.good:hh>.3?PAL.warn:PAL.danger;
  const bar=H.statBar[i],val=H.statVal[i];
  bar.style.width=Math.round(f*100)+'%';bar.style.background=col;
  val.textContent=Math.round(v);val.style.color=col;});
 m.targets.forEach((t,i)=>{const ok=SIM.tgt[i];
  H.tgtRow[i].classList.toggle('done',ok);H.tgtB[i].textContent=ok?'✓':i+1;});
 H.gitaTxt.textContent=gitaLine();
 simExpr(SIM.done?'cheer':h<45?'worried':'happy');
 m.actions.forEach((a,i)=>{const cd=SIM.cool[i],q=SIM.quota[i];
  H.dockCard[i].classList.toggle('cooling',cd>0);
   const hint=H.dockBtn[i];
   if(hint){
    const lbl = q<=0?'❌ Kuota Habis':cd>0?'⏳ Istirahat ('+cd+' hari)':'';
    if(hint.textContent!==lbl) hint.textContent=lbl;
    hint.style.color = '#f87171';
   }
  H.dockQ[i].textContent=q;
  H.dockCd[i].style.width=(cd>0?Math.round((1-cd/SIM.cdi[i])*100):100)+'%';});
 H.finishCard.style.display=SIM.done?'':'none';}
function simUpdate(){if(!SIM)return;const m=SIM.m,S=SIM.S;
 S.health=m.health(S);
 let anyNewTarget = false;
 m.targets.forEach((t,i)=>{
  const ok=t.c(S);
  if(ok&&!SIM.tgt[i]){
   anyNewTarget = true;
   toast('Target tercapai: '+t.l);
   if(SIM.ui&&!SIM.ui.left)SIM.ui.leftDot=true;
  }
  SIM.tgt[i]=ok;
 });
 syncUITabs();
 if(S.health<=6){simFail(false);return;}
 if(S.day>SIM.limit){simFail(true);return;}
 if(!SIM.done&&SIM.tgt.every(Boolean)){
  SIM.done=true;
  sfx.success();
  toast('Semua target tercapai! Tekan tombol emas untuk menyelesaikan misi.');
  simExpr('cheer');
  if(typeof playVO === 'function') playVO('vo_sim_all_targets');
 } else if(anyNewTarget){
  // Bunyikan chime & VO tepat 1 kali per tick meskipun beberapa target tercapai bersamaan
  sfx.chime();
  if(typeof playVO === 'function') playVO('vo_sim_target_ok');
 }
 if(!SIM.done&&SIM.voted<SIM.voteAt.length&&S.day>=SIM.voteAt[SIM.voted]){SIM.voted++;showVote();}
 updateHUD();}
function showDropEffect(x, y, iconName) {
  const s = (typeof window !== 'undefined' ? Math.min(window.innerWidth / 1920, window.innerHeight / 1080) : 1) || 1;
  const fx = document.createElement('div');
  fx.innerHTML = ic(iconName, 64);
  fx.style.position = 'fixed';
  fx.style.left = x + 'px';
  fx.style.top = y + 'px';
  fx.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
  fx.style.transformOrigin = 'center center';
  fx.style.pointerEvents = 'none';
  fx.style.zIndex = '9999';
  fx.style.transition = 'all 1s ease-out';
  document.body.appendChild(fx);
  requestAnimationFrame(() => {
    fx.style.transform = 'translate(-50%, -' + (150 * s) + 'px) scale(' + (1.5 * s) + ')';
    fx.style.opacity = '0';
  });
  setTimeout(() => fx.remove(), 1000);
}

/* ================= INTERAKSI SENTUHAN TAKTIL & BANNER SINEMATIK KAUSALITAS =================
   - Tactile Action Burst: gelombang cincin energi & hamburan partikel ikon
   - Floating Cinematic Emerald Glass Banner: kartu zamrud melayang penjelas kausalitas C2
*/
function showTactileActionFX(x, y, action) {
  if (typeof document === 'undefined') return;
  const s = (typeof window !== 'undefined' ? Math.min(window.innerWidth / 1920, window.innerHeight / 1080) : 1) || 1;
  const container = document.createElement('div');
  container.className = 'tactile-action-burst';
  container.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;transform:translate(-50%,-50%) scale(' + s + ');transform-origin:center center;pointer-events:none;z-index:10001;';

  // 1. Cincin Gelombang Taktil Konsentris (Zero Glow & Subtle Wave)
  const ring1 = document.createElement('div');
  ring1.style.cssText = 'position:absolute;left:50%;top:50%;width:80px;height:80px;margin-left:-40px;margin-top:-40px;border-radius:50%;border:2px solid rgba(255,255,255,0.4);opacity:0.8;transform:scale(0.2);transition:all 0.85s cubic-bezier(0.1, 0.8, 0.25, 1);';
  container.appendChild(ring1);

  const ring2 = document.createElement('div');
  ring2.style.cssText = 'position:absolute;left:50%;top:50%;width:120px;height:120px;margin-left:-60px;margin-top:-60px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.25);opacity:0.6;transform:scale(0.1);transition:all 1.1s cubic-bezier(0.1, 0.7, 0.2, 1);';
  container.appendChild(ring2);

  // 2. Lencana Ikon Memantul di Tengah (Zero Outline/Stroke & White Icon)
  const badge = document.createElement('div');
  badge.style.cssText = 'position:absolute;left:50%;top:50%;margin-left:-45px;margin-top:-45px;width:90px;height:90px;border-radius:50%;background:#022c22;border:none;outline:none;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,0.55);transform:scale(0.4) translateY(0);opacity:0;transition:all 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275);color:#ffffff;';
  badge.innerHTML = ic(action.ic, 54);
  container.appendChild(badge);

  // 3. Hamburan Partikel Radial Sesuai Kategori Aksi
  const actId = action.id || '';
  const actIc = action.ic || '';
  let symbols = ['✨', '⭐', '🌟', '💫', '✨', '⭐'];
  if (actId === 'air' || actId === 'irigasi' || actId === 'mata_air' || actIc === 'drop') {
    symbols = ['💧', '🌊', '✨', '💧', '🫧', '✨'];
  } else if (actId === 'padi' || actId === 'pohon' || actId === 'bibit' || actId === 'tanam' || actIc === 'sprout') {
    symbols = ['🌱', '🍃', '🌿', '✨', '🌸', '🍃'];
  } else if (['ular', 'katak', 'harimau', 'satwa', 'ikan', 'penyu', 'bangau', 'burung'].includes(actId) || actIc === 'paw' || actIc === 'snake') {
    symbols = ['🐾', '⭐', '✨', '🐾', '🌟', '✨'];
  } else if (actId === 'padam') {
    symbols = ['💧', '🌧️', '✨', '💧', '🫧', '✨'];
  } else if (['shield', 'patroli', 'sita', 'saring', 'keruk', 'bersih', 'sekat'].includes(actId) || actIc === 'shield') {
    symbols = ['🛡️', '✨', '⭐', '🛡️', '🌟', '✨'];
  }

  const particles = [];
  const count = 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.textContent = symbols[i % symbols.length];
    p.style.cssText = 'position:absolute;left:50%;top:50%;margin-left:-16px;margin-top:-16px;font-size:32px;line-height:1;transform:translate(0,0) scale(0.4);opacity:0.95;transition:all ' + (0.7 + Math.random() * 0.45) + 's cubic-bezier(0.15, 0.85, 0.35, 1);text-shadow:0 2px 8px rgba(0,0,0,0.6);';
    container.appendChild(p);
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 85 + Math.random() * 110;
    particles.push({ el: p, tx: Math.cos(angle) * dist, ty: Math.sin(angle) * dist });
  }

  document.body.appendChild(container);

  requestAnimationFrame(() => {
    ring1.style.transform = 'scale(2.6)';
    ring1.style.opacity = '0';
    ring2.style.transform = 'scale(3.2)';
    ring2.style.opacity = '0';
    badge.style.opacity = '1';
    badge.style.transform = 'scale(1.15) translateY(-25px)';
    particles.forEach(pt => {
      pt.el.style.transform = 'translate(' + pt.tx + 'px, ' + pt.ty + 'px) scale(' + (1.2 + Math.random() * 0.4) + ')';
      pt.el.style.opacity = '0';
    });
  });

  setTimeout(() => {
    badge.style.transition = 'all 0.35s ease-out';
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.8) translateY(-60px)';
  }, 750);

  setTimeout(() => {
    container.remove();
  }, 1250);
}

function showActionCinematicBanner(action, mission) {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('.sim-cinematic-banner');
  if (existing) existing.remove();

  const biomeTags = {
    sawah: '🌾 AKSI SAWAH LESTARI',
    hutan: '🌲 AKSI RIMBA NUSANTARA',
    sungai: '🏞️ AKSI SUNGAI BERSIH',
    laut: '🪸 AKSI SAMUDRA BIRU'
  };
  const bTag = (mission && biomeTags[mission.biome]) || '🌍 AKSI EKOSISTEM';

  const banner = document.createElement('div');
  banner.className = 'sim-cinematic-banner';
  banner.innerHTML = '<div class="scb-icon">' + ic(action.ic, 44) + '</div>'
    + '<div class="scb-body">'
    + '<div class="scb-kicker">' + bTag + ' &bull; KAUSALITAS</div>'
    + '<div class="scb-title">' + action.label + '</div>'
    + '<div class="scb-desc">' + action.role + '</div>'
    + '</div>';

  const host = document.querySelector('#scr-sim') || document.querySelector('#stage') || document.body;
  host.appendChild(banner);

  requestAnimationFrame(() => {
    banner.classList.add('show');
  });

  setTimeout(() => {
    banner.classList.remove('show');
    banner.classList.add('hide');
    setTimeout(() => banner.remove(), 450);
  }, 2000);
}

/* ================= EFEK REAKSI SEMPROTAN PESTISIDA / AIR =================
   - Botol Sprayer dengan animasi pompa bertekanan
   - Kerucut kabut aerosol partikel menyebar ke petak tanah/tanaman
   - Kilau embun & respon gugur hama wereng
   - Lencana dampak melayang & ekspresi Gita ceria
*/
function showSprayEffect(x, y, actionId, label) {
  const s = (typeof window !== 'undefined' ? Math.min(window.innerWidth / 1920, window.innerHeight / 1080) : 1) || 1;
  const container = document.createElement('div');
  container.className = 'spray-fx-container';
  container.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;transform:translate(-50%,-50%) scale(' + s + ');transform-origin:center center;pointer-events:none;z-index:10000';

  const isMimba = actionId === 'mimba';
  const isFire = actionId === 'padam';
  const mistColors = isMimba
    ? ['#a7f3d0', '#6ee7b7', '#34d399', '#fef08a', '#bbf7d0']
    : isFire
    ? ['#bae6fd', '#7dd3fc', '#38bdf8', '#ffffff', '#e0f2fe']
    : ['#93c5fd', '#60a5fa', '#3b82f6', '#dbeafe', '#ffffff'];

  const badgeIcon = isMimba ? '🍃' : isFire ? '💧' : '🌊';
  const badgeText = isMimba
    ? 'Semprot Pestisida Mimba! (Wereng -26)'
    : isFire
    ? 'Semprotan Air Padamkan Bara Api!'
    : 'Bilas Saluran Air Sawah!';

  // 1. Botol Sprayer Animasi Pompa
  const sprayer = document.createElement('div');
  sprayer.style.cssText = 'position:absolute;left:0;top:0;transform-origin:30% 70%;transform:scale(0.6) rotate(-15deg);transition:transform 0.28s cubic-bezier(0.175,0.885,0.32,1.275);filter:drop-shadow(0 8px 18px rgba(0,0,0,0.55))';
  sprayer.innerHTML = '<div style="background:linear-gradient(135deg,#064e3b,#022c22);border:3px solid #fde047;border-radius:22px;padding:12px;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 2px 6px rgba(255,255,255,0.4)">'
    + ic(isFire ? 'drop' : 'bottle', 62)
    + '</div>';
  container.appendChild(sprayer);

  requestAnimationFrame(() => {
    sprayer.style.transform = 'scale(0.88) rotate(-32deg) translate(-12px,-10px)';
  });

  // 2. Kerucut Partikel Kabut Aerosol Menembak Keluar
  const numParticles = 30;
  for (let i = 0; i < numParticles; i++) {
    const p = document.createElement('div');
    const col = mistColors[i % mistColors.length];
    const size = 6 + Math.random() * 14;
    p.style.cssText = 'position:absolute;left:20px;top:-10px;width:' + size + 'px;height:' + size + 'px;background:radial-gradient(circle,' + col + ' 40%,rgba(255,255,255,0) 80%);border-radius:50%;opacity:0.95;transform:translate(0,0) scale(0.5);transition:all ' + (0.55 + Math.random() * 0.45) + 's cubic-bezier(0.1,0.7,0.1,1)';
    container.appendChild(p);

    const angle = (Math.random() - 0.5) * 0.95 + (Math.PI * 0.15);
    const dist = 90 + Math.random() * 250;
    const targetX = Math.cos(angle) * dist + (Math.random() - 0.5) * 40;
    const targetY = Math.sin(angle) * dist + 35 + Math.random() * 65;

    requestAnimationFrame(() => {
      p.style.transform = 'translate(' + targetX + 'px,' + targetY + 'px) scale(' + (1.6 + Math.random() * 1.3) + ')';
      p.style.opacity = '0';
    });
  }

  // 3. Kilau Embun (Dew Sparkles)
  for (let s = 0; s < 7; s++) {
    const spk = document.createElement('div');
    spk.textContent = '✨';
    spk.style.cssText = 'position:absolute;left:' + (60 + (Math.random() - 0.5) * 220) + 'px;top:' + (50 + Math.random() * 150) + 'px;font-size:' + (18 + Math.random() * 14) + 'px;opacity:0;transform:scale(0.3);transition:all 0.5s ease-out;text-shadow:0 0 10px #fef08a';
    container.appendChild(spk);
    setTimeout(() => {
      spk.style.opacity = '1';
      spk.style.transform = 'scale(1.3) rotate(20deg)';
      setTimeout(() => {
        spk.style.opacity = '0';
        spk.style.transform = 'scale(0.5) translateY(20px)';
      }, 350);
    }, 180 + s * 50);
  }

  // 4. Lencana Dampak Melayang (Floating Impact Badge)
  const badge = document.createElement('div');
  badge.style.cssText = 'position:absolute;left:0;top:-65px;transform:translate(-50%,0) scale(0.7);background:linear-gradient(135deg,rgba(6,78,59,0.95),rgba(2,44,34,0.95));border:2px solid #fde047;border-radius:20px;padding:8px 18px;color:#fff;font-family:var(--font-fun);font-size:24px;font-weight:700;white-space:nowrap;box-shadow:0 8px 24px rgba(0,0,0,0.6),0 0 15px rgba(253,224,71,0.4);opacity:0;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);display:flex;align-items:center;gap:8px';
  badge.innerHTML = '<span style="font-size:24px">' + badgeIcon + '</span> <span>' + badgeText + '</span>';
  container.appendChild(badge);

  requestAnimationFrame(() => {
    badge.style.opacity = '1';
    badge.style.transform = 'translate(-50%,-40px) scale(1)';
  });

  document.body.appendChild(container);

  setTimeout(() => {
    container.style.transition = 'opacity 0.4s ease-out';
    container.style.opacity = '0';
    setTimeout(() => container.remove(), 400);
  }, 1100);

  simExpr('cheer');
}

function doAction(i, dropX, dropY){
  const m=SIM.m, a=m.actions[i], S=SIM.S;
  if(SIM.done){toast('Misi sudah selesai! Tekan tombol emas.');return;}
  if(SIM._cinematicLock) return;
  if(SIM.cool[i]>0){sfx.deny();toast('"'+a.label+'" masih istirahat ('+SIM.cool[i]+' hari lagi).');return;}
  if(SIM.quota[i]<=0){sfx.deny();toast('Kuota "'+a.label+'" sudah habis.');return;}

  // Kunci aksi selama 2.4 detik agar 28 siswa kelas 5A mengamati dampak kausalitas (C2)
  SIM._cinematicLock = true;
  const dg = el('#dock-grid');
  if(dg) dg.classList.add('dock-cinematic-locked');
  setTimeout(() => {
    if(SIM) SIM._cinematicLock = false;
    const grid = el('#dock-grid');
    if(grid) grid.classList.remove('dock-cinematic-locked');
  }, 2400);

  SIM.quota[i]--;
  SIM.cool[i]=SIM.cdi[i];
  a.fx(S);

  // Timer animasi dinamis latar Canvas 2D 60 FPS
  if (a.id === 'air' || a.id === 'irigasi' || a.id === 'mata_air' || a.id === 'alirkan' || a.ic === 'drop') {
    if (m.biome === 'hutan') S._springFlowTimer = 180;
    else if (m.biome === 'sawah') S._irrigationFlowTimer = 180;
    else if (m.biome === 'sungai') S._sluiceSurgeTimer = 180;
    else S._irrigationFlowTimer = 180;
  }
  if (a.id === 'padam' || a.id === 'sekat') S._fireExtinguishTimer = 180;
  if (a.id === 'pintu') S._sluiceSurgeTimer = 180;
  if (a.id === 'naungan') S._reefShadeTimer = 180;

  const tx = dropX || (typeof window !== 'undefined' ? window.innerWidth / 2 : 960);
  const ty = dropY || (typeof window !== 'undefined' ? window.innerHeight * 0.45 : 480);

  // Efek interaksi sentuhan partikel taktil
  showTactileActionFX(tx, ty, a);

  // Banner sinematik kausalitas zamrud melayang
  showActionCinematicBanner(a, m);

  const isSpray = (a.id === 'mimba' || a.id === 'bilas' || a.ic === 'bottle') && a.id !== 'padam';
  if(isSpray){
    if(sfx.spray) sfx.spray();
    showSprayEffect(tx, ty, a.id, a.label);
  } else {
    // Gunakan nada pop taktil lembut untuk sentuhan aksi agar nada chime tetap eksklusif untuk target tercapai
    if(sfx.pop) sfx.pop();
  }
  simExpr('cheer');

  simUpdate();
}
function showVote(){const m=SIM.m;
 // Jeda simulasi selama musyawarah berlangsung
 if(SIM&&!SIM.done){
   SIM.paused=true;
   if(SIM.timer){clearInterval(SIM.timer);SIM.timer=null;}
 }
 let voteTime=15, voteTimer;
 // BUG FIX #4: Simpan referensi closeModal asli agar timer bisa di-clear saat modal ditutup via dim
 var _origCloseModal = closeModal;
 closeModal = function(){
   clearInterval(voteTimer);
   _origCloseModal();
   closeModal = _origCloseModal;
   // Lanjutkan simulasi setelah modal ditutup
   if(SIM&&!SIM.done){
     SIM.paused=false;
     if(SIM.timer)clearInterval(SIM.timer);
     SIM.timer=setInterval(simTick,1500);
   }
 };
 const chips = ['🟢 KARTU HIJAU', '🟡 KARTU KUNING', '🔴 KARTU MERAH'];
 const r=modal(
   '<div style="text-align:center">'
  +'<div class="vote-kicker">🤝 CSCL &bull; KOLABORASI KELAS 5A &bull; PENASIHAT MEJA &amp; PETUGAS LAYAR</div>'
  +'<h2 class="vote-header">Musyawarah Kelas! <span id="vote-timer" class="vote-timer-pill">⏱️ 15s</span></h2>'
  +'</div>'
  +'<div class="vote-desc-box">'
  +'<p>Hari musyawarah telah tiba! Berdiskusilah dengan <b>Penasihat Meja</b> selama 15 detik: angkat kartu voting fisik (<b>🟢 Hijau</b>, <b>🟡 Kuning</b>, atau <b>🔴 Merah</b>) untuk menentukan aksi <b>gratis</b> yang akan kita lakukan bersama!</p>'
  +'</div>'
  +'<div class="vote-bar">'+m.actions.map((a,i)=>'<div class="vote-card vote-'+['hijau','kuning','merah'][i]+'" data-v="'+i+'">'
   +'<div class="vote-chip">'+chips[i]+'</div>'
   +'<div class="vote-ic-circle">'+ic(a.ic, 44)+'</div>'
   +'<h3 class="vote-card-title">'+a.label+'</h3>'
   +'<p class="vote-card-role">'+a.role+'</p>'
   +'<div class="vote-free-tag">⭐ GRATIS &bull; Tanpa Kuota!</div>'
   +'<div class="vote-tap-cue">Ketuk untuk Memilih ❯❯</div>'
   +'</div>').join('')+'</div>');
 // HIGH priority: potong semua VO lain, langsung putar undangan musyawarah
 if(typeof playVO === 'function') playVO('vo_sim_vote_call');
 const vt = r.querySelector('#vote-timer');
 voteTimer = setInterval(()=>{
  voteTime--;
  if(vt) {
    if(voteTime > 5) {
      vt.innerHTML = '⏱️ ' + voteTime + 's';
    } else if(voteTime > 0) {
      vt.className = 'vote-timer-pill warning';
      vt.innerHTML = '⚠️ ' + voteTime + 's';
      sfx.pop();
    }
  }
  if(voteTime <= 0){
   clearInterval(voteTimer);
   sfx.wrong();
   if(vt) {
     vt.className = 'vote-timer-pill timeout';
     vt.innerHTML = '⏰ Waktu Habis — Silakan Pilih!';
   }
   toast('Waktu musyawarah habis! Silakan eksekusi keputusan kelas.');
  }
 }, 1000);
 r.querySelectorAll('.vote-card').forEach(cd=>cd.onclick=()=>{
  clearInterval(voteTimer);
  const a=m.actions[+cd.dataset.v];
  sfx.success();

  // Set timer animasi dinamis latar Canvas 2D
  if (a.id === 'air' || a.id === 'irigasi' || a.id === 'mata_air' || a.id === 'alirkan' || a.ic === 'drop') {
    if (m.biome === 'hutan') SIM.S._springFlowTimer = 180;
    else if (m.biome === 'sawah') SIM.S._irrigationFlowTimer = 180;
    else if (m.biome === 'sungai') SIM.S._sluiceSurgeTimer = 180;
    else SIM.S._irrigationFlowTimer = 180;
  }
  if (a.id === 'padam' || a.id === 'sekat') SIM.S._fireExtinguishTimer = 180;
  if (a.id === 'pintu') SIM.S._sluiceSurgeTimer = 180;
  if (a.id === 'naungan') SIM.S._reefShadeTimer = 180;

  const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 960;
  const cy = typeof window !== 'undefined' ? window.innerHeight * 0.45 : 480;
  showTactileActionFX(cx, cy, a);
  showActionCinematicBanner(a, m);

  const isSpray = (a.id === 'mimba' || a.id === 'bilas' || a.ic === 'bottle') && a.id !== 'padam';
  if (isSpray) {
    setTimeout(() => {
      if (sfx.spray) sfx.spray();
      showSprayEffect(cx, cy, a.id, a.label);
    }, 250);
  }
  a.fx(SIM.S);
  closeModal();
  simUpdate();
  if (SIM && !SIM.done) {
    if (typeof playVO === 'function') playVO('vo_sim_vote_done');
  }
});}
function simFail(timeout){if(!SIM)return;clearInterval(SIM.timer);SIM.timer=null;SIM.done=true;sfx.wrong();if(typeof playVO === 'function') playVO(timeout ? 'vo_sim_fail_time' : 'vo_sim_fail_health');
 const m=SIM.m;
   const r=modal('<h2 style="color:#fca5a5">'+ic('clock',34)+' '+(timeout?'Waktu Telah Habis!':'Ekosistem Rusak Berat!')+'</h2>'
  +'<p>'+(timeout?'Hari telah habis, tetapi target misi belum tercapai. Jangan menyerah — ekosistem ini masih membutuhkanmu!'
   :'Keseimbangan ekosistem jatuh ke titik kritis. Renungkan: aksi mana yang seharusnya dilakukan lebih dulu?')+'</p>'
  +'<p style="background:rgba(2,44,34,.6);border-radius:12px;padding:12px 18px">Ingat urutan yang tepat: atasi <b>ancaman terbesar</b> (racun, jerat, bom) sebelum memulihkan penghuninya!</p>'
  +'<div class="mrow"><button class="btn btn-gold" id="fr-retry">'+ic('play',24)+' Ulangi Misi</button>'
  +'<button class="btn btn-secondary" id="fr-quit">'+ic('back',24)+' Kembali ke Peta Misi</button></div>',true);
 r.querySelector('#fr-retry').onclick=()=>{closeModal();startSim(m);};
 r.querySelector('#fr-quit').onclick=()=>{closeModal();leaveSim();buildMissionMenu(m.biome);go('mission');};}
function finishSim(){const m=SIM.m,S=SIM.S,days=S.day;
 clearInterval(SIM.timer);SIM.timer=null;
 const simStars=(S.health>=85&&days<=m.par)?3:2;
 sfx.success();SIM=null;startQuiz(m,simStars,days);}
function leaveSim(){if(SIM&&SIM.timer)clearInterval(SIM.timer);SIM=null;
 cleanupPanelTour();
 try{if(CTX.sim)CTX.sim.clearRect(0,0,1920,1080);}catch(e){}
 clearCardSelection();
 resetTouchLock();
 if(typeof document !== 'undefined') {
   document.querySelectorAll('.sim-cinematic-banner, .tactile-action-burst').forEach(el => el.remove());
 }
}

/* ================== GLOBAL DRAG PROXY & TOUCH MANAGEMENT (IFP DUAL-MODE) ==================
   Proteksi debounce multi-click, single-pointer capture, & anti-double-trigger */
let dragProxy = null;
let activeDragIndex = -1;
let activePointerId = null;
let dragStartX = 0;
let dragStartY = 0;
let isDragging = false;
let selectedCardIndex = -1;
let pointerLockTimeout = null;

function resetTouchLock() {
  if(pointerLockTimeout) {
    clearTimeout(pointerLockTimeout);
    pointerLockTimeout = null;
  }
  if(dragProxy) {
    dragProxy.remove();
    dragProxy = null;
  }
  activePointerId = null;
  activeDragIndex = -1;
  isDragging = false;
}

function clearCardSelection() {
  selectedCardIndex = -1;
  document.querySelectorAll('.dock-grid .dock-card.selected').forEach(c => c.classList.remove('selected'));
}

function selectCard(idx) {
  if(!SIM || !SIM.m || !SIM.m.actions[idx]) return;
  selectedCardIndex = idx;
  const allCards = Array.from(document.querySelectorAll('.dock-grid .dock-card:not(.finish)'));
  allCards.forEach((c, i) => {
    c.classList.toggle('selected', i === idx);
  });
  sfx.pop();
  const act = SIM.m.actions[idx];
  toast('<b>' + act.label + '</b> dipilih! Ketuk area pemandangan alam untuk menerapkan.', 4000);
}

function handleCardTapSelect(idx) {
  if(!SIM || !SIM.m || !SIM.m.actions[idx]) return;
  if(selectedCardIndex === idx) {
    clearCardSelection();
    sfx.click();
    toast('Pilihan dibatalkan.');
  } else {
    selectCard(idx);
  }
}

function moveProxy(e) {
  if(!dragProxy) return;
  const s = (typeof window !== 'undefined' ? Math.min(window.innerWidth / 1920, window.innerHeight / 1080) : 1) || 1;
  dragProxy.style.left = e.clientX + 'px';
  dragProxy.style.top = (e.clientY - 35 * s) + 'px';
  dragProxy.style.transform = 'translate(-50%, -75%) scale(' + s + ')';
}

function onDragMove(e) {
  if(activePointerId !== null && e.pointerId !== undefined && e.pointerId !== activePointerId) return;
  if(activeDragIndex === -1) return;

  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  const dist = Math.hypot(dx, dy);

  if(!isDragging && dist > 12) {
    isDragging = true;
    clearCardSelection();

    const allCards = Array.from(document.querySelectorAll('.dock-grid .dock-card:not(.finish)'));
    const card = allCards[activeDragIndex];
    if(card) {
      dragProxy = document.createElement('div');
      dragProxy.className = 'drag-proxy dock-card';
      dragProxy.style.cssText = card.style.cssText;
      dragProxy.innerHTML = card.innerHTML;
      dragProxy.style.position = 'fixed';
      dragProxy.style.pointerEvents = 'none';
      dragProxy.style.touchAction = 'none';
      dragProxy.style.userSelect = 'none';
      dragProxy.style.zIndex = '99999';
      const s = (typeof window !== 'undefined' ? Math.min(window.innerWidth / 1920, window.innerHeight / 1080) : 1) || 1;
      dragProxy.style.transformOrigin = 'center center';
      dragProxy.style.transform = 'translate(-50%, -75%) scale(' + s + ')';
      dragProxy.style.opacity = '0.92';
      dragProxy.style.boxShadow = '0 16px 36px rgba(0,0,0,0.6)';

      document.body.appendChild(dragProxy);
      moveProxy(e);
      sfx.click();
    }
  }

  if(isDragging && dragProxy) {
    moveProxy(e);
  }
}

function onDragEnd(e) {
  if(activePointerId !== null && e.pointerId !== undefined && e.pointerId !== activePointerId) return;

  window.removeEventListener('pointermove', onDragMove);
  window.removeEventListener('pointerup', onDragEnd);
  if(pointerLockTimeout) {
    clearTimeout(pointerLockTimeout);
    pointerLockTimeout = null;
  }

  const currentIdx = activeDragIndex;
  const wasDragging = isDragging;

  if(dragProxy) {
    dragProxy.remove();
    dragProxy = null;
  }

  if(currentIdx > -1 && SIM) {
    if(wasDragging) {
      const dockEl = document.querySelector('.sim-dock');
      const dockRect = dockEl ? dockEl.getBoundingClientRect() : { top: window.innerHeight - 180 };
      const simCv = document.querySelector('#cv-sim');
      let validDrop = false;
      if(simCv) {
        const cr = simCv.getBoundingClientRect();
        validDrop = e.clientX >= cr.left && e.clientX <= cr.right
                 && e.clientY >= cr.top && e.clientY < dockRect.top;
      } else {
        validDrop = e.clientY < dockRect.top;
      }

      if(validDrop) {
        if(typeof doAction === 'function') doAction(currentIdx, e.clientX, e.clientY);
        clearCardSelection();
      } else {
        sfx.click();
        toast('Jatuhkan kartu di area pemandangan alam, bukan di panel!');
      }
    } else {
      handleCardTapSelect(currentIdx);
    }
  }

  activePointerId = null;
  activeDragIndex = -1;
  isDragging = false;
}

// Global failsafe listeners — didaftarkan SEKALI SAJA untuk menghindari leak.
if(typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('pointercancel', function(e) {
    if(activePointerId !== null && e.pointerId !== undefined && e.pointerId === activePointerId) {
      resetTouchLock();
    }
  });
  window.addEventListener('blur', function() {
    resetTouchLock();
  });
}
if(typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener('visibilitychange', function() {
    if(document.hidden) {
      resetTouchLock();
    }
  });
}

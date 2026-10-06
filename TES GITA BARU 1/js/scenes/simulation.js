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
  
  function renderBridgeStep(){
    const cur = bridgeStep === 1 ? bdata.step1 : bdata.step2;
    el('#bridge-gita-box').innerHTML = gitaSVG(130, cur.gitaExpr || (bridgeStep === 1 ? 'worried' : 'talk'));
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
    
    // Audio: chime + playVO bridging dialog vokal asli Gita
    sfx.chime();
    const voKey = 'vo_bridge_' + m.id.replace('-', '') + '_s' + bridgeStep;
    if (typeof playVO === 'function') playVO(voKey);
  }

  el('#bridge-btn-next').onclick = () => {
    sfx.click();
    if(bridgeStep === 1){
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

function closeBridgeDialog(){
  if (typeof stopVO === 'function') stopVO();
  const box = el('#sim-bridge');
  if(box) box.style.display = 'none';
  // BUG FIX #7: Cegah timer bocor jika SIM sudah null/done
  if(SIM && !SIM.done){
    SIM.paused = false;
    SIM.bridging = false;
    if(SIM.timer) clearInterval(SIM.timer);
    SIM.timer = setInterval(simTick, 1500);
    sfx.success();
    toast('Hari 1 dimulai! Pilih kartu aksi pertamamu di bawah.');
  }
}

function startSim(m){
 if(SIM&&SIM.timer)clearInterval(SIM.timer);
 const team=TEAMS.find(t=>t.id===G.team)||TEAMS[0];
 SIM={m,team,S:Object.assign({day:0},m.init),tgt:m.targets.map(()=>false),
  quota:m.actions.map(a=>a.quota+(team.perk.ids.includes(a.id)?1:0)),
  cdi:m.actions.map(a=>team.perk.ids.includes(a.id)?2:3),
  cool:m.actions.map(()=>0),paused:true,mp:0,done:false,voted:0,voteAt:[6,14,22],limit:m.par+18,
   ui:{left:false,right:false,top:true,leftDot:false},bridging:true};
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
 +'<div class="hpod"><div class="r1"><span>Kesehatan Ekosistem</span><span class="st" id="hp-val"></span></div>'
 +'<div class="hbar"><div id="hp-bar"></div></div></div>'
 +'<div class="hud-left">'
 +'<div class="panel-deep gita-card"><div class="gita-plaque">'+gitaSVG(66,'happy')+'<span class="tag">GITA</span></div>'
 +'<div class="gita-txt" id="gita-txt"></div></div>'
 +'<div class="panel-deep targets-card"><h3>'+ic('target',24)+' Target Misi</h3><div id="tgt-list"></div></div></div>'
 +'<div class="hud-right panel-deep"><div class="panel-title">'+ic('mag',24)+' Kondisi Ekosistem</div>'
 +'<div id="stat-rows"></div></div>'
 +'<div class="sim-dock"><div class="dock-ribbon">Pilih aksi — perhatikan kuota & masa istirahat. Klik baris kondisi untuk penjelasan!</div>'
 +'<div class="dock-slider-wrap" style="position:relative;display:flex;align-items:center;gap:18px;">'
 +'<button class="btn sim-arr left-arr" style="width:76px;height:120px;flex:none;border-radius:24px;font-size:36px;padding:0;z-index:10">◀</button>'
 +'<div class="dock-grid" id="dock-grid" style="flex:1;overflow:hidden;padding:12px;scroll-behavior:smooth;display:flex;gap:24px;"></div>'
 +'<button class="btn sim-arr right-arr" style="width:76px;height:120px;flex:none;border-radius:24px;font-size:36px;padding:0;z-index:10">▶</button>'
 +'</div></div></div>';
 el('#sim-back').onclick=()=>{sfx.click();
  const r=modal('<h2>'+ic('back',34)+' Berhenti dari misi?</h2><p>Progres misi ini akan hilang dan kamu kembali ke peta misi.</p>'
   +'<div class="mrow"><button class="btn btn-ruby" id="ab-y">'+ic('back',24)+' Ya, Berhenti</button><button class="btn btn-gold" id="ab-n">'+ic('play',24)+' Lanjut Main</button></div>',true);
  r.querySelector('#ab-y').onclick=()=>{closeModal();leaveSim();buildMissionMenu(SIM?SIM.m.biome:NAV.biome);go('mission');};
  r.querySelector('#ab-n').onclick=()=>{sfx.click();closeModal();};};
  el('#sim-pause').onclick=function(){if(!SIM)return;SIM.paused=!SIM.paused;this.classList.toggle('pause-on',SIM.paused);
   this.innerHTML=SIM.paused?ic('play',24)+' Lanjut':ic('pause',24)+' Jeda';sfx.click();};
  el('#sim-top-hide').onclick=()=>toggleUIPanel('top');
 el('#sim-help').onclick=()=>{sfx.click();modal('<h2>Tips Misi</h2>'+SIM.m.tips.map(t=>'<p>• '+t+'</p>').join('')
  +'<p style="color:#7fd4e8;font-family:Fredoka">Target waktu: ≤ '+SIM.m.par+' hari untuk 3 bintang.</p>'
  +'<div class="mrow"><button class="btn btn-gold" data-close>Mengerti!</button></div>');};
 el('#sim-kamus').onclick=()=>{sfx.click();kamusModal(SIM.m.biome);};
 el('#sim-ui .snd-btn').onclick=toggleSound;
 let dragProxy = null;
 let activeDragIndex = -1;
 function moveProxy(e) {
  if(!dragProxy) return;
  dragProxy.style.left = e.clientX + 'px';
  dragProxy.style.top = e.clientY + 'px';
 }
 function onDragMove(e) { moveProxy(e); }
 function onDragEnd(e) {
  window.removeEventListener('pointermove', onDragMove);
  window.removeEventListener('pointerup', onDragEnd);
  if(dragProxy) { dragProxy.remove(); dragProxy = null; }
  if(activeDragIndex > -1) {
   const dockRect = document.querySelector('.sim-dock').getBoundingClientRect();
   // BUG FIX #3: Validasi X+Y — harus di area canvas, bukan di panel UI
   var simCv = document.querySelector('#cv-sim');
   var validDrop = false;
   if(simCv) {
     var cr = simCv.getBoundingClientRect();
     validDrop = e.clientX >= cr.left && e.clientX <= cr.right
              && e.clientY >= cr.top && e.clientY < dockRect.top;
   } else {
     validDrop = e.clientY < dockRect.top;
   }
   if(validDrop) {
    doAction(activeDragIndex, e.clientX, e.clientY);
   } else {
    sfx.click();
    toast('Jatuhkan kartu di area pemandangan alam, bukan di panel!');
   }
   activeDragIndex = -1;
  }
 }
 el('#dock-grid').addEventListener('pointerdown', e => {
  // BUG FIX #2: Cegah multi-touch
  if(activeDragIndex > -1) return;
  const card = e.target.closest('.dock-card');
  if(!card || !SIM) return;
  if(card.classList.contains('finish')){
   const b = e.target.closest('button');
   if(b) { sfx.click(); finishSim(); }
   return;
  }
  const hint = card.querySelector('.dc-btn');
  const allCards = Array.from(document.querySelectorAll('.dock-grid .dock-card:not(.finish)'));
  let i = allCards.indexOf(card);
  if(i === -1) return;
  toast('<b>'+SIM.m.actions[i].label+'</b>: '+SIM.m.actions[i].role, 3500);
  
  if(SIM.done) { toast('Misi sudah selesai! Tekan tombol emas.'); return; }
  if(SIM.cool[i] > 0) { sfx.deny(); toast('Aksi masih istirahat.'); return; }
  if(SIM.quota[i] <= 0) { sfx.deny(); toast('Kuota sudah habis.'); return; }
  
  activeDragIndex = i;
  dragProxy = document.createElement('div');
  dragProxy.className = 'drag-proxy dock-card'; // Reuse dock-card styles if any
  dragProxy.style.cssText = card.style.cssText; // Copy the square styles
  dragProxy.innerHTML = card.innerHTML;
  dragProxy.style.position = 'fixed';
  dragProxy.style.pointerEvents = 'none';
  dragProxy.style.zIndex = '99999';
  dragProxy.style.transform = 'translate(-50%, -50%)';
  dragProxy.style.opacity = '0.9';
  dragProxy.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)';
  
  document.body.appendChild(dragProxy);
  moveProxy(e);
  
  window.addEventListener('pointermove', onDragMove);
  window.addEventListener('pointerup', onDragEnd);
 });
 // BUG FIX #1: Failsafe — bersihkan proxy jika pointer hilang (keluar jendela)
 window.addEventListener('pointercancel', onDragEnd);
 window.addEventListener('blur', function(){
   if(dragProxy) onDragEnd(new PointerEvent('pointerup', {clientX:0, clientY:9999}));
 });
 document.addEventListener('visibilitychange', function(){
   if(document.hidden && dragProxy){
     onDragEnd(new PointerEvent('pointerup', {clientX:0, clientY:9999}));
   }
 });
 el('#stat-rows').addEventListener('click',e=>{const r=e.target.closest('.srow');if(!r||!SIM)return;
  const s=SIM.m.stats.find(x=>x[0]===r.dataset.k);if(s){sfx.pop();toast('<b>'+s[1]+'</b> — '+s[4],3600);}});
 syncSound();buildHUD();updateHUD();}
function simTick(){if(!SIM||SIM.paused||SIM.mp>0||SIM.done)return;
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
   d.style.cssText = 'width:260px;min-width:260px;min-height:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center;gap:8px;padding:18px;border-radius:24px;flex:none;cursor:grab;scroll-snap-align:center';
   d.innerHTML=(per?'<div class="perk-badge" style="position:absolute;top:-8px;right:-8px;background:var(--gold-btn);font-size:24px;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,0.5)">⭐</div>':'')
    +ic(a.ic,48)
    +'<div class="dc-tt" style="font-size:24px;line-height:1.15;margin-bottom:2px;font-weight:700">'+a.label+'</div>'
    +'<div class="dc-quota" style="justify-content:center;font-size:24px;gap:6px;margin-top:2px">'+ic('target',24)+'<span class="q-n"></span></div>'
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
 m.targets.forEach((t,i)=>{const ok=t.c(S);
  if(ok&&!SIM.tgt[i]){sfx.chime();toast('Target tercapai: '+t.l);if(typeof playVO === 'function') playVO('vo_sim_target_ok');
   if(SIM.ui&&!SIM.ui.left)SIM.ui.leftDot=true;}
  SIM.tgt[i]=ok;});
 syncUITabs();
 if(S.health<=6){simFail(false);return;}
 if(S.day>SIM.limit){simFail(true);return;}
 if(!SIM.done&&SIM.tgt.every(Boolean)){SIM.done=true;sfx.success();
  toast('Semua target tercapai! Tekan tombol emas untuk menyelesaikan misi.');simExpr('cheer');if(typeof playVO === 'function') playVO('vo_sim_all_targets');}
 if(!SIM.done&&SIM.voted<SIM.voteAt.length&&S.day>=SIM.voteAt[SIM.voted]){SIM.voted++;showVote();}
 updateHUD();}
function showDropEffect(x, y, iconName) {
  const fx = document.createElement('div');
  fx.innerHTML = ic(iconName, 64);
  fx.style.position = 'fixed';
  fx.style.left = x + 'px';
  fx.style.top = y + 'px';
  fx.style.transform = 'translate(-50%, -50%)';
  fx.style.pointerEvents = 'none';
  fx.style.zIndex = '9999';
  fx.style.transition = 'all 1s ease-out';
  document.body.appendChild(fx);
  requestAnimationFrame(() => {
    fx.style.transform = 'translate(-50%, -150px) scale(1.5)';
    fx.style.opacity = '0';
  });
  setTimeout(() => fx.remove(), 1000);
}

/* ================= EFEK REAKSI SEMPROTAN PESTISIDA / AIR =================
   - Botol Sprayer dengan animasi pompa bertekanan
   - Kerucut kabut aerosol partikel menyebar ke petak tanah/tanaman
   - Kilau embun & respon gugur hama wereng
   - Lencana dampak melayang & ekspresi Gita ceria
*/
function showSprayEffect(x, y, actionId, label) {
  const container = document.createElement('div');
  container.className = 'spray-fx-container';
  container.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;transform:translate(-50%,-50%);pointer-events:none;z-index:10000';

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

function doAction(i, dropX, dropY){const m=SIM.m,a=m.actions[i],S=SIM.S;
 if(SIM.done){toast('Misi sudah selesai! Tekan tombol emas.');return;}
 if(SIM.cool[i]>0){sfx.deny();toast('"'+a.label+'" masih istirahat ('+SIM.cool[i]+' hari lagi).');return;}
 if(SIM.quota[i]<=0){sfx.deny();toast('Kuota "'+a.label+'" sudah habis.');return;}
 SIM.quota[i]--;SIM.cool[i]=SIM.cdi[i];a.fx(S);
 const isSpray = a.id === 'mimba' || a.id === 'padam' || a.id === 'bilas' || a.ic === 'bottle';
 if(isSpray){
   if(sfx.spray) sfx.spray();
   else sfx.pop();
   showSprayEffect(dropX || window.innerWidth / 2, dropY || window.innerHeight * 0.45, a.id, a.label);
 } else {
   sfx.pop();
   if(dropX && dropY) showDropEffect(dropX, dropY, a.ic);
 }
 simUpdate();}
function showVote(){const m=SIM.m;
 let voteTime=15, voteTimer;
 // BUG FIX #4: Simpan referensi closeModal asli agar timer bisa di-clear saat modal ditutup via dim
 var _origCloseModal = closeModal;
 closeModal = function(){
   clearInterval(voteTimer);
   _origCloseModal();
   closeModal = _origCloseModal;
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
  const isSpray = a.id === 'mimba' || a.id === 'padam' || a.id === 'bilas' || a.ic === 'bottle';
  if (isSpray) {
    setTimeout(() => {
      if (sfx.spray) sfx.spray();
      showSprayEffect(window.innerWidth / 2, window.innerHeight * 0.45, a.id, a.label);
    }, 250);
  }
  a.fx(SIM.S);toast('Hasil musyawarah: '+a.label+' (gratis)!');if(typeof playVO === 'function') playVO('vo_sim_vote_done');
  closeModal();simUpdate();});}
function simFail(timeout){if(!SIM)return;clearInterval(SIM.timer);SIM.timer=null;SIM.done=true;sfx.wrong();if(typeof playVO === 'function') playVO(timeout ? 'vo_sim_fail_time' : 'vo_sim_fail_health');
 const m=SIM.m;
   const r=modal('<h2 style="color:#fca5a5">'+ic('clock',34)+' '+(timeout?'Waktu Telah Habis!':'Ekosistem Rusak Berat!')+'</h2>'
  +'<p>'+(timeout?'Hari telah habis, tetapi target misi belum tercapai. Jangan menyerah — ekosistem ini masih membutuhkanmu!'
   :'Kesehatan ekosistem jatuh ke titik kritis. Renungkan: aksi mana yang seharusnya dilakukan lebih dulu?')+'</p>'
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
 try{if(CTX.sim)CTX.sim.clearRect(0,0,1920,1080);}catch(e){}}


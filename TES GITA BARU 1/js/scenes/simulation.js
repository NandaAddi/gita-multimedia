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
    
    // Audio: chime + speak
    sfx.chime();
    speak(cur.title + '. ' + cur.text.replace(/<[^>]*>/g, ''));
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
  const box = el('#sim-bridge');
  if(box) box.style.display = 'none';
  if(SIM){
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
   ui:{left:true,right:true,top:true,leftDot:false},bridging:true};
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
  +'<div class="tb-stars">'+ic('star',24)+' <b>'+totStars()+'/24</b></div>'
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
 +'<div class="dock-grid" id="dock-grid"></div></div></div>';
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
 el('#dock-grid').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!SIM)return;
  if(b.dataset.i==='fin'){sfx.click();finishSim();return;}doAction(+b.dataset.i);});
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
 const dg=el('#dock-grid');dg.innerHTML='';H.dockCard=[];H.dockBtn=[];H.dockQ=[];H.dockCd=[];
   m.actions.forEach((a,i)=>{const per=SIM.team.perk.ids.includes(a.id);
   const d=document.createElement('div');d.className='dock-card';
   d.innerHTML='<div class="dc-top">'+ic(a.ic,36)+'<div style="flex:1;min-width:0"><div class="dc-tt">'+a.label+'</div>'
    +(per?'<span class="boost-badge" style="display:inline-block;margin-top:4px">Keahlian Tim</span>':'')+'</div></div>'
    +'<div class="dc-role">'+a.role+'</div>'
    +'<button class="btn dc-btn" data-i="'+i+'">Lakukan!</button>'
    +'<div class="dc-quota">'+ic('target',24)+' Sisa: <span class="q-n"></span></div>'
    +'<div class="mini-cd"><i></i></div>';
  dg.appendChild(d);
  H.dockCard.push(d);H.dockBtn.push(d.querySelector('button'));
  H.dockQ.push(d.querySelector('.q-n'));H.dockCd.push(d.querySelector('.mini-cd i'));});
 const fin=document.createElement('div');fin.className='dock-card finish';fin.style.display='none';
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
  const btn=H.dockBtn[i],dis=q<=0||cd>0;
  if(btn.disabled!==dis)btn.disabled=dis;
  const lbl=q<=0?'Kuota Habis':cd>0?'Istirahat ('+cd+' hari)':'Lakukan!';
  if(btn.textContent!==lbl)btn.textContent=lbl;
  H.dockQ[i].textContent=q;
  H.dockCd[i].style.width=(cd>0?Math.round((1-cd/SIM.cdi[i])*100):100)+'%';});
 H.finishCard.style.display=SIM.done?'':'none';}
function simUpdate(){if(!SIM)return;const m=SIM.m,S=SIM.S;
 S.health=m.health(S);
 m.targets.forEach((t,i)=>{const ok=t.c(S);
  if(ok&&!SIM.tgt[i]){sfx.chime();toast('Target tercapai: '+t.l);speak('Target tercapai!');
   if(SIM.ui&&!SIM.ui.left)SIM.ui.leftDot=true;}
  SIM.tgt[i]=ok;});
 syncUITabs();
 if(S.health<=6){simFail(false);return;}
 if(S.day>SIM.limit){simFail(true);return;}
 if(!SIM.done&&SIM.tgt.every(Boolean)){SIM.done=true;sfx.success();
  toast('Semua target tercapai! Tekan tombol emas untuk menyelesaikan misi.');simExpr('cheer');}
 if(!SIM.done&&SIM.voted<SIM.voteAt.length&&S.day>=SIM.voteAt[SIM.voted]){SIM.voted++;showVote();}
 updateHUD();}
function doAction(i){const m=SIM.m,a=m.actions[i],S=SIM.S;
 if(SIM.done){toast('Misi sudah selesai! Tekan tombol emas.');return;}
 if(SIM.cool[i]>0){sfx.deny();toast('"'+a.label+'" masih istirahat ('+SIM.cool[i]+' hari lagi).');return;}
 if(SIM.quota[i]<=0){sfx.deny();toast('Kuota "'+a.label+'" sudah habis.');return;}
 SIM.quota[i]--;SIM.cool[i]=SIM.cdi[i];a.fx(S);sfx.pop();simUpdate();}
function showVote(){const m=SIM.m;
 const r=modal('<h2>Musyawarah Kelas!</h2>'
  +'<p>Hari musyawarah telah tiba! Berdiskusilah dengan teman-teman: aksi <b>gratis</b> mana yang akan kita lakukan bersama untuk ekosistem ini?</p>'
  +'<div class="vote-bar">'+m.actions.map((a,i)=>'<div class="vote-card vote-'+['hijau','kuning','merah'][i]+'" data-v="'+i+'">'
   +'<h3>'+a.label+'</h3><p>'+a.role+'</p><p style="font-family:Fredoka">GRATIS — tanpa kuota!</p></div>').join('')+'</div>');
 r.querySelectorAll('.vote-card').forEach(cd=>cd.onclick=()=>{const a=m.actions[+cd.dataset.v];
  sfx.success();a.fx(SIM.S);toast('Hasil musyawarah: '+a.label+' (gratis)!');speak('Hasil musyawarah: '+a.label);
  closeModal();simUpdate();});}
function simFail(timeout){if(!SIM)return;clearInterval(SIM.timer);SIM.timer=null;SIM.done=true;sfx.wrong();
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


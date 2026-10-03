/* ============================================================
   ECO-EXPLORER — js/scenes/mission-menu.js
   Menu Misi per Bioma & Modal Kamus Alam
   ============================================================ */

function kamusModal(pre){let b=pre&&BIOME_ORDER.includes(pre)?pre:'sawah';
 const r=modal('<h2>'+ic('book',34)+' Kamus Alam</h2>'
  +'<p>Klik istilah untuk membaca penjelasannya. Gunakan kamus ini saat bermain!</p>'
  +'<div id="ktabs" style="display:flex;gap:12px;margin:8px 0 16px;flex-wrap:wrap"></div><div id="kbody"></div>');
 function render(){r.querySelector('#ktabs').innerHTML=BIOME_ORDER.map(k=>'<div class="ktab '+(k===b?'on':'')+'" data-k="'+k+'">'+BIOMES[k].name+'</div>').join('');
  r.querySelector('#kbody').innerHTML='<div class="kdetail" id="kdet" style="margin-bottom:16px">Klik salah satu istilah di bawah untuk membacanya…</div>'
   +'<div class="kgrid">'+KAMUS[b].map((k,i)=>'<div class="kcard" data-i="'+i+'"><h3>'+k[0]+'</h3><p>'+k[1]+'</p></div>').join('')+'</div>';
  r.querySelectorAll('.ktab').forEach(t=>t.onclick=()=>{b=t.dataset.k;sfx.click();render();});
  r.querySelectorAll('.kcard').forEach(cd=>cd.onclick=()=>{sfx.pop();
   const k=KAMUS[b][+cd.dataset.i];
   r.querySelector('#kdet').innerHTML='<b style="color:#fef08a;font-family:Fredoka;font-size:29px">'+k[0]+'</b> — '+k[2];});}
 render();}


/* ================= LAYAR: MISI ================= */
function buildMissionMenu(b){NAV.biome=b;
 const idxs=[];MISSIONS.forEach((m,i)=>{if(m.biome===b)idxs.push(i);});
 el('#scr-mission').innerHTML='<div class="ui">'
 +'<div class="topbar"><button class="btn tb-btn" id="m-back">'+ic('back',24)+' Ekosistem</button>'
 +'<div class="plaque">'+BIOMES[b].full+'</div><div class="spacer"></div>'
 +'<button class="btn tb-btn" id="m-kamus">'+ic('book',24)+' Kamus</button>'
 +'<div class="tb-stars">'+ic('star',24)+' <b>'+totStars()+'/24</b></div></div>'
 +'<div class="mmenu">'+idxs.map(i=>{const m=MISSIONS[i],st=G.stars[m.id]||0,un=unlocked(i);
  const team=TEAMS.find(t=>t.id===G.team);
  return '<div class="mcard panel-deep '+(un?'':'locked')+'">'
   +(team&&team.spec===m.id?'<div class="spec-ribbon">Misi Spesial '+team.name+'</div>':'')
   +'<div class="micon">'+ic(BICON[m.biome],56)+'</div>'
   +'<div class="mbody"><span class="mtype '+m.type+'">'+(m.type==='alam'?'Bencana Alam':'Ulah Manusia')+'</span>'
   +'<div class="mtitle">'+m.title+'</div><div class="mhead">'+m.headline+'</div>'
   +'<div class="mtask">Tugas: '+m.task+'</div>'
   +'<div class="mstars">'+[0,1,2].map(k=>'<span class="'+(k<st?'':'off')+'">★</span>').join('')+'</div></div>'
   +(un?'<button class="btn btn-gold go" data-i="'+i+'" style="font-size:24px;padding:16px 32px">'+(st?'Ulangi':'Mulai')+'!</button>'
      :'<button class="btn go" disabled>'+ic('lock',24)+' Terkunci</button>')
   +'</div>';}).join('')+'</div></div>';
 el('#m-back').onclick=()=>{sfx.click();buildBiome();go('biome');};
 el('#m-kamus').onclick=()=>{sfx.click();kamusModal(b);};
 els('.mcard .go[data-i]').forEach(g=>g.onclick=()=>{sfx.click();openMission(MISSIONS[+g.dataset.i]);});}
function openMission(m){
 const r=modal('<h2>'+m.title+'</h2>'
  +'<p><b style="color:#fef08a">'+m.headline+'</b></p><p>'+m.story+'</p>'
  +'<p style="color:#7fd4e8;font-family:Fredoka">Tugas: '+m.task+'</p>'
  +'<div class="brief-t">Target Misi:</div><ul>'+m.targets.map(t=>'<li>'+t.l+'</li>').join('')+'</ul>'
  +'<p>Selesaikan dalam <b>≤ '+m.par+' hari</b> untuk meraih 3 bintang. Batas waktu: '+(m.par+18)+' hari.</p>'
  +'<p style="background:rgba(2,44,34,.6);border-radius:12px;padding:12px 18px">Tips Gita: '+m.tips[0]+'</p>'
  +'<div class="mrow"><button class="btn btn-gold" id="mf-go" style="font-size:27px;padding:18px 46px">Mulai Misi!</button></div>');
 r.querySelector('#mf-go').onclick=()=>{sfx.click();closeModal();startSim(m);};
 speak('Misi dimulai. '+m.task);}


/* ============================================================
   ECO-EXPLORER — js/scenes/team.js
   Layar Pemilihan Tim Petualang (5 Tim)
   ============================================================ */

let teamIdx = 0;
function buildTeam(){
 const saved=TEAMS.findIndex(t=>t.id===G.team);teamIdx=saved>=0?saved:0;
 el('#scr-team').innerHTML='<div class="ui">'
 +'<div class="topbar"><button class="btn tb-btn" id="t-back">'+ic('back',24)+' Judul</button>'
 +'<div class="plaque">Pilih Tim Petualangmu</div><div class="spacer"></div>'
 +'<div class="tb-stars">'+ic('star',24)+' <b>'+totStars()+'/24</b></div></div>'
 +'<div class="stage panel-deep">'
 +'<div class="arrow prev" id="t-prev">'+ic('back',44)+'</div><div class="arrow next" id="t-next">'+ic('arrowR',44)+'</div>'
 +'<div class="hero-left"><div class="pedestal"><canvas id="t-mascot" width="340" height="340"></canvas></div>'
 +'<div class="hero-name" id="t-name"></div></div>'
 +'<div class="hero-right"><div class="hero-motto" id="t-motto"></div>'
 +'<div class="hero-dossier" id="t-doss"></div>'
 +'<div class="hero-spec">'+ic('medal',28)+' <span id="t-spec"></span></div></div></div>'
 +'<div class="dock" id="t-dock"></div></div>';
 el('#t-back').onclick=()=>{sfx.click();titleBubble();go('title');};
 el('#t-prev').onclick=()=>{sfx.click();teamIdx=(teamIdx+4)%5;renderTeam();};
 el('#t-next').onclick=()=>{sfx.click();teamIdx=(teamIdx+1)%5;renderTeam();};
 renderTeam();}
function renderTeam(){const t=TEAMS[teamIdx],sm2=MISSIONS.find(m=>m.id===t.spec);
 el('#t-name').textContent=t.name;
 el('#t-motto').textContent='"'+t.motto+'"';
 el('#t-doss').innerHTML='<b style="color:#fef08a;font-family:Fredoka">'+t.role+'</b><br>'+t.dossier;
 el('#t-spec').textContent='Keahlian: '+t.perk.label+' (bonus kuota & cooldown singkat) • Misi spesial: '+sm2.title;
 const c=el('#t-mascot').getContext('2d');c.clearRect(0,0,340,340);c.save();c.translate(170,178);MASC[t.mascot](c);c.restore();
 el('#t-dock').innerHTML=TEAMS.map((tm,i)=>'<div class="dock-tile '+(i===teamIdx?'on':'')+'" data-i="'+i+'">'+tm.name+'<span class="sm" style="font-size:24px;opacity:.85">'+tm.role+'</span></div>').join('')
 +'<button class="btn btn-gold" id="t-pick" style="height:86px;font-size:25px;padding:0 34px">'+ic('check',26)+' Pilih Tim Ini!</button>';
 els('#t-dock .dock-tile').forEach(d=>d.onclick=()=>{sfx.click();teamIdx=+d.dataset.i;renderTeam();});
 el('#t-pick').onclick=()=>{G.team=t.id;saveG();sfx.success();toast('Kamu memilih '+t.name+'! '+t.perk.label+' jadi lebih kuat.');
  speak('Hebat! Kamu memilih '+t.name+'.');buildBiome();go('biome');};}


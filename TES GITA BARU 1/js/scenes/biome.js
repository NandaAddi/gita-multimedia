/* ============================================================
   ECO-EXPLORER — js/scenes/biome.js
   Layar Pemilihan Ekosistem (4 Bioma)
   ============================================================ */

let PREVS = [];
function drawPreview(p,t){const s=Math.min(p.w/1920,p.h/1080);
 const ox=(p.w-1920*s)/2,oy=(p.h-1080*s)/2;
 p.ctx.save();p.ctx.clearRect(0,0,p.w,p.h);
 p.ctx.fillStyle='#03211a';p.ctx.fillRect(0,0,p.w,p.h);
 p.ctx.translate(ox,oy);p.ctx.scale(s,s);p.fn(p.ctx,t,p.fake);p.ctx.restore();}

/* ================= LAYAR: BIOMA ================= */
function buildBiome(){PREVS=[];
 el('#scr-biome').innerHTML='<div class="ui">'
 +'<div class="topbar"><button class="btn tb-btn" id="b-back">'+ic('back',24)+' Tim</button>'
 +'<div class="plaque">Pilih Ekosistem</div><div class="spacer"></div>'
 +'<button class="btn tb-btn" id="b-kamus">'+ic('book',24)+' Kamus Alam</button>'
 +'<div class="tb-stars">'+ic('star',24)+' <b>'+totStars()+'/24</b></div></div>'
 +'<div class="biome-wrap">'+BIOME_ORDER.map((k,i)=>{
   const b=BIOMES[k],un=unlocked(MISSIONS.findIndex(m=>m.biome===k));
   const st=MISSIONS.filter(m=>m.biome===k).reduce((s,m)=>s+(G.stars[m.id]||0),0);
   return '<div class="bio-card panel-deep '+(un?'':'lock')+'">'
    +'<div class="bio-prev"><canvas id="bp-'+k+'" width="440" height="290"></canvas></div>'
    +'<div class="bio-txt"><div class="bio-name">'+b.full+'</div><div class="bio-tag">'+b.tag+' • '+st+'/6 bintang</div>'
    +'<div class="bio-desc">'+b.desc+'</div>'
    +'<div class="bio-chain">'+b.chain.map(x=>'<span class="cp">'+x+'</span>').join('<span class="ca">→</span>')+'</div>'
    +'<div style="flex:1"></div>'
    +(un?'<button class="btn btn-gold" data-k="'+k+'" style="font-size:24px;padding:14px 34px">'+ic('arrowR',24)+' Jelajahi '+b.name+'</button>'
       :'<button class="btn" disabled>'+ic('lock',24)+' Selesaikan misi sebelumnya</button>')
    +'</div></div>';}).join('')+'</div></div>';
 el('#b-back').onclick=()=>{sfx.click();buildTeam();go('team');};
 el('#b-kamus').onclick=()=>{sfx.click();kamusModal(NAV.biome);};
 els('.bio-card .btn[data-k]').forEach(b=>b.onclick=()=>{sfx.click();buildMissionMenu(b.dataset.k);go('mission');});
 BIOME_ORDER.forEach(k=>{const c=el('#bp-'+k);if(c)PREVS.push({ctx:c.getContext('2d'),fn:SCENE[k],fake:FAKE[k],w:440,h:290});});}


/* ============================================================
   ECO-EXPLORER — js/renderers/characters.js
   Vektor Gita SVG, Canvas Helpers, Sprites, & Maskot Tim
   ============================================================ */

/* ================= GITA ================= */
function gitaSVG(size,expr){expr=expr||'happy';
return '<svg class="gita '+expr+'" viewBox="0 0 230 250" width="'+size+'" height="'+Math.round(size*250/230)+'">'
+'<circle cx="115" cy="114" r="86" fill="#232b36" stroke="#151b23" stroke-width="5"/>'
+'<path d="M40 172 Q26 220 46 244 L184 244 Q204 220 190 172 Q152 196 115 196 Q78 196 40 172Z" fill="#232b36" stroke="#151b23" stroke-width="4"/>'
+'<circle cx="115" cy="122" r="55" fill="#f7cba4" stroke="#d9a276" stroke-width="3"/>'
+'<path d="M62 106 A 53 53 0 0 1 168 106 L168 118 A 53 34 0 0 0 62 118 Z" fill="#232b36" stroke="#151b23" stroke-width="3"/>'
+'<circle cx="168" cy="118" r="5" fill="#f5a30b" stroke="#b45309" stroke-width="2"/>'
+'<path class="brow b1" d="M80 101 Q92 94 103 99"/><path class="brow b2" d="M127 99 Q138 94 150 101"/>'
+'<g class="eye"><ellipse cx="91" cy="121" rx="8" ry="10" fill="#2a2320"/><circle cx="94" cy="117" r="2.6" fill="#fff"/></g>'
+'<g class="eye"><ellipse cx="139" cy="121" rx="8" ry="10" fill="#2a2320"/><circle cx="142" cy="117" r="2.6" fill="#fff"/></g>'
+'<path class="eh" d="M82 122 Q91 111 100 122"/><path class="eh" d="M130 122 Q139 111 148 122"/>'
+'<circle cx="74" cy="139" r="7" fill="#f0a08c" opacity=".55"/><circle cx="156" cy="139" r="7" fill="#f0a08c" opacity=".55"/>'
+'<path class="g-mouth" d="M96 149 Q115 165 134 149 Q115 157 96 149Z" fill="#9c3d56" stroke="#6e2a3e" stroke-width="2.5"/>'
+'<path d="M18 250 Q22 190 70 176 L160 176 Q208 190 212 250 Z" fill="#1e3a5f" stroke="#14263f" stroke-width="4"/>'
+'<path d="M115 176 L115 250" stroke="#f5a30b" stroke-width="4"/>'
+'<circle cx="182" cy="216" r="13" fill="#f5a30b" stroke="#b45309" stroke-width="3"/>'
+'<circle cx="179" cy="213" r="4" fill="#022c22"/><path d="M187 221l6 6" stroke="#022c22" stroke-width="3"/></svg>';}
function simExpr(e){const g=el('#sim-ui .gita');if(g){g.classList.remove('happy','talk','worried','cheer');g.classList.add(e);}}


/* KANVAS: HELPER hidup di config.js (satu sumber utk semua renderer) */
/* skyPaint/sunDraw/cloud(s) hidup di backgrounds.js (satu sumber — dimuat setelah file ini) */

/* ================= KANVAS: SATWA ================= */
function spRice(c,x,y,hgt,col,sw){c.lineCap='round';
 const dk=mixc(col,'#1e4028',.3),lt='#9ed07a';
 for(let i=-2;i<=2;i++){const bx=x+i*5+sw*.5,tx=x+i*8+sw,ty=y-hgt;
  c.strokeStyle=dk;c.lineWidth=3.5;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(bx,y-hgt*.55,tx,ty);c.stroke();
  c.strokeStyle=i%2?'#63c06a':lt;c.lineWidth=1.6;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(bx,y-hgt*.55,tx,ty);c.stroke();
  const g2=i%2?'#63c06a':col;
  for(let k=0;k<3;k++)O(c,tx,ty+k*7+3,2.6,4.5,g2);}
 // anakan melengkung + titik tumbuh + kilau
 c.strokeStyle=lt;c.lineWidth=1.8;
 c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x-14+sw*.5,y-hgt*.3,x-20+sw,y-hgt*.55);c.stroke();
 c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+14+sw*.5,y-hgt*.3,x+20+sw,y-hgt*.55);c.stroke();
 CIRC(c,x,y-2,2,lt);
 O(c,x+6+sw,y-hgt*.5,1.6,2.6,'rgba(255,255,220,.6)');}
/* Rumput tepi ladang: 7 helai tinggi acak deterministik + biji pucat + goyang angin.
   Posisi & tinggi statis per seed (tidak flicker); hanya goyang yang animasi. */
function spGrass(c,x,y,s,seed,t){c.save();c.translate(x,y);c.lineCap='round';
 const sway=Math.sin(t/900+x)*2*s;
 for(let i=0;i<7;i++){const h=(14+pr(seed+i*3.7)*16)*s,tx=(i-3)*2.6*s+sway;
  c.strokeStyle=i%2?'#63c06a':'#3f9a4e';c.lineWidth=2.6*s;
  c.beginPath();c.moveTo(0,0);c.quadraticCurveTo((i-3)*1.5*s+sway*.4,-h*.6,tx,-h);c.stroke();
  if(i%3===0)CIRC(c,tx,-h,1.8*s,'#e8d98a');}
 c.restore();}
/* ================= HAMA WERENG COKELAT (Nilaparvata lugens) =================
   - Serangga kecil perusak padi, hinggap di batang/rumpun
   - Sayap tembus pandang bergetar lembut
   - Reaksi disemprot/withering: berputar pusing (tumble), rontok ke bawah, lalu lenyap
*/
function spWereng(c, x, y, t, seed = 0, isDying = false, progress = 0) {
  c.save();

  let curX = x;
  let curY = y;
  let curRot = 0;
  let alpha = 1;

  if (isDying) {
    const fallDist = progress * 48;
    curY += fallDist;
    curRot = progress * Math.PI * 3.2;
    alpha = Math.max(0, 1 - progress * 1.15);
    c.globalAlpha = (c.globalAlpha !== undefined ? c.globalAlpha : 1) * alpha;
  } else {
    const twitch = Math.sin(t / 80 + seed * 5) * 1.5;
    curY += twitch * 0.4;
  }

  c.translate(curX, curY);
  if (curRot) c.rotate(curRot);

  if (!isDying) {
    SH(c, 0, 4, 6);
  }

  // Kaki serangga (6 kaki)
  c.strokeStyle = '#3e2815';
  c.lineWidth = 1;
  c.lineCap = 'round';
  [[-4, -2, -8, 2], [-4, 0, -8, 5], [-4, 2, -6, 7],
   [4, -2, 8, 2], [4, 0, 8, 5], [4, 2, 6, 7]].forEach(leg => {
    c.beginPath();
    c.moveTo(leg[0], leg[1]);
    c.lineTo(leg[2], leg[3]);
    c.stroke();
  });

  // Badan & Thorax
  OG(c, 0, 0, 5, 8, RG(c, 0, -2, 8, '#7a5432', '#422a15'));
  O(c, 0, -3, 4, 3.5, '#382210');

  // Sayap transparan bergetar
  const wingFlap = Math.sin(t / 60 + seed * 7) * 0.8;
  c.save();
  c.fillStyle = 'rgba(235, 220, 195, 0.72)';
  c.strokeStyle = 'rgba(120, 90, 60, 0.5)';
  c.lineWidth = 0.8;
  c.beginPath();
  c.ellipse(-1.5 + wingFlap * 0.5, 2, 3, 7.5, -0.15, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  c.beginPath();
  c.ellipse(1.5 - wingFlap * 0.5, 2, 3, 7.5, 0.15, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  c.restore();

  // Mata manik & antena
  CIRC(c, -2.5, -6, 1.2, '#181008');
  CIRC(c, 2.5, -6, 1.2, '#181008');
  c.strokeStyle = '#2b1a0e';
  c.lineWidth = 0.8;
  c.beginPath();
  c.moveTo(-2, -6.5);
  c.lineTo(-4.5, -10);
  c.moveTo(2, -6.5);
  c.lineTo(4.5, -10);
  c.stroke();

  // Indikator pusing saat terhempas
  if (isDying && progress < 0.65) {
    c.strokeStyle = '#fef08a';
    c.lineWidth = 1;
    c.beginPath();
    c.arc(0, -9, 4, 0, Math.PI * 1.5);
    c.stroke();
  }

  c.restore();
}
function spMouse(c,x,y){c.save();c.translate(x,y);
 SH(c,0,9,15);
 c.strokeStyle='#6e5238';c.lineWidth=2;c.lineCap='round';c.beginPath();c.moveTo(-13,2);c.quadraticCurveTo(-22,-5,-27,1);c.stroke();
 CG(c,-27,1,1.6,'#c9a07a');
 OG(c,0,0,14,9,RG(c,0,-2,15,'#b08a5e','#7a5a38'));
 O(c,-2,3,9,5,'rgba(232,205,170,.9)');
 O(c,10,-6,5,5,'#a5825e');O(c,8,-10,2.6,2.6,'#a5825e');O(c,8,-10,1.4,1.4,'#e8a0a8');
 EB(c,13,-7,2.2,.4,0);
 CIRC(c,15.5,-5,1.4,'#e88a8a');
 c.strokeStyle='rgba(60,40,25,.7)';c.lineWidth=1;c.beginPath();c.moveTo(14,-4);c.lineTo(20,-6);c.moveTo(14,-2);c.lineTo(20,-1);c.stroke();c.restore();}
function spSnake(c,x,y,t){c.save();c.translate(x,y);
 c.lineCap='round';
 c.strokeStyle='#2e6b2f';c.lineWidth=9;c.beginPath();
 for(let i=0;i<=24;i++){const X=-40+i*(80/24),Y=Math.sin(i/24*6.28+t/350)*5+1;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);}c.stroke();
 c.strokeStyle='#4c8a3f';c.lineWidth=6.5;c.beginPath();
 for(let i=0;i<=24;i++){const X=-40+i*(80/24),Y=Math.sin(i/24*6.28+t/350)*5;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);}c.stroke();
 c.strokeStyle='#8fd46a';c.lineWidth=2;c.beginPath();
 for(let i=0;i<=24;i++){const X=-40+i*(80/24),Y=Math.sin(i/24*6.28+t/350)*5-2;if(i)c.lineTo(X,Y);else c.moveTo(X,Y);}c.stroke();
 c.strokeStyle='rgba(30,70,30,.6)';c.lineWidth=1.5;
 for(let i=2;i<22;i+=4){const X=-40+i*(80/24),Y=Math.sin(i/24*6.28+t/350)*5;
  c.beginPath();c.moveTo(X-3,Y+2);c.quadraticCurveTo(X,Y+5,X+3,Y+2);c.stroke();}
 const hy=Math.sin(6.28+t/350)*5;
 SH(c,40,hy+9,12);
 OG(c,44,hy,8,5.5,RG(c,44,hy-2,9,'#6fbf60','#3a7a30'));
 const fl=Math.sin(t/180)>0?6:2;
 c.strokeStyle=PAL.danger;c.lineWidth=2;c.beginPath();c.moveTo(51,hy);c.lineTo(51+7+fl,hy-2);c.moveTo(51+7+fl,hy-2);c.lineTo(51+5+fl,hy-4);c.moveTo(51+7+fl,hy-2);c.lineTo(51+5+fl,hy);c.stroke();
 EB(c,45,hy-2,2.4,.5,0);c.restore();}
function spFrog(c,x,y,t){const j=Math.abs(Math.sin(t/320))*14;c.save();c.translate(x,y-j);
 const sd=Math.abs(x)*3.7;
 SH(c,0,11,17);
 // kaki belakang melipat: paha + betis + jari selaput
 c.strokeStyle='#3f8a36';c.lineWidth=6;c.lineCap='round';
 c.beginPath();c.moveTo(-13,2);c.quadraticCurveTo(-21,6,-19,11);c.stroke();
 c.beginPath();c.moveTo(13,2);c.quadraticCurveTo(21,6,19,11);c.stroke();
 c.strokeStyle='#2e6b2f';c.lineWidth=2;
 [-19,19].forEach(fx=>{for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(fx,11);c.lineTo(fx+k*3,14);c.stroke();}});
 // badan + perut krem
 OG(c,0,0,16,11,RG(c,-3,-4,17,'#8fd46a','#3f8a36'));
 O(c,0,5,10,5.5,'rgba(220,240,190,.85)');
 // bercak punggung statis (per posisi kodok, tidak flicker)
 for(let k=0;k<5;k++){const bx=-10+pr(sd+k*7.3)*20,by=-6+pr(sd+k*3.1+9)*8;
  CIRC(c,bx,by,1.2+pr(sd+k)*1.3,'rgba(35,90,40,.55)');}
 // kilau basah di punggung
 O(c,-5,-4,4,2,'rgba(255,255,255,.45)');
 // kantung tenggorokan mengembang-mengempis
 const th=(Math.sin(t/500)+1)/2;
 O(c,0,8,4+th*1.6,2.5+th,'rgba(240,220,200,.8)');
 // mata di atas kepala: iris emas + pupil horizontal + kedip berkala
 const blink=frac(t/4000)<.06;
 [-7,7].forEach(ex=>{
  CIRC(c,ex,-9,4.2,'#3f8a36');
  if(blink){c.strokeStyle='#2e6b2f';c.lineWidth=1.6;c.beginPath();c.moveTo(ex-3,-9);c.lineTo(ex+3,-9);c.stroke();}
  else{CIRC(c,ex,-9,3.4,'#f4f1de');CIRC(c,ex,-9,2.4,'#d9a92e');O(c,ex,-9,1.8,.9,'#241c16');CIRC(c,ex+.7,-9.7,.7,'#fff');}});
 c.strokeStyle='#241c16';c.lineWidth=2;c.beginPath();c.arc(0,-2,5,.1*Math.PI,.9*Math.PI);c.stroke();c.restore();}
function butterfly(c,x,y,t){const f=Math.sin(t/110);c.save();c.translate(x,y);
 c.save();c.scale(.55+.45*Math.abs(f),1);
 OG(c,-7,-3,7,6,LG(c,-14,0,0,0,'#f7d4e4','#e89ac0'));
 OG(c,7,-3,7,6,LG(c,0,0,14,0,'#e89ac0','#f7d4e4'));
 CIRC(c,-8,-4,2,'rgba(255,255,255,.9)');CIRC(c,8,-4,2,'rgba(255,255,255,.9)');
 CIRC(c,-5,0,1.2,'#a05a80');CIRC(c,5,0,1.2,'#a05a80');
 c.restore();
 c.strokeStyle='#3a2f3a';c.lineWidth=2.4;c.lineCap='round';c.beginPath();c.moveTo(0,-6);c.lineTo(0,6);c.stroke();
 c.lineWidth=1.2;c.beginPath();c.moveTo(-1,-6);c.quadraticCurveTo(-5,-11,-7,-12);c.moveTo(1,-6);c.quadraticCurveTo(5,-11,7,-12);c.stroke();
 CIRC(c,0,-1,1,'#fff');
 c.restore();}
/* Pohon Rimba / Meranti Tropis Realistis:
   - Batang berakar banir (buttress roots) & guratan serat kulit kayu alami
   - Aksen lumut lembap di pangkal akar
   - Percabangan dahan organik yang tampak alami di sela kanopi
   - Tajuk kanopi awan bertingkat (organic cloud-cluster lobes) dengan pencahayaan 3D (bayangan bawah gelap + highlight pucuk muda)
   - Bintik tekstur dedaunan mikro (foliage dapples) & sulur liana tropis
   - Animasi hembusan angin organik (wind sway) berbasis waktu t & seed
   - Respon degradasi/kemarau (wither): daun meranggas berkurang & dahan kering terekspos
   - Perspektif atmosferik untuk pohon latar belakang (aerial haze)
*/
function treeDraw(c, x, y, h, col, seed = 0, t = 0, isBg = false, wither = 0) {
  if (h <= 4) return;
  col = col || '#3f8a4a';
  wither = Math.max(0, Math.min(1, wither));

  c.save();

  // 1. BAYANGAN KONTAK TANAH (Ground Contact Shadow)
  const shW = h * (isBg ? 0.36 : 0.46);
  const shH = Math.max(3, h * (isBg ? 0.08 : 0.11));
  c.beginPath();
  c.ellipse(x, y, shW, shH, 0, 0, Math.PI * 2);
  c.fillStyle = isBg ? 'rgba(12, 30, 18, 0.22)' : 'rgba(10, 24, 14, 0.35)';
  c.fill();

  // 2. PARAMETER ANGIN & GOYANGAN KANOPI (Multi-frequency Organic Wind Sway)
  const windCycle = Math.sin(t / 850 + seed * 1.9) * 0.7 + Math.sin(t / 420 + seed * 3.1) * 0.3;
  const swayAmount = (1 - wither * 0.4) * windCycle * (h * (isBg ? 0.022 : 0.038));

  // 3. WARNA & PALET BATANG & DEDAUNAN
  const dkCol = mixc(col, '#0d2412', 0.58);
  const midCol = col;
  const ltCol = mixc(col, '#c8f078', 0.42);
  const dappleCol = mixc(col, '#fef08a', 0.32);
  const driedCol = mixc(col, '#6b4c2b', wither * 0.85);
  const activeFoliageCol = wither > 0 ? driedCol : midCol;
  const activeDkCol = wither > 0 ? mixc(dkCol, '#3d2816', wither * 0.85) : dkCol;
  const activeLtCol = wither > 0 ? mixc(ltCol, '#9e7a4f', wither * 0.85) : ltCol;

  // Batang (Kayu Meranti / Rimba)
  const trunkBaseCol = wither > 0 ? '#382f2a' : '#4e331c';
  const trunkMidCol = wither > 0 ? '#54463d' : '#6e492b';
  const trunkHiCol = wither > 0 ? '#75655a' : '#8c603a';
  const barkGrooveCol = wither > 0 ? 'rgba(25, 20, 18, 0.5)' : 'rgba(32, 18, 9, 0.45)';

  // 4. BATANG & AKAR BANIR (Buttress Roots & Flared Trunk)
  const tw = h * (isBg ? 0.11 : 0.13);
  const twTop = tw * 0.55;
  const trunkH = h * 0.48;
  const rootL = tw * (1.35 + pr(seed * 5 + 1) * 0.45);
  const rootR = tw * (1.35 + pr(seed * 7 + 2) * 0.45);
  const splitY = y - trunkH;

  // Siluet Batang dengan Akar Banir Berlekuk
  c.beginPath();
  c.moveTo(x - rootL, y);
  c.quadraticCurveTo(x - tw * 0.75, y - trunkH * 0.28, x - twTop * 0.5, splitY);
  c.lineTo(x + twTop * 0.5, splitY);
  c.quadraticCurveTo(x + tw * 0.75, y - trunkH * 0.28, x + rootR, y);
  c.quadraticCurveTo(x + rootR * 0.4, y - 2, x, y);
  c.quadraticCurveTo(x - rootL * 0.4, y - 2, x - rootL, y);
  c.closePath();

  // Gradasi Isi Batang Kayu
  const trunkGrad = c.createLinearGradient(x - tw, splitY, x + tw, y);
  trunkGrad.addColorStop(0, trunkMidCol);
  trunkGrad.addColorStop(0.3, trunkHiCol);
  trunkGrad.addColorStop(0.8, trunkBaseCol);
  c.fillStyle = trunkGrad;
  c.fill();

  // Serat Guratan Kulit Kayu Vertikal (Bark Striations)
  c.strokeStyle = barkGrooveCol;
  c.lineWidth = Math.max(1, h * 0.012);
  c.lineCap = 'round';
  [-0.35, 0.0, 0.35].forEach((offsetFrac) => {
    const rxStart = x + (offsetFrac < 0 ? -rootL * 0.45 : offsetFrac > 0 ? rootR * 0.45 : 0);
    const rxMid = x + tw * offsetFrac * 0.75;
    const rxEnd = x + twTop * offsetFrac * 0.6;
    c.beginPath();
    c.moveTo(rxStart, y - 1);
    c.quadraticCurveTo(rxMid, y - trunkH * 0.5, rxEnd, splitY);
    c.stroke();
  });

  // Aksen Lumut / Epifit di Pangkal Akar Banir
  if (!isBg) {
    c.fillStyle = wither > 0 ? 'rgba(70, 60, 45, 0.35)' : 'rgba(54, 98, 38, 0.65)';
    c.beginPath();
    c.ellipse(x - rootL * 0.4, y - 2, tw * 0.45, Math.max(2, h * 0.02), 0, 0, Math.PI * 2);
    c.ellipse(x + rootR * 0.35, y - 2, tw * 0.4, Math.max(2, h * 0.018), 0, 0, Math.PI * 2);
    c.fill();
  }

  // 5. PERCABANGAN DAHAN ALAMI (Primary Branches Peeking Into Canopy)
  c.strokeStyle = trunkBaseCol;
  c.lineCap = 'round';
  
  // Dahan Kiri
  const b1EndX = x - h * 0.24 + swayAmount * 0.55;
  const b1EndY = splitY - h * 0.16;
  c.lineWidth = Math.max(1.5, twTop * 0.52);
  c.beginPath();
  c.moveTo(x - twTop * 0.2, splitY + 4);
  c.quadraticCurveTo(x - twTop * 0.6, splitY - h * 0.08, b1EndX, b1EndY);
  c.stroke();

  // Dahan Kanan
  const b2EndX = x + h * 0.26 + swayAmount * 0.6;
  const b2EndY = splitY - h * 0.18;
  c.lineWidth = Math.max(1.5, twTop * 0.48);
  c.beginPath();
  c.moveTo(x + twTop * 0.2, splitY + 4);
  c.quadraticCurveTo(x + twTop * 0.6, splitY - h * 0.09, b2EndX, b2EndY);
  c.stroke();

  // Batang Utama ke Puncak
  const b3EndX = x + swayAmount * 0.8;
  const b3EndY = splitY - h * 0.28;
  c.lineWidth = Math.max(1.8, twTop * 0.6);
  c.beginPath();
  c.moveTo(x, splitY + 6);
  c.quadraticCurveTo(x + swayAmount * 0.3, splitY - h * 0.14, b3EndX, b3EndY);
  c.stroke();

  // Dahan Ranting Kering Tambahan (Menonjol saat Meranggas / Wither)
  if (wither > 0.2) {
    c.lineWidth = Math.max(1.1, twTop * 0.28);
    c.strokeStyle = trunkHiCol;
    c.beginPath();
    c.moveTo(b1EndX, b1EndY);
    c.lineTo(b1EndX - h * 0.09, b1EndY - h * 0.07);
    c.moveTo(b2EndX, b2EndY);
    c.lineTo(b2EndX + h * 0.10, b2EndY - h * 0.08);
    c.moveTo(b3EndX, b3EndY);
    c.lineTo(b3EndX + (pr(seed * 11) - 0.5) * h * 0.12, b3EndY - h * 0.12);
    c.stroke();
  }

  // 6. SULUR LIANA GANTUNG (Tropical Vines) — Hanya pada foreground
  if (!isBg && wither < 0.8) {
    const vineSway = Math.sin(t / 650 + seed * 2.5) * (h * 0.016);
    c.strokeStyle = wither > 0 ? '#635338' : '#3d612b';
    c.lineWidth = Math.max(1.1, h * 0.011);
    
    // Sulur 1 (dari dahan kiri menjuntai)
    c.beginPath();
    c.moveTo(x - h * 0.16 + swayAmount * 0.4, splitY - h * 0.06);
    c.quadraticCurveTo(x - h * 0.19 + vineSway, y - trunkH * 0.4, x - h * 0.15 + vineSway * 1.3, y - trunkH * 0.15);
    c.stroke();

    // Sulur 2 (dari dahan kanan)
    c.beginPath();
    c.moveTo(x + h * 0.18 + swayAmount * 0.45, splitY - h * 0.08);
    c.quadraticCurveTo(x + h * 0.22 - vineSway, y - trunkH * 0.35, x + h * 0.19 - vineSway * 1.2, y - trunkH * 0.08);
    c.stroke();

    // Titik daun muda kecil di sulur
    CIRC(c, x - h * 0.16 + vineSway, y - trunkH * 0.28, Math.max(1.2, h * 0.012), activeLtCol);
    CIRC(c, x + h * 0.20 - vineSway, y - trunkH * 0.22, Math.max(1.2, h * 0.012), activeLtCol);
  }

  // 7. KANOPI DEDAUNAN BERLAPIS 3D (Organic Cloud-Cluster Canopy)
  const leafScale = Math.max(0.25, 1 - wither * 0.68);
  const lobes = [
    // Lapisan Bawah (Lower Tier)
    { ox: -h * 0.25, oy: splitY - h * 0.15, rx: h * 0.24 * leafScale, ry: h * 0.19 * leafScale, tier: 1 },
    { ox:  h * 0.27, oy: splitY - h * 0.17, rx: h * 0.25 * leafScale, ry: h * 0.20 * leafScale, tier: 1 },
    { ox:  0,        oy: splitY - h * 0.12, rx: h * 0.22 * leafScale, ry: h * 0.16 * leafScale, tier: 1 },
    // Lapisan Tengah (Mid Canopy - Lebar & Rindang)
    { ox: -h * 0.20, oy: splitY - h * 0.28, rx: h * 0.28 * leafScale, ry: h * 0.22 * leafScale, tier: 2 },
    { ox:  h * 0.22, oy: splitY - h * 0.30, rx: h * 0.27 * leafScale, ry: h * 0.22 * leafScale, tier: 2 },
    { ox: -h * 0.06, oy: splitY - h * 0.24, rx: h * 0.30 * leafScale, ry: h * 0.23 * leafScale, tier: 2 },
    // Lapisan Puncak (Emergent Crown Dome)
    { ox: -h * 0.10, oy: splitY - h * 0.40, rx: h * 0.22 * leafScale, ry: h * 0.18 * leafScale, tier: 3 },
    { ox:  h * 0.12, oy: splitY - h * 0.42, rx: h * 0.21 * leafScale, ry: h * 0.18 * leafScale, tier: 3 },
    { ox:  0,        oy: splitY - h * 0.48, rx: h * 0.25 * leafScale, ry: h * 0.20 * leafScale, tier: 3 }
  ];

  // Render Setiap Rumpun Kanopi
  lobes.forEach((lb, i) => {
    // Saat meranggas tinggi, rumpun bawah rontok lebih dahulu
    if (wither > 0.45 && lb.tier === 1 && i % 2 === 0) return;
    if (wither > 0.75 && lb.tier === 2 && i % 2 === 1) return;

    const swayFrac = (lb.tier / 3);
    const px = x + lb.ox + swayAmount * swayFrac;
    const py = lb.oy;

    // A. Bayangan Dasar Rumpun (Undercanopy Shade)
    c.beginPath();
    c.ellipse(px, py + lb.ry * 0.28, lb.rx * 0.95, lb.ry * 0.88, 0, 0, Math.PI * 2);
    c.fillStyle = activeDkCol;
    c.fill();

    // B. Badan Rumpun Hijau Rimba (Mid-tone Volume)
    c.beginPath();
    c.ellipse(px, py, lb.rx, lb.ry, 0, 0, Math.PI * 2);
    c.fillStyle = activeFoliageCol;
    c.fill();

    // C. Sorotan Cahaya Pucuk Muda Atas (Sunlight Top Highlight)
    const hiRx = lb.rx * 0.72;
    const hiRy = lb.ry * 0.58;
    c.beginPath();
    c.ellipse(px - lb.rx * 0.12, py - lb.ry * 0.28, hiRx, hiRy, 0, 0, Math.PI * 2);
    c.fillStyle = activeLtCol;
    c.fill();

    // D. Bintik Dedaunan Mikro (Foliage Dapples) — Pada Foreground Tree
    if (!isBg && wither < 0.6) {
      c.fillStyle = dappleCol;
      const dappleSeed = seed * 13 + i * 7;
      const numDapples = 3;
      for (let d = 0; d < numDapples; d++) {
        const dpx = px - lb.rx * 0.35 + pr(dappleSeed + d) * lb.rx * 0.7;
        const dpy = py - lb.ry * 0.5 + pr(dappleSeed + d * 3) * lb.ry * 0.45;
        const dr = Math.max(1.2, h * 0.016 * (0.8 + pr(dappleSeed + d * 5) * 0.5));
        c.beginPath();
        c.arc(dpx, dpy, dr, 0, Math.PI * 2);
        c.fill();
      }
    }
  });

  // 8. PERSPEKTIF ATMOSFERIK (Aerial Haze) — Khusus Latar Belakang
  if (isBg) {
    c.fillStyle = 'rgba(174, 227, 245, 0.16)';
    c.beginPath();
    c.ellipse(x + swayAmount * 0.5, splitY - h * 0.28, h * 0.38, h * 0.32, 0, 0, Math.PI * 2);
    c.fill();
  }

  c.restore();
}
/* Bukit bergulir: siluet kurva halus (puncak membulat, bukan lancip),
   isi gradasi vertikal, bintik vegetasi statis, kabut kaki bukit.
   Signature sama — 7 pemanggil di backgrounds.js tak perlu diubah. */
function texRidge(c,pts,col,seed){
 let mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;
 pts.forEach(p=>{mnx=Math.min(mnx,p[0]);mxx=Math.max(mxx,p[0]);mny=Math.min(mny,p[1]);mxy=Math.max(mxy,p[1]);});
 function ridgeTop(){c.beginPath();c.moveTo(pts[0][0],pts[0][1]);
  for(let i=1;i<pts.length-1;i++){const mx=(pts[i][0]+pts[i+1][0])/2,my=(pts[i][1]+pts[i+1][1])/2;
   c.quadraticCurveTo(pts[i][0],pts[i][1]-6,mx,my);}
  c.lineTo(pts[pts.length-1][0],pts[pts.length-1][1]);}
 function ridgeFull(){ridgeTop();c.lineTo(pts[0][0],pts[0][1]);c.closePath();}
 // isi: terang di puncak -> gelap di kaki
 ridgeFull();c.fillStyle=LG(c,0,mny,0,mxy,mixc(col,'#ffffff',.22),mixc(col,'#1e4028',.35));c.fill();
 c.save();ridgeFull();c.clip();
 const dk=mixc(col,'#1e4028',.4),lt=mixc(col,'#ffffff',.35),veg=mixc(col,'#14301c',.35);
 // kontur lereng lembut
 c.strokeStyle=dk;c.lineCap='round';
 for(let k=0;k<5;k++){const px=mnx+(k+.5)*(mxx-mnx)/5+(pr(seed+k)-.5)*60;
  c.lineWidth=5+pr(seed+k*3)*7;c.beginPath();c.moveTo(px,mny+6);
  c.quadraticCurveTo(px+(pr(seed+k*7)-.5)*80,(mny+mxy)/2,px+(pr(seed+k*11)-.5)*140,mxy);c.stroke();}
 // bintik vegetasi statis (deterministik, tidak flicker)
 for(let k=0;k<26;k++){const tx=mnx+pr(seed+200+k*1.3)*(mxx-mnx),ty=mny+pr(seed+260+k*1.7)*(mxy-mny);
  const r=1.5+pr(seed+300+k)*2.5;
  c.fillStyle=k%2?'rgba(20,60,25,.35)':'rgba(255,255,255,.28)';
  c.beginPath();c.arc(tx,ty,r,0,7);c.fill();}
 // pepohonan segitiga
 for(let k=0;k<10;k++){const tx=mnx+20+pr(seed+50+k)*(mxx-mnx-40),ty=mny+(mxy-mny)*(.3+.7*pr(seed+90+k));
  const s=2+pr(seed+130+k)*3.5;
  F(c,[[tx-s,ty],[tx+s,ty],[tx,ty-s*1.6]],k%3?veg:lt);}
 // kabut tipis di kaki bukit
 const mg=c.createLinearGradient(0,mxy-46,0,mxy);
 mg.addColorStop(0,'rgba(255,255,255,0)');mg.addColorStop(1,'rgba(255,255,255,.20)');
 c.fillStyle=mg;c.fillRect(mnx,mxy-46,mxx-mnx,46);
 c.restore();
 // sorotan tepi mengikuti kurva
 c.strokeStyle=lt;c.lineWidth=4;c.lineCap='round';ridgeTop();c.stroke();}
/* ================= TEKSTUR TANAH SAWAH BERUNDAK & ALIRAN ALUVIAL =================
   - Pematang berundak (terrace bunds/galengan) dengan lengkungan alami
   - Lumpur sawah aluvial kaya hara (alluvial silt) & butiran mineral tanah basah
   - Kilau genangan air di sela lumpur (water specular sheen)
   - Sistem retakan tanah kemarau poligonal organik saat S.water < 32
   - Respon tanah tercemar pestisida saat S.poison > 20
*/
function texSoilSawah(c, t, S) {
  S = S || {};
  const isDrought = S.water !== undefined && S.water < 32;
  const droughtSeverity = isDrought ? (32 - S.water) / 32 : 0;
  const isPoisoned = S.poison !== undefined && S.poison > 20;

  c.save();
  // Area tanah sawah di-clip pada poligon sawah: [[0,1080],[380,420],[1560,420],[1920,1080]]
  c.beginPath();
  c.moveTo(0, 1080);
  c.lineTo(380, 420);
  c.lineTo(1560, 420);
  c.lineTo(1920, 1080);
  c.closePath();
  c.clip();

  // 1. BUTIRAN PARTIKEL LUMPUR & SEDIMEN TANAH
  for (let k = 0; k < 42; k++) {
    const px = 200 + pr(k * 7.1) * 1520;
    const py = 450 + pr(k * 13.3) * 580;
    const r = 2 + pr(k * 3.7) * 4.5;
    const col = k % 2 === 0 ? 'rgba(75, 48, 22, 0.28)' : 'rgba(125, 90, 45, 0.22)';
    c.fillStyle = isPoisoned ? 'rgba(80, 70, 95, 0.3)' : col;
    c.beginPath();
    c.arc(px, py, r, 0, Math.PI * 2);
    c.fill();
  }

  // 2. PEMATANG SAWAH BERUNDAK (Terraced Mud Bunds / Galengan)
  const bundTiers = [
    { y: 590, wL: 320, wR: 1600, thick: 5.5, shade: 'rgba(55, 38, 18, 0.45)', grass: 'rgba(92, 138, 52, 0.6)' },
    { y: 760, wL: 220, wR: 1700, thick: 7.0, shade: 'rgba(50, 34, 16, 0.50)', grass: 'rgba(84, 128, 46, 0.65)' },
    { y: 940, wL: 100, wR: 1820, thick: 8.5, shade: 'rgba(45, 30, 14, 0.55)', grass: 'rgba(76, 118, 40, 0.7)' }
  ];

  bundTiers.forEach((b, idx) => {
    // Bayangan sisi bawah galengan pematang
    c.strokeStyle = b.shade;
    c.lineWidth = b.thick;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(b.wL, b.y);
    c.quadraticCurveTo(960, b.y + 22, b.wR, b.y);
    c.stroke();

    // Sisi atas pematang (tumbuh rumput/lumut galengan)
    c.strokeStyle = isDrought ? 'rgba(140, 115, 65, 0.5)' : b.grass;
    c.lineWidth = b.thick * 0.55;
    c.beginPath();
    c.moveTo(b.wL, b.y - b.thick * 0.35);
    c.quadraticCurveTo(960, b.y + 22 - b.thick * 0.35, b.wR, b.y - b.thick * 0.35);
    c.stroke();

    // Rumpun rumput kecil di sepanjang pematang
    const numTufts = 8;
    for (let j = 0; j < numTufts; j++) {
      const tx = b.wL + 80 + (j + pr(idx * 17 + j)) * ((b.wR - b.wL - 160) / numTufts);
      const ty = b.y + Math.sin((tx - 960) / 400) * 10;
      c.strokeStyle = isDrought ? '#8c7642' : '#5a9638';
      c.lineWidth = 1.8;
      c.beginPath();
      c.moveTo(tx, ty);
      c.lineTo(tx - 4, ty - 8 - pr(j * 3) * 5);
      c.moveTo(tx, ty);
      c.lineTo(tx + 4, ty - 9 - pr(j * 5) * 5);
      c.stroke();
    }
  });

  // 3. RETAKAN KEMARAU POLIGONAL ORGANIK (Drought Clay Fissures) saat S.water < 32
  if (isDrought) {
    const crackAlpha = Math.min(0.9, 0.4 + droughtSeverity * 0.5);
    c.strokeStyle = 'rgba(42, 26, 12, ' + crackAlpha + ')';
    c.lineWidth = 2.2 + droughtSeverity * 2.0;
    c.lineCap = 'round';
    c.lineJoin = 'round';

    const fissureCenters = [
      { x: 520, y: 550, s: 70 },
      { x: 960, y: 530, s: 85 },
      { x: 1400, y: 560, s: 75 },
      { x: 420, y: 710, s: 95 },
      { x: 820, y: 720, s: 110 },
      { x: 1220, y: 690, s: 105 },
      { x: 1560, y: 730, s: 90 },
      { x: 340, y: 910, s: 125 },
      { x: 740, y: 920, s: 140 },
      { x: 1180, y: 930, s: 135 },
      { x: 1620, y: 900, s: 120 }
    ];

    fissureCenters.forEach((fc, fi) => {
      const numBranches = 5;
      for (let b = 0; b < numBranches; b++) {
        const ang = (b / numBranches) * Math.PI * 2 + pr(fi * 11 + b) * 0.6;
        const len = fc.s * (0.6 + pr(fi * 7 + b * 3) * 0.6) * droughtSeverity;
        const x1 = fc.x + Math.cos(ang) * (len * 0.45);
        const y1 = fc.y + Math.sin(ang) * (len * 0.45);
        const x2 = fc.x + Math.cos(ang + (pr(b * 5) - 0.5) * 0.5) * len;
        const y2 = fc.y + Math.sin(ang + (pr(b * 5) - 0.5) * 0.5) * len;

        c.beginPath();
        c.moveTo(fc.x, fc.y);
        c.lineTo(x1, y1);
        c.lineTo(x2, y2);
        c.stroke();

        if (droughtSeverity > 0.4 && b % 2 === 0) {
          const x3 = x1 + Math.cos(ang + 0.8) * (len * 0.4);
          const y3 = y1 + Math.sin(ang + 0.8) * (len * 0.4);
          c.lineWidth = Math.max(1.2, (2.2 + droughtSeverity * 2.0) * 0.6);
          c.beginPath();
          c.moveTo(x1, y1);
          c.lineTo(x3, y3);
          c.stroke();
          c.lineWidth = 2.2 + droughtSeverity * 2.0;
        }
      }
    });

    c.fillStyle = 'rgba(180, 140, 85, ' + (droughtSeverity * 0.28).toFixed(3) + ')';
    c.fillRect(0, 420, 1920, 660);
  }

  // 4. EFEK CEMAR PESTISIDA KIMIAWI (Toxic Soil Discoloration)
  if (isPoisoned) {
    const pAlpha = Math.min(0.45, (S.poison - 20) / 100);
    c.fillStyle = 'rgba(95, 65, 120, ' + pAlpha.toFixed(3) + ')';
    for (let k = 0; k < 6; k++) {
      const cx = 350 + pr(k * 23) * 1200;
      const cy = 520 + pr(k * 31) * 450;
      c.beginPath();
      c.ellipse(cx, cy, 140 + pr(k) * 100, 40 + pr(k * 2) * 30, 0, 0, Math.PI * 2);
      c.fill();
    }
  }

  c.restore();
}

function texField(c, t, S) {
  texSoilSawah(c, t, S);
}

/* ================= TEKSTUR LANTAI HUTAN RIMBA & HUMUS =================
   - Tanah humus subur gelap bergradasi organik
   - Bantalan lumut beludru tebal (moist moss pads)
   - Serasah dedaunan gugur (leaf litter), ranting & detritus alami
   - Respon kebakaran rimba: tanah hangus berabu (ash & scorched ground) saat S.api > 0
   - Respon pembalakan liar: tanah lereng terkikis gundul saat krisis
*/
function texSoilHutan(c, t, S) {
  S = S || {};
  const isFire = S.api !== undefined && S.api > 10;
  const fireSeverity = isFire ? Math.min(1.0, S.api / 70) : 0;

  c.save();

  // 1. DASAR TANAH HUTAN BERGRADASI ORGANIK
  const forestFloorGrad = c.createLinearGradient(0, 470, 0, 1080);
  if (isFire) {
    forestFloorGrad.addColorStop(0, mixc('#3a4a35', '#26201b', fireSeverity));
    forestFloorGrad.addColorStop(0.5, mixc('#30442c', '#1c1714', fireSeverity));
    forestFloorGrad.addColorStop(1, mixc('#243320', '#14100d', fireSeverity));
  } else {
    forestFloorGrad.addColorStop(0, '#46724a');
    forestFloorGrad.addColorStop(0.4, '#385e3a');
    forestFloorGrad.addColorStop(1, '#254026');
  }

  F(c, [[0, 1080], [300, 470], [1650, 470], [1920, 1080]], forestFloorGrad);

  // Batas Clip ke dalam poligon lantai hutan
  c.beginPath();
  c.moveTo(0, 1080);
  c.lineTo(300, 470);
  c.lineTo(1650, 470);
  c.lineTo(1920, 1080);
  c.closePath();
  c.clip();

  // 2. KONTUR LERENG TANAH & HUMUS GELAP
  c.fillStyle = isFire ? 'rgba(15, 12, 10, 0.45)' : 'rgba(25, 42, 22, 0.35)';
  for (let i = 0; i < 5; i++) {
    const yWave = 520 + i * 115;
    c.beginPath();
    c.moveTo(0, yWave + 30);
    c.bezierCurveTo(450, yWave - 20, 1200, yWave + 45, 1920, yWave);
    c.lineTo(1920, 1080);
    c.lineTo(0, 1080);
    c.closePath();
    c.fill();
  }

  // 3. BANTALAN LUMUT BELUDRU HIJAU (Velvety Moist Moss Pads)
  if (!isFire || fireSeverity < 0.6) {
    const mossAlpha = isFire ? (1 - fireSeverity) * 0.8 : 0.85;
    const mossPads = [
      { x: 380, y: 580, rx: 110, ry: 35 },
      { x: 820, y: 530, rx: 140, ry: 40 },
      { x: 1380, y: 570, rx: 120, ry: 38 },
      { x: 260, y: 780, rx: 180, ry: 50 },
      { x: 740, y: 740, rx: 210, ry: 58 },
      { x: 1240, y: 760, rx: 195, ry: 54 },
      { x: 1680, y: 810, rx: 170, ry: 48 },
      { x: 500, y: 960, rx: 260, ry: 70 },
      { x: 1100, y: 980, rx: 280, ry: 75 },
      { x: 1650, y: 970, rx: 230, ry: 65 }
    ];

    mossPads.forEach(mp => {
      c.fillStyle = 'rgba(28, 56, 26, ' + (0.45 * mossAlpha) + ')';
      c.beginPath();
      c.ellipse(mp.x, mp.y + 4, mp.rx, mp.ry, 0, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = 'rgba(64, 115, 48, ' + (0.65 * mossAlpha) + ')';
      c.beginPath();
      c.ellipse(mp.x, mp.y, mp.rx * 0.9, mp.ry * 0.85, 0, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = 'rgba(112, 178, 74, ' + (0.45 * mossAlpha) + ')';
      c.beginPath();
      c.ellipse(mp.x - mp.rx * 0.1, mp.y - mp.ry * 0.25, mp.rx * 0.65, mp.ry * 0.5, 0, 0, Math.PI * 2);
      c.fill();
    });
  }

  // 4. SERASAH DEDAUNAN GUGUR & RANTING (Leaf Litter & Organic Detritus)
  const leafColors = isFire
    ? ['#382f28', '#2d241d', '#4a3d34', '#1f1915']
    : ['#8c5e32', '#a87539', '#6e4522', '#523419', '#7a8542'];

  for (let k = 0; k < 38; k++) {
    const lx = 180 + pr(k * 19.3) * 1560;
    const ly = 500 + pr(k * 29.7) * 530;
    const lSize = 4.5 + pr(k * 7.1) * 8.5;
    const lAng = pr(k * 11.9) * Math.PI * 2;
    const lCol = leafColors[k % leafColors.length];

    c.save();
    c.translate(lx, ly);
    c.rotate(lAng);

    c.fillStyle = 'rgba(10, 18, 12, 0.35)';
    c.beginPath();
    c.ellipse(1, 1.5, lSize, lSize * 0.45, 0, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = lCol;
    c.beginPath();
    c.ellipse(0, 0, lSize, lSize * 0.45, 0, 0, Math.PI * 2);
    c.fill();

    c.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(-lSize * 0.8, 0);
    c.lineTo(lSize * 0.8, 0);
    c.stroke();

    c.restore();
  }

  // Ranting-ranting kecil berserakan
  c.strokeStyle = isFire ? '#332922' : '#4f351e';
  c.lineWidth = 2.2;
  c.lineCap = 'round';
  for (let k = 0; k < 12; k++) {
    const rx = 240 + pr(k * 31.7) * 1440;
    const ry = 530 + pr(k * 43.1) * 500;
    const rLen = 14 + pr(k * 5.3) * 22;
    const rAng = pr(k * 17.1) * Math.PI;

    c.beginPath();
    c.moveTo(rx, ry);
    c.lineTo(rx + Math.cos(rAng) * rLen, ry + Math.sin(rAng) * rLen);
    c.lineTo(rx + Math.cos(rAng + 0.4) * (rLen * 1.3), ry + Math.sin(rAng + 0.4) * (rLen * 1.3));
    c.stroke();
  }

  // 5. RESPON KEBAKARAN HUTAN (Charcoal, Ash & Embers) saat S.api > 10
  if (isFire) {
    c.fillStyle = 'rgba(20, 15, 12, ' + (fireSeverity * 0.65).toFixed(3) + ')';
    for (let k = 0; k < 10; k++) {
      const ax = 300 + pr(k * 13.7) * 1320;
      const ay = 520 + pr(k * 21.1) * 480;
      c.beginPath();
      c.ellipse(ax, ay, 90 + pr(k) * 80, 35 + pr(k * 2) * 25, 0, 0, Math.PI * 2);
      c.fill();
    }

    c.fillStyle = 'rgba(150, 145, 140, ' + (fireSeverity * 0.35).toFixed(3) + ')';
    for (let k = 0; k < 14; k++) {
      const ax = 200 + pr(k * 37.3) * 1520;
      const ay = 500 + pr(k * 19.9) * 520;
      c.beginPath();
      c.arc(ax, ay, 12 + pr(k) * 20, 0, Math.PI * 2);
      c.fill();
    }

    for (let k = 0; k < 10; k++) {
      const ex = 250 + pr(k * 47) * 1420;
      const ey = 550 + pr(k * 59) * 450;
      const pulse = Math.abs(Math.sin(t / 400 + k * 1.5));
      c.fillStyle = 'rgba(255, 120, 30, ' + (pulse * fireSeverity * 0.85).toFixed(3) + ')';
      c.beginPath();
      c.arc(ex, ey, 2 + pulse * 2.5, 0, Math.PI * 2);
      c.fill();
    }
  }

  c.restore();
}

/* ================= TEKSTUR BANTARAN SUNGAI & KERIKIL ENDAPAN =================
   - Bantaran atas (upper bank) & bantaran bawah (lower bank) dengan lereng tanah
   - Garis lumpur basah pasang-surut di bibir aliran air (wet mud waterline)
   - Kelompok bebatuan kerikil bulat halus (riverbed pebbles & granite stones)
   - Sedimen lumpur halus & lumut basah tepi air
*/
function texSoilSungai(c, t, S) {
  S = S || {};
  const isPoisoned = S.poison !== undefined && S.poison > 15;

  c.save();

  // 1. BANTARAN ATAS (Upper Bank: y = 340 to 470, height 130px)
  const upGrad = c.createLinearGradient(0, 340, 0, 470);
  upGrad.addColorStop(0, '#5d9455');
  upGrad.addColorStop(0.65, '#4a7d43');
  upGrad.addColorStop(1, '#3a5932');
  c.fillStyle = upGrad;
  c.fillRect(0, 340, 1920, 130);

  // Garis lumpur basah bibir sungai atas
  c.fillStyle = 'rgba(32, 24, 15, 0.45)';
  c.fillRect(0, 462, 1920, 8);
  c.fillStyle = 'rgba(255, 255, 255, 0.18)';
  c.fillRect(0, 468, 1920, 2);

  // 2. BANTARAN BAWAH (Lower Bank: y = 810 to 1080, height 270px)
  const lowGrad = c.createLinearGradient(0, 810, 0, 1080);
  lowGrad.addColorStop(0, '#2e452a');
  lowGrad.addColorStop(0.12, '#3c6239');
  lowGrad.addColorStop(0.5, '#4c7a50');
  lowGrad.addColorStop(1, '#3b613e');
  c.fillStyle = lowGrad;
  c.fillRect(0, 810, 1920, 270);

  // Garis lumpur basah bibir sungai bawah
  c.fillStyle = 'rgba(28, 20, 12, 0.55)';
  c.fillRect(0, 810, 1920, 10);
  c.fillStyle = 'rgba(255, 255, 255, 0.22)';
  c.fillRect(0, 810, 1920, 2.5);

  // 3. BEBATUAN KERIKIL SUNGAI HALUS (Riverbed Pebbles & Granite Stones)
  const pebblesUpper = [
    { x: 180, y: 464, r: 5.5, col: '#7a766f' },
    { x: 194, y: 466, r: 4.0, col: '#9c978f' },
    { x: 520, y: 465, r: 6.5, col: '#6b6660' },
    { x: 536, y: 467, r: 4.5, col: '#8a857d' },
    { x: 910, y: 464, r: 7.0, col: '#5c5852' },
    { x: 928, y: 466, r: 5.0, col: '#969086' },
    { x: 1340, y: 465, r: 6.0, col: '#7d7870' },
    { x: 1358, y: 467, r: 4.2, col: '#a39d93' },
    { x: 1720, y: 464, r: 5.8, col: '#69645e' }
  ];

  pebblesUpper.forEach(p => {
    c.fillStyle = 'rgba(15, 20, 16, 0.5)';
    c.beginPath();
    c.ellipse(p.x, p.y + 1.5, p.r * 1.1, p.r * 0.6, 0, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = p.col;
    c.beginPath();
    c.ellipse(p.x, p.y, p.r, p.r * 0.7, 0, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = 'rgba(255, 255, 255, 0.35)';
    c.beginPath();
    c.ellipse(p.x - p.r * 0.25, p.y - p.r * 0.25, p.r * 0.45, p.r * 0.3, 0, 0, Math.PI * 2);
    c.fill();
  });

  for (let k = 0; k < 22; k++) {
    const px = 100 + pr(k * 23.3) * 1720;
    const py = 818 + pr(k * 17.7) * 45;
    const prx = 5 + pr(k * 7.1) * 9.5;
    const pry = prx * (0.6 + pr(k * 3.3) * 0.25);
    const pCols = ['#6e6a64', '#8a857d', '#5a554f', '#9e9990', '#7d7468'];
    const pCol = pCols[k % pCols.length];

    c.fillStyle = 'rgba(12, 18, 14, 0.45)';
    c.beginPath();
    c.ellipse(px + 1, py + pry * 0.35, prx * 1.1, pry * 0.7, 0, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = pCol;
    c.beginPath();
    c.ellipse(px, py, prx, pry, 0, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = 'rgba(255, 255, 255, 0.28)';
    c.beginPath();
    c.ellipse(px - prx * 0.25, py - pry * 0.25, prx * 0.4, pry * 0.35, 0, 0, Math.PI * 2);
    c.fill();
  }

  // 4. BERCAT LUMUT BASAH & RUMPUT TEPI AIR
  for (let k = 0; k < 12; k++) {
    const mx = 120 + pr(k * 37.1) * 1680;
    const my = 824 + pr(k * 19.3) * 35;
    c.fillStyle = 'rgba(54, 102, 42, 0.55)';
    c.beginPath();
    c.ellipse(mx, my, 18 + pr(k) * 16, 7 + pr(k * 2) * 5, 0, 0, Math.PI * 2);
    c.fill();
  }

  // 5. RESPON PENCEMARAN LIMBAH DETERGEN (S.poison > 15)
  if (isPoisoned) {
    const poisonAlpha = Math.min(0.55, (S.poison - 15) / 80);
    c.fillStyle = 'rgba(110, 80, 140, ' + poisonAlpha.toFixed(3) + ')';
    c.fillRect(0, 460, 1920, 14);
    c.fillRect(0, 808, 1920, 16);
  }

  c.restore();
}
function spDeer(c,x,y,t){c.save();c.translate(x,y);const b=Math.sin(t/700)*1.5;
 SH(c,0,2,26);
 c.lineCap='round';
 c.strokeStyle='#6e4f30';c.lineWidth=4.5;
 [[-10,-16,-10,0],[10,-16,10,0],[-4,-16,-6,0],[4,-16,6,0]].forEach(l=>{c.beginPath();c.moveTo(l[0],l[1]+b);c.lineTo(l[2],l[3]);c.stroke();});
 c.strokeStyle='#3a2812';c.lineWidth=4.5;[[-10,0],[10,0],[-6,0],[6,0]].forEach(p=>{c.beginPath();c.moveTo(p[0]-2.4,p[1]-3);c.lineTo(p[0]+2.4,p[1]-3);c.stroke();});
 OG(c,0,-26,20,12,LG(c,0,-38,0,-14,'#d09a68','#8a5f36'));
 O(c,-8,-22,7,8,'rgba(240,220,190,.55)');
 CIRC(c,-12,-28,1.8,'rgba(255,250,235,.8)');CIRC(c,-4,-31,1.5,'rgba(255,250,235,.8)');CIRC(c,4,-27,1.8,'rgba(255,250,235,.8)');
 c.strokeStyle='#b98a5f';c.lineWidth=7;c.beginPath();c.moveTo(14,-32);c.quadraticCurveTo(22,-48,20,-58);c.stroke();
 c.strokeStyle='#8a5f36';c.lineWidth=2;c.beginPath();c.moveTo(15,-36);c.quadraticCurveTo(21,-48,20,-56);c.stroke();
 OG(c,20,-60,7.5,6,RG(c,20,-62,8,'#d09a68','#9a6a3e'));
 O(c,14,-60,3,4,'#e8c898');
 EB(c,22,-61,2.2,.6,0);
 CIRC(c,27,-58,1.6,'#3a2812');
 c.strokeStyle='#7a5a35';c.lineWidth=2.5;c.beginPath();c.moveTo(18,-66);c.lineTo(14,-76);c.moveTo(18,-66);c.lineTo(22,-78);c.moveTo(20,-70);c.lineTo(16,-80);c.stroke();c.restore();}
function spTiger(c,x,y,t){c.save();c.translate(x,y);const ts=Math.sin(t/900);
 SH(c,0,0,34);
 c.strokeStyle='#b45a15';c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(-28,-16);c.quadraticCurveTo(-52,-26+ts*4,-58,-14+ts*6);c.stroke();
 c.strokeStyle='#5a3210';c.lineWidth=3;
 for(let i=0;i<3;i++){c.beginPath();c.moveTo(-52+i*7,-24+ts*3);c.lineTo(-50+i*7,-17+ts*3);c.stroke();}
 OG(c,0,-18,30,17,LG(c,0,-35,0,-1,'#f2a93e','#c96a1a'));
 O(c,2,-10,22,9,'rgba(255,240,220,.85)');
 c.strokeStyle='#5a3210';c.lineWidth=4;
 for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*10,-31);c.quadraticCurveTo(i*10+3,-22,i*10-2,-13);c.stroke();}
 OG(c,30,-26,13,11,RG(c,30,-29,13,'#f2a93e','#d97a1f'));
 O(c,31,-19,7,5,'#fff');F(c,[[28,-21],[34,-21],[31,-16]],'#e88a8a');
 CIRC(c,24,-34,4.5,'#e6942a');CIRC(c,38,-34,4.5,'#e6942a');
 CIRC(c,24,-34,2,'#fff');CIRC(c,38,-34,2,'#fff');
 c.fillStyle='#7a4a1a';c.beginPath();c.moveTo(23,-38);c.lineTo(25,-38);c.lineTo(24,-35);c.closePath();c.fill();
 c.beginPath();c.moveTo(37,-38);c.lineTo(39,-38);c.lineTo(38,-35);c.closePath();c.fill();
 CIRC(c,27,-27,2.6,'#c97a1a');CIRC(c,27,-27,1.4,'#241c16');CIRC(c,27.8,-27.8,.7,'#fff');
 CIRC(c,35,-27,2.6,'#c97a1a');CIRC(c,35,-27,1.4,'#241c16');CIRC(c,35.8,-27.8,.7,'#fff');
 c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=1;c.beginPath();c.moveTo(38,-20);c.lineTo(46,-22);c.moveTo(38,-18);c.lineTo(46,-17);c.stroke();
 c.restore();}
function spStork(c,x,y,t){const dip=Math.max(0,Math.sin(t/2600));c.save();c.translate(x,y);
 O(c,1,27,12,3,'rgba(15,35,25,.25)');
 c.strokeStyle='#8a6a45';c.lineWidth=4;c.lineCap='round';
 c.beginPath();c.moveTo(-4,-14);c.lineTo(-4,26);c.moveTo(6,-14);c.lineTo(6,26);c.stroke();
 c.lineWidth=3;c.beginPath();c.moveTo(-4,26);c.lineTo(-9,28);c.moveTo(-4,26);c.lineTo(1,28);c.moveTo(6,26);c.lineTo(1,28);c.moveTo(6,26);c.lineTo(11,28);c.stroke();
 OG(c,0,-24,20,13,LG(c,0,-37,0,-11,'#ffffff','#cfc4ae'));
 O(c,-2,-20,12,8,'rgba(210,200,180,.5)');
 c.strokeStyle='rgba(140,125,105,.8)';c.lineWidth=2;
 for(let i=0;i<3;i++){c.beginPath();c.moveTo(-14+i*7,-26);c.quadraticCurveTo(-10+i*7,-18,-4+i*7,-16);c.stroke();}
 O(c,-16,-20,8,7,'#e2dbcc');
 const hx=14-dip*2,hy=-58+dip*46;
 c.strokeStyle='#efe8da';c.lineWidth=9;c.beginPath();c.moveTo(12,-26);c.quadraticCurveTo(20,-46,hx,hy);c.stroke();
 c.strokeStyle='rgba(160,145,125,.6)';c.lineWidth=2;c.beginPath();c.moveTo(13,-30);c.quadraticCurveTo(19,-44,hx-1,hy-4);c.stroke();
 CG(c,hx,hy,8,LG(c,hx-8,hy-8,hx+8,hy+8,'#ffffff','#d8cdb8'));
 F(c,[[hx+6,hy-3],[hx+22,hy+2],[hx+6,hy+5]],'#e8a13a');
 F(c,[[hx+6,hy+2],[hx+18,hy+3],[hx+6,hy+5]],'#c97a2a');
 EB(c,hx+1,hy-2,2.2,.5,0);
 c.strokeStyle='#8a6a45';c.lineWidth=2;c.beginPath();c.moveTo(hx-6,hy-8);c.quadraticCurveTo(hx-12,hy-14,hx-16,hy-13);c.stroke();
 c.restore();}
function spFish(c,x,y,t,s,col,dir){c.save();c.translate(x,y);c.scale(dir*s,s);
 const w=Math.sin(t/130+x*.1)*4;
 F(c,[[-9,0],[-20,-7+w],[-20,7+w]],mixc(col,'#1a3a4a',.3));
 F(c,[[-10,-1],[-18,-6+w],[-18,5+w]],mixc(col,'#ffffff',.25));
 OG(c,0,0,12,7,LG(c,0,-7,0,7,mixc(col,'#ffffff',.15),mixc(col,'#0a2530',.45)));
 c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1.2;
 for(let i=-1;i<=1;i++){c.beginPath();c.arc(-2+i*5,-1,4,.3*Math.PI,.85*Math.PI);c.stroke();}
 c.strokeStyle='rgba(10,40,55,.5)';c.lineWidth=1.5;c.beginPath();c.arc(3,0,5,-.6,.6);c.stroke();
 F(c,[[-2,-7],[2,-12],[5,-7]],mixc(col,'#1a3a4a',.25));
 EB(c,6,-2,2.4,.5,0);
 c.restore();}
function spShark(c,x,y,t,s){c.save();c.translate(x,y+Math.sin(t/1100)*8);c.scale(s,s);
 O(c,0,20,44,5,'rgba(10,30,40,.25)');
 F(c,[[-46,0],[-74,-18],[-70,0],[-74,18]],'#47616f');
 F(c,[[-48,-1],[-70,-14],[-68,-1]],'#7a99a8');
 OG(c,0,0,50,18,LG(c,0,-18,0,18,'#7a99a8','#cfdde2'));
 O(c,6,8,34,7,'rgba(230,240,243,.8)');
 F(c,[[-6,-16],[10,-34],[22,-14]],'#47616f');
 F(c,[[-2,-17],[10,-30],[20,-15]],'#7a99a8');
 c.strokeStyle='rgba(30,50,60,.6)';c.lineWidth=2;
 for(let i=0;i<3;i++){c.beginPath();c.moveTo(-2-i*7,-8);c.quadraticCurveTo(-4-i*7,0,-2-i*7,7);c.stroke();}
 OG(c,34,-4,12,7,LG(c,34,-11,34,3,'#8aa5b2','#d7e4e9'));
 c.strokeStyle='#47616f';c.lineWidth=1.5;c.beginPath();c.moveTo(28,1);c.quadraticCurveTo(36,3,44,0);c.stroke();
 F(c,[[30,1],[33,5],[36,1],[39,5],[42,1]],'#fff');
 EB(c,40,-6,2.6,.6,0);
 F(c,[[-14,10],[6,26],[18,12]],'#47616f');c.restore();}
function spTurtle(c,x,y,t){c.save();c.translate(x,y);const p=Math.sin(t/500)*.5;
 O(c,0,15,28,5,'rgba(15,35,25,.25)');
 OG(c,-20,-10+p*4,8,4,LG(c,-20,-14,-20,-6,'#8fc47a','#4c8a5a'));
 OG(c,-20,10-p*4,8,4,LG(c,-20,6,-20,14,'#8fc47a','#4c8a5a'));
 OG(c,14,12,7,4,LG(c,14,8,14,16,'#8fc47a','#4c8a5a'));
 OG(c,0,0,26,16,RG(c,-4,-5,28,'#6faf62','#2e5a3a'));
 c.strokeStyle='#24482e';c.lineWidth=2.5;c.beginPath();c.ellipse(0,0,26,16,0,0,7);c.stroke();
 c.lineWidth=2;c.beginPath();c.ellipse(0,0,16,9.5,0,0,7);c.stroke();
 c.beginPath();c.moveTo(0,-9.5);c.lineTo(0,9.5);c.moveTo(-16,0);c.lineTo(16,0);c.stroke();
 CIRC(c,-8,-4,1.5,'rgba(220,240,200,.7)');CIRC(c,9,3,1.5,'rgba(220,240,200,.7)');
 OG(c,26,-4,8,6,LG(c,26,-10,26,2,'#8fc47a','#558f60'));
 EB(c,29,-6,2.2,.5,0);
 c.strokeStyle='#24482e';c.lineWidth=1.5;c.beginPath();c.arc(30,-2,3.5,.15*Math.PI,.85*Math.PI);c.stroke();
 c.restore();}
function spCoral(c,x,y,s,col,seed,bl){const col2=mixc(col,'#e8e4d8',bl);
 c.strokeStyle=col2;c.lineCap='round';const arms=3+Math.floor(pr(seed)*3);
 for(let i=0;i<arms;i++){const a=-Math.PI/2+(i-(arms-1)/2)*.5,ln=(30+pr(seed+i)*26)*s;
  c.lineWidth=9*s;c.strokeStyle=mixc(col2,'#5a3a2a',.25);c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+Math.cos(a)*ln*.5,y+Math.sin(a)*ln*.8,x+Math.cos(a)*ln,y+Math.sin(a)*ln);c.stroke();
  c.lineWidth=6*s;c.strokeStyle=col2;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+Math.cos(a)*ln*.5,y+Math.sin(a)*ln*.8,x+Math.cos(a)*ln,y+Math.sin(a)*ln);c.stroke();
  CIRC(c,x+Math.cos(a)*ln,y+Math.sin(a)*ln,6.5*s,col2);
  CIRC(c,x+Math.cos(a)*ln-2*s,y+Math.sin(a)*ln-2*s,2.4*s,mixc(col,'#ffffff',.5*(1-bl)));}
 O(c,x,y+3,10*s,5*s,mixc('#b06a4a','#d8d4c8',bl));
 CIRC(c,x-3*s,y+1,2.5*s,'rgba(255,255,255,.35)');}
function spFan(c,x,y,s,col,bl){const col2=mixc(col,'#e8e4d8',bl);c.strokeStyle=col2;c.lineWidth=4*s;
 for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.32;c.beginPath();c.moveTo(x,y);
  c.quadraticCurveTo(x+Math.cos(a)*20*s,y+Math.sin(a)*20*s,x+Math.cos(a)*34*s,y+Math.sin(a)*34*s);c.stroke();}
 c.lineWidth=3*s;c.strokeStyle=mixc(col2,'#ffffff',.3);c.beginPath();c.arc(x,y,30*s,-Math.PI*.95,-Math.PI*.05);c.stroke();
 c.strokeStyle=col2;c.lineWidth=4*s;c.beginPath();c.arc(x,y,30*s,-Math.PI*.9,-Math.PI*.1);c.stroke();
 for(let i=0;i<5;i++){const a=-Math.PI*(.9-i*.2);CIRC(c,x+Math.cos(a)*30*s,y+Math.sin(a)*30*s,2.6*s,mixc(col,'#ffffff',.4));}}
function spBag(c,x,y,t){c.save();c.translate(x,y+Math.sin(t/800+x)*4);
 c.fillStyle='rgba(235,235,235,.85)';c.beginPath();c.moveTo(-10,-8);c.quadraticCurveTo(-14,4,-8,8);
 c.quadraticCurveTo(0,12,8,8);c.quadraticCurveTo(14,4,10,-8);c.quadraticCurveTo(6,-14,3,-8);
 c.quadraticCurveTo(0,-12,-3,-8);c.quadraticCurveTo(-6,-14,-10,-8);c.fill();c.restore();}
function gulmaPatch(c,x,y,s,t){c.save();c.translate(x+Math.sin(t/1700+x)*6,y);
 for(let i=0;i<5;i++){O(c,(i-2)*16*s,(pr(i+x)*14-7)*s,15*s,9*s,i%2?'#3f8a4a':'#57a54a');
  c.strokeStyle='rgba(20,60,25,.5)';c.lineWidth=1.5*s;c.beginPath();c.moveTo((i-2)*16*s-10*s,(pr(i+x)*14-7)*s);c.lineTo((i-2)*16*s+10*s,(pr(i+x)*14-7)*s);c.stroke();}
 CIRC(c,10*s,-6*s,3.5*s,'#c95f8a');CIRC(c,9*s,-7*s,1.2*s,'#f7d4e4');CIRC(c,12*s,-4*s,2*s,'#e89ac0');
 c.restore();}

/* ================= KANVAS: ADEGAN ================= */

/* ================= MASKOT TIM ================= */
function fc(c,x,y,r){CIRC(c,x,y,r,'#241c16');CIRC(c,x+r*.28,y-r*.28,r*.32,'#fff');CIRC(c,x-r*.2,y+r*.3,r*.14,'rgba(255,255,255,.5)');}
function sm(c,x,y,w){c.strokeStyle='#241c16';c.lineWidth=3.5;c.lineCap='round';c.beginPath();c.arc(x,y,w,Math.PI*.12,Math.PI*.88);c.stroke();}
function mPadi(c){c.lineCap='round';
 c.strokeStyle='#2e6b2f';c.lineWidth=10;
 c.beginPath();c.moveTo(-14,66);c.quadraticCurveTo(-46,26,-54,-14);c.stroke();
 c.beginPath();c.moveTo(14,66);c.quadraticCurveTo(46,26,54,-12);c.stroke();
 c.strokeStyle='#3f8f4a';c.lineWidth=7;
 c.beginPath();c.moveTo(-14,66);c.quadraticCurveTo(-46,26,-54,-14);c.stroke();
 c.beginPath();c.moveTo(14,66);c.quadraticCurveTo(46,26,54,-12);c.stroke();
 c.strokeStyle='#2e6b2f';c.lineWidth=1.5;
 c.beginPath();c.moveTo(-30,40);c.lineTo(-44,34);c.moveTo(30,40);c.lineTo(44,34);c.stroke();
 c.strokeStyle='#e0b73f';c.lineWidth=6;
 for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*5,68);c.quadraticCurveTo(i*15,-6,i*21,-56);c.stroke();
  for(let k=0;k<4;k++)O(c,i*21+(k%2)*4,-56+k*10,4.5,7,k%2?'#f7dc7e':'#e8bd45');}
 CIRC(c,-8,-30,2,'rgba(255,250,220,.9)');CIRC(c,30,-10,2,'rgba(255,250,220,.9)');
 fc(c,-12,8,8);fc(c,12,8,8);sm(c,0,26,10);
 c.globalAlpha=.5;CIRC(c,-24,28,7,'#f0a08c');CIRC(c,24,28,7,'#f0a08c');c.globalAlpha=1;}
function mSnake(c){c.lineCap='round';
 c.strokeStyle='#2e6b2f';c.lineWidth=27;
 c.beginPath();c.moveTo(-30,60);c.quadraticCurveTo(-58,20,-20,-6);c.quadraticCurveTo(20,26,44,-4);c.stroke();
 c.strokeStyle='#57a54a';c.lineWidth=22;
 c.beginPath();c.moveTo(-30,60);c.quadraticCurveTo(-58,20,-20,-6);c.quadraticCurveTo(20,26,44,-4);c.stroke();
 c.strokeStyle='#8fd46a';c.lineWidth=7;
 c.beginPath();c.moveTo(-30,52);c.quadraticCurveTo(-58,12,-20,-14);c.quadraticCurveTo(20,18,44,-12);c.stroke();
 c.strokeStyle='#2e6b2f';c.lineWidth=5;
 [[-38,40],[-6,8],[28,8]].forEach(p=>{c.beginPath();c.moveTo(p[0]-6,p[1]-10);c.lineTo(p[0]+6,p[1]+10);c.stroke();});
 O(c,56,-16,20,15,'#63c25c');O(c,52,-20,12,8,'rgba(220,245,200,.6)');fc(c,50,-20,6);fc(c,64,-20,6);sm(c,57,-8,7);
 c.strokeStyle=PAL.danger;c.lineWidth=3;c.beginPath();c.moveTo(70,-8);c.lineTo(84,-2);c.moveTo(84,-2);c.lineTo(90,-6);c.moveTo(84,-2);c.lineTo(90,2);c.stroke();}
function mMushroom(c){O(c,0,44,34,26,'#f2e3c8');
 O(c,0,48,24,16,'rgba(210,180,140,.6)');
 c.fillStyle=LG(c,-58,0,58,0,'#e88a4a','#c85a25');c.beginPath();c.moveTo(-58,-6);c.arc(0,-6,58,Math.PI,0);c.quadraticCurveTo(30,20,0,22);c.quadraticCurveTo(-30,20,-58,-6);c.fill();
 c.strokeStyle='#a34a22';c.lineWidth=4;c.stroke();
 c.strokeStyle='rgba(120,60,25,.5)';c.lineWidth=2.5;c.beginPath();c.moveTo(-52,-2);c.quadraticCurveTo(0,26,52,-2);c.stroke();
 CIRC(c,-30,-30,5,'#f7ecd8');CIRC(c,-24,-22,3,'#f7ecd8');CIRC(c,22,-42,4,'#f7ecd8');CIRC(c,44,-18,3.4,'#f7ecd8');CIRC(c,36,-8,2.2,'#f7ecd8');
 O(c,-26,-48,20,9,'rgba(255,255,255,.45)');
 fc(c,-11,36,6);fc(c,11,36,6);sm(c,0,48,7);
 c.globalAlpha=.5;CIRC(c,-20,52,5,'#f0a08c');CIRC(c,20,52,5,'#f0a08c');c.globalAlpha=1;}
function mEagle(c){O(c,0,14,44,40,'#8a6a4a');O(c,-8,8,26,30,'rgba(190,160,125,.6)');O(c,0,-6,30,22,'#9a7a56');
 F(c,[[-6,-6],[-64,30],[-70,52],[-10,34]],'#7a5a3a');
 c.strokeStyle='rgba(60,40,20,.5)';c.lineWidth=2.5;
 for(let i=0;i<3;i++){c.beginPath();c.moveTo(-20-i*14,8+i*10);c.quadraticCurveTo(-34-i*14,18+i*10,-44-i*12,30+i*8);c.stroke();}
 O(c,0,16,22,20,'rgba(240,225,195,.55)');
 O(c,0,-44,22,18,'#f2ede2');O(c,-6,-48,12,10,'rgba(200,185,165,.5)');F(c,[[14,-50],[34,-44],[14,-38]],'#e8a13a');F(c,[[16,-48],[30,-44],[16,-40]],'#f7c95a');
 fc(c,-8,-48,6);fc(c,8,-48,6);
 c.strokeStyle='#4a3a2a';c.lineWidth=3;c.beginPath();c.moveTo(-14,-56);c.lineTo(-2,-52);c.moveTo(14,-56);c.lineTo(2,-52);c.stroke();
 F(c,[[-8,48],[0,70],[8,48]],'#f2ede2');
 c.strokeStyle='#e8a13a';c.lineWidth=5;c.beginPath();c.moveTo(-14,52);c.lineTo(-18,64);c.moveTo(14,52);c.lineTo(18,64);c.stroke();}
function mFrog(c){O(c,0,10,58,40,'#63b34a');O(c,-10,2,34,26,'rgba(160,220,130,.55)');O(c,0,26,38,22,'#8fd46a');
 CIRC(c,-30,6,4,'#3f8a36');CIRC(c,28,-2,3.4,'#3f8a36');CIRC(c,10,2,2.6,'#3f8a36');CIRC(c,-6,16,2.2,'#3f8a36');
 // bercak tambahan + kilau basah (pose & komposisi dikunci)
 CIRC(c,-14,-4,5,'rgba(35,90,40,.4)');CIRC(c,18,6,4,'rgba(35,90,40,.4)');
 O(c,-20,-6,12,6,'rgba(255,255,255,.35)');
 CIRC(c,-24,-32,16,'#e8f4d8');CIRC(c,24,-32,16,'#e8f4d8');
 // iris emas + pupil horizontal khas katak
 CIRC(c,-24,-32,9.5,'#d9a92e');CIRC(c,24,-32,9.5,'#d9a92e');
 O(c,-24,-32,6,3,'#241c16');O(c,24,-32,6,3,'#241c16');
 CIRC(c,-21.5,-34.5,2.2,'#fff');CIRC(c,26.5,-34.5,2.2,'#fff');
 c.strokeStyle='#241c16';c.lineWidth=4;c.beginPath();c.arc(0,-6,14,.15*Math.PI,.85*Math.PI);c.stroke();
 c.globalAlpha=.5;CIRC(c,-40,-6,9,'#f0a08c');CIRC(c,40,-6,9,'#f0a08c');c.globalAlpha=1;
 c.strokeStyle='#4a8f3a';c.lineWidth=10;c.lineCap='round';
 c.beginPath();c.moveTo(-40,38);c.lineTo(-58,52);c.moveTo(40,38);c.lineTo(58,52);c.stroke();
 CIRC(c,-58,52,5,'#63b34a');CIRC(c,58,52,5,'#63b34a');}
function mTurtle(c){c.save();c.scale(2.4,2.4);spTurtle(c,-8,0,0);c.restore();}
const MASC={padiBig:mPadi,snake:mSnake,mushroom:mMushroom,eagle:mEagle,frog:mFrog,harimau:mEagle,bangau:mFrog,penyu:mTurtle};


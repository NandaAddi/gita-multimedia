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
/* Rumpun Padi Lebat Terasering Nusantara:
   - 7–9 helai daun lentur menjuntai melengkung alami (arching flexible leaves)
   - Respon gelombang angin nyata (undulating wind wave)
   - Malai bulir padi (drooping golden panicles) saat subur (prod tinggi)
   - Bercak hangus/kering saat wereng (hopperburn) atau kekeringan
*/
function spRice(c, x, y, hgt, col, sw, options = {}) {
  c.save();
  c.lineCap = 'round';
  c.lineJoin = 'round';
  
  const dk = mixc(col, '#1a3b22', 0.4);
  const lt = '#9ed07a';
  const isGolden = options.isGolden || false;
  const hopperburn = options.hopperburn || 0;
  const drought = options.drought || 0;
  
  // Warna daun dengan efek hopperburn / kekeringan jika ada
  let leafBaseCol = col;
  let leafMidCol = '#52b55f';
  let leafTipCol = lt;
  if (hopperburn > 0) {
    leafBaseCol = mixc(leafBaseCol, '#6e4a21', Math.min(1, hopperburn * 1.2));
    leafMidCol = mixc(leafMidCol, '#9e7332', Math.min(1, hopperburn * 1.1));
    leafTipCol = mixc(leafTipCol, '#c9984b', Math.min(1, hopperburn * 1.0));
  } else if (drought > 0) {
    leafBaseCol = mixc(leafBaseCol, '#5c4826', drought * 0.8);
    leafMidCol = mixc(leafMidCol, '#8f773b', drought * 0.9);
    leafTipCol = mixc(leafTipCol, '#bfa85c', drought * 1.0);
  } else if (isGolden) {
    leafMidCol = '#74ba4c';
    leafTipCol = '#c2db56';
  }

  // 1. Bayangan pangkal rumpun di lumpur/air
  c.fillStyle = 'rgba(25, 18, 10, 0.35)';
  c.beginPath();
  c.ellipse(x, y + 2, 9, 3.5, 0, 0, Math.PI * 2);
  c.fill();

  // 2. Anakan rumpun bawah (dense tiller base)
  c.strokeStyle = dk;
  c.lineWidth = 4.2;
  c.beginPath();
  c.moveTo(x - 6, y);
  c.lineTo(x, y - hgt * 0.28);
  c.lineTo(x + 6, y);
  c.stroke();

  // 3. 7 Helai Daun Padi Melengkung Lentur (Arching Flexible Blades)
  const blades = [
    { spread: -1.0, curveX: -18, tipX: -26, tipY: -0.65, thick: 2.4, lag: 0.75 },
    { spread: -0.6, curveX: -12, tipX: -18, tipY: -0.85, thick: 2.2, lag: 0.85 },
    { spread: -0.25, curveX: -5, tipX: -8, tipY: -0.98, thick: 2.0, lag: 0.95 },
    { spread: 0.0, curveX: 0, tipX: 0, tipY: -1.05, thick: 2.1, lag: 1.0 },
    { spread: 0.25, curveX: 5, tipX: 8, tipY: -0.98, thick: 2.0, lag: 0.95 },
    { spread: 0.6, curveX: 12, tipX: 18, tipY: -0.85, thick: 2.2, lag: 0.85 },
    { spread: 1.0, curveX: 18, tipX: 26, tipY: -0.65, thick: 2.4, lag: 0.75 }
  ];

  blades.forEach((b, bi) => {
    const bladeSway = sw * b.lag;
    const bx = x + b.curveX * (hgt / 45) + bladeSway * 0.45;
    const by = y + b.tipY * hgt * 0.52;
    const tx = x + b.tipX * (hgt / 45) + bladeSway;
    const ty = y + b.tipY * hgt;

    c.strokeStyle = bi % 2 === 0 ? leafBaseCol : dk;
    c.lineWidth = b.thick * 1.35;
    c.beginPath();
    c.moveTo(x + b.spread * 4, y);
    c.quadraticCurveTo(bx, by, tx, ty);
    c.stroke();

    c.strokeStyle = bi % 2 === 0 ? leafMidCol : leafTipCol;
    c.lineWidth = b.thick * 0.75;
    c.beginPath();
    c.moveTo(x + b.spread * 3, y - 2);
    c.quadraticCurveTo(bx, by, tx, ty);
    c.stroke();
  });

  // 4. Malai Bulir Padi (Panicles with Grains)
  const grainCount = isGolden ? 6 : 4;
  const grainCol = isGolden ? '#f0d048' : (hopperburn > 0.4 ? '#8a6530' : mixc(col, '#c7e67a', 0.5));
  const grainStroke = isGolden ? '#96741c' : '#284f22';

  [-0.45, 0.0, 0.45].forEach((offsetAngle, pi) => {
    const panSway = sw * (1.05 + pi * 0.1);
    const startX = x + offsetAngle * 8 + panSway * 0.6;
    const startY = y - hgt * 0.78;
    const bendX = startX + offsetAngle * 16 + panSway * 1.2;
    const bendY = y - hgt * 1.02;
    const endX = startX + offsetAngle * 26 + panSway * 1.5;
    const endY = y - hgt * 0.88;

    c.strokeStyle = grainStroke;
    c.lineWidth = 1.3;
    c.beginPath();
    c.moveTo(startX, startY);
    c.quadraticCurveTo(bendX, bendY, endX, endY);
    c.stroke();

    c.fillStyle = grainCol;
    c.strokeStyle = grainStroke;
    c.lineWidth = 0.8;
    for (let g = 0; g < grainCount; g++) {
      const gf = (g + 1) / (grainCount + 1);
      const gx = (1 - gf) * (1 - gf) * startX + 2 * (1 - gf) * gf * bendX + gf * gf * endX;
      const gy = (1 - gf) * (1 - gf) * startY + 2 * (1 - gf) * gf * bendY + gf * gf * endY;
      const grainAngle = Math.atan2(endY - startY, endX - startX) + (g % 2 === 0 ? 0.4 : -0.4);
      
      c.save();
      c.translate(gx, gy);
      c.rotate(grainAngle);
      c.beginPath();
      c.ellipse(0, 0, 3.2, 1.6, 0, 0, Math.PI * 2);
      c.fill();
      c.stroke();
      c.fillStyle = 'rgba(255, 255, 220, 0.7)';
      c.fillRect(-1, -0.8, 1.8, 1);
      c.restore();
    }
  });

  CIRC(c, x, y - 2, 2.5, leafTipCol);
  c.restore();
}
/* Rumput tepi ladang: 7 helai tinggi acak deterministik + biji pucat + goyang angin.
   Posisi & tinggi statis per seed (tidak flicker); hanya goyang yang animasi. */
function spGrass(c,x,y,s,seed,t){
  c.save();c.translate(x,y);c.lineCap='round';
  const sway1=Math.sin(t/900+x/300)*2*s;
  const sway2=Math.sin(t/400+x/100)*0.5*s;
  const sway=sway1+sway2;
  const numBlades = 7 + Math.floor(pr(seed*2.1)*3);
  for(let i=0;i<numBlades;i++){
    const h=(14+pr(seed+i*3.7)*22)*s;
    const tx=(i-numBlades/2)*2.6*s+sway*(1+i*0.15);
    c.strokeStyle=i%2?'#63c06a':'#3f9a4e';
    if(pr(seed+i*1.1)>0.8) c.strokeStyle='#8aa84b';
    c.lineWidth=(2.2+pr(seed+i)*1.2)*s;
    c.beginPath();c.moveTo(0,0);
    c.quadraticCurveTo((i-numBlades/2)*1.5*s+sway*0.6,-h*0.5,tx,-h);
    c.stroke();
    if(pr(seed+i*5.3)>0.7){
      c.fillStyle=pr(seed+i*2)>0.5?'rgba(255,250,220,0.9)':'rgba(255,255,255,0.9)';
      c.beginPath();c.arc(tx,-h,1.8*s,0,7);c.fill();
      c.beginPath();c.arc(tx,-h+2*s,1.2*s,0,7);c.fill();
    }
  }
  c.restore();
}
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
function spSnake(c,x,y,t){
  c.save();c.translate(x,y);
  const len = 80, segs = 30, spd = t/120, frq = 0.12;
  let pts = [];
  for(let i=0; i<=segs; i++) {
    const px = -40 + i*(len/segs);
    const taper = Math.pow(i/segs, 0.5);
    const py = Math.sin(px*frq - spd) * 6 * taper;
    pts.push({x: px, y: py});
  }

  c.lineCap='round'; c.lineJoin='round';
  c.beginPath();
  for(let i=0; i<=segs; i++) {
    c.lineWidth = (2 + (i/segs)*8) + 4;
    c.strokeStyle = 'rgba(0,0,0,0.15)';
    if(i==0) c.moveTo(pts[i].x, pts[i].y+12);
    else c.lineTo(pts[i].x, pts[i].y+12);
  }
  c.stroke();

  c.beginPath();
  for(let i=0; i<=segs; i++) {
    c.lineWidth = 2 + Math.sin(i/segs*Math.PI)*8;
    c.strokeStyle = '#1e4b1e';
    if(i==0) c.moveTo(pts[i].x, pts[i].y);
    else c.lineTo(pts[i].x, pts[i].y);
  }
  c.stroke();

  c.beginPath();
  for(let i=0; i<=segs; i++) {
    c.lineWidth = Math.max(0.1, (2 + Math.sin(i/segs*Math.PI)*8) - 3);
    c.strokeStyle = '#327a32';
    if(i==0) c.moveTo(pts[i].x, pts[i].y-1);
    else c.lineTo(pts[i].x, pts[i].y-1);
  }
  c.stroke();

  for(let i=2; i<segs-1; i+=2) {
    const p1 = pts[i-1], p2 = pts[i+1], pc = pts[i];
    const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    c.save(); c.translate(pc.x, pc.y-1); c.rotate(ang);
    const dw = 3, dh = 1.5 + Math.sin(i/segs*Math.PI)*2;
    c.fillStyle = '#65a365';
    c.beginPath(); c.moveTo(-dw,0); c.lineTo(0,-dh); c.lineTo(dw,0); c.lineTo(0,dh); c.fill();
    c.fillStyle = '#0f290f';
    c.beginPath(); c.moveTo(-dw+1.5,0); c.lineTo(0,-dh+1); c.lineTo(dw-1.5,0); c.lineTo(0,dh-1); c.fill();
    c.restore();
  }

  const head = pts[segs], hAng = Math.atan2(pts[segs].y-pts[segs-2].y, pts[segs].x-pts[segs-2].x);
  c.save(); c.translate(head.x+2, head.y); c.rotate(hAng - 0.1 + Math.sin(t/300)*0.1);
  
  const flk = Math.sin(t/150);
  if(flk > 0) {
    c.strokeStyle='#c53a3a'; c.lineWidth=1.5; c.beginPath();
    const tl = 3 + flk*6;
    c.moveTo(5,0); c.lineTo(5+tl,0); c.lineTo(5+tl+2,-1.5);
    c.moveTo(5+tl,0); c.lineTo(5+tl+2,1.5); c.stroke();
  }

  SH(c, 0, 9, 12);
  OG(c, 2, 0, 7, 5, RG(c, 0, -2, 8, '#59a64a', '#1e4b1e'));
  CIRC(c, 4, -2.5, 1.5, '#fff'); CIRC(c, 4.5, -2.5, 0.8, '#000');
  c.restore(); c.restore();
}

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
function butterfly(c,x,y,t,seed=0) {
  const f=Math.sin(t/110+seed*5);
  c.save();c.translate(x,y);

  const spcs = [
    {m:'#fb923c', d:'#431407', e:'#000000', s:'#ffffff'}, 
    {m:'#38bdf8', d:'#082f49', e:'#020617', s:'#bae6fd'}, 
    {m:'#34d399', d:'#064e3b', e:'#022c22', s:'#a7f3d0'}  
  ];
  const sp = spcs[seed % spcs.length];

  c.save();
  for (let k=0; k<12; k++) {
    const pTime = (t * 0.06 + k * 8.3 + seed * 30) % 100;
    if (pTime > 0) {
      const px = Math.sin(t/300 + k*2 + seed) * 20;
      const py = pTime * 0.6 + Math.cos(t/200 + k + seed) * 15;
      const alpha = 1 - (pTime / 100);
      c.globalAlpha = alpha * 0.7;
      c.fillStyle = sp.m;
      c.beginPath(); c.arc(px, py, 1.5 + Math.random()*1, 0, 7); c.fill();
    }
  }
  c.restore();

  c.translate(0, Math.sin(t/150+seed)*3);
  c.save();c.scale(0.3+0.7*Math.abs(f), 1);
  const ang = (1 - Math.abs(f)) * 0.3;

  for(let dir of [-1, 1]) {
    c.save(); c.scale(dir, 1); c.rotate(ang);
    c.fillStyle = sp.m; c.strokeStyle = sp.e; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(0,0); c.bezierCurveTo(8,-12, 16,-10, 20,-4); c.bezierCurveTo(22,2, 18,8, 10,10); c.fill(); c.stroke();
    c.fillStyle = sp.s; c.beginPath(); c.arc(16,-4, 1.2, 0, 7); c.fill(); c.arc(13,-7, 0.8, 0, 7); c.fill();
    c.fillStyle = sp.d; c.beginPath(); c.moveTo(0,0); c.bezierCurveTo(8,6, 14,12, 12,18); c.bezierCurveTo(8,20, 4,16, 0,8); c.fill(); c.stroke();
    c.fillStyle = sp.m; c.globalAlpha = 0.8; c.beginPath(); c.moveTo(0,0); c.bezierCurveTo(6,6, 10,11, 8,15); c.bezierCurveTo(4,15, 2,12, 0,6); c.fill(); c.globalAlpha = 1;
    c.restore();
  }
  c.restore();

  c.fillStyle = sp.d;
  c.beginPath(); c.ellipse(0, 0, 2, 7, 0, 0, 7); c.fill();
  c.beginPath(); c.arc(0, -6, 1.8, 0, 7); c.fill();
  c.strokeStyle = sp.d; c.lineWidth = 0.8;
  c.beginPath(); c.moveTo(-1, -7); c.quadraticCurveTo(-4, -12, -6, -10); c.stroke();
  c.beginPath(); c.moveTo(1, -7); c.quadraticCurveTo(4, -12, 6, -10); c.stroke();
  c.restore();
}
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
/* ================= TEKSTUR TANAH SAWAH BERUNDAK & ALIRAN ALUVIAL =================
   - Pematang terasering 3D berundak (terrace bunds/galengan) dengan lengkungan alami
   - Lumpur sawah aluvial kaya hara & butiran mineral tanah basah
   - Parit irigasi batu kali & pintu air kayu tradisional (tulakan) dengan animasi aliran
   - Jaringan rekahan lempeng tanah liat poligonal 3D saat kemarau (S.water < 32)
   - Cermin pantulan langit & kilau air genangan sawah saat S.water >= 32
   - Respon tanah tercemar pestisida saat S.poison > 20
*/

// Fungsi pembantu kurva pematang terasering sawah organik
function getTerraceBundY(tier, x) {
  if (tier === 0) return 420 + Math.sin(x * 0.0028 + 0.1) * 10;
  if (tier === 1) return 590 + Math.sin(x * 0.0025 + 0.4) * 16;
  if (tier === 2) return 775 + Math.sin(x * 0.0022 + 0.9) * 20;
  return 970 + Math.sin(x * 0.0018 + 1.4) * 24;
}

// Jaringan Rekahan Lempeng Tanah Liat Poligonal Realistis (Mud Desiccation Fissures)
function drawPolygonalMudCracks(c, droughtSeverity, t) {
  const crackAlpha = Math.min(0.95, 0.45 + droughtSeverity * 0.5);
  c.save();
  c.lineCap = 'round';
  c.lineJoin = 'round';

  // Grid titik-titik simpul rekahan tanah lempeng poligonal
  const cols = 9;
  const rows = 6;
  const startX = 140, endX = 1780;
  const startY = 440, endY = 1040;

  // Bangun simpul yang terperturbasi secara deterministik
  const nodes = [];
  for (let r = 0; r <= rows; r++) {
    nodes[r] = [];
    const fy = r / rows;
    const baseY = startY + (endY - startY) * fy;
    for (let col = 0; col <= cols; col++) {
      const fx = col / cols;
      const baseX = startX + (endX - startX) * fx;
      const seed = r * 37 + col * 19;
      // Pergeseran acak alami untuk membentuk sel poligonal non-simetris
      const jx = (pr(seed) - 0.5) * ((endX - startX) / cols * 0.65);
      const jy = (pr(seed + 101) - 0.5) * ((endY - startY) / rows * 0.55);
      nodes[r][col] = { x: baseX + jx, y: baseY + jy };
    }
  }

  // 1. Gambar celah bayangan gelap dasar rekahan (deep shadow trench)
  c.strokeStyle = 'rgba(28, 16, 8, ' + crackAlpha.toFixed(3) + ')';
  c.lineWidth = (2.6 + droughtSeverity * 3.2);

  // Rusuk horizontal & diagonal
  for (let r = 0; r <= rows; r++) {
    for (let col = 0; col <= cols; col++) {
      const curr = nodes[r][col];
      // Hubungkan ke kanan
      if (col < cols) {
        const right = nodes[r][col + 1];
        c.beginPath();
        c.moveTo(curr.x, curr.y);
        const midX = (curr.x + right.x) * 0.5 + (pr(r * 23 + col * 7) - 0.5) * 16 * droughtSeverity;
        const midY = (curr.y + right.y) * 0.5 + (pr(r * 29 + col * 11) - 0.5) * 12 * droughtSeverity;
        c.quadraticCurveTo(midX, midY, right.x, right.y);
        c.stroke();
      }
      // Hubungkan ke bawah
      if (r < rows) {
        const down = nodes[r + 1][col];
        c.beginPath();
        c.moveTo(curr.x, curr.y);
        const midX = (curr.x + down.x) * 0.5 + (pr(r * 31 + col * 13) - 0.5) * 14 * droughtSeverity;
        const midY = (curr.y + down.y) * 0.5 + (pr(r * 17 + col * 5) - 0.5) * 10 * droughtSeverity;
        c.quadraticCurveTo(midX, midY, down.x, down.y);
        c.stroke();
      }
    }
  }

  // 2. Garis inti celah retakan terdalam (inner dark chasm)
  c.strokeStyle = 'rgba(12, 6, 2, ' + Math.min(1.0, crackAlpha * 1.25).toFixed(3) + ')';
  c.lineWidth = Math.max(1.2, (1.3 + droughtSeverity * 1.6));
  for (let r = 0; r <= rows; r++) {
    for (let col = 0; col < cols; col += 2) {
      const curr = nodes[r][col];
      const right = nodes[r][col + 1];
      c.beginPath();
      c.moveTo(curr.x, curr.y);
      c.lineTo(right.x, right.y);
      c.stroke();
      if (r < rows && (col + r) % 2 === 0) {
        const down = nodes[r + 1][col];
        c.beginPath();
        c.moveTo(curr.x, curr.y);
        c.lineTo(down.x, down.y);
        c.stroke();
      }
    }
  }

  // 3. Beveled highlight tepian lempeng tanah liat yang terkena terik matahari (3D clay plate edges)
  c.strokeStyle = 'rgba(215, 180, 125, ' + (crackAlpha * 0.38).toFixed(3) + ')';
  c.lineWidth = 1.2;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const curr = nodes[r][col];
      const right = nodes[r][col + 1];
      c.beginPath();
      c.moveTo(curr.x, curr.y - 1.8);
      c.lineTo(right.x, right.y - 1.8);
      c.stroke();
    }
  }

  // 4. Serak serasah jerami kering (dry straw mulch) di celah retakan
  c.strokeStyle = 'rgba(175, 145, 80, ' + (0.5 + droughtSeverity * 0.4).toFixed(3) + ')';
  c.lineWidth = 1.4;
  for (let s = 0; s < 36; s++) {
    const sx = startX + 60 + pr(s * 19.3) * (endX - startX - 120);
    const sy = startY + 40 + pr(s * 27.7) * (endY - startY - 80);
    const sAng = pr(s * 11) * Math.PI;
    const sLen = 8 + pr(s * 7) * 14;
    c.beginPath();
    c.moveTo(sx, sy);
    c.lineTo(sx + Math.cos(sAng) * sLen, sy + Math.sin(sAng) * sLen);
    c.stroke();
  }

  // Kabut terik kemarau tipis
  c.fillStyle = 'rgba(195, 155, 95, ' + (droughtSeverity * 0.22).toFixed(3) + ')';
  c.fillRect(0, 420, 1920, 660);

  c.restore();
}

// Parit Irigasi Batu Kali & Pintu Air Kayu (Tulakan Sawah)
function drawIrrigationCanal(c, t, S) {
  c.save();
  const isSurging = S && S._irrigationFlowTimer !== undefined && S._irrigationFlowTimer > 0;
  const waterLevel = S && S.water !== undefined ? S.water : 50;

  // Jalur parit batu di sisi kiri pematang atas: dari (270, 420) meliuk ke (180, 710)
  const canalPath = [
    { x: 280, y: 418, r: 18 },
    { x: 250, y: 470, r: 20 },
    { x: 220, y: 535, r: 23 },
    { x: 195, y: 610, r: 25 },
    { x: 165, y: 690, r: 28 }
  ];

  // 1. Dasar parit dan bebatuan kali abu-abu alami
  canalPath.forEach((pt, i) => {
    // Batu-batu pembatas parit di kiri dan kanan
    [-1, 1].forEach(side => {
      const bx = pt.x + side * (pt.r + 8);
      const by = pt.y + (side === 1 ? 4 : -4);
      c.fillStyle = i % 2 === 0 ? '#545852' : '#6b7068';
      c.strokeStyle = '#323630';
      c.lineWidth = 1.5;
      c.beginPath();
      c.ellipse(bx, by, 11 + (i % 3) * 2, 7 + (i % 2) * 2, side * 0.2, 0, Math.PI * 2);
      c.fill();
      c.stroke();

      // Lumut basah batu kali
      c.fillStyle = 'rgba(65, 105, 45, 0.65)';
      c.beginPath();
      c.arc(bx, by - 3, 4.5, 0, Math.PI * 2);
      c.fill();
    });
  });

  // 2. Aliran air parit
  c.beginPath();
  c.moveTo(canalPath[0].x, canalPath[0].y);
  for (let i = 1; i < canalPath.length; i++) {
    c.lineTo(canalPath[i].x, canalPath[i].y);
  }
  const waterCol = isSurging ? 'rgba(215, 245, 255, 0.92)' : (waterLevel > 20 ? 'rgba(100, 185, 215, 0.65)' : 'rgba(120, 105, 80, 0.4)');
  c.strokeStyle = waterCol;
  c.lineWidth = isSurging ? 22 : 14;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.stroke();

  // Riak & buih air mengalir aktif jika sedang irigasi
  if (isSurging || waterLevel > 40) {
    c.strokeStyle = 'rgba(255, 255, 255, ' + (isSurging ? '0.85' : '0.45') + ')';
    c.lineWidth = isSurging ? 4 : 2;
    for (let k = 0; k < canalPath.length - 1; k++) {
      const p1 = canalPath[k], p2 = canalPath[k + 1];
      const waveOffset = Math.sin(t * 0.008 + k * 1.5) * 4;
      c.beginPath();
      c.moveTo(p1.x + waveOffset, p1.y);
      c.lineTo(p2.x - waveOffset, p2.y);
      c.stroke();
    }
  }

  // 3. Pintu Air Kayu Tradisional (Tulakan Sawah) di titik temu terasering (x: 220, y: 535)
  const gx = 222, gy = 530;
  // Tiang kayu vertikal kiri & kanan
  c.fillStyle = '#4a3018';
  c.strokeStyle = '#2b1a0a';
  c.lineWidth = 1.6;
  [-9, 9].forEach(dx => {
    c.fillRect(gx + dx - 2.5, gy - 26, 5, 34);
    c.strokeRect(gx + dx - 2.5, gy - 26, 5, 34);
  });
  // Balok palang kayu atas
  c.fillStyle = '#6b4724';
  c.fillRect(gx - 13, gy - 28, 26, 6);
  c.strokeRect(gx - 13, gy - 28, 26, 6);
  // Papan sekat geser (sluice gate board)
  const gateOpenY = isSurging ? -14 : (waterLevel > 35 ? -6 : 0);
  c.fillStyle = '#82592e';
  c.fillRect(gx - 7, gy - 18 + gateOpenY, 14, 20);
  c.strokeRect(gx - 7, gy - 18 + gateOpenY, 14, 20);
  // Gagang penarik papan tulakan
  c.fillStyle = '#2b1a0a';
  c.fillRect(gx - 1.5, gy - 36 + gateOpenY, 3, 16);

  // Jika sedang surge (Alirkan Air Irigasi): semburan air berbuih keluar dari tulakan
  if (isSurging) {
    c.fillStyle = 'rgba(255, 255, 255, 0.88)';
    for (let sp = 0; sp < 14; sp++) {
      const sprayX = gx + 10 + pr(sp * 7 + (t % 100)) * 90;
      const sprayY = gy + 4 + pr(sp * 13 + (t % 100)) * 45;
      const sr = 2 + pr(sp * 3) * 4.5;
      c.beginPath();
      c.arc(sprayX, sprayY, sr, 0, Math.PI * 2);
      c.fill();
    }
    // Riak air menyebar ke petak terasering
    c.strokeStyle = 'rgba(220, 248, 255, 0.75)';
    c.lineWidth = 2.5;
    for (let rk = 1; rk <= 3; rk++) {
      const rw = 25 * rk + (t * 0.08) % 30;
      c.beginPath();
      c.ellipse(gx + 40, gy + 15, rw, rw * 0.35, 0.1, 0, Math.PI * 2);
      c.stroke();
    }
  }

  c.restore();
}

function texSoilSawah(c, t, S) {
  S = S || {};
  const isDrought = S.water !== undefined && S.water < 32;
  const droughtSeverity = isDrought ? (32 - S.water) / 32 : 0;
  const isPoisoned = S.poison !== undefined && S.poison > 20;
  const waterLevel = S.water !== undefined ? S.water : 50;

  c.save();
  // Area tanah sawah di-clip pada poligon sawah organik: [[0,1080],[280,420],[1640,420],[1920,1080]]
  c.beginPath();
  c.moveTo(0, 1080);
  c.lineTo(280, 420);
  c.lineTo(1640, 420);
  c.lineTo(1920, 1080);
  c.closePath();
  c.clip();

  // 1. BUTIRAN PARTIKEL LUMPUR & SEDIMEN TANAH ALUVIAL
  for (let k = 0; k < 54; k++) {
    const px = 180 + pr(k * 7.1) * 1560;
    const py = 440 + pr(k * 13.3) * 600;
    const r = 2 + pr(k * 3.7) * 4.5;
    const col = k % 2 === 0 ? 'rgba(75, 48, 22, 0.28)' : 'rgba(125, 90, 45, 0.22)';
    c.fillStyle = isPoisoned ? 'rgba(80, 70, 95, 0.3)' : col;
    c.beginPath();
    c.arc(px, py, r, 0, Math.PI * 2);
    c.fill();
  }

  // 2. PEMATANG SAWAH BERUNDAK ORGANIK (3-Tier Terraced Mud Bunds / Galengan)
  const bundTiers = [
    { tier: 1, wL: 290, wR: 1630, thick: 7.0, shade: 'rgba(50, 32, 14, 0.55)', grass: 'rgba(92, 142, 50, 0.7)' },
    { tier: 2, wL: 190, wR: 1730, thick: 9.0, shade: 'rgba(45, 28, 12, 0.60)', grass: 'rgba(84, 134, 44, 0.75)' },
    { tier: 3, wL: 80,  wR: 1840, thick: 11.5, shade: 'rgba(40, 24, 10, 0.65)', grass: 'rgba(76, 124, 38, 0.8)' }
  ];

  bundTiers.forEach((b, idx) => {
    const midY = getTerraceBundY(b.tier, 960);
    // a. Bayangan tebal bawah pematang (galengan earthen drop shadow)
    c.strokeStyle = b.shade;
    c.lineWidth = b.thick * 1.25;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(b.wL, getTerraceBundY(b.tier, b.wL) + b.thick * 0.4);
    c.quadraticCurveTo(960, midY + 24 + b.thick * 0.4, b.wR, getTerraceBundY(b.tier, b.wR) + b.thick * 0.4);
    c.stroke();

    // b. Tubuh pematang tanah liat padat (packed earthen bund wall)
    c.strokeStyle = isDrought ? 'rgba(130, 95, 52, 0.85)' : 'rgba(88, 60, 30, 0.85)';
    c.lineWidth = b.thick;
    c.beginPath();
    c.moveTo(b.wL, getTerraceBundY(b.tier, b.wL));
    c.quadraticCurveTo(960, midY + 22, b.wR, getTerraceBundY(b.tier, b.wR));
    c.stroke();

    // c. Sisi atas pematang berumput galengan (creeping terrace grass)
    c.strokeStyle = isDrought ? 'rgba(150, 125, 70, 0.6)' : b.grass;
    c.lineWidth = b.thick * 0.55;
    c.beginPath();
    c.moveTo(b.wL, getTerraceBundY(b.tier, b.wL) - b.thick * 0.35);
    c.quadraticCurveTo(960, midY + 22 - b.thick * 0.35, b.wR, getTerraceBundY(b.tier, b.wR) - b.thick * 0.35);
    c.stroke();

    // d. Rumpun rumput galengan yang bergoyang tertiup angin
    const numTufts = 10;
    for (let j = 0; j < numTufts; j++) {
      const tx = b.wL + 70 + (j + pr(idx * 17 + j)) * ((b.wR - b.wL - 140) / numTufts);
      const ty = getTerraceBundY(b.tier, tx) - b.thick * 0.25;
      const windSway = Math.sin(t * 0.003 + tx * 0.005) * 3;
      c.strokeStyle = isDrought ? '#8f7943' : '#5fa438';
      c.lineWidth = 2.0;
      c.beginPath();
      c.moveTo(tx, ty);
      c.lineTo(tx - 4 + windSway, ty - 8 - pr(j * 3) * 6);
      c.moveTo(tx, ty);
      c.lineTo(tx + 4 + windSway, ty - 9 - pr(j * 5) * 6);
      c.stroke();

      // Bebatuan kali pembatas galengan
      if (j % 3 === 0) {
        c.fillStyle = '#656b62';
        c.strokeStyle = '#3e423c';
        c.lineWidth = 1.2;
        c.beginPath();
        c.ellipse(tx + 12, ty + 2, 7, 4.5, 0.1, 0, Math.PI * 2);
        c.fill();
        c.stroke();
      }
    }
  });

  // 3. GENANGAN AIR REFLEKTIF CERMIN SAWAH (Flooded Mirror Paddy Reflection)
  if (!isDrought) {
    const wNorm = Math.min(1.0, waterLevel / 75);
    c.globalAlpha = 0.20 + wNorm * 0.35;
    for (let p = 0; p < 14; p++) {
      const px = 340 + pr(p * 2.3) * 1240;
      const py = 460 + pr(p * 5.7) * 520;
      const rx = 100 + pr(p * 3.1) * 160;
      const ry = 16 + pr(p * 4.2) * 26;
      const grad = c.createLinearGradient(0, py - ry, 0, py + ry);
      grad.addColorStop(0, isPoisoned ? 'rgba(160, 180, 140, 0.6)' : 'rgba(210, 240, 255, 0.85)');
      grad.addColorStop(0.5, isPoisoned ? 'rgba(90, 110, 100, 0.4)' : 'rgba(120, 195, 230, 0.55)');
      grad.addColorStop(1, 'rgba(80, 140, 180, 0.15)');
      c.fillStyle = grad;
      c.beginPath();
      c.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);
      c.fill();

      // Riak air halus
      c.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      c.lineWidth = 1.2;
      c.beginPath();
      const rSway = Math.sin(t * 0.003 + p) * 8;
      c.ellipse(px + rSway, py, rx * 0.6, ry * 0.45, 0, 0, Math.PI * 2);
      c.stroke();
    }
    c.globalAlpha = 1.0;
  }

  // 4. RETAKAN KEMARAU POLIGONAL ORGANIK (Mud Desiccation Fissures) saat S.water < 32
  if (isDrought) {
    drawPolygonalMudCracks(c, droughtSeverity, t);
  }

  // 5. PARIT IRIGASI BATU KALI & PINTU AIR KAYU (Tulakan)
  drawIrrigationCanal(c, t, S);

  // 6. EFEK CEMAR PESTISIDA KIMIAWI (Toxic Chemical Discoloration)
  if (isPoisoned) {
    const pAlpha = Math.min(0.48, (S.poison - 20) / 100);
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

/* ================= MATEMATIKA KURVA MEANDER BIBIR SUNGAI ORGANIK =================
   Memastikan bantaran tanah dan permukaan air menyatu 100% tanpa celah.
*/
function getRiverBankTop(x) {
  return 460 + Math.sin(x * 0.0032 + 0.45) * 15 + Math.cos(x * 0.0068 + 1.2) * 8;
}
function getRiverBankBottom(x) {
  return 806 + Math.sin(x * 0.0028 + 1.1) * 16 + Math.cos(x * 0.0062 + 0.5) * 8;
}

/* ================= BEBATUAN KALI GRANIT 3D & LUMUT BASAH ================= */
function drawRiverBoulder(c, x, y, rx, ry, baseCol, hasMoss, rot) {
  rot = rot || 0;
  c.save();
  c.translate(x, y);
  if (rot) c.rotate(rot);

  // 1. Ambient drop shadow (bayangan lembut di tanah/dasar air)
  c.fillStyle = 'rgba(12, 18, 14, 0.45)';
  c.beginPath();
  c.ellipse(2, ry * 0.45, rx * 1.08, ry * 0.65, 0, 0, Math.PI * 2);
  c.fill();

  // 2. Badan batu granit berlapis (radial gradient 3D)
  const bg = c.createRadialGradient(-rx * 0.25, -ry * 0.3, ry * 0.15, 0, 0, rx);
  bg.addColorStop(0, '#a39c92');
  bg.addColorStop(0.5, baseCol || '#6b655c');
  bg.addColorStop(1, '#3e3a34');
  c.fillStyle = bg;
  c.beginPath();
  c.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  c.fill();

  // 3. Highlight tepi atas (cahaya langit)
  c.fillStyle = 'rgba(255, 255, 255, 0.28)';
  c.beginPath();
  c.ellipse(-rx * 0.2, -ry * 0.35, rx * 0.55, ry * 0.35, 0, 0, Math.PI * 2);
  c.fill();

  // 4. Aksen lumut basah (jika berbatu kali alami)
  if (hasMoss) {
    c.fillStyle = 'rgba(56, 108, 42, 0.75)';
    c.beginPath();
    c.ellipse(-rx * 0.15, -ry * 0.2, rx * 0.6, ry * 0.4, 0, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = 'rgba(110, 185, 75, 0.6)';
    c.beginPath();
    c.ellipse(-rx * 0.1, -ry * 0.25, rx * 0.35, ry * 0.22, 0, 0, Math.PI * 2);
    c.fill();
  }

  c.restore();
}

/* ================= VEGETASI RUMPUN GELAGAH / RUMPUT AIR TEPIAN ================= */
function drawRiverReeds(c, x, y, t, count, seed) {
  count = count || 6;
  seed = seed || 0;
  c.save();
  c.translate(x, y);
  c.lineCap = 'round';

  for (let i = 0; i < count; i++) {
    const bladeSeed = seed * 10 + i;
    const h = 42 + pr(bladeSeed * 1.7) * 36;
    const bend = Math.sin(t / 900 + bladeSeed * 2.3) * (8 + i * 2);
    const bladeW = 3.5 + pr(bladeSeed) * 1.5;
    const xOff = (i - count / 2) * 6;

    // Batang rumput gelagah
    c.strokeStyle = i % 2 ? '#4d7a36' : '#6b9644';
    c.lineWidth = bladeW;
    c.beginPath();
    c.moveTo(xOff, 0);
    c.quadraticCurveTo(xOff + bend * 0.5, -h * 0.6, xOff + bend, -h);
    c.stroke();

    // Ujung bunga bulir cokelat (cattail head) pada beberapa batang tinggi
    if (i === 1 || i === count - 2) {
      c.fillStyle = '#4a321a';
      c.beginPath();
      c.ellipse(xOff + bend * 0.85, -h * 0.75, 3.5, 9, bend * 0.03, 0, Math.PI * 2);
      c.fill();
    }
  }
  c.restore();
}

/* ================= TEKSTUR BANTARAN SUNGAI & KERIKIL ENDAPAN =================
   Arsitektur Layered Painter:
   - texSoilSungaiTop: Bantaran atas (Background) di belakang aliran air sungai
   - texSoilSungaiBottom: Bantaran bawah (Foreground) di depan aliran air sungai
   - texSoilSungai: Komposit keduanya untuk backward compatibility
*/
function texSoilSungaiTop(c, t, S) {
  S = S || {};
  const isPoisoned = S.poison !== undefined && S.poison > 15;

  c.save();

  // 1. BANTARAN ATAS ORGANIK (Upper Bank: y = 340 to getRiverBankTop(x))
  const upGrad = c.createLinearGradient(0, 340, 0, 480);
  upGrad.addColorStop(0, '#588a4c');
  upGrad.addColorStop(0.65, '#45733d');
  upGrad.addColorStop(1, '#34572e');
  c.fillStyle = upGrad;
  c.beginPath();
  c.moveTo(0, 340);
  c.lineTo(1920, 340);
  c.lineTo(1920, getRiverBankTop(1920));
  for (let x = 1920; x >= 0; x -= 30) {
    c.lineTo(x, getRiverBankTop(x));
  }
  c.closePath();
  c.fill();

  // Bibir lumpur basah & endapan pasir sungai atas
  c.strokeStyle = 'rgba(28, 20, 12, 0.65)';
  c.lineWidth = 8;
  c.beginPath();
  c.moveTo(0, getRiverBankTop(0));
  for (let x = 30; x <= 1920; x += 30) {
    c.lineTo(x, getRiverBankTop(x));
  }
  c.stroke();

  c.strokeStyle = 'rgba(195, 175, 130, 0.28)';
  c.lineWidth = 3;
  c.beginPath();
  c.moveTo(0, getRiverBankTop(0) - 3);
  for (let x = 30; x <= 1920; x += 30) {
    c.lineTo(x, getRiverBankTop(x) - 3);
  }
  c.stroke();

  // 2. BEBATUAN KALI ATAS 3D BERLUMUT
  const bouldersTop = [
    { x: 120, y: getRiverBankTop(120) + 2, rx: 22, ry: 13, col: '#625b52', moss: true },
    { x: 155, y: getRiverBankTop(155) - 6, rx: 14, ry: 9, col: '#7a736a', moss: false },
    { x: 460, y: getRiverBankTop(460) + 3, rx: 26, ry: 15, col: '#58524a', moss: true },
    { x: 880, y: getRiverBankTop(880) - 2, rx: 20, ry: 12, col: '#68625a', moss: true },
    { x: 1380, y: getRiverBankTop(1380) + 4, rx: 28, ry: 16, col: '#5c564e', moss: true },
    { x: 1750, y: getRiverBankTop(1750) - 4, rx: 19, ry: 11, col: '#726b62', moss: false }
  ];
  bouldersTop.forEach(b => {
    drawRiverBoulder(c, b.x, b.y, b.rx, b.ry, b.col, b.moss);
  });

  // 3. KERIKIL KALI ATAS
  for (let k = 0; k < 10; k++) {
    const px = 80 + pr(k * 29.3) * 1760;
    const baseBankY = getRiverBankTop(px) - 2;
    const py = baseBankY - pr(k * 13.7) * 14;
    const prx = 4 + pr(k * 5.1) * 6;
    const pry = prx * 0.65;
    const pCols = ['#6e6a64', '#8a857d', '#5a554f', '#9e9990', '#7d7468'];
    const pCol = pCols[k % pCols.length];

    c.fillStyle = 'rgba(12, 18, 14, 0.4)';
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

  // 4. RUMPUN GELAGAH AIR BANTARAN ATAS
  const reedClustersTop = [
    { x: 70, y: getRiverBankTop(70) - 4, count: 6, seed: 1 },
    { x: 340, y: getRiverBankTop(340) - 6, count: 7, seed: 2 },
    { x: 720, y: getRiverBankTop(720) - 5, count: 8, seed: 3 },
    { x: 1160, y: getRiverBankTop(1160) - 4, count: 6, seed: 4 },
    { x: 1540, y: getRiverBankTop(1540) - 6, count: 7, seed: 5 },
    { x: 1840, y: getRiverBankTop(1840) - 5, count: 8, seed: 6 }
  ];
  reedClustersTop.forEach(r => {
    drawRiverReeds(c, r.x, r.y, t, r.count, r.seed);
  });

  // Respon racun atas
  if (isPoisoned) {
    const poisonAlpha = Math.min(0.55, (S.poison - 15) / 80);
    c.fillStyle = 'rgba(110, 80, 140, ' + poisonAlpha.toFixed(3) + ')';
    c.beginPath();
    c.moveTo(0, getRiverBankTop(0) - 8);
    for (let x = 30; x <= 1920; x += 30) c.lineTo(x, getRiverBankTop(x) - 8);
    for (let x = 1920; x >= 0; x -= 30) c.lineTo(x, getRiverBankTop(x) + 8);
    c.closePath();
    c.fill();
  }

  c.restore();
}

function texSoilSungaiBottom(c, t, S) {
  S = S || {};
  const isPoisoned = S.poison !== undefined && S.poison > 15;

  c.save();

  // 1. BANTARAN BAWAH ORGANIK (Lower Bank: getRiverBankBottom(x) to y = 1080)
  const lowGrad = c.createLinearGradient(0, 800, 0, 1080);
  lowGrad.addColorStop(0, '#2e4a28');
  lowGrad.addColorStop(0.15, '#3b6235');
  lowGrad.addColorStop(0.5, '#4a7542');
  lowGrad.addColorStop(1, '#365930');
  c.fillStyle = lowGrad;
  c.beginPath();
  c.moveTo(0, getRiverBankBottom(0));
  for (let x = 30; x <= 1920; x += 30) {
    c.lineTo(x, getRiverBankBottom(x));
  }
  c.lineTo(1920, 1080);
  c.lineTo(0, 1080);
  c.closePath();
  c.fill();

  // Bibir lumpur basah pasang-surut sungai bawah
  c.strokeStyle = 'rgba(22, 16, 10, 0.7)';
  c.lineWidth = 9;
  c.beginPath();
  c.moveTo(0, getRiverBankBottom(0));
  for (let x = 30; x <= 1920; x += 30) {
    c.lineTo(x, getRiverBankBottom(x));
  }
  c.stroke();

  c.strokeStyle = 'rgba(195, 175, 130, 0.32)';
  c.lineWidth = 3.5;
  c.beginPath();
  c.moveTo(0, getRiverBankBottom(0) + 3.5);
  for (let x = 30; x <= 1920; x += 30) {
    c.lineTo(x, getRiverBankBottom(x) + 3.5);
  }
  c.stroke();

  // 2. BEBATUAN KALI BAWAH 3D BERLUMUT (Berada di depan air)
  const bouldersBottom = [
    { x: 260, y: getRiverBankBottom(260) + 4, rx: 25, ry: 15, col: '#5e574f', moss: true },
    { x: 740, y: getRiverBankBottom(740) + 12, rx: 32, ry: 18, col: '#524c44', moss: true },
    { x: 785, y: getRiverBankBottom(785) + 16, rx: 16, ry: 10, col: '#756e65', moss: false },
    { x: 1220, y: getRiverBankBottom(1220) + 8, rx: 24, ry: 14, col: '#625b52', moss: true },
    { x: 1580, y: getRiverBankBottom(1580) + 6, rx: 34, ry: 19, col: '#4f4942', moss: true },
    { x: 1630, y: getRiverBankBottom(1630) + 14, rx: 18, ry: 11, col: '#787168', moss: false }
  ];
  bouldersBottom.forEach(b => {
    drawRiverBoulder(c, b.x, b.y, b.rx, b.ry, b.col, b.moss);
  });

  // 3. KERIKIL KALI BAWAH
  for (let k = 10; k < 20; k++) {
    const px = 80 + pr(k * 29.3) * 1760;
    const baseBankY = getRiverBankBottom(px) + 6;
    const py = baseBankY + pr(k * 13.7) * 28;
    const prx = 4 + pr(k * 5.1) * 6;
    const pry = prx * 0.65;
    const pCols = ['#6e6a64', '#8a857d', '#5a554f', '#9e9990', '#7d7468'];
    const pCol = pCols[k % pCols.length];

    c.fillStyle = 'rgba(12, 18, 14, 0.4)';
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

  // 4. RUMPUN GELAGAH AIR BANTARAN BAWAH (Menghadap ke atas di depan air, bebas dari crop!)
  const reedClustersBottom = [
    { x: 160, y: getRiverBankBottom(160) + 18, count: 7, seed: 7 },
    { x: 540, y: getRiverBankBottom(540) + 22, count: 8, seed: 8 },
    { x: 990, y: getRiverBankBottom(990) + 16, count: 6, seed: 9 },
    { x: 1410, y: getRiverBankBottom(1410) + 24, count: 8, seed: 10 },
    { x: 1780, y: getRiverBankBottom(1780) + 20, count: 7, seed: 11 }
  ];
  reedClustersBottom.forEach(r => {
    drawRiverReeds(c, r.x, r.y, t, r.count, r.seed);
  });

  // Respon racun bawah
  if (isPoisoned) {
    const poisonAlpha = Math.min(0.55, (S.poison - 15) / 80);
    c.fillStyle = 'rgba(110, 80, 140, ' + poisonAlpha.toFixed(3) + ')';
    c.beginPath();
    c.moveTo(0, getRiverBankBottom(0) - 8);
    for (let x = 30; x <= 1920; x += 30) c.lineTo(x, getRiverBankBottom(x) - 8);
    for (let x = 1920; x >= 0; x -= 30) c.lineTo(x, getRiverBankBottom(x) + 8);
    c.closePath();
    c.fill();
  }

  c.restore();
}

function texSoilSungai(c, t, S) {
  texSoilSungaiTop(c, t, S);
  texSoilSungaiBottom(c, t, S);
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
function gulmaPatch(c, x, y, s, t) {
  c.save();
  // Floating bobbing & tilt dinamis mengikuti arus air
  const bobY = Math.sin(t / 800 + x * 0.05) * 5;
  const bobX = Math.sin(t / 1700 + x) * 6;
  const tilt = Math.sin(t / 1100 + x * 0.03) * 0.045;
  c.translate(x + bobX, y + bobY);
  c.rotate(tilt);

  // 1. Bayangan bawah air lembut (subsurface shadow)
  c.fillStyle = 'rgba(10, 35, 20, 0.28)';
  c.beginPath();
  c.ellipse(0, 8 * s, 36 * s, 14 * s, 0, 0, Math.PI * 2);
  c.fill();

  // 2. Tangkai daun menggembung (bulbous petioles) di pangkal rumpun
  const petioleCols = ['#2e5927', '#3d6e32', '#4c823f'];
  for (let p = 0; p < 4; p++) {
    const px = (p - 1.5) * 10 * s;
    const py = (2 + (p % 2) * 3) * s;
    c.fillStyle = petioleCols[p % petioleCols.length];
    c.beginPath();
    c.ellipse(px, py, 7 * s, 5 * s, (p - 1.5) * 0.2, 0, Math.PI * 2);
    c.fill();
  }

  // 3. Daun roset mengembang (lebar, hijau mengkilap khas eceng gondok)
  for (let i = 0; i < 6; i++) {
    const leafX = (i - 2.5) * 14 * s;
    const leafY = (pr(i + x) * 10 - 7) * s;
    const leafRot = (i - 2.5) * 0.16;
    c.save();
    c.translate(leafX, leafY);
    c.rotate(leafRot);

    // Daun oval mengkilap
    O(c, 0, 0, 16 * s, 10 * s, i % 2 ? '#2e6b30' : '#418a3e');
    // Tulang daun melengkung
    c.strokeStyle = 'rgba(15, 45, 18, 0.45)';
    c.lineWidth = 1.6 * s;
    c.beginPath();
    c.moveTo(-11 * s, 0);
    c.quadraticCurveTo(0, -2 * s, 11 * s, 0);
    c.stroke();
    // Kilau lilin daun (cuticle gloss)
    c.fillStyle = 'rgba(255, 255, 255, 0.22)';
    c.beginPath();
    c.ellipse(-3 * s, -3 * s, 7 * s, 3 * s, -0.2, 0, Math.PI * 2);
    c.fill();

    c.restore();
  }

  // 4. Bunga Eceng Gondok Khas (Kelopak Lavender-Violet dengan bintik kuning emas)
  c.save();
  c.translate(8 * s, -10 * s);
  // Tangkai bunga tegak
  c.strokeStyle = '#39632f';
  c.lineWidth = 2.5 * s;
  c.beginPath();
  c.moveTo(0, 8 * s);
  c.lineTo(0, 0);
  c.stroke();

  // Kelopak lavender melingkar
  const petalCols = ['#9c88d9', '#b39ddb', '#7e57c2', '#d1c4e9'];
  for (let k = 0; k < 5; k++) {
    const ang = (k * Math.PI * 2) / 5 - Math.PI / 2;
    const px = Math.cos(ang) * 5 * s;
    const py = Math.sin(ang) * 5 * s;
    CIRC(c, px, py, 3.5 * s, petalCols[k % petalCols.length]);
  }
  // Kelopak atas dominan dengan semburat ungu pekat
  CIRC(c, 0, -5.5 * s, 4 * s, '#673ab7');
  // Bintik biru muda di kelopak atas
  CIRC(c, 0, -5.5 * s, 2.5 * s, '#80d8ff');
  // Bintik kuning emas khas di tengah kelopak atas (nectar guide)
  CIRC(c, 0, -5.5 * s, 1.3 * s, '#ffd600');
  // Pusat bunga
  CIRC(c, 0, 0, 1.8 * s, '#fff9c4');
  c.restore();

  c.restore();
}

/* ================= KANVAS: ADEGAN ================= */

/* ================= MASKOT TIM ================= */
function fc(c,x,y,r,t=0){
 const pulse=Math.sin(t/300)*0.5;
 CIRC(c,x,y,r,'#1a1410');
 CIRC(c,x+r*.25,y-r*.25,r*.35+pulse,'#fff');
 CIRC(c,x-r*.2,y+r*.3,r*.15,'rgba(255,255,255,.6)');
}
function sm(c,x,y,w){c.strokeStyle='#241c16';c.lineWidth=4;c.lineCap='round';c.beginPath();c.arc(x,y,w,Math.PI*.1,Math.PI*.9);c.stroke();}
function hl(c,x,y,rx,ry,a1,a2,lw,col='rgba(255,255,255,.5)'){
 c.strokeStyle=col;c.lineWidth=lw;c.lineCap='round';c.beginPath();c.ellipse(x,y,rx,ry,0,a1,a2);c.stroke();
}

function mPadi(c, t=0){
 const breath = Math.sin(t/400)*2, sway=Math.sin(t/800)*4;
 c.save(); c.translate(0, Math.sin(t/600)*3);
 c.lineCap='round';
 c.strokeStyle='#14532d'; c.lineWidth=14;
 c.beginPath();c.moveTo(-14,66);c.quadraticCurveTo(-46-sway,26,-54-sway*2,-14);c.stroke();
 c.beginPath();c.moveTo(14,66);c.quadraticCurveTo(46-sway,26,54-sway*2,-12);c.stroke();
 const lg = c.createLinearGradient(0, -20, 0, 70); lg.addColorStop(0,'#4ade80'); lg.addColorStop(1,'#166534');
 c.strokeStyle=lg; c.lineWidth=10;
 c.beginPath();c.moveTo(-14,66);c.quadraticCurveTo(-46-sway,26,-54-sway*2,-14);c.stroke();
 c.beginPath();c.moveTo(14,66);c.quadraticCurveTo(46-sway,26,54-sway*2,-12);c.stroke();
 hl(c,-44-sway,18,12,30,Math.PI*1.1,Math.PI*1.4, 3);
 hl(c,44-sway,18,12,30,Math.PI*1.6,Math.PI*1.9, 3);
 c.strokeStyle='#14532d'; c.lineWidth=2; c.beginPath();c.moveTo(-30-sway*.5,40);c.lineTo(-44-sway,34);c.moveTo(30-sway*.5,40);c.lineTo(44-sway,34);c.stroke();
 const goldLg = c.createLinearGradient(0,-60,0,70); goldLg.addColorStop(0,'#fef08a'); goldLg.addColorStop(1,'#b45309');
 c.strokeStyle=goldLg; c.lineWidth=8;
 for(let i=-2;i<=2;i++){
  c.beginPath();c.moveTo(i*5,68);c.quadraticCurveTo(i*15-sway,-6,i*21-sway*1.5,-56+Math.abs(i)*4);c.stroke();
  for(let k=0;k<4;k++){
   const px = i*21-sway*1.5+(k%2)*5, py = -56+k*10+Math.abs(i)*4;
   O(c,px,py,6.5,9,'#78350f'); O(c,px,py,5,7.5,goldLg);
   hl(c,px-1,py-2,3,4,Math.PI,Math.PI*1.5,2,'#fff');
  }
 }
 CIRC(c,-8-sway,-30,3.5,'rgba(255,255,255,.9)');CIRC(c,30-sway,-10,3.5,'rgba(255,255,255,.9)');
 fc(c,-14-sway,10+breath,8,t);fc(c,14-sway,10+breath,8,t);sm(c,0-sway,28+breath,10);
 c.globalAlpha=.6;CIRC(c,-26-sway,30+breath,8,'#fb7185');CIRC(c,26-sway,30+breath,8,'#fb7185');c.globalAlpha=1;
 c.restore();
}

function mSnake(c, t=0){
 const breath=Math.sin(t/400)*1.5, sway=Math.sin(t/500)*3;
 c.save(); c.translate(0, Math.sin(t/700)*3); c.lineCap='round';
 c.strokeStyle='#14532d'; c.lineWidth=34;
 c.beginPath();c.moveTo(-30,60);c.quadraticCurveTo(-60,20,-20,-6);c.quadraticCurveTo(20+sway,26+breath,44+sway,-4-breath);c.stroke();
 const lg = c.createLinearGradient(-40,0,50,0); lg.addColorStop(0,'#4ade80'); lg.addColorStop(1,'#16a34a');
 c.strokeStyle=lg; c.lineWidth=28;
 c.beginPath();c.moveTo(-30,60);c.quadraticCurveTo(-60,20,-20,-6);c.quadraticCurveTo(20+sway,26+breath,44+sway,-4-breath);c.stroke();
 hl(c,-42,26,10,20,Math.PI*.8,Math.PI*1.2, 5);
 c.strokeStyle='#bef264'; c.lineWidth=8;
 c.beginPath();c.moveTo(-30,52);c.quadraticCurveTo(-54,12,-20,-14);c.quadraticCurveTo(20+sway,18+breath,44+sway,-12-breath);c.stroke();
 c.strokeStyle='#14532d'; c.lineWidth=6;
 [[-38,40],[-6,8],[28+sway*.5,8+breath*.5]].forEach(p=>{c.beginPath();c.moveTo(p[0]-6,p[1]-10);c.lineTo(p[0]+6,p[1]+10);c.stroke();});
 const headX = 56+sway, headY = -16-breath;
 O(c,headX,headY,24,18,'#14532d'); O(c,headX,headY,22,16,lg);
 O(c,headX-2,headY+4,16,10,'#fef08a');
 hl(c,headX,headY-8,16,10,Math.PI*1.1,Math.PI*1.6, 4);
 fc(c,headX-8,headY-4,7,t);fc(c,headX+8,headY-4,7,t);sm(c,headX-1,headY+8,7);
 if(Math.sin(t/150)>0.8){
  c.strokeStyle='#e11d48';c.lineWidth=4;
  c.beginPath();c.moveTo(headX+14,headY+8);c.lineTo(headX+28,headY+14);
  c.moveTo(headX+28,headY+14);c.lineTo(headX+34,headY+10);
  c.moveTo(headX+28,headY+14);c.lineTo(headX+34,headY+18);c.stroke();
 }
 c.restore();
}

function mMushroom(c, t=0){
 const b=Math.sin(t/300)*2, s=Math.sin(t/600)*3;
 c.save(); c.translate(0, s);
 O(c,0,44,38,28,'#78350f'); O(c,0,44,34,26,'#fef3c7');
 hl(c,18,44,10,18,0,Math.PI*.5,4);
 O(c,0,48,26,18,'rgba(217,119,6,.4)');
 c.fillStyle=LG(c,-64,0,64,0,'#ef4444','#9f1239');
 c.beginPath();c.moveTo(-64,-6-b);c.arc(0,-6-b,64,Math.PI,0);c.quadraticCurveTo(34,22+b,0,24+b);c.quadraticCurveTo(-34,22+b,-64,-6-b);c.fill();
 c.strokeStyle='#7f1d1d'; c.lineWidth=5; c.stroke();
 hl(c,0,-16-b,50,40,Math.PI*1.15,Math.PI*1.75, 6, 'rgba(255,255,255,.4)');
 hl(c,-48,-6-b,10,14,Math.PI*.7,Math.PI*1.3, 4, 'rgba(255,255,255,.4)');
 c.strokeStyle='rgba(120,60,25,.5)';c.lineWidth=3;
 c.beginPath();c.moveTo(-58,-2-b);c.quadraticCurveTo(0,28+b*2,58,-2-b);c.stroke();
 [[-34,-34,6],[-24,-18,4],[24,-46,5],[48,-20,4],[38,-8,3],[0,-54,4]].forEach(p=>{
  CIRC(c,p[0],p[1]-b,p[2]+1,'#7f1d1d'); CIRC(c,p[0],p[1]-b,p[2],'#fef08a');
 });
 fc(c,-12,36+b*.5,6.5,t);fc(c,12,36+b*.5,6.5,t);sm(c,0,48+b*.5,8);
 c.globalAlpha=.6;CIRC(c,-22,52+b*.5,6,'#fb7185');CIRC(c,22,52+b*.5,6,'#fb7185');c.globalAlpha=1;
 c.restore();
}

function mEagle(c, t=0){
 const b=Math.sin(t/250)*1.5, w=Math.sin(t/400)*4;
 c.save(); c.translate(0, Math.sin(t/500)*5);
 O(c,0,14,48,44,'#451a03'); O(c,0,14,44,40,'#b45309');
 hl(c,26,14,14,30,Math.PI*.1,Math.PI*.4,4,'rgba(255,255,255,.3)');
 O(c,-8,8,30,34,'rgba(254,240,138,.6)'); O(c,0,-6,34,26,'#d97706');
 F(c,[[-8,-8],[-70-w,34+b],[-76-w*1.5,58+b*2],[-12,36]],'#78350f');
 F(c,[[8,-8],[70+w,34+b],[76+w*1.5,58+b*2],[12,36]],'#78350f');
 c.strokeStyle='rgba(60,40,20,.4)';c.lineWidth=3;
 for(let i=0;i<3;i++){
  c.beginPath();c.moveTo(-22-i*16,10+i*12);c.quadraticCurveTo(-36-i*16,20+i*12,-48-i*14,34+i*10);c.stroke();
  c.beginPath();c.moveTo(22+i*16,10+i*12);c.quadraticCurveTo(36+i*16,20+i*12,48+i*14,34+i*10);c.stroke();
 }
 O(c,0,16,24,22,'rgba(254,240,138,.5)');
 O(c,0,-46,26,22,'#a8a29e'); O(c,0,-46,24,20,'#ffffff');
 hl(c,0,-54,16,10,Math.PI*1.2,Math.PI*1.8, 4, 'rgba(200,200,200,.5)');
 O(c,-6,-50,14,12,'rgba(200,200,200,.5)');
 F(c,[[16,-52],[40,-46],[16,-40]],'#b45309'); F(c,[[18,-50],[36,-46],[18,-42]],'#fbbf24');
 hl(c,26,-47,6,3,Math.PI*1.1,Math.PI*1.5, 2, '#fff');
 fc(c,-8,-50,7,t);fc(c,10,-50,7,t);
 c.strokeStyle='#4a3a2a';c.lineWidth=3.5;c.beginPath();c.moveTo(-16,-58);c.lineTo(-2,-54);c.moveTo(16,-58);c.lineTo(2,-54);c.stroke();
 F(c,[[-10,48],[0,76],[10,48]],'#d6d3d1'); F(c,[[-8,48],[0,72],[8,48]],'#fff');
 c.strokeStyle='#f59e0b';c.lineWidth=6;c.beginPath();c.moveTo(-16,54);c.lineTo(-22,68);c.moveTo(16,54);c.lineTo(22,68);c.stroke();
 c.restore();
}

function mFrog(c, t=0){
 const b = Math.sin(t/300)*2, s = Math.sin(t/700)*3;
 c.save(); c.translate(0, s);
 O(c,0,10,64,44,'#14532d'); O(c,0,10,60,40+b,'#4ade80');
 hl(c,-44,10,14,24,Math.PI*.7,Math.PI*1.3, 5, 'rgba(255,255,255,.4)');
 hl(c,0,-16+b,44,20,Math.PI*1.2,Math.PI*1.8, 6, 'rgba(255,255,255,.5)');
 O(c,-10,2,38,30,'rgba(187,247,208,.6)'); O(c,0,26+b,42,26,'#a3e635');
 [[-32,8],[30,-2],[12,4],[-8,18]].forEach(p=>{ CIRC(c,p[0],p[1],4.5,'#15803d'); CIRC(c,p[0]+1,p[1]-1,1.5,'rgba(255,255,255,.6)'); });
 O(c,-20,-6,14,8,'rgba(255,255,255,.45)');
 CIRC(c,-26,-34,18,'#14532d'); CIRC(c,26,-34,18,'#14532d');
 CIRC(c,-26,-34,16,'#f0fdf4'); CIRC(c,26,-34,16,'#f0fdf4');
 hl(c,-26,-42,10,6,Math.PI,Math.PI*2, 3, 'rgba(200,200,200,.6)');
 hl(c,26,-42,10,6,Math.PI,Math.PI*2, 3, 'rgba(200,200,200,.6)');
 CIRC(c,-26,-34,10.5,'#eab308'); CIRC(c,26,-34,10.5,'#eab308');
 O(c,-26,-34,7,4,'#1a1410'); O(c,26,-34,7,4,'#1a1410');
 CIRC(c,-23,-37,2.5,'#fff'); CIRC(c,29,-37,2.5,'#fff');
 c.strokeStyle='#1a1410';c.lineWidth=5;c.beginPath();c.arc(0,-6+b,16,.15*Math.PI,.85*Math.PI);c.stroke();
 c.globalAlpha=.6;CIRC(c,-42,-6+b,10,'#fb7185');CIRC(c,42,-6+b,10,'#fb7185');c.globalAlpha=1;
 c.strokeStyle='#16a34a';c.lineWidth=12;c.lineCap='round';
 c.beginPath();c.moveTo(-42,40+b);c.lineTo(-62,56+b);c.moveTo(42,40+b);c.lineTo(62,56+b);c.stroke();
 CIRC(c,-62,56+b,6.5,'#4ade80'); CIRC(c,62,56+b,6.5,'#4ade80');
 c.restore();
}

function mTurtle(c, t=0){
 const b=Math.sin(t/400)*1, s=Math.sin(t/800)*3, f=Math.sin(t/200)*6;
 c.save(); c.translate(0, s);
 c.strokeStyle='#0f172a'; c.lineWidth=8; c.lineCap='round'; c.lineJoin='round';
 // Flippers
 c.beginPath();c.moveTo(-24,6);c.quadraticCurveTo(-60,10-f,-70,26-f);c.quadraticCurveTo(-40,30,-20,16);c.stroke();
 c.fillStyle='#0ea5e9'; c.fill();
 c.beginPath();c.moveTo(24,6);c.quadraticCurveTo(60,10-f,70,26-f);c.quadraticCurveTo(40,30,20,16);c.stroke();
 c.fillStyle='#0ea5e9'; c.fill();
 // Head
 O(c,0,-34,20,24,'#0f172a'); O(c,0,-34,16,20,'#38bdf8');
 hl(c,0,-46,10,6,Math.PI*1.1,Math.PI*1.9, 3, '#fff');
 fc(c,-8,-36,4,t); fc(c,8,-36,4,t);
 // Shell Back
 O(c,0,16,46,50,'#0f172a'); O(c,0,16,42,46,'#0369a1');
 const lg = c.createRadialGradient(0,0,10,0,16,40); lg.addColorStop(0,'#0284c7'); lg.addColorStop(1,'#0c4a6e');
 O(c,0,16,38,42,lg);
 hl(c,0,-16,26,16,Math.PI*1.1,Math.PI*1.9, 4, 'rgba(255,255,255,.3)');
 c.strokeStyle='#0284c7'; c.lineWidth=4;
 [[0,-8],[0,16],[0,40],[-20,4],[20,4],[-20,28],[20,28]].forEach(p=>{
  c.beginPath();c.moveTo(p[0]-10,p[1]);c.lineTo(p[0],p[1]-8);c.lineTo(p[0]+10,p[1]);c.lineTo(p[0],p[1]+8);c.closePath();c.stroke();
 });
 c.restore();
}

const MASC={padiBig:mPadi,snake:mSnake,mushroom:mMushroom,eagle:mEagle,frog:mFrog,harimau:mEagle,bangau:mFrog,penyu:mTurtle};


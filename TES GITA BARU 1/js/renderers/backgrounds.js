/* ============================================================
   ECO-EXPLORER — js/renderers/backgrounds.js
   Background Scenes 60 FPS (Sawah, Hutan, Sungai, Laut) & Konfeti
   ============================================================ */

function skyPaint(c,top,bot,hor){c.fillStyle=LG(c,0,0,0,hor,top,bot);c.fillRect(0,0,1920,hor);}
/* Matahari bertekstur prosedural: halo + limb darkening + granulasi noise
   (tile noise dibuat sekali & di-cache) + pusaran plasma animasi + sinar.
   Signature sama seperti sunDraw lama sehingga 3 biome tak perlu diubah. */
var SUNNOISE=null;

function parseHexRgb(hex) {
  return [parseInt(hex.substr(1,2),16), parseInt(hex.substr(3,2),16), parseInt(hex.substr(5,2),16)];
}

function fastLerpColor(rgb1, rgb2, t) {
  const r = Math.round(rgb1[0] + (rgb2[0]-rgb1[0])*t),
        g = Math.round(rgb1[1] + (rgb2[1]-rgb1[1])*t),
        b = Math.round(rgb1[2] + (rgb2[2]-rgb1[2])*t);
  return `rgb(${r},${g},${b})`;
}

function lerpColor(c1, c2, t) {
  const r1 = parseInt(c1.substr(1,2),16), g1 = parseInt(c1.substr(3,2),16), b1 = parseInt(c1.substr(5,2),16);
  const r2 = parseInt(c2.substr(1,2),16), g2 = parseInt(c2.substr(3,2),16), b2 = parseInt(c2.substr(5,2),16);
  const r = Math.round(r1 + (r2-r1)*t), g = Math.round(g1 + (g2-g1)*t), b = Math.round(b1 + (b2-b1)*t);
  return `rgb(${r},${g},${b})`;
}

const SKY_STOPS = [
  {p: 0.0, top: '#3b82f6', bot: '#bae6fd', sunY: -20}, 
  {p: 0.3, top: '#0ea5e9', bot: '#e0f2fe', sunY: 40},  
  {p: 0.5, top: '#6366f1', bot: '#fde047', sunY: 100}, 
  {p: 0.55, top: '#f43f5e', bot: '#fb923c', sunY: 220}, 
  {p: 0.6, top: '#1e1b4b', bot: '#4c1d95', sunY: 450}, 
  {p: 0.8, top: '#020617', bot: '#0f172a', sunY: 450}, 
  {p: 0.95, top: '#312e81', bot: '#f472b6', sunY: 300}, 
  {p: 1.0, top: '#3b82f6', bot: '#bae6fd', sunY: -20}  
];

SKY_STOPS.forEach(s => {
  s.topRgb = parseHexRgb(s.top);
  s.botRgb = parseHexRgb(s.bot);
});

function getSkyState(t) {
  const cycle = (t % 60000) / 60000;
  let s1 = SKY_STOPS[0], s2 = SKY_STOPS[1];
  for (let i=0; i<SKY_STOPS.length-1; i++) {
    if (cycle >= SKY_STOPS[i].p && cycle <= SKY_STOPS[i+1].p) {
      s1 = SKY_STOPS[i]; s2 = SKY_STOPS[i+1]; break;
    }
  }
  const factor = (cycle - s1.p) / (s2.p - s1.p);
  return {
    top: (s1.topRgb && s2.topRgb) ? fastLerpColor(s1.topRgb, s2.topRgb, factor) : lerpColor(s1.top, s2.top, factor),
    bot: (s1.botRgb && s2.botRgb) ? fastLerpColor(s1.botRgb, s2.botRgb, factor) : lerpColor(s1.bot, s2.bot, factor),
    sunY: s1.sunY + (s2.sunY - s1.sunY) * factor,
    isNight: cycle > 0.55 && cycle < 0.95,
    nightFade: cycle > 0.55 && cycle < 0.6 ? (cycle-0.55)/0.05 : (cycle > 0.9 && cycle < 0.95 ? 1-(cycle-0.9)/0.05 : (cycle >= 0.6 && cycle <= 0.9 ? 1 : 0))
  };
}

function chunkyCloud(c, x, y, scale) {
  c.save();
  c.translate(x, y);
  c.scale(scale, scale);
  c.fillStyle = 'rgba(0,0,0,0.08)';
  c.beginPath(); c.arc(0, 0, 40, 0, 7); c.arc(30, -10, 30, 0, 7); c.arc(-30, 5, 25, 0, 7); c.fill();
  c.fillStyle = '#e2e8f0';
  c.beginPath(); c.arc(0, -5, 40, 0, 7); c.arc(30, -15, 30, 0, 7); c.arc(-30, 0, 25, 0, 7); c.fill();
  c.fillStyle = '#ffffff';
  c.beginPath(); c.arc(0, -10, 38, 0, 7); c.arc(30, -20, 28, 0, 7); c.arc(-30, -5, 23, 0, 7); c.fill();
  c.restore();
}

function drawCloudLayer(c, t, speed, scale, yOff, yVar, count) {
  const w = 1920;
  for (let i=0; i<count; i++) {
    const space = (w + 600) / count;
    let x = (i * space + (t * speed)) % (w + 600) - 300;
    let y = yOff + pr(i*7.7) * yVar;
    chunkyCloud(c, x, y, scale * (0.8 + pr(i*5)*0.4));
  }
}

function drawDynamicSky(c, hor, t, sunX) {
  const st = getSkyState(t);
  c.fillStyle = LG(c, 0, 0, 0, hor, st.top, st.bot);
  c.fillRect(0, 0, 1920, hor);

  if (st.nightFade > 0) {
    c.save();
    c.fillStyle = '#fff';
    for (let i=0; i<150; i++) {
      const sx = pr(i*1.1)*1920;
      const sy = pr(i*2.2)*hor;
      const r = pr(i*3.3)*2 + 0.5;
      c.globalAlpha = st.nightFade * (0.2 + 0.8 * Math.abs(Math.sin(t/800 + i)));
      c.beginPath(); c.arc(sx, sy, r, 0, 7); c.fill();
    }
    c.restore();
  }

  if (st.sunY < hor + 120) {
    c.save();
    c.beginPath();
    c.rect(0, 0, 1920, hor);
    c.clip();
    sunDraw(c, sunX, st.sunY, t);
    c.restore();
  }

  c.globalAlpha = 1.0 - (st.nightFade * 0.7);
  drawCloudLayer(c, t, 0.02, 0.5, 30, hor * 0.3, 5);
  drawCloudLayer(c, t, 0.04, 0.8, 120, hor * 0.5, 4);
  drawCloudLayer(c, t, 0.07, 1.2, 50, hor * 0.2, 3);
  c.globalAlpha = 1.0;
}

function sunNoise(){if(SUNNOISE)return SUNNOISE;
  const n=document.createElement('canvas');n.width=n.height=128;
  const g=n.getContext('2d');g.clearRect(0,0,128,128);
  for(let i=0;i<800;i++){const x=pr(i*1.71)*128,y=pr(i*3.33+5)*128,r=.5+pr(i*7.13)*1.5;
    g.fillStyle=i%2?'rgba(255,255,255,.32)':'rgba(170,85,10,.32)';
    g.beginPath();g.arc(x,y,r,0,7);g.fill();}
  SUNNOISE=n;return n;}
function sunDraw(c,x,y,t){
  // halo luar lembut
  const hg=c.createRadialGradient(x,y,40,x,y,115);
  hg.addColorStop(0,'rgba(255,215,110,.5)');hg.addColorStop(1,'rgba(255,215,110,0)');
  c.fillStyle=hg;c.beginPath();c.arc(x,y,115,0,7);c.fill();
  // sinar putar (dipertahankan dari versi lama)
  c.strokeStyle='rgba(255,215,110,.55)';c.lineWidth=6;
  for(let i=0;i<10;i++){const a=t/2400+i*Math.PI/5;c.beginPath();c.moveTo(x+Math.cos(a)*64,y+Math.sin(a)*64);c.lineTo(x+Math.cos(a)*(82+Math.sin(t/300+i)*7),y+Math.sin(a)*(82+Math.sin(t/300+i)*7));c.stroke();}
  // cakram + limb darkening (terang tengah, oranye ke tepi)
  const g=c.createRadialGradient(x-10,y-12,5,x,y,50);
  g.addColorStop(0,'#fff3c4');g.addColorStop(.55,'#ffd76e');g.addColorStop(1,'#ef9a1a');
  c.fillStyle=g;c.beginPath();c.arc(x,y,50,0,7);c.fill();
  // tekstur ter-clip lingkaran
  c.save();c.beginPath();c.arc(x,y,50,0,7);c.clip();
  c.globalAlpha=.32;c.globalCompositeOperation='overlay';
  const nz=sunNoise(),rot=t/9000;
  c.save();c.translate(x,y);c.rotate(rot);c.drawImage(nz,-50,-50,100,100);c.restore();
  c.save();c.translate(x,y);c.rotate(-rot*1.6);c.scale(1.4,1.4);c.drawImage(nz,-50,-50,100,100);c.restore();
  c.globalCompositeOperation='source-over';c.globalAlpha=1;
  // pusaran plasma terang & gelap berputar lambat
  c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=3;c.lineCap='round';
  for(let i=0;i<3;i++){const a0=t/3000+i*2.094;c.beginPath();c.arc(x,y,18+i*9,a0,a0+1.5);c.stroke();}
  c.strokeStyle='rgba(200,110,10,.25)';c.lineWidth=2;
  for(let i=0;i<3;i++){const a0=-t/3600+i*2.094+.5;c.beginPath();c.arc(x,y,14+i*10,a0,a0+1.2);c.stroke();}
  c.restore();}
function cloud(c,x,y,s){O(c,x,y,42*s,20*s,'rgba(255,255,255,.85)');O(c,x+34*s,y+6*s,30*s,15*s,'rgba(255,255,255,.85)');O(c,x-32*s,y+8*s,26*s,13*s,'rgba(255,255,255,.85)');}
function cloudsDraw(c,t){const off=(t/90)%2400-300;cloud(c,off,120,1.1);cloud(c,(off+900)%2400-300,210,.8);cloud(c,(off+1700)%2400-300,150,.95);}

/* Nilai display yang di-lerp tiap frame (60fps) agar perubahan stat
   (aksi +30, tick harian, hujan) terlihat mengalir, bukan patah.
   Logika misi/target/health TETAP pakai nilai asli S.* */
function sdp(S,k,target){const d='_d'+k;if(S[d]===undefined||typeof S[d]!=='number')S[d]=target;
 S[d]+=(target-S[d])*.07;if(Math.abs(target-S[d])<.05)S[d]=target;return S[d];}
function wdisp(S){return sdp(S,'w',S.water||0);}
function hdisp(S){return sdp(S,'h',S.heat||0);}

/* ============================================================
   ORGANISM LIFECYCLE POOL & STATE MACHINE (ANIMASI NATURAL IN/OUT)
   ============================================================ */
function initOrganismPool(S) {
  if (!S) return {};
  if (!S._orgPool) S._orgPool = {};
  return S._orgPool;
}

function syncOrganismPool(S, key, targetCount, factoryFn, options = {}) {
  initOrganismPool(S);
  if (!S._orgPool[key]) S._orgPool[key] = [];
  const list = S._orgPool[key];
  const isPlant = options.isPlant !== false;
  const durationIn = options.durationIn || (isPlant ? 1600 : 1100);
  const durationOut = options.durationOut || (isPlant ? 1500 : 1000);

  const activeEntities = list.filter(e => e.state === 'spawning' || e.state === 'alive');
  const currentActive = activeEntities.length;

  if (targetCount > currentActive) {
    const toAdd = targetCount - currentActive;
    let spawnedAudio = false;
    for (let k = 0; k < toAdd; k++) {
      const idx = currentActive + k;
      const base = factoryFn(idx, pr(idx * 17 + 3));
      const ent = {
        id: key + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: key,
        isPlant: isPlant,
        state: 'spawning',
        progress: 0.0,
        duration: durationIn,
        x: base.x,
        y: base.y,
        originX: base.x,
        originY: base.y,
        targetX: base.x,
        targetY: base.y,
        scale: isPlant ? 0.1 : 1.0,
        scaleY: isPlant ? 0.1 : 1.0,
        wither: 0.0,
        fade: 1.0,
        seed: base.seed !== undefined ? base.seed : idx,
        extra: base
      };

      if (!isPlant) {
        const fromLeft = base.x < 960;
        ent.originX = fromLeft ? -100 : 2020;
        ent.originY = base.y;
        ent.x = ent.originX;
        ent.y = ent.originY;
        ent.targetX = base.x;
        ent.targetY = base.y;
      }

      list.push(ent);
      if (!spawnedAudio && typeof sfx !== 'undefined' && sfx.grow) {
        try { sfx.grow(); } catch (e) {}
        spawnedAudio = true;
      }
    }
  } else if (targetCount < currentActive) {
    const toRemove = currentActive - targetCount;
    let removedAudio = false;
    for (let k = 0; k < toRemove; k++) {
      const ent = activeEntities[activeEntities.length - 1 - k];
      if (!ent) break;

      const hasPoison = (S.poison || 0) > 15;
      const hasDrought = (S.water !== undefined && S.water < 30);
      const hasHeat = (S.heat !== undefined && S.heat > 75);
      const isHarmContext = hasPoison || hasDrought || hasHeat;

      if (isPlant || isHarmContext) {
        ent.state = 'withering';
        ent.duration = durationOut;
        ent.progress = 0.0;
        if (!removedAudio && typeof sfx !== 'undefined' && sfx.wither) {
          try { sfx.wither(); } catch (e) {}
          removedAudio = true;
        }
      } else {
        ent.state = 'fleeing';
        ent.duration = durationOut;
        ent.progress = 0.0;
        ent.originX = ent.x;
        ent.originY = ent.y;
        const fleeLeft = ent.x < 960;
        ent.targetX = fleeLeft ? -150 : 2070;
        ent.targetY = ent.y + (pr(ent.seed * 7) * 80 - 40);
        if (!removedAudio && typeof sfx !== 'undefined' && sfx.flee) {
          try { sfx.flee(); } catch (e) {}
          removedAudio = true;
        }
      }
    }
  }

  return list;
}

function updateOrganismPool(S, dt = 16.7) {
  if (!S || !S._orgPool) return;
  for (const key in S._orgPool) {
    const list = S._orgPool[key];
    for (let i = list.length - 1; i >= 0; i--) {
      const e = list[i];
      e.progress += dt / (e.duration || 1000);
      if (e.progress > 1.0) e.progress = 1.0;

      if (e.state === 'spawning') {
        const t = e.progress;
        if (e.isPlant) {
          e.scaleY = Math.min(1.0, 0.1 + 0.9 * Math.sin(t * Math.PI * 0.5));
          e.scale = Math.min(1.0, 0.4 + 0.6 * t);
          e.fade = Math.min(1.0, t * 1.5);
        } else {
          const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          e.x = e.originX + (e.targetX - e.originX) * ease;
          e.y = e.originY + (e.targetY - e.originY) * ease;
        }
        if (e.progress >= 1.0) {
          e.state = 'alive';
          e.progress = 0.0;
          e.scaleY = 1.0;
          e.scale = 1.0;
          e.fade = 1.0;
          e.x = e.targetX;
          e.y = e.targetY;
        }
      } else if (e.state === 'withering') {
        const t = e.progress;
        e.wither = t;
        if (e.isPlant) {
          e.scaleY = Math.max(0.2, 1.0 - t * 0.7);
          e.fade = Math.max(0.0, 1.0 - t);
        } else {
          e.fade = Math.max(0.0, 1.0 - t * 1.2);
        }
        if (e.progress >= 1.0) {
          e.state = 'dead';
        }
      } else if (e.state === 'fleeing') {
        const t = e.progress;
        const ease = t * t;
        e.x = e.originX + (e.targetX - e.originX) * ease;
        e.y = e.originY + (e.targetY - e.originY) * ease;
        e.fade = Math.max(0.0, 1.0 - Math.max(0, (t - 0.6) / 0.4));
        if (e.progress >= 1.0) {
          e.state = 'dead';
        }
      }

      if (e.state === 'dead') {
        list.splice(i, 1);
      }
    }
  }
}



/* ================= LANSKAP SAWAH TERASERING NUSANTARA ================= */

// Pegunungan Suasana Hutan Tropis (texRidge berlapis dengan vegetasi alami)
function drawSawahMountains(c, t) {
  texRidge(c, [[0, 380], [340, 250], [720, 380]], '#8fb996', 51);
  texRidge(c, [[520, 380], [960, 210], [1400, 380]], '#7fae7c', 63);
  texRidge(c, [[0, 380], [500, 300], [1000, 380], [1500, 310], [1920, 380]], '#5e8f63', 77);
}

// Capung Sawah Lincah (Dragonfly hovering & darting)
function drawDragonfly(c, x, y, t, seed) {
  c.save();
  c.translate(x, y);
  const hoverSway = Math.sin(t * 0.005 + seed * 2.3) * 0.12;
  c.rotate(hoverSway);

  const col = seed % 2 === 0 ? '#1f7a6c' : '#bd7824';
  c.strokeStyle = col;
  c.lineWidth = 2.0;
  c.beginPath();
  c.moveTo(-10, 0);
  c.lineTo(12, 0);
  c.stroke();

  c.fillStyle = '#183832';
  c.beginPath();
  c.arc(-11, 0, 2.5, 0, Math.PI * 2);
  c.fill();

  const wingBeat = Math.sin(t * 0.08 + seed * 1.7) * 7;
  c.fillStyle = 'rgba(215, 245, 255, 0.65)';
  c.strokeStyle = 'rgba(180, 220, 240, 0.85)';
  c.lineWidth = 0.8;

  [-1, 1].forEach(side => {
    c.beginPath();
    c.ellipse(-2, side * (8 + wingBeat * 0.3), 11, 3.2, side * 0.25, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    c.beginPath();
    c.ellipse(4, side * (7 - wingBeat * 0.3), 9, 2.8, side * -0.2, 0, Math.PI * 2);
    c.fill();
    c.stroke();
  });

  c.restore();
}

// Burung Pipit / Sriti Melayang di Angkasa Bukit
function drawSawahBirds(c, t) {
  c.save();
  const birds = [
    { bx: 460 + ((t * 0.065) % 2100) - 100, by: 195 + Math.sin(t * 0.003) * 18, s: 0.9 },
    { bx: 510 + ((t * 0.065) % 2100) - 100, by: 215 + Math.sin(t * 0.003 + 0.8) * 16, s: 0.75 },
    { bx: 1350 + (((t + 4000) * 0.055) % 2100) - 100, by: 180 + Math.cos(t * 0.0028) * 20, s: 0.85 }
  ];

  birds.forEach((b, bi) => {
    const flap = Math.sin(t * 0.012 + bi * 1.5) * 5 * b.s;
    c.strokeStyle = '#2b3834';
    c.lineWidth = 1.6 * b.s;
    c.beginPath();
    c.moveTo(b.bx - 9 * b.s, b.by - flap);
    c.quadraticCurveTo(b.bx - 4 * b.s, b.by, b.bx, b.by + 2 * b.s);
    c.quadraticCurveTo(b.bx + 4 * b.s, b.by, b.bx + 9 * b.s, b.by - flap);
    c.stroke();
  });
  c.restore();
}

function sceneSawah(c,t,S){
  S = S || {};
  // 1. Decrement irrigation flow timer
  if (S._irrigationFlowTimer !== undefined && S._irrigationFlowTimer > 0) {
    S._irrigationFlowTimer--;
  }

  // 2. Latar Belakang & Langit Dinamis
  c.fillStyle = '#5c8a58';
  c.fillRect(0, 0, 1920, 1080);
  drawDynamicSky(c, 370, t, 1620);
  drawSawahMountains(c, t);
  drawSawahBirds(c, t);

  // 3. Dasar Petak Terasering Sawah Organik
  const wv = wdisp(S), wf = c01(wv / 75);
  const isDrought = S.water !== undefined && S.water < 32;
  const wg = c.createLinearGradient(0, 420, 0, 1080);
  if (isDrought) {
    wg.addColorStop(0, '#c79d62');
    wg.addColorStop(0.45, '#997444');
    wg.addColorStop(1, '#75542e');
  } else {
    wg.addColorStop(0, mixc('#876136', '#b5e1ef', wf * 0.85));
    wg.addColorStop(0.45, mixc('#664422', '#4b98b7', wf * 0.85));
    wg.addColorStop(1, mixc('#4f3216', '#2b6988', wf * 0.85));
  }

  c.save();
  c.beginPath();
  c.moveTo(0, 1080);
  c.quadraticCurveTo(140, 720, 280, 420);
  c.lineTo(1640, 420);
  c.quadraticCurveTo(1780, 720, 1920, 1080);
  c.closePath();
  c.fillStyle = wg;
  c.fill();
  c.restore();

  // 4. Lapisan Tanah, Pematang 3D, Retakan Poligonal, & Pintu Air Tulakan
  texSoilSawah(c, t, S);
  if (S._irrigationFlowTimer > 0) drawSawahIrrigationSurge(c, t, S);

  // 5. Rerumputan & Vegetasi Tepi Lereng Sawah
  for (let k = 0; k < 12; k++) {
    const f = k / 11, ly = 1080 + (420 - 1080) * f, s = 0.5 + f * 0.9;
    spGrass(c, 0 + (280 - 0) * f - 40 - pr(7 + k * 1.3) * 60, ly, s, 7 + k, t);
    spGrass(c, 1920 + (1640 - 1920) * f + 40 + pr(47 + k * 1.3) * 60, ly, s, 47 + k, t);
  }
  updateOrganismPool(S, 16.7);

  // 1. PADI (Tunas Bertumbuh, Rumpun Lebat, & Padi Menari Bergelombang Angin)
  const rows = [
    { y: 535, scale: 0.60, tier: 1 },
    { y: 680, scale: 0.78, tier: 1 },
    { y: 835, scale: 0.94, tier: 2 },
    { y: 995, scale: 1.10, tier: 3 }
  ];

  rows.forEach((r, ri) => {
    // Pola Jajar Legowo: kepadatan teratur sejak awal (min 9 rumpun per baris saat Hari 1, hingga 13 saat subur agar total entitas <= 60)
    const n = Math.min(13, Math.max(9, Math.round((S.prod || 30) / 4.6)));
    syncOrganismPool(S, 'sawah_rice_' + ri, n, (i, seed) => {
      const x = 180 + (i + 0.5) * (1560 / Math.max(1, n)) + (ri % 2) * 32;
      return { x, y: r.y, r1: r.scale, ri, i, seed };
    }, { isPlant: true, durationIn: 1600, durationOut: 1400 });

    const rices = (S._orgPool && S._orgPool['sawah_rice_' + ri]) || [];
    rices.forEach(ent => {
      c.save();
      c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;

      // Kematangan & warna dinamis
      const isGolden = (S.prod || 0) > 46;
      const baseCol = isGolden ? '#5fa848' : '#3f9a4e';
      const witherCol = '#8c6c38';
      const col = ent.wither > 0 ? mixc(baseCol, witherCol, ent.wither) : baseCol;
      const r1 = ent.extra ? ent.extra.r1 : r.scale;
      const hgt = (34 + (S.prod || 30) * 0.32) * r1 * (0.85 + pr(ri * 40 + (ent.extra ? ent.extra.i : 0)) * 0.3) * (ent.scaleY || 1.0);

      // Krisis wereng (hopperburn) & kekeringan
      const hopperburn = (S.wereng && S.wereng > 15) ? Math.min(1.0, (S.wereng - 15) / 50) : 0;
      const droughtSeverity = (S.water !== undefined && S.water < 32) ? (32 - S.water) / 32 : 0;

      // Algoritma Gelombang Angin Menjalar Semilir Alami ("Padi Menari" - Halus & Proporsional)
      const windWave1 = Math.sin(t * 0.0013 - ent.x * 0.0018 + ri * 0.65);
      const windWave2 = Math.cos(t * 0.0022 + ent.x * 0.0035) * 0.3;
      // Reduksi ~60% ke kisaran sepoi-sepoi tenang 6 - 11px
      const baseSway = (windWave1 + windWave2) * (3.2 + r1 * 4.8);
      // Damped sway: tanaman layu atau krisis berayun lebih kaku dan lunglai alami
      const swayDamp = Math.max(0.18, 1.0 - (ent.wither || 0) * 0.75 - droughtSeverity * 0.45 - hopperburn * 0.45);
      const sway = baseSway * swayDamp;

      if (ent.wither > 0) {
        c.translate(ent.x, ent.y);
        c.rotate(ent.wither * 0.38);
        c.translate(-ent.x, -ent.y);
      }

      spRice(c, ent.x, ent.y, hgt, col, sway, {
        isGolden,
        hopperburn,
        drought: droughtSeverity
      });
      c.restore();
    });
  });

  // 1b. HAMA WERENG COKELAT (Aktif saat S.wereng > 0)
  if (S.wereng !== undefined && S.wereng > 0) {
    const nw = Math.min(18, Math.max(0, Math.round(S.wereng / 4)));
    syncOrganismPool(S, 'sawah_wereng', nw, (i) => {
      const rx = 180 + pr(i * 19.7) * 1560;
      const ry = 530 + pr(i * 23.3) * 390;
      return { x: rx, y: ry, seed: i };
    }, { isPlant: false, durationIn: 700, durationOut: 1100 });

    const werengs = (S._orgPool && S._orgPool['sawah_wereng']) || [];
    werengs.forEach(ent => {
      c.save();
      c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
      const isDying = ent.state === 'withering' || ent.state === 'fleeing';
      spWereng(c, ent.x, ent.y, t, ent.seed || 0, isDying, ent.progress || 0);
      c.restore();
    });
  }

  // 2. TIKUS (Lari Masuk & Kabur/Lemas)
  const nm = Math.min(6, Math.round(S.herb / 6));
  syncOrganismPool(S, 'sawah_mouse', nm, (i) => {
    return { x: 300 + pr(i * 13 + 5) * 1300, y: 470 + pr(i * 3) * 420, seed: i };
  }, { isPlant: false, durationIn: 1100, durationOut: 1000 });

  const mice = (S._orgPool && S._orgPool['sawah_mouse']) || [];
  mice.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    if (ent.state === 'alive') {
      const sp = pr(ent.seed * 7 + 1) * 0.06 + 0.04;
      const mx = ((t * sp * 10 + ent.seed * 430) % 2200) - 140;
      spMouse(c, mx, ent.y);
    } else if (ent.state === 'withering') {
      c.translate(ent.x, ent.y);
      c.rotate(ent.wither * 0.75);
      spMouse(c, 0, 0);
    } else {
      spMouse(c, ent.x, ent.y);
    }
    c.restore();
  });

  // 3. ULAR (Meliuk Masuk & Kabur)
  const ns = Math.min(4, Math.round(S.pred / 2.2));
  syncOrganismPool(S, 'sawah_snake', ns, (i) => {
    return { x: 300 + pr(i * 11) * 1300, y: 650 + pr(i * 5) * 250, seed: i };
  }, { isPlant: false, durationIn: 1200, durationOut: 1000 });

  const snakes = (S._orgPool && S._orgPool['sawah_snake']) || [];
  snakes.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    spSnake(c, ent.x, ent.y, t);
    c.restore();
  });

  // 4. KATAK (Melompat Masuk & Kabur Melompat)
  const nf = Math.min(4, Math.round(S.pred / 2));
  syncOrganismPool(S, 'sawah_frog', nf, (i) => {
    return { x: 220 + pr(i * 13) * 1500, y: 880 + pr(i * 17) * 120, seed: i };
  }, { isPlant: false, durationIn: 1000, durationOut: 900 });

  const frogs = (S._orgPool && S._orgPool['sawah_frog']) || [];
  frogs.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    let hopY = 0;
    if (ent.state === 'spawning') {
      hopY = Math.abs(Math.sin(ent.progress * Math.PI * 3)) * 28 * (1 - ent.progress);
    } else if (ent.state === 'fleeing') {
      hopY = Math.abs(Math.sin(ent.progress * Math.PI * 4)) * 34;
    }
    spFrog(c, ent.x, ent.y - hopY, t);
    c.restore();
  });

  // Capung Sawah Melayang di Atas Padi & Air
  for (let d = 0; d < 3; d++) {
    const dfx = 350 + pr(d * 19) * 1200 + Math.sin(t * 0.0018 + d * 2.2) * 120;
    const dfy = 480 + pr(d * 31) * 380 + Math.cos(t * 0.0025 + d * 1.7) * 45;
    drawDragonfly(c, dfx, dfy, t, d);
  }
  for(let i=0;i<3;i++)butterfly(c,300+pr(i*23)*1300+Math.sin(t/700+i*2)*60,320+pr(i*29)*160+Math.cos(t/900+i)*40,t,i);
  if(S.poison>15){c.fillStyle='rgba(96,60,130,'+(c01(S.poison/150)*.5).toFixed(3)+')';c.fillRect(0,360,1920,720);}}


/* ============================================================
   ANIMASI INTERAKTIF DINAMIS AKSI 4 BIOMA (60 FPS Procedural)
   - Mata Air Hutan: Glistening Spring Cascade & Moist Soil Sheen
   - Pemadam Api Hutan: Steam Cloud & Asap Putih Meredam Bara
   - Irigasi Sawah: Semburan Air Berbusa Tulakan & Riak Terasering
   - Pintu Air Sungai: Gelombang Arus Hulu Menderu & Buih Jernih
   - Naungan Terumbu Karang: Tirai Pelindung Permukaan & Gelembung Sejuk
   ============================================================ */

function drawForestSpringCascade(c, t, S) {
  const active = S._springFlowTimer !== undefined && S._springFlowTimer > 0;
  const flowAlpha = active ? Math.min(1.0, 0.45 + (S._springFlowTimer / 160) * 0.55) : 0.55;
  c.save();
  // 1. Grotto Mata Air Alami di Sisi Lereng Bukit (X: 380, Y: 300)
  c.fillStyle = '#264e36';
  c.beginPath();
  c.arc(380, 310, 38, 0, Math.PI * 2);
  c.fill();
  
  // 2. Pancaran Air Utama Berkelok Menuruni Lereng Rimba
  const numSteps = 28;
  const pts = [];
  for (let i = 0; i <= numSteps; i++) {
    const prog = i / numSteps;
    const px = 380 + prog * 440 + Math.sin(prog * Math.PI * 2.8 + t * 0.006) * 32;
    const py = 310 + prog * 460 + Math.cos(prog * Math.PI * 2 + t * 0.005) * 14;
    pts.push({ x: px, y: py, prog });
  }

  // Lapisan Dasar Air (Toska Sejuk)
  c.beginPath();
  pts.forEach((p, idx) => {
    if (idx === 0) c.moveTo(p.x, p.y);
    else c.lineTo(p.x, p.y);
  });
  c.strokeStyle = 'rgba(14, 165, 233, ' + (flowAlpha * 0.75).toFixed(3) + ')';
  c.lineWidth = 28;
  c.lineCap = 'round';
  c.stroke();

  // Lapisan Inti Air Jernih Berarus Sinusoidal
  c.beginPath();
  pts.forEach((p, idx) => {
    if (idx === 0) c.moveTo(p.x, p.y);
    else c.lineTo(p.x, p.y);
  });
  c.strokeStyle = 'rgba(186, 230, 253, ' + (flowAlpha * 0.9).toFixed(3) + ')';
  c.lineWidth = 14;
  c.stroke();

  // Riak Buih & Gelombang Putih Menjalar ke Bawah
  c.strokeStyle = 'rgba(255, 255, 255, ' + (flowAlpha * 0.95).toFixed(3) + ')';
  c.lineWidth = 4;
  for (let i = 2; i < pts.length - 2; i += 3) {
    const p = pts[i];
    const waveOffset = Math.sin(t * 0.01 + p.prog * 18) * 12;
    c.beginPath();
    c.arc(p.x + waveOffset, p.y, 4 + p.prog * 6, 0, Math.PI * 2);
    c.stroke();
  }

  // 3. Kolam Resapan Alami di Lantai Rimba (X: 820, Y: 770)
  c.fillStyle = 'rgba(56, 189, 248, ' + (flowAlpha * 0.6).toFixed(3) + ')';
  c.beginPath();
  c.ellipse(820, 770, 95, 36, -0.08, 0, Math.PI * 2);
  c.fill();
  
  c.strokeStyle = 'rgba(255, 255, 255, ' + (flowAlpha * 0.7).toFixed(3) + ')';
  c.lineWidth = 2;
  const ripR = (t * 0.04) % 60;
  c.beginPath();
  c.ellipse(820, 770, 40 + ripR, 16 + ripR * 0.4, -0.08, 0, Math.PI * 2);
  c.stroke();

  // 4. Kilau Air Sejuk (Sparkles)
  for (let s = 0; s < 5; s++) {
    const sx = 400 + pr(s * 19) * 400 + Math.sin(t * 0.004 + s) * 20;
    const sy = 330 + pr(s * 23) * 400;
    const spAlpha = Math.max(0, Math.sin(t * 0.008 + s * 2));
    c.fillStyle = 'rgba(254, 240, 138, ' + (spAlpha * flowAlpha).toFixed(3) + ')';
    c.beginPath();
    c.arc(sx, sy, 3 + s * 0.8, 0, Math.PI * 2);
    c.fill();
  }
  c.restore();
}

function drawForestRainStorm(c, t, S) {
  if (!S._fireExtinguishTimer || S._fireExtinguishTimer <= 0) return;
  const timer = S._fireExtinguishTimer;
  const maxTimer = 180;
  const prog = 1 - (timer / maxTimer);
  const env = prog < 0.15
    ? (prog / 0.15)
    : prog > 0.82
    ? ((1 - prog) / 0.18)
    : 1.0;
  const alpha = Math.max(0, Math.min(1.0, env));

  c.save();

  // 1. Atmosfer Langit Rimba Meredup Sejuk (Moody Rainstorm Dimming & Upper Rain Mist)
  c.fillStyle = 'rgba(15, 38, 52, ' + (alpha * 0.38).toFixed(3) + ')';
  c.fillRect(0, 0, 1920, 1080);

  const rainMist = c.createLinearGradient(0, 0, 0, 650);
  rainMist.addColorStop(0, 'rgba(186, 230, 253, ' + (alpha * 0.35).toFixed(3) + ')');
  rainMist.addColorStop(0.6, 'rgba(203, 213, 225, ' + (alpha * 0.18).toFixed(3) + ')');
  rainMist.addColorStop(1, 'rgba(203, 213, 225, 0)');
  c.fillStyle = rainMist;
  c.fillRect(0, 0, 1920, 650);

  // 2. Tirai Rintik Hujan Prosedural 60 FPS (Angled Rain Streaks)
  c.strokeStyle = 'rgba(224, 242, 254, ' + (alpha * 0.65).toFixed(3) + ')';
  c.lineWidth = 2.2;
  c.lineCap = 'round';
  c.beginPath();

  const numDrops = 85;
  const speed = 1.35;
  const slant = 0.26;

  for (let i = 0; i < numDrops; i++) {
    const seed = i * 29.3;
    const dropX = ((seed * 137.5 + t * 0.18) % 2100) - 90;
    const dropY = ((seed * 93.7 + t * speed) % 1200) - 60;
    const len = 38 + (i % 5) * 8;

    c.moveTo(dropX, dropY);
    c.lineTo(dropX - len * slant, dropY + len);
  }
  c.stroke();

  // Lapisan rintik hujan lebih tebal di latar depan
  c.strokeStyle = 'rgba(255, 255, 255, ' + (alpha * 0.85).toFixed(3) + ')';
  c.lineWidth = 3.0;
  c.beginPath();
  for (let j = 0; j < 28; j++) {
    const seedF = j * 47.9;
    const fx = ((seedF * 191.3 + t * 0.22) % 2050) - 65;
    const fy = ((seedF * 117.1 + t * (speed * 1.25)) % 1250) - 80;
    const lenF = 55 + (j % 4) * 10;
    c.moveTo(fx, fy);
    c.lineTo(fx - lenF * slant, fy + lenF);
  }
  c.stroke();

  // 3. Cipratan Air di Lantai Rimba (Ground Splash Rings / Rain Splatters)
  for (let k = 0; k < 16; k++) {
    const kx = 180 + ((k * 149.7) % 1580);
    const ky = 680 + ((k * 83.3) % 290);
    const splashProg = (t * 0.045 + k * 17) % 30;
    const splashR = 5 + splashProg * 1.2;
    const splashAlpha = Math.max(0, 1 - splashProg / 30);
    c.strokeStyle = 'rgba(255, 255, 255, ' + (alpha * splashAlpha * 0.8).toFixed(3) + ')';
    c.lineWidth = 1.8;
    c.beginPath();
    c.ellipse(kx, ky, splashR, splashR * 0.32, 0, 0, Math.PI * 2);
    c.stroke();
  }

  c.restore();

  // 4. Uap Putih Meredam Bara Api
  drawFireExtinguishSteam(c, t, S);
}

function drawFireExtinguishSteam(c, t, S) {
  if (!S._fireExtinguishTimer || S._fireExtinguishTimer <= 0) return;
  const prog = 1 - (S._fireExtinguishTimer / 160);
  c.save();
  for (let i = 0; i < 6; i++) {
    const bx = 300 + (i * 260) % 1300;
    const by = 680 + (i * 90) % 240 - prog * 110;
    const r = 35 + prog * 55 + Math.sin(t * 0.005 + i) * 12;
    const alpha = Math.max(0, (1 - prog) * 0.65);
    c.fillStyle = 'rgba(240, 249, 255, ' + alpha.toFixed(3) + ')';
    c.beginPath();
    c.arc(bx + Math.sin(prog * 4 + i) * 35, by, r, 0, Math.PI * 2);
    c.fill();
  }
  c.restore();
}

function drawSawahIrrigationSurge(c, t, S) {
  if (!S._irrigationFlowTimer || S._irrigationFlowTimer <= 0) return;
  const alpha = Math.min(1.0, (S._irrigationFlowTimer / 180) * 1.2);
  c.save();
  c.fillStyle = 'rgba(186, 230, 253, ' + (alpha * 0.8).toFixed(3) + ')';
  c.beginPath();
  c.arc(280, 440, 24 + Math.sin(t * 0.015) * 6, 0, Math.PI * 2);
  c.fill();

  c.strokeStyle = 'rgba(255, 255, 255, ' + (alpha * 0.65).toFixed(3) + ')';
  c.lineWidth = 3;
  for (let i = 0; i < 4; i++) {
    const rx = 450 + i * 280;
    const ry = 520 + (i % 3) * 140;
    const rip = (t * 0.035 + i * 25) % 80;
    c.beginPath();
    c.ellipse(rx, ry, 25 + rip, 8 + rip * 0.35, 0, 0, Math.PI * 2);
    c.stroke();
  }
  c.restore();
}

function drawRiverSluiceSurge(c, t, S) {
  if (!S._sluiceSurgeTimer || S._sluiceSurgeTimer <= 0) return;
  const alpha = Math.min(1.0, (S._sluiceSurgeTimer / 160) * 1.2);
  c.save();
  c.strokeStyle = 'rgba(255, 255, 255, ' + (alpha * 0.75).toFixed(3) + ')';
  c.lineWidth = 4;
  for (let i = 0; i < 6; i++) {
    const sx = ((t * 0.45 + i * 320) % 2100) - 100;
    const sy = 560 + Math.sin(sx * 0.003 + t * 0.004) * 45;
    c.beginPath();
    c.moveTo(sx, sy);
    c.quadraticCurveTo(sx + 80, sy + 15, sx + 160, sy - 10);
    c.stroke();
  }
  c.restore();
}

function drawReefShadeCanopy(c, t, S) {
  if (!S._reefShadeTimer || S._reefShadeTimer <= 0) return;
  const alpha = Math.min(1.0, (S._reefShadeTimer / 160) * 1.1);
  c.save();
  c.fillStyle = 'rgba(12, 74, 96, ' + (alpha * 0.45).toFixed(3) + ')';
  c.fillRect(180, 220, 1560, 48);
  c.fillStyle = 'rgba(224, 242, 254, ' + (alpha * 0.75).toFixed(3) + ')';
  for (let i = 0; i < 14; i++) {
    const bx = 220 + (i * 120) + Math.sin(t * 0.003 + i) * 20;
    const by = 260 + ((t * 0.08 + i * 45) % 650);
    c.beginPath();
    c.arc(bx, by, 3 + (i % 4) * 1.5, 0, Math.PI * 2);
    c.fill();
  }
  c.restore();
}

function sceneHutan(c,t,S){
  S = S || {};
  if (S._springFlowTimer !== undefined && S._springFlowTimer > 0) S._springFlowTimer--;
  if (S._fireExtinguishTimer !== undefined && S._fireExtinguishTimer > 0) S._fireExtinguishTimer--;
  c.fillStyle='#5e8f63';c.fillRect(0,0,1920,1080);
  drawDynamicSky(c, 380, t, 300);
  texRidge(c,[[0,380],[340,250],[720,380]],'#8fb996',51);
  texRidge(c,[[520,380],[960,210],[1400,380]],'#79a87f',63);
  texRidge(c,[[0,380],[500,300],[1000,380],[1500,310],[1920,380]],'#5e8f63',77);
  texSoilHutan(c, t, S);
  if (S._springFlowTimer > 0 || (S.water !== undefined && S.water >= 45)) drawForestSpringCascade(c, t, S);
  if (S._fireExtinguishTimer > 0) drawForestRainStorm(c, t, S);
 for(let k=0;k<8;k++){const f=k/7,ly=1080+(470-1080)*f,s=.5+f*.9;
  spGrass(c,0+(300-0)*f-40-pr(97+k*1.7)*60,ly,s,97+k,t);
  spGrass(c,1920+(1650-1920)*f+40+pr(137+k*1.7)*60,ly,s,137+k,t);}
  updateOrganismPool(S, 16.7);

  // 1. POHON RIMBA BACKGROUND
  const nB = Math.max(0, Math.round(S.prod / 3));
  syncOrganismPool(S, 'hutan_tree_b', nB, (i) => {
    return { x: 80 + (i + .5) * (1760 / Math.max(1, nB)), y: 470 + pr(i) * 60, r: 60 + pr(i * 3) * 30, col: '#2e6b3a', seed: i };
  }, { isPlant: true, durationIn: 1700, durationOut: 1500 });

  const treesB = (S._orgPool && S._orgPool['hutan_tree_b']) || [];
  treesB.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const r = ent.extra.r * (ent.scaleY || 1.0);
    const col = ent.wither > 0 ? mixc(ent.extra.col, '#5c4328', ent.wither) : ent.extra.col;
    if (ent.wither > 0) {
      c.translate(ent.x, ent.y);
      c.rotate(ent.wither * 0.25);
      c.translate(-ent.x, -ent.y);
    }
    treeDraw(c, ent.x, ent.y, r, col, ent.seed !== undefined ? ent.seed : 0, t, true, ent.wither || 0);
    c.restore();
  });

  // 2. POHON RIMBA FOREGROUND
  const nF = Math.max(0, Math.round(S.prod / 5));
  syncOrganismPool(S, 'hutan_tree_f', nF, (i) => {
    return { x: 140 + (i + .5) * (1680 / Math.max(1, nF)), y: 640 + pr(i * 7) * 260, r: 110 + pr(i * 5) * 60, col: '#3f8a4a', seed: i + 100 };
  }, { isPlant: true, durationIn: 1700, durationOut: 1500 });

  const treesF = (S._orgPool && S._orgPool['hutan_tree_f']) || [];
  treesF.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const r = ent.extra.r * (ent.scaleY || 1.0);
    const col = ent.wither > 0 ? mixc(ent.extra.col, '#6e4c2a', ent.wither) : ent.extra.col;
    if (ent.wither > 0) {
      c.translate(ent.x, ent.y);
      c.rotate(ent.wither * 0.3);
      c.translate(-ent.x, -ent.y);
    }
    treeDraw(c, ent.x, ent.y, r, col, ent.seed !== undefined ? ent.seed : 0, t, false, ent.wither || 0);
    c.restore();
  });

  // 3. RUSA HUTAN (Melangkah Masuk & Kabur Berlari)
  const nd = Math.min(4, Math.round(S.herb / 7));
  syncOrganismPool(S, 'hutan_deer', nd, (i) => {
    return { x: 380 + pr(i * 19) * 1200, y: 760 + pr(i * 23) * 180, seed: i };
  }, { isPlant: false, durationIn: 1200, durationOut: 1000 });

  const deers = (S._orgPool && S._orgPool['hutan_deer']) || [];
  deers.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const swayX = ent.state === 'alive' ? Math.sin(t / 1300 + ent.seed * 2) * 60 : 0;
    spDeer(c, ent.x + swayX, ent.y, t);
    c.restore();
  });

  // 4. HARIMAU (Mengendap Masuk & Mundur)
  const nt = S.pred >= 6 ? 2 : S.pred >= 3 ? 1 : 0;
  syncOrganismPool(S, 'hutan_tiger', nt, (i) => {
    return { x: 700 + i * 600, y: 800 + pr(i * 31) * 100, seed: i };
  }, { isPlant: false, durationIn: 1400, durationOut: 1200 });

  const tigers = (S._orgPool && S._orgPool['hutan_tiger']) || [];
  tigers.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const swayX = ent.state === 'alive' ? Math.sin(t / 2000 + ent.seed * 3) * 40 : 0;
    spTiger(c, ent.x + swayX, ent.y, t);
    c.restore();
  });

 if(S.trap>15){const nx=Math.min(6,Math.round(S.trap/12));c.strokeStyle=PAL.danger;c.lineWidth=5;c.lineCap='round';
  for(let i=0;i<nx;i++){const x=180+((i*397)%1560),y=560+((i*211)%380);
   c.beginPath();c.moveTo(x-16,y-12);c.lineTo(x+16,y+12);c.moveTo(x+16,y-12);c.lineTo(x-16,y+12);c.stroke();}}
 if(S.trap>15){c.fillStyle='rgba(30,26,18,'+(c01(S.trap/160)*.45).toFixed(3)+')';c.fillRect(0,0,1920,1080);}}
function sceneSungai(c, t, S) {
  S = S || {};
  if (S._sluiceSurgeTimer !== undefined && S._sluiceSurgeTimer > 0) S._sluiceSurgeTimer--;
  // 1. LANGIT & PERBUKITAN TROPIS BERLAPIS (Layered Tropical Hills & Atmospheric Fog)
  drawDynamicSky(c, 340, t, 1500);

  // Bukit jauh berselimut kabut lembah
  texRidge(c, [[-40, 340], [380, 200], [860, 260], [1340, 195], [1780, 250], [1960, 340]], '#527b60', 104);
  const valleyMist = c.createLinearGradient(0, 200, 0, 340);
  valleyMist.addColorStop(0, 'rgba(215, 240, 230, 0)');
  valleyMist.addColorStop(1, 'rgba(215, 240, 230, 0.32)');
  c.fillStyle = valleyMist;
  c.fillRect(0, 200, 1920, 140);

  // Bukit tengah dengan kanopi hutan hujan
  texRidge(c, [[-30, 340], [260, 250], [700, 220], [1140, 265], [1580, 230], [1950, 340]], '#3c6c42', 91);
  c.fillStyle = 'rgba(255, 255, 255, 0.08)';
  c.fillRect(0, 260, 1920, 80);

  // 2. BANTARAN ATAS (Background Bank: Tanah, Batu Kali & Gelagah Atas)
  if (typeof texSoilSungaiTop === 'function') texSoilSungaiTop(c, t, S);
  else texSoilSungai(c, t, S);

  // 3. BADAN AIR ORGANIK & GRADASI KEDALAMAN (Organic Meander Water Body)
  const wv2 = wdisp(S);
  const wf2 = c01(wv2 / 80);
  const poisonFactor = c01((S.poison || 0) / 70);
  const mudFactor = c01(((S.lumpur || 0) + (S.trash || 0) * 0.4) / 60);

  // Warna dinamis air sungai:
  // Normal jernih: hijau zamrud toska nusantara
  let bankColTop = mixc('#3fa38f', '#6dd5be', wf2);
  let deepCol    = mixc('#1b5a50', '#2d8274', wf2);
  let bankColBot = mixc('#2d7366', '#4fa899', wf2);

  // Respon erosi & lumpur (aluvial cokelat)
  if (mudFactor > 0) {
    bankColTop = mixc(bankColTop, '#8c704f', mudFactor * 0.85);
    deepCol    = mixc(deepCol,    '#5c452c', mudFactor * 0.9);
    bankColBot = mixc(bankColBot, '#735738', mudFactor * 0.85);
  }

  // Respon racun/limbah industri (toska berminyak keabuan kusam)
  if (poisonFactor > 0) {
    bankColTop = mixc(bankColTop, '#5c6f6c', poisonFactor * 0.8);
    deepCol    = mixc(deepCol,    '#3c4a47', poisonFactor * 0.85);
    bankColBot = mixc(bankColBot, '#495956', poisonFactor * 0.8);
  }

  // Gambar permukaan air mengikuti kurva organik getRiverBankTop & getRiverBankBottom
  c.save();
  c.beginPath();
  c.moveTo(0, getRiverBankTop(0));
  for (let x = 30; x <= 1920; x += 30) {
    c.lineTo(x, getRiverBankTop(x));
  }
  c.lineTo(1920, getRiverBankBottom(1920));
  for (let x = 1920; x >= 0; x -= 30) {
    c.lineTo(x, getRiverBankBottom(x));
  }
  c.closePath();

  const sg = c.createLinearGradient(0, 450, 0, 830);
  sg.addColorStop(0, bankColTop);
  sg.addColorStop(0.38, deepCol);
  sg.addColorStop(0.68, deepCol);
  sg.addColorStop(1, bankColBot);
  c.fillStyle = sg;
  c.fill();

  // 4. BUIH ALAMI BIBIR SUNGAI (Natural Shoreline Foam)
  const foamAlpha = (0.22 + 0.18 * wf2 - 0.08 * mudFactor).toFixed(3);
  c.fillStyle = 'rgba(255, 255, 255, ' + foamAlpha + ')';
  for (let i = 0; i < 32; i++) {
    const bx = (i + 0.5) * 60 + Math.sin(t / 600 + i * 1.7) * 8;
    const byTop = getRiverBankTop(bx) + 2 + Math.sin(t / 450 + i * 2.1) * 2;
    c.beginPath();
    c.ellipse(bx, byTop, 3.5 + pr(i * 3) * 3, 1.8 + pr(i * 5) * 1.5, 0, 0, Math.PI * 2);
    c.fill();

    const byBot = getRiverBankBottom(bx) - 2 - Math.cos(t / 500 + i * 1.9) * 2;
    c.beginPath();
    c.ellipse(bx + 15, byBot, 4 + pr(i * 7) * 3.5, 2 + pr(i * 11) * 1.5, 0, 0, Math.PI * 2);
    c.fill();
  }

  // 5. RIAK ARUS MULTI-LAYER SINUSOIDAL (HAPUS TOTAL GARIS JALAN RAYA)
  // Menghasilkan 5 lapisan arus fluida yang mengikuti lekukan alami sungai
  c.lineCap = 'round';
  const currentRatios = [0.18, 0.35, 0.52, 0.68, 0.84];
  currentRatios.forEach((ratio, layerIdx) => {
    const isBright = layerIdx % 2 === 0;
    c.strokeStyle = isBright
      ? 'rgba(255, 255, 255, ' + (0.12 + 0.08 * wf2).toFixed(3) + ')'
      : 'rgba(10, 45, 38, ' + (0.15 + 0.1 * (1 - mudFactor)).toFixed(3) + ')';
    c.lineWidth = 2.4 + layerIdx * 0.4;
    c.beginPath();

    for (let x = 0; x <= 1920; x += 40) {
      const topY = getRiverBankTop(x);
      const botY = getRiverBankBottom(x);
      const flowWave = Math.sin(t / (600 + layerIdx * 100) + x / (160 + layerIdx * 30) + layerIdx * 1.6) * (6 + layerIdx * 1.5);
      const currY = topY + (botY - topY) * ratio + flowWave;
      if (x === 0) c.moveTo(x, currY);
      else c.lineTo(x, currY);
    }
    c.stroke();
  });

  if (S._sluiceSurgeTimer > 0) drawRiverSluiceSurge(c, t, S);

  // 6. KILAU CAHAYA MATAHARI TROPIS DI PERMUKAAN AIR (Specular Sun Glints)
  c.fillStyle = '#ffffff';
  for (let i = 0; i < 16; i++) {
    const glintX = (pr(i * 17.3) * 1920 + (t / 16) * (1 + (i % 3) * 0.25)) % 1920;
    const ratio = 0.15 + pr(i * 7.9) * 0.7;
    const glintY = getRiverBankTop(glintX) + (getRiverBankBottom(glintX) - getRiverBankTop(glintX)) * ratio;
    const pulse = Math.abs(Math.sin(t / 420 + i * 1.9));
    c.globalAlpha = 0.2 + pulse * 0.45;
    c.beginPath();
    c.arc(glintX, glintY, 1.2 + pulse * 2.2, 0, Math.PI * 2);
    c.fill();
  }
  c.globalAlpha = 1;

  c.restore();

  // 7. SINKRONISASI ORGANISME AIR SUNGAI
  updateOrganismPool(S, 16.7);

  // IKAN SUNGAI (Subsurface Blending & Bayangan Bawah Air)
  const nf = Math.min(7, Math.round(S.herb / 4));
  syncOrganismPool(S, 'sungai_fish', nf, (i) => {
    const dir = i % 2 ? 1 : -1;
    return { x: 500 + pr(i * 17) * 900, y: 540 + pr(i * 3) * 220, s: 0.8 + pr(i) * 0.5, col: i % 2 ? '#ffd24a' : '#7ac0e8', dir: dir, seed: i };
  }, { isPlant: false, durationIn: 1100, durationOut: 900 });

  const fishes = (S._orgPool && S._orgPool['sungai_fish']) || [];
  fishes.forEach(ent => {
    c.save();
    const fadeAlpha = ent.fade !== undefined ? ent.fade : 1;
    c.globalAlpha = fadeAlpha * 0.88; // Refraksi kedalaman air
    const dir = ent.extra ? ent.extra.dir : (ent.seed % 2 ? 1 : -1);
    const sp = 0.05 + pr(ent.seed) * 0.05;
    let x = ent.x;
    if (ent.state === 'alive') {
      x = dir > 0 ? ((t * sp * 10 + ent.seed * 400) % 2100) - 90 : 2010 - ((t * sp * 10 + ent.seed * 400) % 2100);
    }
    const s = ent.extra ? ent.extra.s : 1;
    const col = ent.extra ? ent.extra.col : '#7ac0e8';

    // Samarkan ikan di dalam batas air
    const curTop = getRiverBankTop(x) + 30;
    const curBot = getRiverBankBottom(x) - 30;
    const clampedY = Math.max(curTop, Math.min(curBot, ent.y));

    // Bayangan halus di dasar air
    c.fillStyle = 'rgba(10, 35, 30, ' + (0.22 * fadeAlpha).toFixed(3) + ')';
    c.beginPath();
    c.ellipse(x, clampedY + 16 * s, 18 * s, 5 * s, 0, 0, Math.PI * 2);
    c.fill();

    if (ent.state === 'withering') {
      c.translate(x, clampedY);
      c.rotate(ent.wither * (dir > 0 ? 0.7 : -0.7));
      spFish(c, 0, 0, t, s, col, dir);
    } else {
      spFish(c, x, clampedY, t, s, col, dir);
    }
    c.restore();
  });

  // GULMA AIR (Eceng Gondok Mengapung di Air)
  const ng = S.gulma > 8 ? Math.min(7, Math.round(S.gulma / 12)) : 0;
  syncOrganismPool(S, 'sungai_gulma', ng, (i) => {
    const gx = 200 + pr(i * 7) * 1500;
    const gy = getRiverBankTop(gx) + 35 + pr(i * 3) * (getRiverBankBottom(gx) - getRiverBankTop(gx) - 70);
    return { x: gx, y: gy, s: 1 + pr(i) * 0.6, seed: i };
  }, { isPlant: true, durationIn: 1500, durationOut: 1300 });

  const gulmas = (S._orgPool && S._orgPool['sungai_gulma']) || [];
  gulmas.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const s = (ent.extra ? ent.extra.s : 1) * (ent.scaleY || 1.0);
    gulmaPatch(c, ent.x, ent.y, s, t);
    c.restore();
  });

  // RESPON KRISIS SAMPAH & DETERGEN
  if (S.trash > 10) {
    const nt = Math.min(6, Math.round(S.trash / 12));
    for (let i = 0; i < nt; i++) {
      const bx = 150 + pr(i * 13) * 1600 + Math.sin(t / 1500 + i) * 30;
      const by = getRiverBankTop(bx) + 30 + pr(i * 5) * (getRiverBankBottom(bx) - getRiverBankTop(bx) - 60);
      spBag(c, bx, by, t);
    }
  }

  if (S.poison > 15) {
    for (let i = 0; i < 14; i++) {
      const px = (pr(i * 11) * 1920 + t / 20) % 1920;
      const py = getRiverBankTop(px) + 10 + pr(i) * 26;
      CIRC(c, px, py, 4 + pr(i * 3) * 6, 'rgba(250, 252, 255, ' + (0.4 + c01(S.poison / 160) * 0.5).toFixed(2) + ')');
    }
  }

  // 8. BANTARAN BAWAH (Foreground Bank: Tanah, Batu Kali & Gelagah Bawah di Depan Air)
  // Dirender SETELAH air agar tanaman yang tumbuh ke atas tidak terpotong oleh air!
  if (typeof texSoilSungaiBottom === 'function') {
    texSoilSungaiBottom(c, t, S);
  }

  // 9. BANGAU (Bertengger Alami di Tepi Bantaran Dangkal/Batu Kali di Depan Air)
  const nstork = S.pred >= 4 ? 2 : 1;
  syncOrganismPool(S, 'sungai_stork', nstork, (i) => {
    const storkX = i === 0 ? 1450 : 600;
    const storkY = i === 0 ? getRiverBankBottom(1450) + 20 : getRiverBankTop(600) - 6;
    return { x: storkX, y: storkY, seed: i };
  }, { isPlant: false, durationIn: 1300, durationOut: 1100 });

  const storks = (S._orgPool && S._orgPool['sungai_stork']) || [];
  storks.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    let flyY = 0;
    if (ent.state === 'spawning') {
      flyY = (1 - ent.progress) * 150;
    } else if (ent.state === 'fleeing') {
      flyY = ent.progress * 180;
    }
    spStork(c, ent.x, ent.y - flyY, t);
    c.restore();
  });
}
function sceneLaut(c,t,S){
  S = S || {};
  if (S._reefShadeTimer !== undefined && S._reefShadeTimer > 0) S._reefShadeTimer--;
  c.fillStyle=mixc('#1f7fae','#66c7dd',c01(hdisp(S)/100));c.fillRect(0,0,1920,1080);
  {const lg=c.createLinearGradient(0,0,0,900);
   lg.addColorStop(0,'rgba(255,255,255,.14)');lg.addColorStop(1,'rgba(8,40,70,.28)');
   c.fillStyle=lg;c.fillRect(0,0,1920,900);}
  // gelombang permukaan berlapis
  c.lineCap='round';
  for(let i=0;i<3;i++){const wy=260+i*130;
   c.strokeStyle='rgba(255,255,255,'+(.10-i*.02).toFixed(3)+')';c.lineWidth=4-i;
   c.beginPath();c.moveTo(-20,wy);
   for(let x=0;x<=1920;x+=320)c.quadraticCurveTo(x+80,wy+Math.sin(t/(900+i*200)+x/220+i*2)*16,x+160,wy);
   c.stroke();}
  for(let i=0;i<4;i++){const x=300+i*440+Math.sin(t/2600+i)*60;
   F(c,[[x,0],[x+140,0],[x+320,1080],[x+40,1080]],'rgba(255,255,255,.07)');}
  c.fillStyle='#fff';
  for(let i=0;i<8;i++){const x=(pr(i*17)*1920+t/18)%1920;
   c.globalAlpha=.2+.25*Math.abs(Math.sin(t/450+i));
   c.beginPath();c.arc(x,60+pr(i*5)*200,1.5+Math.abs(Math.sin(t/450+i))*2.2,0,7);c.fill();}
  c.globalAlpha=1;
  if (S._reefShadeTimer > 0) drawReefShadeCanopy(c, t, S);
 F(c,[[0,1080],[0,950],[400,905],[900,940],[1400,900],[1920,945],[1920,1080]],'#c9b98a');
 F(c,[[0,1080],[0,990],[500,955],[1100,985],[1700,950],[1920,980],[1920,1080]],'#b8a678');
 c.strokeStyle='rgba(255,255,255,.16)';c.lineWidth=3;
 for(let i=0;i<3;i++){const x=300+i*500+Math.sin(t/2000+i)*40;
  c.beginPath();c.arc(x,880,60+i*25,Math.PI*1.15,Math.PI*1.85);c.stroke();}
  updateOrganismPool(S, 16.7);

  // 1. TERUMBU KARANG & KIPAS LAUT (Tumbuh & Coral Bleaching)
  const nc = Math.min(9, Math.max(0, Math.round(S.prod / 6)));
  const baseBl = c01(S.heat / 85);
  syncOrganismPool(S, 'laut_coral', nc, (i) => {
    const x = 120 + (i + .5) * (1720 / Math.max(1, nc)) + pr(i) * 40;
    const y = 940 + pr(i * 3) * 60;
    const col = ['#e07a5f', '#c95f8a', '#e8a13a', '#8a6ab0'][i % 4];
    const isFan = pr(i * 7) <= .5;
    return { x, y, col, isFan, s: .9 + pr(i) * .5, seed: i };
  }, { isPlant: true, durationIn: 1700, durationOut: 1500 });

  const corals = (S._orgPool && S._orgPool['laut_coral']) || [];
  corals.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const bl = Math.min(1.0, baseBl + (ent.wither || 0));
    const s = (ent.extra ? ent.extra.s : 1) * (ent.scaleY || 1.0);
    const x = ent.x, y = ent.y;
    const col = ent.extra ? ent.extra.col : '#e07a5f';
    if (ent.extra && ent.extra.isFan) {
      spFan(c, x, y, s, col, bl);
    } else {
      spCoral(c, x, y, s, col, ent.seed, bl);
    }
    c.restore();
  });

  // 2. IKAN KARANG (Berenang Masuk & Menghindar)
  const nf = Math.min(8, Math.round(S.herb / 3));
  syncOrganismPool(S, 'laut_fish', nf, (i) => {
    const dir = i % 2 ? 1 : -1;
    return { x: 500 + pr(i * 13) * 900, y: 300 + pr(i * 3) * 500, s: .7 + pr(i) * .5, col: ['#ffd24a', '#7ac0e8', '#f2964a'][i % 3], dir: dir, seed: i };
  }, { isPlant: false, durationIn: 1000, durationOut: 900 });

  const seaFishes = (S._orgPool && S._orgPool['laut_fish']) || [];
  seaFishes.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const dir = ent.extra ? ent.extra.dir : (ent.seed % 2 ? 1 : -1);
    const sp = .06 + pr(ent.seed) * .05;
    let x = ent.x;
    if (ent.state === 'alive') {
      x = dir > 0 ? ((t * sp * 10 + ent.seed * 380) % 2100) - 90 : 2010 - ((t * sp * 10 + ent.seed * 380) % 2100);
    }
    const s = ent.extra ? ent.extra.s : 1;
    const col = ent.extra ? ent.extra.col : '#ffd24a';
    if (ent.state === 'withering') {
      c.translate(x, ent.y);
      c.rotate(ent.wither * (dir > 0 ? 0.7 : -0.7));
      spFish(c, 0, 0, t, s, col, dir);
    } else {
      spFish(c, x, ent.y, t, s, col, dir);
    }
    c.restore();
  });

  // 3. HIU (Meluncur Masuk & Menyelam)
  const nshark = S.pred >= 2 ? 1 : 0;
  syncOrganismPool(S, 'laut_shark', nshark, () => {
    return { x: 800, y: 480, s: 1.1, seed: 1 };
  }, { isPlant: false, durationIn: 1500, durationOut: 1200 });

  const sharks = (S._orgPool && S._orgPool['laut_shark']) || [];
  sharks.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const x = ent.state === 'alive' ? (((t * .03 * 10) % 2400) - 200) : ent.x;
    spShark(c, x, ent.y + Math.sin(t / 1700) * 40, t, 1.1);
    c.restore();
  });

  // 4. PENYU (Meluncur Anggun)
  const nturtle = S.pred >= 3 ? 1 : 0;
  syncOrganismPool(S, 'laut_turtle', nturtle, () => {
    return { x: 1200, y: 700, seed: 2 };
  }, { isPlant: false, durationIn: 1500, durationOut: 1200 });

  const turtles = (S._orgPool && S._orgPool['laut_turtle']) || [];
  turtles.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const x = ent.state === 'alive' ? (1700 - ((t * .02 * 10) % 2100)) : ent.x;
    spTurtle(c, x, ent.y + Math.sin(t / 1300) * 30, t);
    c.restore();
  });

 if(S.trash>10){const nt=Math.min(6,Math.round(S.trash/12));
  for(let i=0;i<nt;i++)spBag(c,150+pr(i*13)*1600+Math.sin(t/1400+i)*40,200+pr(i*5)*500,t);}
 if(S.bomb>35&&frac(t/2300)<.06){c.fillStyle='rgba(255,240,200,.3)';c.fillRect(0,0,1920,1080);}
 if(S.heat>55){c.fillStyle='rgba(255,160,90,'+(c01((S.heat-55)/120)*.28).toFixed(3)+')';c.fillRect(0,0,1920,1080);}}
const SCENE={sawah:sceneSawah,hutan:sceneHutan,sungai:sceneSungai,laut:sceneLaut};
const FAKE={sawah:{prod:52,water:70,herb:14,pred:6,poison:0},hutan:{prod:52,water:60,herb:14,pred:3,trap:0},
 sungai:{prod:36,water:66,herb:24,pred:3,gulma:10,poison:0,trash:0},laut:{prod:40,heat:20,herb:20,pred:3,trash:0,bomb:0}};

/* ================= KONFETI ================= */
const CONF_COLS=[PAL.goldBtn,PAL.skyHi,PAL.good,PAL.danger,PAL.gold,'#c95f8a'];
function confettiBurst(){CONF=[];
 for(let i=0;i<170;i++)CONF.push({x:rnd(0,1920),y:rnd(-1080,0),w:rnd(8,16),h:rnd(10,20),c:pick(CONF_COLS),
  vy:rnd(2.2,5),vx:rnd(-.8,.8),r:rnd(0,6.28),vr:rnd(-.1,.1)});}
function renderConfetti(t){const c=CTX.conf;if(!c)return;c.clearRect(0,0,1920,1080);
 CONF.forEach(p=>{p.y+=p.vy;p.x+=p.vx+Math.sin(t/300+p.r)*.6;p.r+=p.vr;
  if(p.y>1120){p.y=-40;p.x=rnd(0,1920);}
  c.save();c.translate(p.x,p.y);c.rotate(p.r);c.fillStyle=p.c;c.fillRect(-p.w/2,-p.h/2,p.w,p.h);c.restore();});}

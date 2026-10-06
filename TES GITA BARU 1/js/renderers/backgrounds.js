/* ============================================================
   ECO-EXPLORER — js/renderers/backgrounds.js
   Background Scenes 60 FPS (Sawah, Hutan, Sungai, Laut) & Konfeti
   ============================================================ */

function skyPaint(c,top,bot,hor){c.fillStyle=LG(c,0,0,0,hor,top,bot);c.fillRect(0,0,1920,hor);}
/* Matahari bertekstur prosedural: halo + limb darkening + granulasi noise
   (tile noise dibuat sekali & di-cache) + pusaran plasma animasi + sinar.
   Signature sama seperti sunDraw lama sehingga 3 biome tak perlu diubah. */
var SUNNOISE=null;
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



function sceneSawah(c,t,S){
 c.fillStyle='#6a9e6e';c.fillRect(0,0,1920,1080);
 skyPaint(c,'#aee3f5','#eaf7df',360);sunDraw(c,1620,120,t);cloudsDraw(c,t);
 texRidge(c,[[0,360],[300,240],[640,360]],'#96b98d',11);
 texRidge(c,[[420,360],[820,200],[1240,360]],'#7fae7c',23);
 texRidge(c,[[200,360],[560,280],[980,360],[1500,300],[1920,360]],'#6a9e6e',37);
 c.fillStyle='rgba(255,255,255,.10)';c.fillRect(0,220,1920,150);
 const wv=wdisp(S),wf=c01(wv/75);
 const wg=c.createLinearGradient(0,420,0,1080);
 wg.addColorStop(0,mixc('#c9a86a','#bfe3ef',wf));
 wg.addColorStop(.45,mixc('#c9a86a','#4f9ab8',wf));
 wg.addColorStop(1,mixc('#a8895a','#2e6b8a',wf));
 F(c,[[0,1080],[380,420],[1560,420],[1920,1080]],wg);
 // riak + kilau + bibir lumpur (ter-clip poligon air)
 c.save();c.beginPath();c.moveTo(0,1080);c.lineTo(380,420);c.lineTo(1560,420);c.lineTo(1920,1080);c.closePath();c.clip();
 c.strokeStyle='rgba(255,255,255,'+(.08+.16*wf).toFixed(3)+')';c.lineWidth=3;c.lineCap='round';
 for(let i=0;i<4;i++){const ry=540+i*130+Math.sin(t/700+i*1.7)*10;
  c.beginPath();c.moveTo(300+i*40,ry);c.quadraticCurveTo(960,ry+40+Math.sin(t/900+i)*14,1620-i*40,ry);c.stroke();}
 c.fillStyle='rgba(255,250,220,'+(.10+.20*wf).toFixed(3)+')';
 for(let i=0;i<8;i++){const gx=(pr(i*29)*1680+240+Math.sin(t/800+i*2.3)*30),gy=500+pr(i*13)*480;
  c.beginPath();c.arc(gx,gy,1.5+Math.abs(Math.sin(t/450+i))*2.2,0,7);c.fill();}
 c.strokeStyle='rgba(120,95,60,'+((1-wf)*.55).toFixed(3)+')';c.lineWidth=30;
 c.beginPath();c.moveTo(0,1080);c.lineTo(380,420);c.lineTo(1560,420);c.lineTo(1920,1080);c.stroke();
 c.restore();
 texSoilSawah(c, t, S);
 for(let k=0;k<12;k++){const f=k/11,ly=1080+(420-1080)*f,s=.5+f*.9;
  spGrass(c,0+(380-0)*f-40-pr(7+k*1.3)*60,ly,s,7+k,t);
  spGrass(c,1920+(1560-1920)*f+40+pr(47+k*1.3)*60,ly,s,47+k,t);}
  updateOrganismPool(S, 16.7);

  // 1. PADI (Tunas Bertumbuh & Melayu Anggun)
  const rows = [[540, 1], [690, .82], [860, .62], [1050, .46]];
  rows.forEach((r, ri) => {
    const n = Math.max(0, Math.round(S.prod / 6));
    syncOrganismPool(S, 'sawah_rice_' + ri, n, (i, seed) => {
      const x = 120 + (i + .5) * (1680 / Math.max(1, n)) + (ri % 2) * 34;
      return { x, y: r[0], r1: r[1], ri, i, seed };
    }, { isPlant: true, durationIn: 1600, durationOut: 1400 });

    const rices = (S._orgPool && S._orgPool['sawah_rice_' + ri]) || [];
    rices.forEach(ent => {
      c.save();
      c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
      const baseCol = '#3f9a4e';
      const witherCol = '#8c6c38';
      const col = ent.wither > 0 ? mixc(baseCol, witherCol, ent.wither) : baseCol;
      const r1 = ent.extra ? ent.extra.r1 : r[1];
      const hgt = 46 * r1 * (0.8 + pr(ri * 40 + (ent.extra ? ent.extra.i : 0)) * 0.4) * (ent.scaleY || 1.0);
      
      if (ent.wither > 0) {
        c.translate(ent.x, ent.y);
        c.rotate(ent.wither * 0.38);
        c.translate(-ent.x, -ent.y);
      }
      spRice(c, ent.x, ent.y, hgt, col, Math.sin(t / 600 + ent.seed) * 2);
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

  for(let i=0;i<3;i++)butterfly(c,300+pr(i*23)*1300+Math.sin(t/700+i*2)*60,320+pr(i*29)*160+Math.cos(t/900+i)*40,t);
  if(S.poison>15){c.fillStyle='rgba(96,60,130,'+(c01(S.poison/150)*.5).toFixed(3)+')';c.fillRect(0,360,1920,720);}}

function sceneHutan(c,t,S){
 c.fillStyle='#5e8f63';c.fillRect(0,0,1920,1080);
 skyPaint(c,'#aee3f5','#e8f4d8',380);sunDraw(c,300,130,t);cloudsDraw(c,t);
 texRidge(c,[[0,380],[340,250],[720,380]],'#8fb996',51);
 texRidge(c,[[520,380],[960,210],[1400,380]],'#79a87f',63);
 texRidge(c,[[0,380],[500,300],[1000,380],[1500,310],[1920,380]],'#5e8f63',77);
 c.fillStyle='rgba(255,255,255,.10)';c.fillRect(0,230,1920,150);
 texSoilHutan(c, t, S);
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
function sceneSungai(c,t,S){
 skyPaint(c,'#b8e6f0','#eef8e2',340);sunDraw(c,1500,110,t);cloudsDraw(c,t);
 texRidge(c,[[0,340],[500,240],[1100,340],[1700,260],[1920,340]],'#6f9e68',91);
 c.fillStyle='rgba(255,255,255,.08)';c.fillRect(0,200,1920,120);
 texSoilSungai(c, t, S);
 {const wv2=wdisp(S),wf2=c01(wv2/80);
 const sg=c.createLinearGradient(0,470,0,810);
 sg.addColorStop(0,mixc('#4fa08a','#8fd8c4',wf2));sg.addColorStop(1,mixc('#2e6b62','#4fa8a0',wf2));
 c.fillStyle=sg;c.fillRect(0,470,1920,340);
 // buih tepi bank
 c.fillStyle='rgba(255,255,255,'+(.14+.16*wf2).toFixed(3)+')';
 for(let i=0;i<24;i++){const bx=(i+.5)*80+Math.sin(t/600+i)*10;
  c.beginPath();c.arc(bx,474+Math.sin(t/500+i*1.3)*3,2+pr(i*3)*2.5,0,7);c.fill();
  c.beginPath();c.arc(bx+30,806+Math.cos(t/550+i)*3,2+pr(i*7)*2.5,0,7);c.fill();}
 // riak 2 lapis mengalir
 c.lineCap='round';
 c.strokeStyle='rgba(255,255,255,.14)';c.lineWidth=3;
 for(let i=0;i<5;i++){const ry=515+i*62+Math.sin(t/700+i*2)*8;
  c.beginPath();c.moveTo(-20,ry);
  for(let x=0;x<=1920;x+=240)c.quadraticCurveTo(x+60,ry+Math.sin(t/700+x/160+i)*10,x+120,ry);
  c.stroke();}
 c.strokeStyle='rgba(10,60,55,.18)';c.lineWidth=2;
 for(let i=0;i<4;i++){const ry=545+i*70+Math.cos(t/900+i*1.5)*8;
  c.beginPath();c.moveTo(-20,ry);
  for(let x=0;x<=1920;x+=300)c.quadraticCurveTo(x+75,ry+Math.cos(t/900+x/200+i)*12,x+150,ry);
  c.stroke();}}
 c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=4;c.setLineDash([46,34]);c.lineDashOffset=-t/12;
 for(let i=0;i<5;i++){c.beginPath();c.moveTo(0,515+i*62);c.lineTo(1920,515+i*62);c.stroke();}
 c.setLineDash([]);
 c.fillStyle='#fff';
 for(let i=0;i<10;i++){const x=(pr(i*13)*1920+t/14*(1+(i%3)*.3))%1920;
  c.globalAlpha=.18+.3*Math.abs(Math.sin(t/500+i*2));
  c.beginPath();c.arc(x,500+pr(i*7)*280,1.5+Math.abs(Math.sin(t/400+i))*2,0,7);c.fill();}
 c.globalAlpha=1;
  updateOrganismPool(S, 16.7);

  // 1. IKAN SUNGAI (Berenang Masuk & Menyelam/Lemas)
  const nf = Math.min(7, Math.round(S.herb / 4));
  syncOrganismPool(S, 'sungai_fish', nf, (i) => {
    const dir = i % 2 ? 1 : -1;
    return { x: 500 + pr(i * 17) * 900, y: 530 + pr(i * 3) * 240, s: .8 + pr(i) * .5, col: i % 2 ? '#ffd24a' : '#7ac0e8', dir: dir, seed: i };
  }, { isPlant: false, durationIn: 1100, durationOut: 900 });

  const fishes = (S._orgPool && S._orgPool['sungai_fish']) || [];
  fishes.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const dir = ent.extra ? ent.extra.dir : (ent.seed % 2 ? 1 : -1);
    const sp = .05 + pr(ent.seed) * .05;
    let x = ent.x;
    if (ent.state === 'alive') {
      x = dir > 0 ? ((t * sp * 10 + ent.seed * 400) % 2100) - 90 : 2010 - ((t * sp * 10 + ent.seed * 400) % 2100);
    }
    const s = ent.extra ? ent.extra.s : 1;
    const col = ent.extra ? ent.extra.col : '#7ac0e8';
    if (ent.state === 'withering') {
      c.translate(x, ent.y);
      c.rotate(ent.wither * (dir > 0 ? 0.7 : -0.7));
      spFish(c, 0, 0, t, s, col, dir);
    } else {
      spFish(c, x, ent.y, t, s, col, dir);
    }
    c.restore();
  });

  // 2. BANGAU (Mendarat & Terbang Menjauh)
  const nstork = S.pred >= 4 ? 2 : 1;
  syncOrganismPool(S, 'sungai_stork', nstork, (i) => {
    return { x: i === 0 ? 1450 : 600, y: i === 0 ? 900 : 920, seed: i };
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

  // 3. GULMA AIR (Eceng Gondok Bertumbuh & Menyusut)
  const ng = S.gulma > 8 ? Math.min(7, Math.round(S.gulma / 12)) : 0;
  syncOrganismPool(S, 'sungai_gulma', ng, (i) => {
    return { x: 200 + pr(i * 7) * 1500, y: 500 + pr(i * 3) * 280, s: 1 + pr(i) * .6, seed: i };
  }, { isPlant: true, durationIn: 1500, durationOut: 1300 });

  const gulmas = (S._orgPool && S._orgPool['sungai_gulma']) || [];
  gulmas.forEach(ent => {
    c.save();
    c.globalAlpha = ent.fade !== undefined ? ent.fade : 1;
    const s = (ent.extra ? ent.extra.s : 1) * (ent.scaleY || 1.0);
    gulmaPatch(c, ent.x, ent.y, s, t);
    c.restore();
  });

 if(S.trash>10){const nt=Math.min(6,Math.round(S.trash/12));
  for(let i=0;i<nt;i++)spBag(c,150+pr(i*13)*1600+Math.sin(t/1500+i)*30,490+pr(i*5)*300,t);}
 if(S.poison>15){for(let i=0;i<12;i++){const x=(pr(i*11)*1920+t/20)%1920;
  CIRC(c,x,478+pr(i)*22,4+pr(i*3)*6,'rgba(250,252,255,'+(.4+c01(S.poison/160)*.5).toFixed(2)+')');}}}
function sceneLaut(c,t,S){
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

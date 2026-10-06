/* ============================================================
   ECO-EXPLORER — js/renderers/gita-sequence.js
   Pilot: Image-sequence Gita (gita-thinking/)
   48 WebP 360px (~720KB) loop rAF, fallback poster PNG statis (tanpa SVG)
   Dioptimasi dari 192 PNG 600px (35MB): resize 360 + WebP q80 + step 4
   ============================================================ */

var GitaSeq = (function(){
  var CACHE = { imgs: [], okCount: 0, total: 0, ready: false, failed: false };
  var PLAYERS = new Map(); // containerEl -> state
  var DEFAULTS = {
    folder: 'gita-thinking',
    prefix: 'g',
    ext: '.webp',
    pad: 3,           // g000.webp ... g047.webp
    frames: 48,
    step: 1,
    poster: 'gita-thinking/poster.png', // tampil instan selagi preload
    fps: 12,          // 48 frame @12fps = loop 4 detik
    size: 400,
    alt: 'Gita Detektif Alam'
  };

  function padN(n, len){ var s = String(n); while(s.length < len) s = '0' + s; return s; }
  function frameURL(o, i){ return encodeURI(o.folder + '/' + o.prefix + padN(i, o.pad || 3) + o.ext); }

  function preload(o, onProgress){
    if(CACHE.ready || CACHE.loading){
      if(CACHE.ready && onProgress) onProgress(1);
      return Promise.resolve();
    }
    CACHE.loading = true;
    var idx = [];
    for(var i = 0; i < o.frames; i += o.step) idx.push(i);
    CACHE.total = idx.length;
    CACHE.imgs = new Array(CACHE.total);
    var loaded = 0;
    return new Promise(function(resolve){
      var done = 0, anyOk = false;
      idx.forEach(function(frameNo, k){
        var im = new Image();
        im.onload = function(){ anyOk = true; loaded++; done++;
          CACHE.imgs[k] = im;
          if(onProgress) onProgress(done / idx.length);
          if(done === idx.length){ CACHE.ready = anyOk; CACHE.loading = false; resolve(); }
        };
        im.onerror = function(){ done++;
          if(onProgress) onProgress(done / idx.length);
          if(done === idx.length){ CACHE.ready = anyOk; CACHE.loading = false; CACHE.failed = !anyOk; resolve(); }
        };
        im.src = frameURL(o, frameNo);
      });
      // safety timeout: jangan gantung loading lebih dari 20 detik
      setTimeout(function(){
        if(!CACHE.ready && !CACHE.failed){ CACHE.ready = anyOk; CACHE.loading = false; resolve(); }
      }, 20000);
    });
  }

  function stop(container){
    var key = typeof container === 'string' ? document.querySelector(container) : container;
    if(!key) return;
    var st = PLAYERS.get(key);
    if(st){
      if(st.raf) cancelAnimationFrame(st.raf);
      if(st.timer) clearInterval(st.timer);
      PLAYERS.delete(key);
    }
  }

  function play(sel, opts){
    var o = Object.assign({}, DEFAULTS, opts || {});
    var box = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if(!box) return;
    stop(box);

    // Tampilkan poster instan selagi preload (fallback SVG bila gagal total)
    box.innerHTML = '<img class="gita-seq" src="' + encodeURI(o.poster) + '" width="' + o.size +
      '" height="' + o.size + '" alt="' + o.alt + '" draggable="false">'
      + '<div class="gita-seq-loading">Memuat animasi…</div>';
    var img = box.querySelector('img.gita-seq');

    img.onerror = function(){
      // Tanpa fallback SVG: sembunyikan saja agar tidak ada ikon gambar rusak
      img.style.display = 'none';
      var le = box.querySelector('.gita-seq-loading');
      if(le) le.remove();
    };

    preload(o, function(p){
      var l = box.querySelector('.gita-seq-loading');
      if(l) l.textContent = p < 1 ? 'Memuat animasi… ' + Math.round(p * 100) + '%' : '';
      if(p >= 1 && l) l.remove();
    }).then(function(){
      if(!CACHE.ready){
        // Tanpa fallback SVG: biarkan poster statis
        var l0 = box.querySelector('.gita-seq-loading');
        if(l0) l0.remove();
        return;
      }
      var l = box.querySelector('.gita-seq-loading');
      if(l) l.remove();
      var frames = CACHE.imgs.filter(Boolean);
      if(frames.length < 2) return; // cukup tampilkan frame pertama statis
      var st = { idx: 0, last: performance.now(), raf: 0, img: img, frames: frames,
                 interval: 1000 / o.fps };
      PLAYERS.set(box, st);
      var tick = function(now){
        var cur = PLAYERS.get(box);
        if(!cur) return;
        // Pause otomatis saat tab hidden / box tidak terlihat
        if(!document.hidden && box.isConnected && box.offsetParent !== null){
          if(now - cur.last >= cur.interval){
            cur.last = now;
            cur.idx = (cur.idx + 1) % cur.frames.length;
            cur.img.src = cur.frames[cur.idx].src;
          }
        } else {
          cur.last = now; // jangan lompat frame setelah pause
        }
        cur.raf = requestAnimationFrame(tick);
      };
      st.raf = requestAnimationFrame(tick);
    });
  }

  // Hentikan semua player (dipanggil saat pindah screen)
  function stopAll(){
    PLAYERS.forEach(function(st, box){ stop(box); });
  }

  return { play: play, stop: stop, stopAll: stopAll, preload: preload, _cache: CACHE, _defaults: DEFAULTS };
})();

/* ============================================================
   ECO-EXPLORER — js/renderers/gita-sequence.js
   Pilot & Dialog: Image-sequence Gita
   - Title: gita-thinking (48 WebP 360px @12fps)
   - Dialog Box: worried_loop (Step 1) & talking_loop (Step 2) (60 WebP 300px @12fps)
   Multi-cache, rAF loop, poster fallback, auto-pause on hidden tab
   ============================================================ */

var GitaSeq = (function(){
  var CACHES = new Map(); // cacheKey -> { imgs, total, ready, loading, failed, waiters }
  var PLAYERS = new Map(); // containerEl -> state
  var DEFAULTS = {
    folder: 'gita-thinking',
    prefix: 'g',
    ext: '.webp',
    pad: 3,           // g000.webp ... g047.webp
    frames: 48,
    step: 1,
    poster: '',       // poster fallback
    fps: 12,          // frame rate
    size: 400,
    alt: 'Gita Detektif Alam',
    showLoading: false,
    fallbackSVG: null
  };

  function padN(n, len){ var s = String(n); while(s.length < len) s = '0' + s; return s; }
  function frameURL(o, i){ return encodeURI(o.folder + '/' + o.prefix + padN(i, o.pad != null ? o.pad : 3) + o.ext); }
  function getCacheKey(o){ return [o.folder, o.prefix, o.pad, o.ext, o.frames, o.step || 1].join('::'); }

  function preload(opts, onProgress){
    var o = Object.assign({}, DEFAULTS, opts || {});
    var key = getCacheKey(o);
    var cache = CACHES.get(key);
    if(!cache){
      cache = { imgs: [], total: 0, ready: false, loading: false, failed: false, waiters: [] };
      CACHES.set(key, cache);
    }

    if(cache.ready){
      if(onProgress) onProgress(1);
      return Promise.resolve(cache);
    }
    if(cache.loading){
      return new Promise(function(resolve){
        cache.waiters.push(function(){
          if(onProgress) onProgress(1);
          resolve(cache);
        });
      });
    }

    cache.loading = true;
    var idx = [];
    var step = o.step || 1;
    for(var i = 0; i < o.frames; i += step) idx.push(i);
    cache.total = idx.length;
    cache.imgs = new Array(cache.total);
    var loaded = 0;

    return new Promise(function(resolve){
      var done = 0, anyOk = false;
      function checkDone(){
        if(done === idx.length){
          cache.ready = anyOk;
          cache.loading = false;
          cache.failed = !anyOk;
          while(cache.waiters.length){
            var w = cache.waiters.shift();
            try { w(); } catch(e){}
          }
          resolve(cache);
        }
      }

      idx.forEach(function(frameNo, k){
        var im = new Image();
        im.onload = function(){
          anyOk = true; loaded++; done++;
          cache.imgs[k] = im;
          if(onProgress) onProgress(done / idx.length);
          checkDone();
        };
        im.onerror = function(){
          done++;
          if(onProgress) onProgress(done / idx.length);
          checkDone();
        };
        im.src = frameURL(o, frameNo);
      });

      // safety timeout: jangan gantung loading lebih dari 20 detik
      setTimeout(function(){
        if(!cache.ready && !cache.failed){
          cache.ready = anyOk;
          cache.loading = false;
          resolve(cache);
        }
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

    var firstSrc = o.poster || (o.folder === 'gita-thinking' ? 'gita-thinking/poster.png' : frameURL(o, 0));

    // Tampilkan poster instan selagi preload
    box.innerHTML = '<img class="gita-seq" src="' + firstSrc + '" width="' + o.size +
      '" height="' + o.size + '" alt="' + o.alt + '" draggable="false">'
      + (o.showLoading ? '<div class="gita-seq-loading">Memuat animasi…</div>' : '');
    var img = box.querySelector('img.gita-seq');

    img.onerror = function(){
      if(o.fallbackSVG){
        box.innerHTML = typeof o.fallbackSVG === 'function' ? o.fallbackSVG() : o.fallbackSVG;
      } else {
        img.style.display = 'none';
      }
      var le = box.querySelector('.gita-seq-loading');
      if(le) le.remove();
    };

    preload(o, function(p){
      if(o.showLoading){
        var l = box.querySelector('.gita-seq-loading');
        if(l) l.textContent = p < 1 ? 'Memuat animasi… ' + Math.round(p * 100) + '%' : '';
        if(p >= 1 && l) l.remove();
      }
    }).then(function(cache){
      var l = box.querySelector('.gita-seq-loading');
      if(l) l.remove();

      if(!cache || !cache.ready){
        if(o.fallbackSVG && (!cache || cache.failed)){
          box.innerHTML = typeof o.fallbackSVG === 'function' ? o.fallbackSVG() : o.fallbackSVG;
        }
        return;
      }

      var frames = cache.imgs.filter(Boolean);
      if(frames.length < 2) return;

      var st = {
        idx: 0,
        last: performance.now(),
        raf: 0,
        img: img,
        frames: frames,
        interval: 1000 / (o.fps || 12)
      };
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

  return { play: play, stop: stop, stopAll: stopAll, preload: preload, _caches: CACHES, _defaults: DEFAULTS };
})();

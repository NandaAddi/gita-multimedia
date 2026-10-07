/* ============================================================
   ECO-EXPLORER — sw.js (SERVICE WORKER PWA OFFLINE ENGINE)
   Memungkinkan game dimainkan offline di HP/Tablet Android
   ============================================================ */

const CACHE_NAME = 'eco-explorer-v1.2.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/game.css',
  './js/state.js',
  './js/audio.js',
  './js/data/ecosystems.js',
  './js/data/missions.js',
  './js/data/assessment.js',
  './js/renderers/characters.js',
  './js/renderers/gita-sequence.js',
  './js/renderers/backgrounds.js',
  './js/scenes/title.js',
  './js/scenes/tutorial.js',
  './js/scenes/how.js',
  './js/scenes/teacher.js',
  './js/scenes/team.js',
  './js/scenes/biome.js',
  './js/scenes/mission-menu.js',
  './js/scenes/simulation.js',
  './js/scenes/quiz.js',
  './js/scenes/victory.js',
  './js/main.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('[SW] Precache partial error:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Hanya proses GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Jangan cache audio streaming berat bila terlalu besar, tapi coba cache first untuk aset game
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Ambil update di background (stale-while-revalidate)
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Bila belum ada di cache, ambil dari network
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback jika offline total dan mencari index
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});

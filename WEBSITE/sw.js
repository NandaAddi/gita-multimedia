/**
 * ECO-EXPLORER: HIGH-PERFORMANCE CACHE-FIRST SERVICE WORKER (PWA)
 * Enables 100% offline gameplay and zero-latency instant loading.
 */

const CACHE_NAME = 'eco-explorer-cache-v2';

const CORE_ASSETS = [
  './',
  './phaser.html',
  './lib/phaser.min.js',
  './js/assets-data.js',
  './js/vo-data.js',
  './js/audio.js',
  './js/phaser-game/main.js',
  './js/phaser-game/scenes/BootScene.js',
  './js/phaser-game/scenes/TitleScene.js',
  './js/phaser-game/scenes/TutorialScene.js',
  './js/phaser-game/scenes/TeamSelectScene.js',
  './js/phaser-game/scenes/MissionMenuScene.js',
  './js/phaser-game/scenes/SimulationScene.js',
  './js/phaser-game/scenes/QuizScene.js',
  './js/phaser-game/scenes/VictoryScene.js'
];

// Install: Cache all core assets into persistent browser storage
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching Eco-Explorer Core Bundle...');
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Some assets skipped during precache:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up legacy caches from previous builds
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Clearing legacy cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Cache-First Strategy with Network Fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache newly fetched valid responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Offline fallback
        return caches.match('./phaser.html');
      });
    })
  );
});

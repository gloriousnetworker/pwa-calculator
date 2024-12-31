const CACHE_NAME = 'pwa-cache-v3';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './icon.png',
    './icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
      caches.keys().then((cacheNames) => {
          return Promise.all(
              cacheNames.map((cacheName) => {
                  if (!cacheWhitelist.includes(cacheName)) {
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          return response || fetch(event.request).then((networkResponse) => {
              return caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                  return networkResponse;
              });
          });
      }).catch(() => {
          // Fallback to index.html for navigation requests
          if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
          }
      })
  );
});


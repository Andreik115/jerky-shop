const CACHE_NAME = 'komeat-cache-v3';
const urlsToCache = [
  '/jerky-shop/',
  '/jerky-shop/index.html',
  '/jerky-shop/pig.png',
  '/jerky-shop/chicken.png',
  '/jerky-shop/cow.png',
  '/jerky-shop/pork.jpg',
  '/jerky-shop/chicken_photo.jpg',
  '/jerky-shop/beef.jpg',
  '/jerky-shop/manifest.json',
  '/jerky-shop/icon-192.png',
  '/jerky-shop/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

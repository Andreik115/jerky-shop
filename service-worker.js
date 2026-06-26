const CACHE_NAME = 'komeat-cache-v5';
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
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('googleapis.com') || event.request.url.includes('script.google.com')) return;
  event.respondWith(
    fetch(event.request)
      .then(response => { const cloned = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned)); return response; })
      .catch(() => caches.match(event.request))
  );
});

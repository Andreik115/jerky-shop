const CACHE_NAME = 'komeat-cache-v1';
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
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

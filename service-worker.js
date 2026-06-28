const CACHE_NAME = 'komeat-cache-v6';
const urlsToCache = [
  '/jerky-shop/',
  '/jerky-shop/index.html',
  '/jerky-shop/offline.html',  // ← добавили
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
  // Пропускаем запросы к внешним API
  if (event.request.url.includes('googleapis.com') || 
      event.request.url.includes('script.google.com')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
        return response;
      })
      .catch(() => {
        // Если запрос был на страницу (HTML), показываем офлайн-заглушку
        if (event.request.mode === 'navigate') {
          return caches.match('/jerky-shop/offline.html');
        }
        // Для остальных ресурсов пытаемся найти в кэше
        return caches.match(event.request);
      })
  );
});

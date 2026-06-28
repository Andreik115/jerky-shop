importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBDsY7DCOqY9lQ8D7RDhBK0clnud7G7E18",
  authDomain: "komeat-61db2.firebaseapp.com",
  projectId: "komeat-61db2",
  storageBucket: "komeat-61db2.firebasestorage.app",
  messagingSenderId: "159451537231",
  appId: "1:159451537231:web:8fa75e5a0cf8fa549cef3a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/jerky-shop/icon-192.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

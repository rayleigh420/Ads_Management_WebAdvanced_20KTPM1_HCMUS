// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyB146SkpmuXnqOo7FSygytBABS30An7Iss',
  authDomain: 'web2-289e9.firebaseapp.com',
  projectId: 'web2-289e9',
  storageBucket: 'web2-289e9.appspot.com',
  messagingSenderId: '723598823366',
  appId: '1:723598823366:web:3cabac208eaca8cdce6cc7',
  measurementId: 'G-V9Z4RG3BX4',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // toast;
});

// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { updateFcmToken } from '@/store/auth/auth.slice';
import { getOrSetDeviceId } from '@/utils/config/diviceId';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
export const firebaseConfig = {
  apiKey: 'AIzaSyB146SkpmuXnqOo7FSygytBABS30An7Iss',
  authDomain: 'web2-289e9.firebaseapp.com',
  projectId: 'web2-289e9',
  storageBucket: 'web2-289e9.appspot.com',
  messagingSenderId: '723598823366',
  appId: '1:723598823366:web:3cabac208eaca8cdce6cc7',
  measurementId: 'G-V9Z4RG3BX4',
};

console.log('firebaseConfig', firebaseConfig);

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = (dispatch: any) => {
  return getToken(messaging, {
    vapidKey:
      'BDygqSlE9hkRG09R2oUTVLUfUFqUoP9r2utgrhJG87DFiWNRuwiQTf_MoP9HZXgJiI0WbmWvpJGTB9DwPV-P9MA',
  })
    .then((currentToken) => {
      if (currentToken) {
        dispatch(updateFcmToken({ fcmToken: currentToken }));
        console.log('current token for client: ', currentToken);
        getOrSetDeviceId(currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
    });
  });

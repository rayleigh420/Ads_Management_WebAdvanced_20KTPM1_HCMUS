import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { onMessageListener, requestForToken } from './firebase';

const Notificationss = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const workerRef = useRef<Worker>();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification');
    } else {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../worker.ts', import.meta.url), {
      type: 'module',
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        // .register(new URL('/utils/worker.ts', import.meta.url), { type: 'module' })
        .register(new URL('../../worker.ts', import.meta.url), { type: 'module' })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
    return () => {
      // workerRef.current?.postMessage('stopInterval'); // Dừng interval khi component bị hủy
      workerRef.current?.terminate();
    };
  }, []);

  const isSupported = () =>
    'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;

  requestForToken(dispatch);

  onMessageListener()
    .then((payload: any) => {
      console.log('payload', payload);
      // no turn off notification
      // i want to see notification when I'm not in the app but it shows up in chrome help me code

      toast.success(payload?.notification?.title + ': ' + payload?.notification?.body, {
        autoClose: false,
      });

      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          // Gửi một thông báo push
          registration.showNotification('Time is up!', {
            body: 'Your timer has finished.',
          });
          // Phát âm thanh
        });
      }
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log('failed: ', err));

  return <div></div>;
};

export default Notificationss;

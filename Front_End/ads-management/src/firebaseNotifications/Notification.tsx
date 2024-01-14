import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { onMessageListener, requestForToken } from './firebase';

const Notificationss = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification');
    } else {
      Notification.requestPermission();
    }
  }, []);

  requestForToken(dispatch);

  onMessageListener()
    .then((payload: any) => {
      console.log('payload', payload);
      // no turn off notification
      // i want to see notification when I'm not in the app but it shows up in chrome help me code

      toast.success(payload?.notification?.title + ': ' + payload?.notification?.body, {
        autoClose: false,
      });
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log('failed: ', err));

  return <div></div>;
};

export default Notificationss;

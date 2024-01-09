import { STORAGE } from '@/core/constants/share.constants';
import Cookie from 'js-cookie';

export const getOrSetDeviceId = () => {
  const deviceId = Cookie.get(STORAGE.DEVICE_ID);
  if (deviceId) {
    return deviceId;
  }
  const newDeviceId =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  Cookie.set(STORAGE.DEVICE_ID, newDeviceId, {
    path: '/',
  });
  return newDeviceId;
};

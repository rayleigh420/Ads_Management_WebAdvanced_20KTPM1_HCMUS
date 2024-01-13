import { STORAGE } from '@/core/constants/share.constants';
import Cookie from 'js-cookie';

export const getOrSetDeviceId = (id?: string) => {
  if (!id) {
    const deviceId = Cookie.get(STORAGE.DEVICE_ID);
    if (deviceId) {
      return deviceId;
    }
  }
  Cookie.set(STORAGE.DEVICE_ID, id!, {
    path: '/',
  });
};

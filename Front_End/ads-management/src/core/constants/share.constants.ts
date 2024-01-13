export const IS_LOGGED_IN = 'isLoggedIn';
export const EMAIL_VALIDATION_EXPIRE_TIME = 5 * 60 * 1000; //5 minute
export const EMAIL_VALIDATION_CODE_LENGTH = 6;

export const STORAGE = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  REPORT: 'report',
  USER_TYPE: 'userType',
  DEVICE_ID: 'deviceId',
};

export const USER_TYPE_ARRAY = ['admin', 'district', 'ward'];

export const firebaseConfig = {
  apiKey: 'AIzaSyB146SkpmuXnqOo7FSygytBABS30An7Iss',
  authDomain: 'web2-289e9.firebaseapp.com',
  projectId: 'web2-289e9',
  storageBucket: 'web2-289e9.appspot.com',
  messagingSenderId: '723598823366',
  appId: '1:723598823366:web:3cabac208eaca8cdce6cc7',
  measurementId: 'G-V9Z4RG3BX4',
};

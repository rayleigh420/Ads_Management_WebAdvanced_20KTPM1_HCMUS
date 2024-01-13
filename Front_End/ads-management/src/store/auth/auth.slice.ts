import { STORAGE } from '@/core/constants/share.constants';
import { UserType } from '@/core/enums/user-type.enum';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type AuthState = {
  userToken: string | null;
  isLogin?: boolean;
  type: UserType;
  fcmToken?: string;
};

// type LoginSuccessPayload = {
//   userToken: string;
//   type: UserType;
// };

const initialState: AuthState = {
  userToken: null, // for storing the JWT
  type: UserType.resident,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateFcmToken: (state, action) => {
      state.fcmToken = action.payload.fcmToken;
    },
    loginSuccess: (state, action) => {
      state.userToken = action.payload.userToken;
      state.isLogin = true;
      state.type = action.payload.type;
    },
    logoutSuccess: (state) => {
      state.userToken = null;
      state.isLogin = false;
      state.type = UserType.resident;
      Cookies.remove(STORAGE.ACCESS_TOKEN);
      Cookies.remove(STORAGE.REFRESH_TOKEN);
      Cookies.remove(STORAGE.USER_TYPE);
    },
  },
});
export const { loginSuccess, logoutSuccess, updateFcmToken } = authSlice.actions;

export default authSlice.reducer;

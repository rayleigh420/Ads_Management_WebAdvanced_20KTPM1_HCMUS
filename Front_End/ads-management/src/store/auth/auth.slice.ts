import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: null, // for storing the JWT
  isLogin: false, // for monitoring the login process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userToken = action.payload.token;
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.userToken = null;
      state.isLogin = false;
    },
  },
});
export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;

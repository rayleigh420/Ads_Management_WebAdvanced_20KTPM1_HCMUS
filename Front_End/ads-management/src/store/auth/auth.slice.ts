import { UserType } from '@/core/enums/user-type.enum';
import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  userToken: string | null;
  isLogin?: boolean;
  type: UserType;
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
    loginSuccess: (state, action) => {
      state.userToken = action.payload.userToken;
      state.isLogin = true;
      state.type = action.payload.type;
    },
    logoutSuccess: (state) => {
      state.userToken = null;
      state.isLogin = false;
      state.type = UserType.resident;
    },
  },
});
export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;

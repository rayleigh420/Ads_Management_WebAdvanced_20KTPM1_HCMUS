import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth.slice';

export const authStore = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateAuth = ReturnType<typeof authStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof authStore.dispatch;

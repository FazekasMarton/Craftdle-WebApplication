import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import errorReducer from '../features/error/errorSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

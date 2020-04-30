import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const createStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

export default createStore();

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const createStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState,
  });
};

export default createStore();

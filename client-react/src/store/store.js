import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chatReducer from './chatSlice';

export const createStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
      chat: chatReducer,
    },
    preloadedState: initialState,
  });
};

export default createStore();

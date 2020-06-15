import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import { initialState } from './chatSlice';

const merge = (initialState, state) => ({ chat: { ...initialState, ...state } });

export const createStore = (state = {}) => {
  return configureStore({
    reducer: {
      chat: chatReducer,
    },
    preloadedState: merge(initialState, state),
  });
};

export default createStore();

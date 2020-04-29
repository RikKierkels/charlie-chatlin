import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../containers/Register/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

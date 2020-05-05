import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isConnected: false,
  },
  reducers: {
    setIsConnected: (state, action) => {
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const { setIsConnected } = chatSlice.actions;

export default chatSlice.reducer;

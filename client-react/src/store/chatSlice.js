import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isConnected: false,
    users: [],
    messages: [],
  },
  // TODO: Check naming convention actions
  reducers: {
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      if (state.users.some((user) => user.username === newUser.username)) return;
      state.users = [...state.users, newUser];
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.username !== action.payload.username);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { setIsConnected, setUsers, removeUser, addUser, setMessages, addMessage } = chatSlice.actions;

export default chatSlice.reducer;

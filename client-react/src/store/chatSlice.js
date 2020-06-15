import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: null,
  isConnected: false,
  users: [],
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    activeUsersRetrieved: (state, action) => {
      state.users = action.payload;
    },
    connectivityChanged: (state, action) => {
      state.isConnected = action.payload;
    },
    messageReceived: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    userJoined: (state, action) => {
      const newUser = action.payload;
      if (state.users.some((user) => user.username === newUser.username)) return;
      state.users = [...state.users, newUser];
    },
    userLeft: (state, action) => {
      state.users = state.users.filter((user) => user.username !== action.payload.username);
    },
    userRegistered: (state, action) => {
      state.messages = action.payload.messages;
      state.user = action.payload.user;
    },
  },
});

export const {
  connectivityChanged,
  activeUsersRetrieved,
  userJoined,
  userLeft,
  userRegistered,
  messageReceived,
} = chatSlice.actions;

export default chatSlice.reducer;

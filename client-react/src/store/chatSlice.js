import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isConnected: false,
    users: [],
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
  },
});

export const { setIsConnected, setUsers, removeUser, addUser } = chatSlice.actions;

export default chatSlice.reducer;

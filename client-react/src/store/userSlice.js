import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    avatarId: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.avatarId = action.payload.avatarId;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

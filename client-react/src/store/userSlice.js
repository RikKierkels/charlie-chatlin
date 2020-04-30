import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    avatar: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

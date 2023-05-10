import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: any = { session: null, profile: null };

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (_, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      state.profile = action.payload.profile;
    },
    updateLocation: (state, action) => {
      state.profile.location = action.payload;
    },
    toggleIsOwner: (state) => {
      if (state.profile.is_owner) {
        state.profile.is_owner = false;
      } else {
        state.profile.is_owner = true;
      }
    },
    toggleIsRenter: (state) => {
      if (state.profile.is_renter) {
        state.profile.is_renter = false;
      } else {
        state.profile.is_renter = true;
      }
    },
  },
});
export const { setUserInfo, toggleIsOwner, toggleIsRenter, updateLocation, updateUser } =
  UserSlice.actions;
export default UserSlice.reducer;

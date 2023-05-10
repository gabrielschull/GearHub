import { createSlice } from "@reduxjs/toolkit";
import { User } from '../types/user.type';

export const initialState: any = { session: null, profile: null };

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (_, action) => {
      return action.payload;
    },
    updateLocation: (state, action) => {
      state.profile.location = action.payload;
    },
    toggleIsOwner: (state, action) => {
      if (state.profile.is_owner) {
        state.profile.is_owner = false;
      } else {
        state.profile.is_owner = true;
      }
    },
    toggleIsRenter: (state, action) => {
      if (state.profile.is_renter) {
        state.profile.is_renter = false;
      } else {
        state.profile.is_renter = true;
      }
    },
  },
});
export const { setUserInfo, toggleIsOwner, toggleIsRenter } = UserSlice.actions;
export default UserSlice.reducer;
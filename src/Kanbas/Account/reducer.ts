import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  profile: {},
};
const accountSlice = createSlice({
  name: "account",

  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setProfileUser: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = {};
    },
  },
});
export const { setCurrentUser,setProfileUser,clearProfile } = accountSlice.actions;
export default accountSlice.reducer;

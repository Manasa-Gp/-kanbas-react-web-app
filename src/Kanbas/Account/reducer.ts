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
    updateProfiler: (state, action) => {
      // Assuming action.payload contains updated profile data
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});
export const { setCurrentUser,setProfileUser,clearProfile,updateProfiler } = accountSlice.actions;
export default accountSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setTheCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setTheCourses } = courseSlice.actions;
export default courseSlice.reducer;

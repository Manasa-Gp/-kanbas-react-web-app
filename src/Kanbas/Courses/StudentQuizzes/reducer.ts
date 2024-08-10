import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attempt: null, // Initially, there is no attempt
};

const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {
    setAttempt: (state, action) => {
      state.attempt = action.payload;
    },
    addAttempt: (state, { payload: attempt }) => {
      state.attempt = {
        _id: attempt._id,
        course: attempt.course,
        quiz: attempt.quiz,
        username: attempt.username,
        score: attempt.score,
        attempts: attempt.attempts,
        // add any other relevant fields
      } as any;
    },
    updateAttempt: (state:any, { payload: attempt }) => {
      if (state.attempt && state.attempt._id === attempt._id) {
        state.attempt = attempt;
      } 
    },
  },
});

export const { setAttempt, addAttempt, updateAttempt } = attemptsSlice.actions;
export default attemptsSlice.reducer;

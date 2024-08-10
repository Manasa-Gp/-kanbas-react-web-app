import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import coursesReducer from "./Courses/Quizzes/reducer";
import quizAttemptsReducer from "./Courses/StudentQuizzes/reducer";
const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    assignmentsReducer,
    accountReducer,
    quizzesReducer,
    quizAttemptsReducer

  
  },
});
export default store;


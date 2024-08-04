import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};
const  quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz : (state, { payload: quiz}) => {
      const newQuiz: any = {
          _id: quiz._id,
          description: quiz.description,
          course: quiz.course,
          due: quiz.due,
          availableFrom: quiz.availableFrom,
          availableUntil: quiz.availableUntil,
          for: quiz.for,
          published: quiz.published,
          quizType: quiz.quizType,
          points: quiz.points,
          assignmentGroup: quiz.assignmentGroup,
          shuffleAnswers: quiz.showCorrectAnswers,
          timeLimitCheckbox: quiz.timeLimitCheckbox,
          timeLimit: quiz.timeLimit,
          multipleAttempts: quiz.multipleAttempts,
          showCorrectAnswers: quiz.showCorrectAnswers,
          accessCode: quiz.accessCode,
          oneQuestionAtATime: quiz.oneQuestionAtATime,
          webcamRequired: quiz.webcamRequired,
          lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,

      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
  },
  deleteQuiz: (state, { payload: quizId }) => {
    state.quizzes = state.quizzes.filter((a: any) => a._id !== quizId);
},

updateQuiz: (state, { payload: quiz }) => {
    state.quizzes = state.quizzes.map((a: any) => a._id === quiz._id ? quiz : a) as any;
},

editQuiz: (state, { payload: quizId }) => {
    state.quizzes = state.quizzes.map((a: any) =>
      a._id === quizId ? { ...a, editing: true } : a
    ) as any;
  },

},
});
export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
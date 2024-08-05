import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    console.log(response);
    return response.data;
}
export const GetQuizDetails = async (courseId: string, quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

export const updateQuizDetails = async (quizId: string,quiz: any) => {
    console.log("updateQuizDetails")
    const response = await axios.put(`${QUIZZES_API}/${quizId}`, quiz);
    console.log(response.data);
    return response.data;
};

export const deleteQuizDetails = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
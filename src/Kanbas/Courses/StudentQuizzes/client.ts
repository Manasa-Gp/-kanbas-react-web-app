import axios from "axios";
import AttemptQuiz from "./AttemptQuizPage";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZESATTEMPT_API = `${REMOTE_SERVER}/api/quizattempt`;
export const createQuizAttempt = async (quizAttempt:any) => {
    try {
      console.log("createQuizAttempt",quizAttempt)
      const response = await axios.post(`${QUIZZESATTEMPT_API}/new`, quizAttempt);
      return response.data;
    } catch (error:any) {
      throw new Error(`Error creating quiz attempt: ${error.response?.data?.error || error.message}`);
    }
  };
  
  /**
   * Update attempts for a specific quiz attempt by quiz attempt ID.
   * @param {String} qaid - The ID of the quiz attempt.
   * @param {Array<String>} attempts - The updated attempts array.
   * @returns {Promise<Object>} - The updated quiz attempt document.
   */
  export const updateQuizAttempts = async (qaid:any, attempts:any) => {
    try {
      console.log("get qu attempt client",qaid,attempts);
      const response = await axios.put(`${QUIZZESATTEMPT_API}/${qaid}`,  attempts );
      return response.data;
    } catch (error:any) {
      throw new Error(`Error updating quiz attempts: ${error.response?.data?.error || error.message}`);
    }
  };

  export const getQuizAttemptBy = async (username:any, course:any, quiz:any) => {
    try {
    console.log("get q attempt",username,course,quiz);

      const response = await axios.get(`${QUIZZESATTEMPT_API}/get`, {
        params: { username, course, quiz }
      });
      console.log("get q attempt",response);
      return response.data;
    } catch (error:any) {
      throw new Error(`Error retrieving quiz attempt: ${error.response?.data?.error || error.message}`);
    }
  };
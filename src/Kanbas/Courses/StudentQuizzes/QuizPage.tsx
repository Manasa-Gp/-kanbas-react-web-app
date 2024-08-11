import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MultipleChoiceQuestion from './QuizPreview/MultipleChoiceQuestion';
import TrueFalseQuestion from './QuizPreview/TrueFalseQuestion';
import FillInBlanksQuestion from './QuizPreview/FillInBlanksQuestion';
import { addAttempt, updateAttempt,setAttempt } from './reducer'; // Adjust the import path
import { createQuizAttempt, updateQuizAttempts, getQuizAttemptBy } from './client'; // Adjust the import path

// Define TypeScript interfaces
interface Question {
  type: string;
  question: string;
  answer: string[];
  options: { [key: string]: string };
  quiz: string;
  points: number;
  title: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  howManyAttempts: number;
  questions: Question[];
}

interface Attempt {
  _id: string;
  quiz: string;
  username: string;
  score: number;
  attempts: [];
}

interface RootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
  quizAttemptsReducer: {
    attempts: Attempt[];
  };
}

function QuizPage() {
    const { cid, qid } = useParams<{ cid: string; qid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const attempts = useSelector((state: RootState) => state.quizAttemptsReducer.attempts);
    const profileUser = useSelector((state: any) => state.accountReducer.profile) || null;
    const quiz = quizzes.find((q) => q._id === qid);
  
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [localQuizAttempt, setLocalQuizAttempt] = useState({
      _id: "",
      course: cid,
      quiz: qid,
      score: 0,
      number: quiz?.howManyAttempts,
      username:profileUser.username,
      attempts: Array(quiz ? quiz.questions.length : 0).fill([""]),
    });
  
    // Fetch existing attempt from the server if not found in the state
    useEffect(() => {
      const fetchQuizAttempt = async () => {
        try {

          if (profileUser && cid && qid) {
            const existingAttempt = await getQuizAttemptBy(profileUser.username, cid, qid);
            // console.log("local ex nattempts");
            // console.log("local ex nattempts",existingAttempt );

            if (existingAttempt && existingAttempt._id) {
              setLocalQuizAttempt({
                _id: existingAttempt._id,
                course: existingAttempt.course,
                quiz: existingAttempt.quiz,
                score: existingAttempt.score,
                number: existingAttempt.number,
                username:profileUser.username,
                attempts: Array(quiz ? quiz.questions.length : 0).fill([""]),
              });
            }
          }
          dispatch(setAttempt(localQuizAttempt));
          console.log("local v attempts", localQuizAttempt)
        } catch (error:any) {
          console.error("Error fetching quiz attempt:", error.message);
        }
      };
  
      fetchQuizAttempt();
    }, [profileUser, cid, qid]);

    useEffect(() => {
      if (quiz) {
        const updatedAttempts = [...localQuizAttempt.attempts];
        if (currentQuestion < quiz.questions.length) {
          const currentQuestionData = quiz.questions[currentQuestion];
          if (currentQuestionData.type === 'FIB'  && updatedAttempts[currentQuestion].length === 0 ) {
            updatedAttempts[currentQuestion] = Array(currentQuestionData.answer.length).fill("");
            console.log(`[QuizPage] Updated attempts for question ${currentQuestion} with ${currentQuestionData.answer.length} empty strings:`, updatedAttempts[currentQuestion]);
            setLocalQuizAttempt((prev) => ({
              ...prev,
              attempts: updatedAttempts,
            }));
          }
        }
      }
    }, [currentQuestion, quiz]);
  
    // If quiz is not found, display a message
    if (!quiz) {
      return <div>Quiz not found</div>;
    }
  
    // Handle navigation between questions
    const handleNextQuestion = () => {
      setCurrentQuestion((prev) => (prev < quiz.questions.length - 1 ? prev + 1 : prev));
    };
  
    const handlePreviousQuestion = () => {
      setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    };
  
    // Update localQuizAttempt state
    const handleAnswerChange = (questionIndex: number, selectedAnswer: string[]) => {
      console.log("select__",selectedAnswer);
      const updatedAttempts = [...localQuizAttempt.attempts] as any;
  
      // Ensure that the selected answer is an array
      if (Array.isArray(selectedAnswer)) {
        updatedAttempts[questionIndex] = selectedAnswer;
      } else {
        updatedAttempts[questionIndex] = [];
      }
  
      setLocalQuizAttempt((prev) => ({
        ...prev,
        attempts: updatedAttempts,
      }));
    };
  
   const saveAttempt = async () => {
  try {
    // Reduce the number of attempts by 1
  

    let score = 0;
    if (quiz) {
      quiz.questions.forEach((question, index) => {
        const userAnswers = localQuizAttempt.attempts[index] || [];
        const correctAnswers = question.answer;

        if (question.type === 'MCQ' || question.type === 'TF') {
          if (userAnswers.length === 1 && correctAnswers.includes(userAnswers[0])) {

            score += question.points;
          }
        } else if (question.type === 'FIB') {
          if (userAnswers.length === correctAnswers.length && 
              userAnswers.every((ans:any, idx:any) => ans === correctAnswers[idx])) {
            score += question.points;
          }
        }
      });
    }
    console.log("score: " + score)
     const updatedAttempt = {
      ...localQuizAttempt,
      score,
      number:(localQuizAttempt.number ?? 1) > 0 ? (localQuizAttempt.number ?? 1) - 1 : 0,
    };
    setLocalQuizAttempt(updatedAttempt);



    if (updatedAttempt._id) {
      // Update existing attempt
      console.log("updated",updatedAttempt);
      await updateQuizAttempts(updatedAttempt._id, updatedAttempt);
      dispatch(updateAttempt(updatedAttempt));
    } else {
      // Create a new attempt if none exists
      const newAttempt = await createQuizAttempt(updatedAttempt);
      setLocalQuizAttempt((prev) => ({
        ...prev,
        _id: newAttempt._id,
      }));
      dispatch(addAttempt(newAttempt));
    }

    // Navigate to the review page
    navigate(`/Kanbas/Courses/${cid}/Quizzes/review/${qid}`);
  } catch (error: any) {
    console.error("Error saving quiz attempt:", error.message);
  }
};

  
    const currentQuestionData = quiz.questions[currentQuestion];
    console.log("jer", currentQuestionData);
    if (!currentQuestionData) {
      return <div>No question data available</div>;
    }
  
    // Determine which question component to render
    let QuestionComponent = null;
  
    switch (currentQuestionData.type) {
      case 'MCQ':
        QuestionComponent = MultipleChoiceQuestion;
        break;
      case 'TF':
        QuestionComponent = TrueFalseQuestion;
        break;
      case 'FIB':
        QuestionComponent = FillInBlanksQuestion;
        break;
      default:
        return <div>Unknown question type</div>;
    }
  
    return (
      <div>
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
        <div>
          <h2>{currentQuestionData.title}</h2>
          <div>Type: {currentQuestionData.type}</div>
          {QuestionComponent && (
            <QuestionComponent
              question={currentQuestionData.question}
              options={currentQuestionData.options}
              answer={localQuizAttempt.attempts[currentQuestion] || []}
              title={currentQuestionData.title}
              onChange={(answer: any) => handleAnswerChange(currentQuestion, answer)}
            />
          )}
        </div>
        <br />
        <div>
          <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            Previous
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestion === quiz.questions.length - 1}>
            Next
          </button>
          <button onClick={saveAttempt}>Save Attempt</button>
        </div>
      </div>
    );
  }
  
  export default QuizPage;
  
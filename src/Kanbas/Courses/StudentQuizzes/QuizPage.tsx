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
  
    // Save or update the quiz attempt
    const saveAttempt = async () => {
        // console.log("localQuizAttempt update id", localQuizAttempt._id);

      if (localQuizAttempt._id) {
        // Update existing attempt
        // console.log("localQuizAttempt update check", localQuizAttempt.attempts);
        await updateQuizAttempts(localQuizAttempt._id, localQuizAttempt);
        // console.log("checking attempt " + localQuizAttempt);
        dispatch(updateAttempt(localQuizAttempt));
      } else {
        // console.log("localQuizAttempt", localQuizAttempt.attempts);
        const newAttempt = await createQuizAttempt(localQuizAttempt);
        setLocalQuizAttempt((prev) => ({
          ...prev,
          _id: newAttempt._id,
        }));
        dispatch(addAttempt(newAttempt));
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
  
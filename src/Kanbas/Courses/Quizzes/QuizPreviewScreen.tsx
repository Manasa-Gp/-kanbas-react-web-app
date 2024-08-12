import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MultipleChoiceQuestion from './QuizPreview/MultipleChoiceQuestion';
import TrueFalseQuestion from './QuizPreview/TrueFalseQuestion';
import FillInBlanksQuestion from './QuizPreview/FillInBlanksQuestion';
import { createQuizAttempt, getQuizAttemptBy, updateQuizAttempts } from '../StudentQuizzes/client';
import { addAttempt, setAttempt, updateAttempt } from '../StudentQuizzes/reducer';

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

function QuizPreviewScreen() {
    const { cid, qid } = useParams<{ cid: string; qid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const profileUser = useSelector((state: any) => state.accountReducer.profile) || null;
    const quiz = quizzes.find((q) => q._id === qid);
  
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [localQuizAttempt, setLocalQuizAttempt] = useState({
      _id: "",
      course: cid,
      quiz: qid,
      score: 0,
      number: 0,
      username: profileUser.username,
      attempts: Array(quiz ? quiz.questions.length : 0).fill([""]),
    });
    const [showScore, setShowScore] = useState(false); // State to manage score display

    // Fetch existing attempt from the server if not found in the state
    useEffect(() => {
      const fetchQuizAttempt = async () => {
        try {
          if (profileUser && cid && qid) {
            const existingAttempt = await getQuizAttemptBy(profileUser.username, cid, qid);
            if (existingAttempt && existingAttempt._id) {
              setLocalQuizAttempt({
                _id: existingAttempt._id,
                course: existingAttempt.course,
                quiz: existingAttempt.quiz,
                score: existingAttempt.score,
                number: existingAttempt.number,
                username: profileUser.username,
                attempts: existingAttempt.attempts,
              });
            }
          }
          dispatch(setAttempt(localQuizAttempt));
        } catch (error: any) {
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
          if (currentQuestionData.type === 'FIB' && updatedAttempts[currentQuestion].length === 0) {
            updatedAttempts[currentQuestion] = Array(currentQuestionData.answer.length).fill("");
            setLocalQuizAttempt((prev) => ({
              ...prev,
              attempts: updatedAttempts,
            }));
          }
        }
      }
    }, [currentQuestion, quiz]);

    if (!quiz) {
      return <div>Quiz not found</div>;
    }
  
    const handleNextQuestion = () => {
      setCurrentQuestion((prev) => (prev < quiz.questions.length - 1 ? prev + 1 : prev));
    };
  
    const handlePreviousQuestion = () => {
      setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    };
  
    const handleAnswerChange = (questionIndex: number, selectedAnswer: string[]) => {
      const updatedAttempts = [...localQuizAttempt.attempts] as any;
  
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
        // Calculate the score
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
          number: 0,
        };
        setLocalQuizAttempt(updatedAttempt);


    
        if (updatedAttempt._id) {
          await updateQuizAttempts(updatedAttempt._id, updatedAttempt);
          dispatch(updateAttempt(updatedAttempt));
        } else {
          const newAttempt = await createQuizAttempt(updatedAttempt);
          setLocalQuizAttempt((prev) => ({
            ...prev,
            _id: newAttempt._id,
          }));
          dispatch(addAttempt(newAttempt));
        }

        // Set the showScore state to true
        setShowScore(true);

        // Navigate or show success message
      } catch (error: any) {
        console.error("Error saving quiz attempt:", error.message);
      }
    };

    const currentQuestionData = quiz.questions[currentQuestion];
    if (!currentQuestionData) {
      return <div>No question data available</div>;
    }
  
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
          <div>Points: {currentQuestionData.points}</div>
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
        {showScore && (
          <div>
            <h2>Your Score: {localQuizAttempt.score}</h2>
          </div>
        )}
      </div>
    );
  }
  
export default QuizPreviewScreen;

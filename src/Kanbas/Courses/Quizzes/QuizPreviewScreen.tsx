import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MultipleChoiceQuestion from './QuizPreview/MultipleChoiceQuestion';
import TrueFalseQuestion from './QuizPreview/TrueFalseQuestion';
import FillInBlanksQuestion from './QuizPreview/FillInBlanksQuestion';
import {removeQuestionFromQuiz} from './client';
import {updateQuiz} from './reducer';

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

interface RootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
}

function QuizPreviewScreen() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quiz = quizzes ? quizzes.find((q) => q._id === qid) : null;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => (prev < quiz.questions.length - 1 ? prev + 1 : prev));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleAnswerChange = (questionId: string, answer: string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleDeleteQuestion = async() => {
    try {
      const questionId = currentQuestion;
      await removeQuestionFromQuiz(qid, questionId);

      // Update Redux store or local state
      const updatedQuestions = quiz.questions.filter((_, index) => index !== currentQuestion);
      dispatch(updateQuiz({ ...quiz, questions: updatedQuestions }));

      // Move to the next question or previous one if it's the last question
      if (currentQuestion >= updatedQuestions.length) {
        setCurrentQuestion(updatedQuestions.length - 1);
      } else {
        setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
      }

    } catch (error) {
      console.error('Failed to delete question:', error);
      // Handle error as needed, e.g., show an error message to the user
    }
  };


  const handleEditQuestion = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}/questionedit/${currentQuestion}`);
  };

  const currentQuestionData = quiz.questions[currentQuestion];
   console.log("testing");
   console.log('Question Data:', JSON.stringify(currentQuestionData, null, 2));

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
        {currentQuestionData.type === 'MCQ' && (
          <MultipleChoiceQuestion
            question={currentQuestionData.question}
            options={currentQuestionData.options}
            answer={currentQuestionData.answer}
            title = {currentQuestionData.title}
            onChange={(answer:any) => handleAnswerChange(currentQuestionData.question, answer)}
          />
        )}
        {currentQuestionData.type === 'TF' && (
          <TrueFalseQuestion
            question={currentQuestionData.question}
            options={currentQuestionData.options}
            answer={currentQuestionData.answer}
            title = {currentQuestionData.title}
            onChange={(answer:any) => handleAnswerChange(currentQuestionData.question, answer)}
          />
        )}
        {currentQuestionData.type === 'FIB' && (
          <FillInBlanksQuestion
            question={currentQuestionData.question}
            options={currentQuestionData.options}
            answer={currentQuestionData.answer}
            title = {currentQuestionData.title}
            onChange={(answer:any) => handleAnswerChange(currentQuestionData.question, answer)}
          />
        )}
      </div>
      <div>
        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={handleNextQuestion} disabled={currentQuestion === quiz.questions.length - 1}>
          Next
        </button>
        <button onClick={handleEditQuestion}>
          Edit Question
        </button>
        <button onClick={handleDeleteQuestion}>
          Delete Question
        </button>
      </div>
    </div>
  );
}

export default QuizPreviewScreen;

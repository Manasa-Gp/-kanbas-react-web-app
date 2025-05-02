import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MultipleChoiceEditor from './QuestionEditor/MultipleChoiceEditor';
import TrueFalseEditor from './QuestionEditor/TrueFalseEditor';
import FillInBlanksEditor from './QuestionEditor/FillInBlanksEditor';
import { updateQuiz } from './reducer';
import { updateQuizDetails, updateQuizPoints } from './client';

export default function QuestionEditor() {
  const { cid, qid,quid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  
  // Get the specific quiz based on qid
  const quiz = quizzes ? quizzes.find((q:any) => q._id === qid) : null;
  
  // Extract the specific question based on quid
  const questionIndex = quid ? parseInt(quid, 10) : -1;
  const question = quiz?.questions[questionIndex] || null;

  const [questionType, setQuestionType] = useState(question?.type || 'MCQ');

  useEffect(() => {
    if (question) {
      setQuestionType(question.type);
    }
  }, [question]);

  const handleSave = async (questionData: any) => {
    console.log("reach request");
  
    if (quiz) {
      console.log("reach request");
      const updatedQuestions = [...quiz.questions];
      if (questionIndex >= 0) {
        // Update existing question
        updatedQuestions[questionIndex] = questionData;
      } else {
        // Add new question
        updatedQuestions.push(questionData);
      }
  
      // Calculate total points after adding/updating the question
      const totalPoints = updatedQuestions.reduce((acc: number, question: any) => acc + (question.points || 0), 0);
  
      const updatedQuiz = { ...quiz, questions: updatedQuestions, points: totalPoints };
  
      console.log(updatedQuiz);
  
      // Dispatch the updated quiz to the Redux store
      dispatch(updateQuiz(updatedQuiz));
  
      // Optionally, update the quiz details in the database
      await updateQuizPoints(qid as string, totalPoints);

    }
  
    // Navigate back to the quiz editing page
    navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}`);
  };

  const renderEditor = () => {
  
    switch (questionType) {
      case 'MCQ':
        return <MultipleChoiceEditor onSave={handleSave} onCancel={handleCancel} question={question} questindex={questionIndex} quizID = {qid}  />;
      case 'TF':
        return <TrueFalseEditor onSave={handleSave} onCancel={handleCancel} question={question} questindex={questionIndex} quizID = {qid}/>;
      case 'FIB':
        return <FillInBlanksEditor onSave={handleSave} onCancel={handleCancel}  question={question} questindex={questionIndex} quizID = {qid}/>;
      default:
        return null;
    }
  };

  return (
    <div>
      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
        <option value="MCQ">Multiple Choice</option>
        <option value="TF">True/False</option>
        <option value="FIB">Fill in the Blanks</option>
      </select>
      {renderEditor()}
    </div>
  );
}
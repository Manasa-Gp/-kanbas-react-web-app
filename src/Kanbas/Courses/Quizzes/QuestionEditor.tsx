import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MultipleChoiceEditor from './QuestionEditor/MultipleChoiceEditor';
import TrueFalseEditor from './QuestionEditor/TrueFalseEditor';
import FillInBlanksEditor from './QuestionEditor/FillInBlanksEditor';

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

  const handleSave = (questionData: any) => {
    // Handle saving logic here
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
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
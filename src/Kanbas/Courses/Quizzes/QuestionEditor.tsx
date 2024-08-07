import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MultipleChoiceEditor from './QuestionEditor/MultipleChoiceEditor';
import TrueFalseEditor from './QuestionEditor/TrueFalseEditor';
import FillInBlanksEditor from './QuestionEditor/FillInBlanksEditor';

export default function QuestionEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [questionType, setQuestionType] = useState('MCQ');
  console.log("hasQuestionType");
  console.log(questionType);

  const handleSave = (questionData:any) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  const renderEditor = () => {
    switch (questionType) {
      case 'MCQ':
        return <MultipleChoiceEditor onSave={handleSave} onCancel={handleCancel} />;
      case 'TF':
        return <TrueFalseEditor onSave={handleSave} onCancel={handleCancel} />;
      case 'FIB':
        return <FillInBlanksEditor onSave={handleSave} onCancel={handleCancel} />;
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

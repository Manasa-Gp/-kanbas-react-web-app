import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MultipleChoiceEditor from './QuestionEditor/MultipleChoiceEditor';
import TrueFalseEditor from './QuestionEditor/TrueFalseEditor';
import FillInBlanksEditor from './QuestionEditor/FillInBlanksEditor';

export default function QuestionEditor() {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questionType, setQuestionType] = useState('multipleChoice');

  const handleSave = (questionData:any) => {
    // Placeholder for save logic
    console.log('Saving data:', questionData);
    // Navigate back to quiz details
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const renderEditor = () => {
    switch (questionType) {
      case 'multipleChoice':
        return <MultipleChoiceEditor onSave={handleSave} onCancel={handleCancel} />;
      case 'trueFalse':
        return <TrueFalseEditor onSave={handleSave} onCancel={handleCancel} />;
      case 'fillInBlanks':
        return <FillInBlanksEditor onSave={handleSave} onCancel={handleCancel} />;
      default:
        return null;
    }
  };
  return (
    <div>
      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="trueFalse">True/False</option>
        <option value="fillInBlanks">Fill in the Blanks</option>
      </select>
      {renderEditor()}
    </div>
  );
}


// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import MultipleChoiceEditor from './QuestionEditor/MultipleChoiceEditor';
// import TrueFalseEditor from './QuestionEditor/TrueFalseEditor';
// import FillInBlanksEditor from './QuestionEditor/FillInBlanksEditor';
// import { addQuestionToQuiz, updateQuestionInQuiz, removeQuestionFromQuiz } from './client';

// export default function QuestionEditor() {
//   const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [questionType, setQuestionType] = useState('multipleChoice');
//   const [editingQuestionId, setEditingQuestionId] = useState<any | any>();
//   const handleSave = async (questionData: any) => {
//     try {
//       if (editingQuestionId) {
//         await updateQuestionInQuiz(quizId, editingQuestionId, questionData);
//       } else {
//         await addQuestionToQuiz(quizId, questionData);
//       }
//       navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
//     } catch (error) {
//       console.error("Error saving question:", error);
//     }
//   };

//   const handleCancel = () => {
//     navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
//   };

//   const renderEditor = () => {
//     const commonProps = {
//       onSave: handleSave,
//       onCancel: handleCancel,
//       quizId,
//       questionId: editingQuestionId
//     };

//     switch (questionType) {
//       case 'multipleChoice':
//         return <MultipleChoiceEditor {...commonProps} />;
//       case 'trueFalse':
//         return <TrueFalseEditor {...commonProps} />;
//       case 'fillInBlanks':
//         return <FillInBlanksEditor {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
//         <option value="multipleChoice">Multiple Choice</option>
//         <option value="trueFalse">True/False</option>
//         <option value="fillInBlanks">Fill in the Blanks</option>
//       </select>
//       {renderEditor()}
//     </div>
//   );
// }

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TrueFalseEditorProps {
  onSave: (questionData: any) => void;
  onCancel: () => void;
}

function TrueFalseEditor({ onSave, onCancel }: TrueFalseEditorProps) {
  const [question, setQuestion] = useState({
    title: '',
    points: 1,
    questionText: '',
    isTrue: true
  });

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px",
        padding: "20px"
      }}>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Question Title"
        value={question.title}
        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
      />
      <h4>pts:</h4>
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Points"
        value={question.points}
        onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value, 10) })}
      />
      <h4>Question:</h4>
      <ReactQuill
        theme="snow"
        value={question.questionText}
        onChange={(value) => setQuestion({ ...question, questionText: value })}
        className="mb-2"
      />
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="isTrue"
            checked={question.isTrue}
            onChange={() => setQuestion({ ...question, isTrue: true })}
          />
          <label className="form-check-label">True</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="isTrue"
            checked={!question.isTrue}
            onChange={() => setQuestion({ ...question, isTrue: false })}
          />
          <label className="form-check-label">False</label>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-success" onClick={onSave}>Save</button>
        <button className="btn btn-danger ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
export default TrueFalseEditor;


// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { addQuestionToQuiz, updateQuestionInQuiz, removeQuestionFromQuiz } from '../client';

// interface TrueFalseEditorProps {
//   onSave: (questionData: any) => void;
//   onCancel: () => void;
//   quizId: any;
//   questionId?: string; // Optional for editing an existing question
// }

// function TrueFalseEditor({ onSave, onCancel, quizId, questionId }: TrueFalseEditorProps) {
//   const [question, setQuestion] = useState({
//     title: '',
//     points: 1,
//     questionText: '',
//     isTrue: true
//   });

//   const handleSave = async () => {
//     try {
//       if (questionId) {
//         await updateQuestionInQuiz(quizId, questionId, question); // Update existing question
//       } else {
//         await addQuestionToQuiz(quizId, question); // Add new question
//       }
//       onSave(question);
//     } catch (error) {
//       console.error("Error saving question:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       if (questionId) {
//         await removeQuestionFromQuiz(quizId, questionId); // Remove question from quiz
//       }
//       onCancel(); // Go back to previous screen or clear the form
//     } catch (error) {
//       console.error("Error deleting question:", error);
//     }
//   };

//   return (
//     <div style={{
//         display: "flex",
//         flexDirection: "column",
//         margin: "20px",
//         padding: "20px"
//       }}>
//       <input
//         type="text"
//         className="form-control mb-2"
//         placeholder="Question Title"
//         value={question.title}
//         onChange={(e) => setQuestion({ ...question, title: e.target.value })}
//       />
//       <h4>pts:</h4>
//       <input
//         type="number"
//         className="form-control mb-2"
//         placeholder="Points"
//         value={question.points}
//         onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value, 10) })}
//       />
//       <h4>Question:</h4>
//       <ReactQuill
//         theme="snow"
//         value={question.questionText}
//         onChange={(value) => setQuestion({ ...question, questionText: value })}
//         className="mb-2"
//       />
//       <div>
//         <div className="form-check form-check-inline">
//           <input
//             className="form-check-input"
//             type="radio"
//             name="isTrue"
//             checked={question.isTrue}
//             onChange={() => setQuestion({ ...question, isTrue: true })}
//           />
//           <label className="form-check-label">True</label>
//         </div>
//         <div className="form-check form-check-inline">
//           <input
//             className="form-check-input"
//             type="radio"
//             name="isTrue"
//             checked={!question.isTrue}
//             onChange={() => setQuestion({ ...question, isTrue: false })}
//           />
//           <label className="form-check-label">False</label>
//         </div>
//       </div>
//       <div className="mt-3">
//         <button className="btn btn-success" onClick={handleSave}>Save</button>
//         <button className="btn btn-danger ms-2" onClick={onCancel}>Cancel</button>
//         {questionId && (
//           <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TrueFalseEditor;

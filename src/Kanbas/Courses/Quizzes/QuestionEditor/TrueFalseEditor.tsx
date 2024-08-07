import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdDeleteOutline } from 'react-icons/md';
import { updateQuestionInQuiz, addQuestionToQuiz } from '../client';
import { useNavigate } from 'react-router';

interface Question {
  question: string;
  points: number;
  options: { [key: string]: string }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  title: string;
  quiz: string;
  type: string;
}

interface Props {
  onSave: (question: Question) => void;
  onCancel: () => void;
  question?: Question;
  questindex?: number;
  quizID: any;
}

function TrueFalseEditor({ question: initialQuestion, questindex: quesid, quizID: qid, onSave, onCancel }: Props) {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<Question>({
    points: initialQuestion?.points || 1,
    question: initialQuestion?.question || '',
    options: { 'a': 'True', 'b': 'False' }, // Fixed True/False options
    answer: initialQuestion?.answer || [],
    title: initialQuestion?.title || '',
    type: initialQuestion?.type || 'TF',
    quiz: initialQuestion?.quiz || qid,
  });

  useEffect(() => {
    if (initialQuestion) {
      setQuestionData(initialQuestion);
    }
  }, [initialQuestion]);

  const handleCorrectChange = (key: string) => {
    setQuestionData({
      ...questionData,
      answer: [key]
    });
  };

  const handleSave = async () => {
    try {
      if (initialQuestion) {
        await updateQuestionInQuiz(qid, quesid, questionData);
      } else {
        await addQuestionToQuiz(qid, questionData);
      }
      // Handle success as needed, e.g., redirect or show a message
    } catch (error) {
      console.error('Failed to save question:', error);
      // Handle error as needed, e.g., show an error message to the user
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "20px", padding: "20px" }}>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Question Title"
        value={questionData.title}
        onChange={(e) => setQuestionData({ ...questionData, title: e.target.value })}
      />
      <h4>Points:</h4>
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Points"
        value={questionData.points}
        onChange={(e) => setQuestionData({ ...questionData, points: parseInt(e.target.value, 10) })}
      />
      <h4>Question:</h4>
      <ReactQuill
        theme="snow"
        value={questionData.question}
        onChange={(value) => setQuestionData({ ...questionData, question: value })}
      />
      <div>
        {Object.entries(questionData.options).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="radio"
              name="correct"
              checked={questionData.answer[0] === key}
              onChange={() => handleCorrectChange(key)}
            />&nbsp;
            <label>{value}</label>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="btn btn-success" onClick={handleSave}>Save</button>
        <button className="btn btn-danger ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default TrueFalseEditor;

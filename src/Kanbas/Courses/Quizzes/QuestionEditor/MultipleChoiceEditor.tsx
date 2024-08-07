import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdDeleteOutline } from 'react-icons/md';

interface Question {
  question: string;
  points: number;
  options: { text: string, isCorrect: boolean }[];
  answer: string[]; // Array of strings for correct answers
}

interface Props {
  onSave: (question: Question) => void;
  onCancel: () => void;
}

function MultipleChoiceEditor({ onSave, onCancel }: Props) {
  const [question, setQuestion] = useState<Question>({
    points: 1,
    question: '',
    options: [{ text: '', isCorrect: false }], // Initializing with one option
    answer: [],
  });

  const handleAddChoice = () => {
    setQuestion({
      ...question,
      options: [...question.options, { text: '', isCorrect: false }]
    });
  };

  const handleAnswerChange = (index: number, text: string) => {
    const newOptions = question.options.map((option, i) =>
      i === index ? { ...option, text } : option
    );
    setQuestion({ ...question, options: newOptions });
  };

  const handleCorrectChange = (index: number) => {
    const newOptions = question.options.map((option, i) =>
      ({ ...option, isCorrect: i === index })
    );
    setQuestion({ ...question, options: newOptions });
  };

  const handleRemoveChoice = (index: number) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    setQuestion({ ...question, options: newOptions });
  };

  return (
    <div>
      <br />
      <h4>Points:</h4>
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
        value={question.question}
        onChange={(value) => setQuestion({ ...question, question: value })}
      />
      {question.options.map((option, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="radio"
            name="correct"
            checked={option.isCorrect}
            onChange={() => handleCorrectChange(index)}
          />&nbsp;
          <input
            type="text"
            value={option.text}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            style={{ marginLeft: '10px', flexGrow: 1 }}
          />
          {index !== 0 && (
            <button onClick={() => handleRemoveChoice(index)} className="text-danger me-4">
              <MdDeleteOutline />
            </button>
          )}
        </div>
      ))}
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={handleAddChoice}>Add Answer</button>
        <button className="btn btn-success ms-2" onClick={() => onSave(question)}>Save</button>
        <button className="btn btn-danger ms-2" onClick={onCancel}>Cancel</button>
      </div>
      <br />
    </div>
  );
}

export default MultipleChoiceEditor;

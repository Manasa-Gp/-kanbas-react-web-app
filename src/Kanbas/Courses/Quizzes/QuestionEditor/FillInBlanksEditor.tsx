import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaTrash } from "react-icons/fa";
import { updateQuestionInQuiz, addQuestionToQuiz } from '../client';
import { useNavigate } from 'react-router';



interface Question {
  question: string;
  points: number;
  options: { [key: string]: string }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  title: string;
  quiz:string;
  type:string;
}

interface FillInBlanksEditorProps {
  onSave: (questionData: Question) => void;
  onCancel: () => void;
  question?: Question;
  questindex?: number;
  quizID: any;
}

function FillInBlanksEditor({ question: initialQuestion, questindex: quesid, quizID: qid, onSave, onCancel }: FillInBlanksEditorProps) {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<Question>({
    points: initialQuestion?.points || 5,
    question:initialQuestion?.question || '',
    options: initialQuestion?.options ||{ 'a': 'what'}, // Initializing with one option
    answer: initialQuestion?.answer ||[],
    title: initialQuestion?.title ||'',
    type:  'FIB',
    quiz: initialQuestion?.quiz || qid,
  });

  useEffect(() => {
    if (initialQuestion) {
      setQuestionData(initialQuestion);
    }
  }, [initialQuestion]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = questionData.answer.map((answer, i) => 
      i === index ? value : answer
    );
    setQuestionData(prevState => ({ ...prevState, answer: newAnswers }));
  };
  
  const addAnswer = () => {
    setQuestionData(prevState => ({
      ...prevState,
      answer: [...prevState.answer, '']
    }));
  };
  
  const removeAnswer = (index: number) => {
    const newAnswers = questionData.answer.filter((_, i) => i !== index);
    setQuestionData(prevState => ({ ...prevState, answer: newAnswers }));
  };

  const handleSave = async () => {
    try {
      if (initialQuestion) {
        await updateQuestionInQuiz(qid, quesid, questionData);
        onSave(questionData);
      } else {
        await addQuestionToQuiz(qid, questionData);
      }
      // Optionally navigate or handle success as needed
      // navigate('/some-path'); // if you want to navigate after saving
    } catch (error) {
      console.error('Failed to save question:', error);
      // Handle error as needed, e.g., show an error message to the user
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "20px", padding: "20px" }}>
   <h4>Title:</h4>
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
      {questionData.answer.map((answer, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Correct Answer"
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            style={{ marginRight: '10px' }}
          />
          {questionData.answer.length > 1 && (
            <button onClick={() => removeAnswer(index)} className="text-danger">
              <FaTrash />
            </button>
          )}
        </div>
      ))}
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={addAnswer}>Add Answer</button>
        <button className="btn btn-success ms-2" onClick={handleSave}>Save</button>
        <button className="btn btn-danger ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default FillInBlanksEditor;

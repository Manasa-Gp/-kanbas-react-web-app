import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdDeleteOutline } from 'react-icons/md';
import { updateQuestionInQuiz,addQuestionToQuiz } from '../client';
import { useNavigate } from 'react-router';
import { htmlToText } from 'html-to-text';

interface Question {
  question: string;
  points: number;
  options: { [key: string]: string }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  title: string;
  quiz:string;
  type:string;
}

interface Props {
  onSave: (question: Question) => void;
  onCancel: () => void;
  question?: Question;
  questindex?:number; //
  quizID:any; //
}
function MultipleChoiceEditor({question: initialQuestion,questindex: quesid ,quizID: qid,onSave, onCancel }: Props) {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<Question>({
    points: initialQuestion?.points || 5,
    question:initialQuestion?.question || '',
    options: initialQuestion?.options ||{ 'a': 'what'}, // Initializing with one option
    answer: initialQuestion?.answer ||[],
    title: initialQuestion?.title ||'',
    type: initialQuestion?.type || 'MCQ',
    quiz: initialQuestion?.quiz || qid,
  });

  useEffect(() => {
    if (initialQuestion) {
      setQuestionData(initialQuestion);
    }
  }, [initialQuestion]);

  const handleAddChoice = () => {
    const newOptionKey = `option${Object.keys(questionData.options).length + 1}`;
    setQuestionData({
      ...questionData,
      options: { ...questionData.options, [newOptionKey]: '' },
    });
  };

  const handleAnswerChange = (key: string, text: string) => {
    setQuestionData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: text
      }
    }));

  };

  const handleCorrectChange = (key: string) => {
    setQuestionData({
      ...questionData,
      answer: [key]
    });
  };

  const handleRemoveChoice = (key: string) => {
    const newOptions = { ...questionData.options };
    delete newOptions[key];
    setQuestionData({
      ...questionData,
      options: newOptions
    });
  };
  const removeSpecificTags = (html: string): string => {
    // Remove only </p> tags
    return html.replace(/<\/p>/gi, '');
  };
  


  const handleSave = async () => {
    try {
      if (initialQuestion) {
       

        await updateQuestionInQuiz(qid, quesid, questionData);
      } else {
        await addQuestionToQuiz(qid, questionData);
      }    } catch (error) {
      console.error('Failed to save question:', error);
      // Handle error as needed, e.g., show an error message to the user
    }
  

  };
 
  return (
    <div>

      <br />
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
       {Object.entries(questionData.options).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="radio"
            name="correct"
            checked={questionData.answer[0]=== key}
            onChange={() => handleCorrectChange(key)}
          />&nbsp;
          <input
            type="text"
            value={value}
            onChange={(e) => handleAnswerChange(key, e.target.value)}
            style={{ marginLeft: '10px', flexGrow: 1 }}
          />
          {Object.keys(questionData.options).length > 1 && (
            <button onClick={() => handleRemoveChoice(key)} className="text-danger me-4">
              <MdDeleteOutline />
            </button>
          )}
        </div>
      ))}
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={handleAddChoice}>Add Answer</button>
        <button className="btn btn-success ms-2" onClick={handleSave}>Save</button>
        <button className="btn btn-danger ms-2" onClick={onCancel}>Cancel</button>
      </div>
      <br />
    </div>
  );
}

export default MultipleChoiceEditor;

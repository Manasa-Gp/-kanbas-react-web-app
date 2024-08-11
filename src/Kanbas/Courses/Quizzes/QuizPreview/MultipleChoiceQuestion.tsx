import React from 'react';
import { MdOutlineQuestionAnswer } from 'react-icons/md';



interface QuestionProps {
  question: string;
  options: { [key: string]: string }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  title: string;
  onChange: (answer: string[]) => void; // Changed type to string to match key
}

function MultipleChoiceQuestion({ question, answer, options,title, onChange }: QuestionProps) {
console.log("Multiple",answer)
  return (
    <div>
    <p>{question}</p>
    {options && Object.entries(options).map(([key, choice], index) => (
      <div key={index} style={{ marginBottom: '8px' }}> {/* Adds space between options */}
        <label>
          <input
            type="radio"
            name={question}
            value={key}
            checked={answer.includes(key)}
            onChange={() => onChange([key])} // Pass key to onChange
          /> 
          {key}. {choice}  
        </label>
      </div>
    ))}
  </div>
  );
}

export default MultipleChoiceQuestion;

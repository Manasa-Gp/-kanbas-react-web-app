import React from 'react';

interface QuestionProps {
  question: string;
  options: { [key: string]: string }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  title: string;
  onChange: (answer: string) => void; // Changed type to string to match key
}


function TrueFalseQuestion({ question, answer,options,title, onChange }: QuestionProps) {


  return (
    <div>
      <h4>{question}</h4>
      <label>
              
      {options && Object.entries(options).map(([key, choice], index) => (
        <label key={index}>
          <input
            type="radio"
            name={`question-${question}`}
            value={key} // Use key for value
            checked={answer[0] === key} // Compare with key
            onChange={() => onChange(key)} // Pass key to onChange
          />
                    {key}
                    {choice}
        </label>
      ))}
      </label>
    </div>
  );
}
export default TrueFalseQuestion;

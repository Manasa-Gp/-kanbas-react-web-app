import React from 'react';

interface QuestionProps {
  question: string;
  options: { [key: string]: string }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  title: string;
  onChange: (answer: string[]) => void; // Changed type to string to match key
}


function TrueFalseQuestion({ question, answer,options,title, onChange }: QuestionProps) {


  return (
    <div>
      <h4>{question}</h4>
      <label>
              
      {options && Object.entries(options).map(([key, choice], index) => (
            <div key={index} style={{ marginBottom: '8px' }}> 
        <label >
          <input
            type="radio"
            name={question}
            value={key} // Use key for value
            checked={answer.includes(key)}
            onChange={() => onChange([key])} // Pass key to onChange
          />
                  {choice}
        </label>
        </div>
      ))}
      </label>
    </div>
  );
}
export default TrueFalseQuestion;

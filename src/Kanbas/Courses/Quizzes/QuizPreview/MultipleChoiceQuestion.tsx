import React from 'react';



interface QuestionProps {
  question: string;
  options: { [key: string]: string }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  onChange: (answer: string) => void; // Changed type to string to match key
}

function MultipleChoiceQuestion({ question, answer, options, onChange }: QuestionProps) {
  console.log("Hello");
  console.log(options);
  return (
    <div>
      <p>{question}</p>
      
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
    </div>
  );
}

export default MultipleChoiceQuestion;

import React from 'react';

interface QuestionProps {
  question: string;
  options: { }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  title: string;
  onChange: (index: number, value: string) => void; // Changed type to string to match key
}
  
function FillInBlanksQuestion({ question, answer ,onChange }: QuestionProps) {
  return (
    <div>
      <h4>{question}</h4>

      {answer.map((ans, index) => (
        <input
          key={index}
          type="text"
          value={ans || ''}
          onChange={(e) => onChange(index, e.target.value)}
          style={{ display: 'block', margin: '8px 0' }} // Optional styling for spacing
        />
      ))}
        </div>
  );
}
export default FillInBlanksQuestion;

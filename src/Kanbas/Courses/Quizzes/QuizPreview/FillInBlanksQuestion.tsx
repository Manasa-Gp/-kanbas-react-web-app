import React from 'react';

interface QuestionProps {
  question: string;
  options: { }; // Object with keys as option identifiers
  answer: string[]; // Changed type to string to match key
  title: string;
  onChange: (answer: string) => void; // Changed type to string to match key
}
  
function FillInBlanksQuestion({ question, answer ,onChange }: QuestionProps) {
  return (
    <div>
      <h4>{question}</h4>

          <input
            type="text"
            value={answer[0] || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
  );
}
export default FillInBlanksQuestion;

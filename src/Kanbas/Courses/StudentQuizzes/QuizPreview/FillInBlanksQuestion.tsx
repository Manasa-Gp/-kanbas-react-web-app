import React, { useState, useEffect } from 'react';

interface QuestionProps {
  question: string;
  options: {}; // Object with keys as option identifiers
  answer: string[]; // Array of answers
  title: string;
  onChange: (answer: string[]) => void; // Array of answers
}
  
function FillInBlanksQuestion({ question, answer, onChange }: QuestionProps) {
    // Initialize local state with the answer prop

  const [localAnswers, setLocalAnswers] = useState<string[]>(answer);

  useEffect(() => {
    console.log("FillInBlanksQuestion",answer)
    // Ensure localAnswers matches the length of the answer prop
    if (answer.length !== localAnswers.length) {
      console.log("chenc");

      console.log(answer);
      setLocalAnswers(answer);
    } else {
      // Update localAnswers if the values change
      setLocalAnswers(prev => prev.map((val, idx) => answer[idx] ?? val));
    }
  }, [answer]);

  const handleInputChange = (index: number, value: string) => {
    // Update local state
    const newAnswers = [...localAnswers];
    newAnswers[index] = value;
    setLocalAnswers(newAnswers);

    // Notify parent component of the change
    console.log("Component",newAnswers);
    onChange(newAnswers);
  };

  return (
    <div>
      <h4>{question}</h4>

      {localAnswers.map((ans, index) => (
        <input
          key={index}
          name={question}
          type="text"
          value={ans || ''} // Ensure the value is a string
          onChange={(e) => handleInputChange(index, e.target.value)}
          style={{ display: 'block', margin: '8px 0' }} // Optional styling for spacing
        />
      ))}
      
    </div>
  );
}

export default FillInBlanksQuestion;

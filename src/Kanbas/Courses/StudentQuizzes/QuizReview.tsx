import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getQuizAttemptBy } from './client';

function QuizReview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  //const attempt = useSelector((state: any) => state.quizAttemptsReducer.attempt);
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const profileUser = useSelector((state: any) => state.accountReducer.profile) || null;
  const [existingAttempt, setExistingAttempt] = useState<any>(null);

  const quiz = quizzes.find((q: any) => q._id === qid);
  useEffect(() => {
    console.log("why");
    console.log("attemptx",profileUser);

    if (profileUser) {
      const fetchAttempt = async () => {
        try {
          const attempt = await getQuizAttemptBy(profileUser.username, cid, qid);
          setExistingAttempt(attempt);
        } catch (error) {
          console.error('Error fetching quiz attempt:', error);
        }
      };

      fetchAttempt();
    }
  }, [profileUser, cid, qid]);
  const renderQuestion = (question: any, index: number) => {
    const userAnswers = existingAttempt?.attempts[index] || []; // Get the user's answer for this question
    
    const correctAnswers = question.answer || []; // Correct answers for this question
  
    switch (question.type) {
      case 'MCQ':
        return (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{question.question}</h4>
            <ul>
              {Object.keys(question.options).map((key: string, i: number) => {
                const option = question.options[key];
                const isCorrect = correctAnswers.includes(key);
                const isSelected = userAnswers.includes(key);
                const isCorrectlyAnswered = isCorrect && isSelected;
                const isIncorrectlyAnswered = !isCorrect && isSelected;
       
                return (
                  <li
                    key={i}
                    style={{
                      color: isCorrectlyAnswered ? 'green' : isIncorrectlyAnswered ? 'red' : 'black',
                      fontWeight: isCorrectlyAnswered || isIncorrectlyAnswered ? 'bold' : 'normal',
                    }}
                  >
                    {option}
                    {isCorrectlyAnswered && ' ✅'}
                    {isIncorrectlyAnswered && ' ❌'}
                  </li>
                );
              })}
            </ul>
          </div>
        );
  
      case 'TF':
        return (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{question.question}</h4>
            <ul>
            {Object.keys(question.options).map((key: string, i: number) => {
                const option = question.options[key];
                const isCorrect = correctAnswers.includes(key);
                const isSelected = userAnswers.includes(key);
                const isCorrectlyAnswered = isCorrect && isSelected;
                const isIncorrectlyAnswered = !isCorrect && isSelected;
        
                return (
                  <li
                    key={i}
                    style={{
                      color: isCorrectlyAnswered ? 'green' : isIncorrectlyAnswered ? 'red' : 'black',
                      fontWeight: isCorrectlyAnswered || isIncorrectlyAnswered ? 'bold' : 'normal',
                    }}
                  >
                    {option}
                    {isCorrectlyAnswered && ' ✅'}
                    {isIncorrectlyAnswered && ' ❌'}
                  </li>
                );
              })}
            </ul>
          </div>
        );
  
      case 'FIB':
        return (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{question.question}</h4>
            <ul>
              {question.answer.map((answer: string, i: number) => {
                const isSelected = userAnswers.includes(userAnswers[i]);
                const isCorrect = correctAnswers.includes(userAnswers[i]);
                const isCorrectlyAnswered = isCorrect && isSelected;
                const isIncorrectlyAnswered = !isCorrect && isSelected;
   
                return (
                  <li
                    key={i}
                    style={{
                      color: isCorrectlyAnswered ? 'green' : isIncorrectlyAnswered ? 'red' : 'black',
                      fontWeight: isCorrectlyAnswered || isIncorrectlyAnswered ? 'bold' : 'normal',
                    }}
                  >
                    {userAnswers[i]}
                    {isCorrectlyAnswered && ' ✅'}
                    {isIncorrectlyAnswered && ' ❌'}
                  </li>
                );
              })}
            </ul>
          </div>
        );
  
      default:
        return <div key={index}>Unknown question type</div>;
    }
  };

  return (
    <div>
      <h1>Quiz Review</h1>
      {quiz ? (
        <div>
          {quiz.questions.map((question: any, index: number) => renderQuestion(question, index))}
        </div>
      ) : (
        <p>No quiz found for this ID.</p>
      )}
    </div>
  );
}

export default QuizReview;
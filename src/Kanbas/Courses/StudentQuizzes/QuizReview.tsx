import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { CiDark } from 'react-icons/ci'; // Unused import, you can remove it if not needed

interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  type: 'MCQ' | 'TF' | 'FIB';
}

interface Attempt {
  quiz: string;
  username: string;
  score: number;
  answers: { questionId: string; selectedAnswer: string }[];
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface RootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
  attempts: {
    attempts: Attempt[];
  };
}

function QuizReview() {
  const { qid } = useParams<{ qid: string }>();
  const attempts = useSelector((state: RootState) => state.attempts.attempts);
  const quizzes = useSelector((state: RootState) => state.quizzesReducer.quizzes);
  const profileUser = useSelector((state: any) => state.accountReducer.profile) || null;

  const attempt = attempts.find((a) => a.quiz === qid);
  const quiz = quizzes.find((q) => q._id === qid);

  const renderQuestion = (question: Question) => {
    const userAnswer = attempt?.answers.find(
      (ans) => ans.questionId === question.id
    );

    switch (question.type) {
      case 'MCQ':
        return (
          <div key={question.id} style={{ marginBottom: '20px' }}>
            <h4>{question.question}</h4>
            <ul>
              {question.options?.map((option, index) => (
                <li
                  key={index}
                  style={{
                    color:
                      option === question.correctAnswer
                        ? 'green'
                        : userAnswer?.selectedAnswer === option
                        ? 'red'
                        : 'black',
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
            <p>Your Answer: {userAnswer?.selectedAnswer || 'No Answer'}</p>
            <p>Correct Answer: {question.correctAnswer}</p>
          </div>
        );

      case 'TF':
        return (
          <div key={question.id} style={{ marginBottom: '20px' }}>
            <h4>{question.question}</h4>
            <ul>
              {['True', 'False'].map((option, index) => (
                <li
                  key={index}
                  style={{
                    color:
                      option === question.correctAnswer
                        ? 'green'
                        : userAnswer?.selectedAnswer === option
                        ? 'red'
                        : 'black',
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
            <p>Your Answer: {userAnswer?.selectedAnswer || 'No Answer'}</p>
            <p>Correct Answer: {question.correctAnswer}</p>
          </div>
        );

      case 'FIB':
        return (
          <div key={question.id} style={{ marginBottom: '20px' }}>
            <h4>{question.question}</h4>
            <p>Your Answer: {userAnswer?.selectedAnswer || 'No Answer'}</p>
            <p>Correct Answer: {question.correctAnswer}</p>
          </div>
        );

      default:
        return <div key={question.id}>Unknown question type</div>;
    }
  };

  return (
    <div>
      <h1>Quiz Review</h1>
      {quiz ? (
        <div>
          {quiz.questions.map((question) => renderQuestion(question))}
        </div>
      ) : (
        <p>No attempt found for this quiz.</p>
      )}
    </div>
  );
}

export default QuizReview;

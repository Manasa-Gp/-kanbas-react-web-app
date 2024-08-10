import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AttemptQuiz() {
  const {cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  // Find the quiz by ID
  
  const quiz = quizzes.find((q: any) => q._id === qid);

  if (!quiz) {
    return <div>Loading quiz details...</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">{quiz.title}</h1>
      <div className="mb-3">
        <strong>Number of Questions:</strong> {quiz.questions.length}
      </div>
      <div className="mb-3">
        <strong>Time:</strong> {quiz.time} minutes
      </div>
      <div className="mb-3">
        <strong>Points:</strong> {quiz.points}
      </div>
      <button className="btn btn-primary" onClick={() => alert('Quiz Attempt Started')}>
      <Link to={`/Kanbas/Courses/${cid}/Quizzes/start/${quiz._id}`} className="wd-quiz-link">
        Attempt Quiz
        </Link>
      </button>
    </div>
  );
}

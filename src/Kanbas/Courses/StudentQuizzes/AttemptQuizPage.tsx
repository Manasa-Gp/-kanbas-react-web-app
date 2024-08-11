import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getQuizAttemptBy } from './client'; // Import your API function

export default function AttemptQuiz() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const profileUser = useSelector((state: any) => state.accountReducer.profile); // Assuming you have a user profile in your state

  const [existingAttempt, setExistingAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Find the quiz by ID
  const quiz = quizzes.find((q: any) => q._id === qid);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        if (profileUser && cid && qid) {
          const attempt = await getQuizAttemptBy(profileUser.username, cid, qid);
          setExistingAttempt(attempt);
        }
      } catch (error) {
        console.error('Error fetching quiz attempt:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [profileUser, cid, qid]);

  if (!quiz || loading) {
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

      {existingAttempt && existingAttempt.number === 0 ? (
        <div className="alert alert-danger">
          You are no longer allowed to take the quiz.
        </div>
      ) : (
        <button className="btn btn-primary">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/start/${quiz._id}`} className="wd-quiz-link">
            Attempt Quiz
          </Link>
        </button>
      )}

      {existingAttempt && existingAttempt._id && (
        <button className="btn btn-secondary mt-3">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/review/${qid}`} className="wd-quiz-link">
            Previous Attempt
          </Link>
        </button>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createQuizAttempt, getQuizAttemptBy, updateQuizAttempts } from './client'; // Import your API function
import { addAttempt, updateAttempt } from './reducer';

export default function AttemptQuiz() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const profileUser = useSelector((state: any) => state.accountReducer.profile); // Assuming you have a user profile in your state
  const dispatch = useDispatch();
  const [existingAttempt, setExistingAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  

  // Find the quiz by ID
  const quiz = quizzes.find((q: any) => q._id === qid);
  const [localQuizAttempt, setLocalQuizAttempt] = useState({
    _id: "",
    course: cid,
    quiz: qid,
    score: 0,
    number: quiz?.howManyAttempts-1,
    username:profileUser.username,
    attempts: Array(quiz ? quiz.questions.length : 0).fill([""]),
  });
  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        if (profileUser && cid && qid) {
          const attempt = await getQuizAttemptBy(profileUser.username, cid, qid);
          if (attempt) {
            setExistingAttempt(attempt);
          }
        }
      } catch (error) {
        console.error('Error fetching quiz attempt:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [profileUser, cid, qid]);

  const handleAttemptQuiz = async () => {
    try {
      if (existingAttempt) {
        // If an existing attempt is found, decrement the number and update it
        const updatedAttempt = {
          ...existingAttempt,
          number: existingAttempt.number - 1,
        };
        await updateQuizAttempts(updatedAttempt._id, updatedAttempt); // API call to update attempt
        setExistingAttempt(updatedAttempt);
        dispatch(updateAttempt(updatedAttempt));
      } else {
        // If no existing attempt, create a new one
        const newAttempt = await createQuizAttempt(localQuizAttempt);
        setLocalQuizAttempt((prev) => ({
          ...prev,
          _id: newAttempt._id,
        }));
        dispatch(addAttempt(newAttempt));
      }
    } catch (error) {
      console.error('Error creating or updating quiz attempt:', error);
    }
  };
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
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/start/${quiz._id}`} className="wd-quiz-link">
        <button className="btn btn-primary" onClick={handleAttemptQuiz}>
         
            Attempt Quiz
        </button>
        </Link>

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

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical, IoRocketOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import GreenCheckmark from './GreenCheckmark';
import RedBan from './RedBan';
import { addQuestionToQuiz } from './client';
import { setQuizzes, updateQuiz } from './reducer';
interface Question {
    type: string;
    question: string;
    answer: string[];
    options: { [key: string]: string };
    quiz: any;
    points: number;
    title: string;
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
  }
export default function QuestionList() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quiz = quizzes ? quizzes.find((q: Quiz) => q._id === qid) : null;

  // Move `useState` to the top level
  const [questionData, setQuestionData] = useState<Question>({
    points: 5,
    question: '',
    options: { 'a': 'what' },
    answer: [],
    title: 'New Question',
    type: 'MCQ',
    quiz: qid,
  });

  // Early return if quiz is not found
  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleAddQuestion = async () => {
    try {
      await addQuestionToQuiz(qid, questionData);
      const updatedQuiz = {
        ...quiz,
        questions: [...quiz.questions, questionData],
      };
      dispatch(updateQuiz(updatedQuiz));


      
    } catch (error) {
      console.error('Failed to save question:', error);
    }
  };

  return (
    <div id="wd-quizzes">
      <button onClick={handleAddQuestion} className="btn btn-lg btn-danger me-1">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> Add Question
      </button>
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <MdArrowDropDown className="me-1 fs-3" />
            Assignment Quizzes
          </div>
          <ul className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
            {quiz.questions.map((question: Question, index: number) => (
              <li key={index} className="wd-lesson list-group-item d-flex align-items-center p-3">
                <div className="icon-container me-2">
                  <IoRocketOutline className="text-success fs-5" />
                </div>
                <div className="quiz-details flex-grow-1">
                  <Link to={`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}/questionedit/${index}`} className="wd-quiz-link">
                    {question.title}
                  </Link>
                  <h6>
                    <p className="wd-fg-color-red">
                      <span className="wd-fg-color-black"> | {question.type}</span>
                    </p>
                  </h6>
                </div>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id={`dropdownMenuButton${index}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <IoEllipsisVertical />
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                    <li>
                      <Link to={`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}/questionedit/${index}`} className="dropdown-item">
                        Edit
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

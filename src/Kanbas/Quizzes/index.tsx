import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setQuizzes } from './reducer';
import { findQuizzesForCourse } from "./client";

import { MdArrowDropDown } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import GreenCheckmark from './GreenCheckmark';
import RedBan from './RedBan';

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {quiz} = useSelector((state: any) => state.quizzesReducer);
  const quizzes = quiz ? quiz.filter((q: any) => q.course === cid):[];
  const loadQuizzes = async () => {
    if (cid) {
      const quizzesData = await findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzesData));
    }
  };
  const handleAddQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
  };
  useEffect(() => {
    loadQuizzes();
  }, [cid, dispatch]);



  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between mb-2">
        <input type="text" className="form-control" placeholder="Search for Quiz" style={{ maxWidth: '300px' }} />
        <div>
          <button onClick={handleAddQuiz}  className="btn btn-lg btn-danger me-1">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> Add Quiz
          </button>
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <IoEllipsisVertical className="position-relative" style={{ fontSize: '30px' }} />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#" >Delete All Quizzes</a></li>
              <li><a className="dropdown-item" href="#">Publish All</a></li>
              <li><a className="dropdown-item" href="#">Unpublish All</a></li>
            </ul>
        </div>
      </div>
      <hr />
      <br/>
        <ul id="wd-modules" className="list-group rounded-0">
    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        <MdArrowDropDown className="me-1 fs-3" />
        Assignment Quizzes
        </div>
        <ul className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
        {quizzes.map((q: any) => (
          <li key={q._id} className="wd-lesson list-group-item d-flex align-items-center p-3">
            <div className="icon-container me-2">
              <IoRocketOutline className="text-success fs-3" />
            </div>
            <div className="quiz-details flex-grow-1">
              <strong>
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/Details/${q._id}`} className="wd-_id">
                  {q.title}
                </Link>
              </strong>
              <h6>
                <p className="wd-fg-color-red">
                  <span className="wd-fg-color-black"> | <b>Due</b> {'No Due Date'} | {0} pts</span>
                </p>
              </h6>
            </div>
            <div className="d-flex align-items-center">
            {q.published ? <GreenCheckmark /> : <RedBan />}
              <div className="dropdown">
                <button className="btn dropdown-toggle " type="button" id="quizMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <IoEllipsisVertical style={{ fontSize: '20px' }} />
                </button>
                <ul className="dropdown-menu" aria-labelledby="quizMenuButton">
                 <li>
        <a className="dropdown-item" href="#" >Edit</a>
    </li>
    <li>
        <a className="dropdown-item" href="#" >Delete</a>
    </li>
    <li>
        <a className="dropdown-item" href="#" >Publish/Unpublish</a>
    </li>
                </ul>
             </div>
            </div>
          </li>
        ))}
      </ul>
      </li>
      </ul>
    </div>
  );
}

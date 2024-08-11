import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setQuizzes } from './reducer';
import { findQuizzesForCourse,deleteQuizDetails,toggleQuizPublish } from "./client";
import {deleteQuiz} from "./reducer";
import { MdArrowDropDown } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import GreenCheckmark from './GreenCheckmark';
import RedBan from './RedBan';

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {quizzes} = useSelector((state: any) => state.quizzesReducer);
  const mapQuiz = quizzes ? quizzes.filter((q: any) => q.course === cid):[];
  const [quizList, setQuizListLocal] = useState<any[]>([]);


  const removeQuiz = async (quizId: string) => {
    try {
      // Remove the quiz from the server
      await deleteQuizDetails(quizId);
  
      // Update Redux store
      dispatch(deleteQuiz(quizId));
  
      // Update local state
      setQuizListLocal((prevQuizList) => prevQuizList.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Failed to delete quiz. Please try again.');
    }
  };
  
  const updatePublishStatus = async (quizId: string, published: boolean) => {
 
    await toggleQuizPublish(quizId,published);
   
    const quizzesData = await findQuizzesForCourse(cid as string);

    // Update the Redux store with the new quizzes list
    dispatch(setQuizzes(quizzesData));

    // Update the local state with the new quizzes list
    setQuizListLocal(quizzesData);
  };

  const loadQuizzes = async () => {

    if (cid) {
      const quizzesData = await findQuizzesForCourse(cid as string);
      setQuizListLocal(quizzesData);
      dispatch(setQuizzes(quizzesData));
    }
  };
  const handleAddQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
  };
  useEffect(() => {
    loadQuizzes();
  }, [cid]);
  const getAvailabilityStatus = (availableDate: any, availableUntilDate: any) => {
    
    const currentDate = new Date();
    const availableDateObj = new Date(availableDate);
    const availableUntilDateObj = new Date(availableUntilDate);

    if (currentDate > availableUntilDateObj) {

      return 'Closed';
    } else if (currentDate >= availableDateObj && currentDate <= availableUntilDateObj) {
      return 'Available';
    } else if (currentDate < availableDateObj) 
      {

        return `Not available until ${availableDate}`;
      }
  };
  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between mb-2">
        <input type="text" className="form-control" placeholder="Search for Quiz" style={{ maxWidth: '300px' }} />
        <div>
          <button onClick={handleAddQuiz}  className="btn btn-lg btn-danger me-1">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> Add Quiz
          </button>
     
  
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
        {quizList.map((q: any) => (
          <li key={q._id} className="wd-lesson list-group-item d-flex align-items-center p-3">
            <div className="icon-container me-2">
              <IoRocketOutline className="text-success fs-5" />
            </div>
            <div className="quiz-details flex-grow-1">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/Details/${q._id}`} className="wd-quiz-link">
                  {q.title}
                </Link>
              <h6>
          
                <p className="wd-fg-color-red">
                  <span className="wd-fg-color-black">{getAvailabilityStatus(q.availableFrom, q.availableUntil)} | <b>Due</b> {q.due} | {q.points} pts</span>
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
                 <Link to={`/Kanbas/Courses/${cid}/Quizzes/edit/${q._id}`} className="dropdown-item">
                 Edit
                 </Link>
    </li>
    <li>
        <a className="dropdown-item" onClick={()=>removeQuiz(q._id)}>Delete</a>
    </li>
    <li>
        <a className="dropdown-item" onClick = {()=>updatePublishStatus(q._id, q.published)} >Publish/Unpublish</a>
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

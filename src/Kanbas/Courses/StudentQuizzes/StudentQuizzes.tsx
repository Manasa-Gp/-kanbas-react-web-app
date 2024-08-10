import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setQuizzes } from '../Quizzes/reducer';
import { findQuizzesForCourse,toggleQuizPublish } from "../Quizzes/client";
import { MdArrowDropDown } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";


export default function StudentQuizzes() {
  const { cid,qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {quizzes} = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const [quizList, setQuizListLocal] = useState<any[]>([]);



  const updatePublishStatus = async (quizId: string, published: boolean) => {
 
    await toggleQuizPublish(quizId,published);
   
    const quizzesData = await findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzesData));
  };

  const loadQuizzes = async () => {
     console.log('Loading sq');
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
            {q._id}
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/attempt/${q._id}`} className="wd-quiz-link">
                  {q.title}
                </Link>
              <h6>
          
                <p className="wd-fg-color-red">
                  <span className="wd-fg-color-black">{getAvailabilityStatus(q.availableFrom, q.availableUntil)} | <b>Due</b> {q.due} | {q.points} pts</span>
                </p>
              </h6>
            </div>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button className="btn dropdown-toggle " type="button" id="quizMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <IoEllipsisVertical style={{ fontSize: '20px' }} />
                </button>
                <ul className="dropdown-menu" aria-labelledby="quizMenuButton">
                 <li>
                 <Link to={`/Kanbas/Courses/${cid}/Quizzes/edit/${q._id}`} className="">
                 Edit</Link>
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

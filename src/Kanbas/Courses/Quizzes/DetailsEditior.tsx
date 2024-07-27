import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchQuizDetails, updateQuizDetails } from "./client";
// import { setQuizDetails as reduxSetQuizDetails } from './reducer';
import QuestionEditor from './QuestionEditor';

function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const   {assignments} = useSelector((state: any) => state.assignmentsReducer);
  const quiz = assignments.filter((assignment: any) => assignment.course === cid);

  // const [quizDetails, setQuizDetails] = useState({
  //   _id: qid || `quiz-${Date.now()}`,
  //   title: quiz.title || '',
  //   description: quiz.description || '',
  //   quizType: quiz.quizType || 'Graded Quiz',
  //   assignmentGroup: quiz.assignmentGroup || 'Quizzes',
  //   shuffleAnswers: quiz.shuffleAnswers || false,
  //   timeLimit: quiz.timeLimit || 20,
  //   multipleAttempts: quiz.multipleAttempts || false,
  //   showCorrectAnswers: quiz.showCorrectAnswers || '',
  //   accessCode: quiz.accessCode || '',
  //   oneQuestionAtATime: quiz.oneQuestionAtATime || true,
  //   webcamRequired: quiz.webcamRequired || false,
  //   lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
  //   dueDate: quiz.dueDate || '',
  //   availableDate: quiz.availableDate || '',
  //   untilDate: quiz.untilDate || '',
  //   questions: quiz.questions || []
  // });



  

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const [activeTab, setActiveTab] = useState('detail');

  return (
    <div className="container p-5">
      <hr/>
      <div className="nav nav-tabs">
        <button className={`nav-link ${activeTab === 'detail' ? 'active' : ''}`}
                onClick={() => setActiveTab('detail')}>Details</button>
        <button className={`nav-link ${activeTab === 'question' ? 'active' : ''}`}
                onClick={() => setActiveTab('question')}>Questions</button>
      </div>
      <br/>
      {activeTab === 'detail' && (
        <>
          <input type="text" name="title" 
                 className="form-control mb-2" placeholder="Unnamed Quiz" />
          <textarea name="description" 
                     className="form-control mb-2" placeholder="Quiz Instructions" rows={4} />
          <br/>
          <div className="row justify-content-end mb-3">
      <div className="col-auto mt-1">
           <label htmlFor="wd-type" >Quiz Type</label>
       </div>
       <div className="col-8 d-flex">
       <select id="wd-type" className="form-select border form-border-gray">
          <option selected value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
         </select>
       </div>
       </div>
       <div className="row justify-content-end mb-3">
      <div className="col-auto mt-1">
           <label htmlFor="wd-group" >Assignment group</label>
       </div>
       <div className="col-8 d-flex">
       <select id="wd-group" className="form-select border form-border-gray">
=          <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option selected value="Assignments">Assignments</option>
            <option value="Projects">Projects</option>
         </select>
       </div>
       </div>
       <div className="row justify-content-end mb-3">
        
        <div className="col-8 mt-1">
        <label><strong>Options</strong></label>
        
        <div >
          <div  className="my-3">
      <input type="checkbox" className=" form-check-input mr-3 border form-border-gray"  name="check-entry-options" id="wd-text-entry" />
      <label htmlFor="wd-shuffle">Shuffle Answers</label>
      </div >
      <div className="my-3 d-flex align-items-center">
  <input type="checkbox" className="form-check-input border form-border-gray me-2" name="check-website-url" id="wd-website-url" />
  <label htmlFor="wd-website-url" className="me-3">Time Limit</label>
  <input type="number" name="timeLimit" className="form-control me-2"  style={{ width: '50px' }} />
  Minutes
        </div>
        <div className='form-control border form-border-gray'>
          <input type="checkbox" className=" form-check-input me-3 border form-border-gray"  name="check-entry-options" id="wd-text-entry" />
          <label htmlFor="wd-multuple-attempts">Allow Multiple Attempts</label>
                      </div>

   
      </div>
      </div>
      </div>
         

   
      <div className="row justify-content-end mb-3">
        
        <div className="col-auto mt-1">
    <label htmlFor="wd-assign">Assign</label>
        </div>
        <div className="col-8">
        <div className="form-control border form-border-gray">
        <label htmlFor="wd-assign-to"><strong>Assign to </strong></label><br/>
        <input id="wd-assign-to" className="form-control border form-border-gray my-2" placeholder="Everyone" />
        <label htmlFor="wd-assign-to"><strong>Due </strong></label><br/>
        <input id = "wd-due-date" name ="due_date" className="form-control border form-border-gray my-2" type="date"  />
        <div className="row my-4">
        <div className="col-auto">
        <label htmlFor="wd-available from"><strong>Avaiable from</strong></label>
        <input id = "wd-available from" name ="available_from_date" className="form-control border form-border-gray my-2" type="date"  />
        </div>
        <div className="col-auto ms-4">
        <label htmlFor="available until"><strong> Until </strong> </label>
        <input id ="available until"  name ="due_date" className="form-control border form-border-gray my-2" type="date" />
  </div>
        </div>
        
    </div>
        </div>
      </div>
        </>
      )}
      {activeTab === 'question' && (
        <div>
          <p>Questions editor will be implemented here.</p>
          <QuestionEditor/>
        </div>
      )}
      <div className="mt-3 row float-end me-3 mb-3" >
        <button style={{width: '150px'}} onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        <button  style={{width: '150px'}} className="btn btn-danger ms-2">{qid ? 'Update' : 'Create'} & Save</button>
      </div>

    </div>
  );
}
export default QuizEditor;

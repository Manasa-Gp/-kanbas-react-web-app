import { assignments } from "../../../Database";
import { useParams,Link } from "react-router-dom";
export default function AssignmentEditor() {
  const { cid,aid } = useParams();
  const assignment = assignments.find(assn => assn._id === aid);
    return (
      <div id="wd-assignments-editor" className="container p-5">
        <div id = "wd-name" className="mb-2">
        <label htmlFor="wd-name" className="fw-bold">Assignment Name</label><br /><br />
        <input id="wd-name" className="form-control border form-border-gray" value={`${assignment?._id}`} />
        </div>


       <div className = "form-control border form-border-gray mb-3">
        The assignment is <span className="fs-7 text-danger"> available online.</span> <br/>
        Submit a link to the landing page of your Web application running on <br/>
        Netlify. <br/>
        The landing page should include the following:
        <ul>
         <li>Your full name and section </li>
         <li> Links to each of the lab assignments </li>
         <li>Link to the Kanbas application </li>
         <li>Links to all relevant source code repositories </li>
         </ul>
         The Kanbas application should include a link to navigate back to the landing page.
       </div>
       <div className="mb-3">
       <div className="row justify-content-end mb-3 mt-2">
      <div className="col-auto mt-1">
       <label htmlFor="wd-points">Points</label>
       </div>
       <div className="col-8 d-flex">
       <input id="wd-points" className="form-control border form-border-gray" value={100} />
       </div>
       </div>
       <div className="row justify-content-end mb-3">
      <div className="col-auto mt-1">
           <label htmlFor="wd-group" >Assignment group</label>
       </div>
       <div className="col-8 d-flex">
       <select id="wd-group" className="form-select border form-border-gray">
          <option selected value="assignments">ASSIGNMENTS</option>
         </select>
       </div>
       </div>
       <div className="row justify-content-end mb-3">
        <div className="col-auto mt-1">
          <label htmlFor="wd-display-grade-as">Display Grade As</label>
        </div>
        <div className="col-8">
          <select id="wd-display-grade-as" className="form-select border form-border-gray">
            <option selected value="p">Percentage</option>
          </select>
        </div>
      </div>

      <div className="my-3"></div>
      
      <div className="row justify-content-end mb-3">
        
        <div className="col-auto mt-1">
          <label htmlFor="wd-submission-type">Submission Type</label>
        </div>
        <div className="col-8">
        <div className="form-control border form-border-gray">
          <select id="wd-submission-type" className="form-select border form-border-gray mb-2">
            <option selected value="Online">Online</option>
          </select>
          
          <label><strong>Online Entry options</strong></label>
          <div >
          <div  className="my-3">
      <input type="checkbox" className=" form-check-input mr-3 border form-border-gray"  name="check-entry-options" id="wd-text-entry" />
      <label htmlFor="wd-text-entry">Text entry</label>
      </div >
      <div  className="my-3">
      <input type="checkbox"className="form-check-input border form-border-gray"  name="check-website-url" id="wd-website-url" />
      <label htmlFor="wd-website-url">Website URL</label>
      </div>
      <div  className="my-3">
      <input type="checkbox" className="form-check-input border form-border-gray"  name="check-media-recordings" id="wd-media-recordings" />
      <label htmlFor="wd-media-recordings">Media Recordings</label>
      </div>
      <div  className="my-3">
      <input type="checkbox" className="form-check-input border form-border-gray" name="check-student-annotation" id="wd-student-annotation" />
      <label htmlFor="wd-student-annotation">Student Annotations</label>
      </div>
      <div  className="my-3">
      <input type="checkbox" className="form-check-input border form-border-gray" name="check-file-upload" id="wd-file-upload" />
      <label htmlFor="wd-file-upload">File Upload</label>
      </div>
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
        <input id = "wd-due-date" className="form-control border form-border-gray my-2" type="date" value={`${assignment?.due_date}`}/>
        <div className="row my-4">
        <div className="col-auto">
        <label htmlFor="wd-available from"><strong>Avaiable from</strong></label>
        <input id = "wd-available from"  className="form-control border form-border-gray my-2" type="date" value={`${assignment?.available_from_date}`}/>
        </div>
        <div className="col-auto ms-4">
        <label htmlFor="available until"><strong> Until </strong> </label>
        <input id ="available until" className="form-control border form-border-gray my-2" type="date" value={`${assignment?.due_date}`}/>
  </div>
        </div>
        
    </div>
        </div>
      </div>
       </div>
     
       
        <hr style={{ textAlign: 'right' }} />
        <div className="dropdown d-inline  float-end mb-3">
<Link to = {`/Kanbas/Courses/${cid}/Assignments`}>
<button id="wd-add-module-btn" className="btn btn-lg me-1 grayed square-button">
        Cancel
      </button>
</Link>
<Link to = {`/Kanbas/Courses/${cid}/Assignments`}>
<button id="wd-add-module-btn" className="btn btn-lg float-end red square-button">
        Save
      </button>
      </Link>
</div>
      </div>
  );}
  
  
import "./styles.css";
import { FaCalendarAlt } from "react-icons/fa";


export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor" className="container p-5">
        <div id = "wd-name" className="mb-2">
        <label htmlFor="wd-name">Assignment Name</label><br /><br />
        <input id="wd-name" className="form-control border border-dark" value="A1" />
        </div>


       <div className = "form-control mb-3">
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
       <input id="wd-points" className="form-control" value={100} />
       </div>
       </div>
       <div className="row justify-content-end mb-3">
      <div className="col-auto mt-1">
           <label htmlFor="wd-group" >Assignment group</label>
       </div>
       <div className="col-8 d-flex">
       <select id="wd-group" className="form-select">
          <option selected value="assignments">ASSIGNMENTS</option>
         </select>
       </div>
       </div>
       <div className="row justify-content-end mb-3">
        <div className="col-auto mt-1">
          <label htmlFor="wd-display-grade-as">Display Grade As</label>
        </div>
        <div className="col-8">
          <select id="wd-display-grade-as" className="form-select">
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
        <div className="form-control">
          <select id="wd-submission-type" className="form-select">
            <option selected value="Online">Online</option>
          </select>
          
          <label><strong>Online Entry options</strong></label>
          <div >
          <div  className="my-3">
      <input type="checkbox" className=" form-check-input mr-3"  name="check-entry-options" id="wd-text-entry" />
      <label htmlFor="wd-text-entry">Text entry</label>
      </div >
      <div  className="my-3">
      <input type="checkbox"className="form-check-input"  name="check-website-url" id="wd-website-url" />
      <label htmlFor="wd-website-url">Website URL</label>
      </div>
      <div  className="my-3">
      <input type="checkbox" className="form-check-input"  name="check-media-recordings" id="wd-media-recordings" />
      <label htmlFor="wd-media-recordings">Media Recordings</label>
      </div>
      <div  className="my-3">
      <input type="checkbox" className="form-check-input" name="check-student-annotation" id="wd-student-annotation" />
      <label htmlFor="wd-student-annotation">Student Annotations</label>
      </div>
      <div  className="my-3">
      <input type="checkbox" className="form-check-input" name="check-file-upload" id="wd-file-upload" />
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
        <div className="form-control">
        <label htmlFor="wd-assign-to"><strong>Assign to </strong></label><br/>
        <input id="wd-assign-to" className="form-control my-2" placeholder="Everyone" />
        <label htmlFor="wd-assign-to"><strong>Due </strong></label><br/>
        <input id = "wd-due-date" className="form-control my-2" type="date" value="2024-05-13"/>
        <div className="row my-4">
        <div className="col-auto">
        <label htmlFor="wd-available from"><strong>Avaiable from</strong></label>
        <input id = "wd-available from"  className="form-control my-2" type="date" value="2024-05-13"/>
        </div>
        <div className="col-auto">
        <label htmlFor="available until"><strong> Until </strong> </label>
        <input id ="available until" className="form-control my-2" type="date" value="2024-05-20"/>
  </div>
        </div>
        
    </div>
        </div>
      </div>
       </div>
     
       
        <hr style={{ textAlign: 'right' }} />
        <div className="dropdown d-inline  float-end">
<button id="wd-add-module-btn" className="btn btn-lg me-1 grayed square-button">
        Cancel
      </button>
<button id="wd-add-module-btn" className="btn btn-lg btn-danger float-end  square-button">
        Save
      </button>
</div>
      </div>
  );}
  
  
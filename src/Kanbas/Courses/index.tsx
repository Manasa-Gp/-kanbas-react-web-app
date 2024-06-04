import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes } from "react-router";
import Modules from "./Modules";
import Grades from "./Grades";
import Assignments from "./Assignments";
import { FaAlignJustify } from "react-icons/fa"; // Had to add this 
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
export default function Courses() {
  return (
    <div id="wd-courses">
   
   <div className="row-layout text-danger my-2">
  <div className="col-auto me-2">
    <FaAlignJustify className="fs-3 mb-1" />
  </div>
  <div className="col">
    <div className="course-font-style">Course 1234</div>
  </div>
</div>
<hr />

    <div className="d-flex">
      <div className="d-none d-md-block">
        <CoursesNavigation />
      </div>
      <div className="flex-fill">
  
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/:aid" element={<AssignmentEditor />} />
          <Route path="Grades" element={<Grades />} />
        </Routes>
      </div>
    </div>
  </div>
  
);}

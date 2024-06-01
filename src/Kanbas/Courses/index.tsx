import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes } from "react-router";
import Modules from "./Modules";
import Assignments from "./Assignments";
import { FaAlignJustify } from "react-icons/fa"; // Had to add this 
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
export default function Courses() {
  return (
    <div id="wd-courses">
    <h2 className="text-danger"><FaAlignJustify className="me-4 fs-4 mb-1" /> 
        Course 1234</h2>
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
        </Routes>
      </div>
    </div>
  </div>
  
);}

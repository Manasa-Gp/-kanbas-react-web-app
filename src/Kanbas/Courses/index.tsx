import CoursesNavigation from "./Navigation";
import { Navigate,Route, Routes, useParams,useLocation  } from "react-router";
import Modules from "./Modules";
import Grades from "./Grades";
import Assignments from "./Assignments";
import { FaAlignJustify } from "react-icons/fa"; // Had to add this 
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import AssignEditor from "./Assignments/AssignEditor";
import PeopleTable from "./people/table";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/DetailsEditior";
export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
   
   <h2 className="text-danger"><FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
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
          <Route path={`Assignments/plus`} element={<AssignEditor />} />
          <Route path={`Assignments/:aid`} element={<AssignmentEditor />} />
          <Route path="Grades" element={<Grades />} />
          <Route path="People" element={<PeopleTable />} />
          <Route path="People/:uid" element={<PeopleTable />} />
          <Route path="Quizzes" element={<Quizzes />} />
          <Route path="Quizzes/edit/:qid" element={<QuizEditor />} />
          {/* <Route path="Quizzes/Details/:qid" element={<QuizDetails />} /> */}
          <Route path="Quizzes/new" element={<QuizEditor />} />
          
        </Routes>
      </div>
    </div>
  </div>
  
);}

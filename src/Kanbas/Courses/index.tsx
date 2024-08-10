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
import QuizDetails from "./Quizzes/QuizDetailsScreen";
import StudentQuizzes from "./StudentQuizzes/StudentQuizzes";
import QuizPreviewScreen from "./Quizzes/QuizPreviewScreen";
import { useSelector } from "react-redux";
import AttemptQuiz from "./StudentQuizzes/AttemptQuizPage";
import QuizPage from "./StudentQuizzes/QuizPage";
import QuizReview from "./StudentQuizzes/QuizReview";
import { fetchCoursesByIds } from './client'; // Adjust the import path as necessary
import { useEffect, useState } from "react";

export default function Courses() {
  const { cid } = useParams();
  console.log(cid);
  const { pathname } = useLocation();
  const profileUser = useSelector((state: any) => state.accountReducer.profile) || null;
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch the course using the provided cid
        const fetchedCourses = await fetchCoursesByIds([cid]);
        setCourses(fetchedCourses);
      } catch (err) {
        setError('Failed to fetch courses.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [cid]);
  const course = courses.find((course) => course._id === cid);

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
          {/* Conditional rendering based on the role */}
          <Route path="Quizzes" element={profileUser?.role === "STUDENT" ? <StudentQuizzes /> : <Quizzes />} />
          <Route path="Quizzes/attempt/:qid" element={<AttemptQuiz />} />
          <Route path="Quizzes/edit/:qid" element={<QuizEditor />} />
          <Route path="Quizzes/Details/:qid" element={<QuizDetails />} /> 
          <Route path="Quizzes/new" element={<QuizEditor />} />
          <Route path="Quizzes/start/:qid" element={<QuizPage />} />
          <Route path="Quizzes/preview/:qid" element={<QuizPreviewScreen />} />
          <Route path="/Quizzes/review/:qid" element={<QuizReview />} />

          
        </Routes>
      </div>
    </div>
  </div>
  
);}

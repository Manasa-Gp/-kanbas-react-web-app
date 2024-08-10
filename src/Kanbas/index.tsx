import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import * as client from "./Courses/client";
import { useState,useEffect } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as profile_client from "./Account/client";


export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
 
  useEffect(() => {
  
      fetchCourses();
    
 
  }, []);

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);

   
  };
  const [course, setCourse] = useState<any>({
     name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };

  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter(
      (c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    console.log('updateCourse');
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );

  };


  return (
    <Provider store={store}>

  <div id="wd-kanbas" className="h-100">
  <div className="d-flex h-100">
    <div className="d-none d-md-block bg-black" style = {{marginRight:"25px"}}>
      <KanbasNavigation />
    </div>
    <div className="flex-fill">
      <Routes>
      <Route path="/" element={<Navigate to="Dashboard" />} />
      <Route path="/Account/*" element={<Account />} />
      <Route path="Dashboard" element={
                        <ProtectedRoute>
            <Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/>
                            </ProtectedRoute>
              } />
            <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /> </ProtectedRoute>} />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
      </Routes>
    </div>
  </div>
</div>
</Provider>
);}



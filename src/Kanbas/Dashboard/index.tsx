import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";
import * as profile_client from "../Account/client";
import * as client from "../Courses/client";
import { setTheCourses } from "../Courses/reducer";

const generateUniqueId = () => '_' + Math.random().toString(36).slice(2, 9);

export default function Dashboard({

}: {

}) 

{
  const [isNewCourse, setIsNewCourse] = useState(false);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    name: "New Course", number: "New Number",
   startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
 });
 
  useEffect(() => {
  
      fetchCourses();
    
 
  }, []);

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);

   
  };

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
       
  const profileUser = useSelector((state: any) => state.accountReducer.profile)||null;
  console.log("aloha");

  const handleAddNewCourse = () => {
    const newCourse = { ...course, id: generateUniqueId(), }; 
    setCourse(newCourse); 
    setIsNewCourse(true); 

  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (profileUser && (profileUser.role === "STUDENT" || profileUser.role === "FACULTY")) {
          const coursesIds = await profile_client.getUserEnrollments(profileUser.username);
          const fetchedCourses = await client.fetchCoursesByIds(coursesIds);
          setCourses(fetchedCourses);
          dispatch(setTheCourses(fetchedCourses));
          
          console.log("Fetched Courses:", fetchedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [profileUser]);

  useEffect(() => {
    if (isNewCourse) {
      addNewCourse();
      setIsNewCourse(false);
    }
  }, [isNewCourse, addNewCourse]);

  if (!profileUser) {
    return <div>Loading...</div>;
  }


  if (profileUser.role === "STUDENT") {
    return (
      <StudentDashboard
        courses={courses}
        course={course}
      />
    );
  }

  // Default dashboard view

  
  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={handleAddNewCourse}
        >
          {" "}
          Add{" "}
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={updateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <input
        value={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        value={course.description}
        className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>{" "}
      <hr />
      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course.id} className="col" style={{ width: "300px" }}>
              <Link
                to={`/Kanbas/Courses/${course.id}/Home`}
                className="text-decoration-none"
              >
                <div className="card rounded-3 overflow-hidden">
                  <img src={`${course.images}`} height="190" />

                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      {course.name}
                    </span>
                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 53, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <Link
                      to={`/Kanbas/Courses/${course.id}/Home`}
                      className="btn btn-primary"
                    >
                      Go
                    </Link>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                    <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                </div>
                </div>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

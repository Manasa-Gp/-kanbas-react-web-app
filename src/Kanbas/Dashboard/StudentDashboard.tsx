import React from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard({
  course,
  courses,
}: {
  course: any;
  courses: any[];
}) 
{
  return (
    <div className="p-4" id="student-dashboard">
      <h1 id="student-dashboard-title">Student Dashboard</h1> 
      <hr />
      <h2 id="student-dashboard-published">
        My Courses ({courses.length})
      </h2> 
      <hr />
      {/* Add Course Button */}
      <div className="mb-3">
        <Link to="/Kanbas/Courses/Add" className="btn btn-success">
          Add Course
        </Link>
      </div>
      <div className="row" id="student-dashboard-courses">
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

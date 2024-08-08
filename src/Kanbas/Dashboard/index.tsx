// import React, { useState,useEffect } from "react";
// import { Link } from "react-router-dom";
// const generateUniqueId = () => '_' + Math.random().toString(36).slice(2, 9);

// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (course: any) => void;
//   updateCourse: () => void;
// }) 

// {
//   const [isNewCourse, setIsNewCourse] = useState(false);

//   const handleAddNewCourse = () => {
//     const newCourse = { ...course, id: generateUniqueId(), }; 
//     setCourse(newCourse); 
//     setIsNewCourse(true); 

//   };

//   useEffect(() => {
//     if (isNewCourse) {
//       addNewCourse(); 
//       setIsNewCourse(false);
//     }
//   }, [course, isNewCourse, addNewCourse]);


//   return (
//     <div className="p-4" id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h5>
//         New Course
//         <button
//           className="btn btn-primary float-end"
//           id="wd-add-new-course-click"
//           onClick={handleAddNewCourse}
//         >
//           {" "}
//           Add{" "}
//         </button>
//         <button
//           className="btn btn-warning float-end me-2"
//           onClick={updateCourse}
//           id="wd-update-course-click"
//         >
//           Update
//         </button>
//       </h5>
//       <br />
//       <input
//         value={course.name}
//         className="form-control mb-2"
//         onChange={(e) => setCourse({ ...course, name: e.target.value })}
//       />
//       <textarea
//         value={course.description}
//         className="form-control"
//         onChange={(e) => setCourse({ ...course, description: e.target.value })}
//       />
//       <hr />
//       <hr />
//       <h2 id="wd-dashboard-published">
//         Published Courses ({courses.length})
//       </h2>{" "}
//       <hr />
//       <div className="row" id="wd-dashboard-courses">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {courses.map((course) => (
//             <div key={course.id} className="col" style={{ width: "300px" }}>
//               <Link
//                 to={`/Kanbas/Courses/${course.id}/Home`}
//                 className="text-decoration-none"
//               >
//                 <div className="card rounded-3 overflow-hidden">
//                   <img src={`${course.images}`} height="190" />

//                   <div className="card-body">
//                     <span
//                       className="wd-dashboard-course-link"
//                       style={{
//                         textDecoration: "none",
//                         color: "navy",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {course.name}
//                     </span>
//                     <p
//                       className="wd-dashboard-course-title card-text"
//                       style={{ maxHeight: 53, overflow: "hidden" }}
//                     >
//                       {course.description}
//                     </p>
//                     <Link
//                       to={`/Kanbas/Courses/${course.id}/Home`}
//                       className="btn btn-primary"
//                     >
//                       Go
//                     </Link>
//                     <button
//                       onClick={(event) => {
//                         event.preventDefault();
//                         deleteCourse(course._id);
//                       }}
//                       className="btn btn-danger float-end"
//                       id="wd-delete-course-click"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       id="wd-edit-course-click"
//                       onClick={(event) => {
//                         event.preventDefault();
//                         setCourse(course);
//                       }}
//                       className="btn btn-warning me-2 float-end"
//                     >
//                       Edit
//                     </button>
//                 </div>
//                 </div>
//               </Link>

//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const generateUniqueId = () => '_' + Math.random().toString(36).slice(2, 9);

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const [isNewCourse, setIsNewCourse] = useState(false);

  const handleAddNewCourse = () => {
    const newCourse = { ...course, _id: generateUniqueId() }; // Ensure unique ID is used
    setCourse(newCourse);
    setIsNewCourse(true);
  };

  useEffect(() => {
    if (isNewCourse) {
      addNewCourse();
      setIsNewCourse(false);
    }
  }, [course, isNewCourse, addNewCourse]);

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
          Add
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
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2> <hr />
      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <Link
                to={`/Kanbas/Courses/${course._id}/Home`}
                className="text-decoration-none"
              >
                <div className="card rounded-3 overflow-hidden">
                  <img src={`${course.images}`} alt={course.name} height="190" />
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
                      to={`/Kanbas/Courses/${course._id}/Home`}
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

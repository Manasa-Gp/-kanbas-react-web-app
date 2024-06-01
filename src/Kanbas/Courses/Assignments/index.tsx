import AssignmentControls from "./AssignmentControls";
import AssignControlButton from "./AssignControlButtons";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButton from "./AssignmentControlButton";
import { MdAssignment } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

import "./styles.css";
export default function Assignments() {
  return (
    <div>
      <div id="wd-modules" className="p-5">
        < AssignmentControls/>
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs- 5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-1"/>
              ASSIGNMENTS
              <AssignmentControlButton />
            </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-2 ps-1">
                <div className="row-layout">
                  <div className="content-container">
                    <BsGripVertical className="me-2 fs-3" />
                    <MdAssignment className="me-2 fs-3" />
                    <div>
                      <a
                        className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123"
                      >
                        A1
                      </a>
                      <div>
                        <p className="wd-assignment-due">
                          <span className="fs-7 text-danger">
                            Multiple Modules
                          </span>{" "}
                          |<strong>Not available until</strong> May 6 at 12:00am
                          |<br />
                          <strong>Due</strong> May 13 at 11:59pm | 100 pts
                        </p>
                      </div>
                    </div>
                  </div>
                  <AssignControlButton />
                </div>
              </li>

              <li className="wd-lesson list-group-item p-2 ps-1">
                <div className="row-layout">
                  <div className="content-container">
                    <BsGripVertical className="me-2 fs-3" />
                    <MdAssignment className="me-2 fs-3" />
                    <div>
                      <a
                        className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123"
                      >
                        A2-CSS+ BOOTSTRAP
                      </a>
                      <div>
                        <p className="wd-assignment-due">
                          <span className="fs-7 text-danger">
                            Multiple Modules
                          </span>{" "}
                          |<strong>Not available until</strong> May 13 at
                          12:00am |<br />
                          <strong>Due</strong> May 20 at 11:59pm | 100 pts
                        </p>
                      </div>
                    </div>
                  </div>
                  <AssignControlButton />
                </div>
              </li>

              <li className="wd-lesson list-group-item p-2 ps-1">
                <div className="row-layout">
                  <div className="content-container">
                    <BsGripVertical className="me-2 fs-3" />
                    <MdAssignment className="me-2 fs-3" />
                    <div>
                      <a
                        className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123"
                      >
                        A3-JAVASCRIPT + REACT
                      </a>
                      <div>
                        <p className="wd-assignment-due">
                          <span className="fs-7 text-danger">
                            Multiple Modules
                          </span>{" "}
                          |<strong>Not available until</strong> May 20 at
                          12:00am |<br />
                          <strong>Due</strong> May 27 at 11:59pm | 100 pts
                        </p>
                      </div>
                    </div>
                  </div>
                  <AssignControlButton />
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

import AssignmentControls from "./AssignmentControls";
import AssignControlButton from "./AssignControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link,useParams } from "react-router-dom";
import{assignments} from "../../Database";
export default function Assignments() {
  const { cid } = useParams();
  const filteredAssignments = assignments.filter(assign => assign.course === cid);
  return (
    <div>
      <div className="p-5">
        <AssignmentControls />
        <ul className="list-group rounded-0">
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-1" />
              ASSIGNMENTS
              <AssignControlButton />
            </div>
            <ul className="list-group rounded-0">
              {filteredAssignments.map(assign => (
                <li key={assign._id} className="list-group-item p-2 ps-1">
                  <div className="row-layout">
                    <div className="content-container">
                      <BsGripVertical className="me-2 fs-3" />
                      <MdAssignment className="me-2 fs-3" />
                      <div>
                        <Link
                          className="wd-assignment-link"
                          to={`/Kanbas/Courses/${cid}/Assignments/${assign._id}`}
                        >
                          {assign._id}
                        </Link>
                        <div>
                          <p className="wd-assignment-due">
                            <span className="fs-7 text-danger">Multiple Modules</span>
                            <span className="mx-1">|</span>
                            <span className="mt-1">
                            <strong>Not available until</strong> {assign.available_from} at 12:00 am |
                            </span>
                            <span className="d-block mt-1">
                              <strong>Due</strong> {assign.due} at 11:59 pm | 100 pts
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <AssignControlButton />
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

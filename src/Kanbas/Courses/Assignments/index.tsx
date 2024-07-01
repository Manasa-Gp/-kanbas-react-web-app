import AssignmentControls from "./AssignmentControls";
import AssignControlButton from "./AssignControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
export default function Assignments() {
  const {cid} = useParams();
  const dispatch = useDispatch();
  const {assignments} = useSelector((state: any) => state.assignmentsReducer);
  const mapAssign = assignments.filter((assignment: any) => assignment.course === cid);

  return (
    <div>
      <div className="p-5">
        <AssignmentControls cid={cid!}/>
        <ul className="list-group rounded-0">
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-1" />
              ASSIGNMENTS
              <div className="float-end me-2">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
            </div>
            <ul className="list-group rounded-0">
              {mapAssign && mapAssign.map( (assign:any) => (
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
                            <strong>Not available until</strong> {assign.available_from_date} at 12:00 am |
                            </span>
                            <span className="d-block mt-1">
                              <strong>Due</strong> {assign.due_date} at 11:59 pm | 100 pts
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <AssignControlButton assignmentId= {assign._id}  deleteAssignment={(assignmentId) =>dispatch(deleteAssignment(assignmentId))}/>
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

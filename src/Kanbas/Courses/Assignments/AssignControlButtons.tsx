import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import AssignDelete from "./DeletePopUp";
export default function AssignControlButton({assignmentId, deleteAssignment}: {
  assignmentId: string; deleteAssignment: (assignmentId: string) => void; }) {
  return (
    <div className="float-end me-2">
      <FaTrash className="text-danger me-2 mb-1" data-bs-toggle="modal" data-bs-target={`#wd-delete-assignment-${assignmentId}-dialog`}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <AssignDelete assignmentId={assignmentId} deleteAssignment={deleteAssignment} />

    </div>
);}

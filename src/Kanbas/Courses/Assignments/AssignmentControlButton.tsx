import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import "./styles.css"
export default function AssignmentControlButton() {
  return (
    <div className="row-layout float-end">
      <div className="rounded-rectangle-mini">
        40% of Total
      </div>
      < BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
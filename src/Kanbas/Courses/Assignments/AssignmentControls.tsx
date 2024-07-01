import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function AssignmentControls(
  {cid}: {cid: string}

) {

return (
<div className = "text-nowrap row-layout mb-3">
<form className="d-flex">
<div className="position-relative w-100">
            <input className="form-control ps-5" type="search" placeholder="Search" aria-label="Search"/>
            <CiSearch className="position-absolute top-50 translate-middle-y ms-2" />
            </div>
</form>
<div className="dropdown d-inline  float-end">
<button id="wd-add-module-btn" className="btn btn-lg me-1 grayed square-button">
        <FaPlus className="position-relative me-2" />
        Group
      </button>
      <Link to = {`/Kanbas/Courses/${cid}/Assignments/plus`}>
<button id="wd-add-module-btn" className="btn btn-lg float-end red square-button"
data-bs-toggle="modal" data-bs-target="#wd-add-assignment-dialog" 
>
        <FaPlus className="position-relative me-2"  />
        Assignment
      </button>
      </Link>
   
</div>

</div>

);
}

import "./styles.css";
import { CiSearch } from "react-icons/ci";

export default function Searchbars() {
  return (
    <div className="text-nowrap row-layout mb-3">
      <div className = "col me-4">
      <div className="w-100 fw-bold">Student Names</div>

<div className="position-relative w-100 ">
<select id="wd-display-grade-as" aria-placeholder = "Search students"className="form-select" style={{ paddingLeft: '2.5rem' }}>
            <option className = "mx-5" value="" disabled selected>Search students</option>
          </select>
  <CiSearch className="position-absolute top-50 translate-middle-y ms-2 " />
</div>
</div>
<div className = "col me-4">
<div className="w-100 mx-4 fw-bold">Assignment Names</div>
<div className="position-relative w-100 mx-4">
<select id="wd-display-grade-as" aria-placeholder = "Search students"className="form-select" style={{ paddingLeft: '2.5rem' }}>
            <option className = "mx-5" value="" disabled selected>Search Assignments</option>
          </select>
  <CiSearch className="position-absolute top-50 translate-middle-y ms-2 " />
</div>
</div>
    </div>
  );
}

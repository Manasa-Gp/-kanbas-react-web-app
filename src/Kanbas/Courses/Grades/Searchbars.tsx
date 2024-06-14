import { CiSearch } from "react-icons/ci";
import { assignments,grades,enrollments,users } from "../../Database"
import { useParams } from "react-router";

export default function Searchbars() {
  const {cid} = useParams();
  const assignment = assignments.filter(assign => assign.course === cid);
  const enrollment  = enrollments.filter(enroll => enroll.course === cid);
  const students = enrollment.map(e => ({
    ...users.find(u => u._id === e.user),
    grade: grades.filter(g => g.student === e.user)
  }));
  return (
    <div className="text-nowrap row-layout mb-3">
      <div className = "col me-4">
      <div className="w-100 fw-bold">Student Names</div>

<div className="position-relative w-100 ">
<select id="wd-display-grade-as" aria-placeholder = "Search students"className="form-select" style={{ paddingLeft: '2.5rem' }}>
            <option className = "mx-5" value="">Search students</option>
            {students.map(s =>(
              <option className = "mx-5" value="">{s.firstName} {s.lastName}</option>
            ))}
          </select>
  <CiSearch className="position-absolute top-50 translate-middle-y ms-2 " />
</div>
</div>
<div className = "col me-4">
<div className="w-100 mx-4 fw-bold">Assignment Names</div>
<div className="position-relative w-100 mx-4">
<select id="wd-display-grade-as" aria-placeholder = "Search students"className="form-select" style={{ paddingLeft: '2.5rem' }}>
            <option className = "mx-5" value="" >Search Assignments</option>
            {assignment.map(a =>(
              <option className = "mx-5" value="">{a._id}-{a.title}</option>
            ))}
          </select>
  <CiSearch className="position-absolute top-50 translate-middle-y ms-2 " />
</div>
</div>
    </div>
  );
}

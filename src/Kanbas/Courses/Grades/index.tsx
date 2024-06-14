import GradeFiles from "./GradeFiles";
import Searchbars from "./Searchbars";
import { BsFunnel } from "react-icons/bs";
import { useParams } from "react-router";
import { assignments,grades,enrollments,users } from "../../Database"
export default function Grades() {
  const {cid} = useParams();
  const enrollment  = enrollments.filter(enroll => enroll.course === cid);
  const students = enrollment.map(e => ({
    ...users.find(u => u._id === e.user),
    grade: grades.filter(g => g.student === e.user)
  }));
  const assignment = assignments.filter(assign => assign.course === cid);

  
  return (
    <div className="p-5 mx-5">
      <div className="row mb-4">
        <div className="col">
          <GradeFiles />
        </div>
      </div>
      <div className="row mx">
        <Searchbars />
      </div>
      <div className="mb-3">
        <button
          id="wd-import-btn"
          className="btn btn-lg me-1 grayed square-button"
        >
          <BsFunnel className="position-relative me-2" />
          Apply Filters
        </button>
      </div>
      <div className="">
        <table className="table table-striped table-bordered font-styler">
          <tbody>
            <tr>
              <th>
                <div className="ms-2">
               Students Name
               </div>
              </th>
              {assignment.map(assign =>(
               
        
              <td className="text-center">
                {assign._id}
                <br />
                Out of 100
              </td>
               ))}
            </tr>
            
        {students.map(s => (
            <tr>
      
              <td className="text-danger">
              <div className="ms-2">
                {s.firstName} {s.lastName}
                </div>
                </td>
                {assignment.map(assign => {
                  const mappedGrade =  s.grade.find(g => g.assignment === assign._id);
                  return <td key={`${assign._id}`} className="assignment-header">{mappedGrade ? `${mappedGrade.grade}` : 'N/A'}</td>;
                })}
            </tr>
               ))}
                       

          </tbody>
        </table>
      </div>
    </div>
  );
}
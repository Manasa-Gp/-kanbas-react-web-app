import GradeFiles from "./GradeFiles";
import Searchbars from "./Searchbars";
import { BsFunnel } from "react-icons/bs";

export default function Grades() {
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
        <table className="table table-striped table-bordered font-styler" >
          <tbody>

            <tr>
              <td style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, fontWeight: 550 }}>
                  Students Name
                </div>
              </td>
              <td className="text-center">A1 SETUP<br />Out of 100</td>
              <td className="text-center">A2 HTML<br />Out of 200</td>
              <td className="text-center">A3 CSS<br />Out of 100</td>
              <td className="text-center">A4 BOOTSTRAP<br />Out of 150</td>
            </tr>
            <tr>
              <td className="text-danger">Jane Adams</td>
              <td className="text-center">100%</td>
              <td className="text-center">96.67%</td>
              <td className="text-center">92.18%</td>
              <td className="text-center">66.22%</td>
            </tr>
            <tr>
              <td className="text-danger">Christina Allen</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger">Samreen Ansari</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger" >Han Bao</td>
              <td className="text-center">100%</td>
              <td className="text-center">96.67%</td>
              <td className="text-center">88.03%</td>
              <td className="text-center">98.99%</td>
            </tr>
            <tr>
              <td className="text-danger">Mahi Sai Srinivas Bobbili</td>
              <td className="text-center">100%</td>
              <td className="text-center">96.67%</td>
              <td className="text-center">99.37%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger">Siran Cao</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger">Kathryn Chalmers</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger">Chih-Yang Chen</td>
              <td className="text-center">100%</td>
              <td className="text-center">81.67%</td>
              <td className="text-center">79.93%</td>
              <td className="text-center">54.66%</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}


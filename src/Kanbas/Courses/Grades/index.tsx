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
        <table className="table table-striped table-bordered font-styler">
          <tbody>
            <tr>
              <th>
                <div className="ms-2">
               Students Name
               </div>
              </th>
              <td className="text-center">
                A1 SETUP
                <br />
                Out of 100
              </td>
              <td className="text-center">
                A2 HTML
                <br />
                Out of 200
              </td>
              <td className="text-center">
                A3 CSS
                <br />
                Out of 100
              </td>
              <td className="text-center">
                A4 BOOTSTRAP
                <br />
                Out of 150
              </td>
            </tr>
            <tr>
              <td className="text-danger">
              <div className="ms-2">
                Jane Adams
                </div>
                </td>
              <td className="text-center">100%</td>
              <td className="text-center">96.67%</td>
              <td className="text-center">92.18%</td>
              <td className="text-center">66.22%</td>
            </tr>
            <tr>
              <td className="text-danger">
              <div className="ms-2">
                Christina Allen
                </div>
                </td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger">
              <div className="ms-2">
                Samreen Ansari
                </div>
                </td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger">
              <div className="ms-2">
                Han Bao
                </div>
                </td>
              <td className="text-center">100%</td>
              <td className="text-center">96.67%</td>
              <td className="text-center">88.03%</td>
              <td className="text-center">98.99%</td>
            </tr>
            <tr>
              <td className="text-danger">
              <div className="ms-2">
                Mahi Sai Srinivas Bobbili
                </div>
                </td>
              <td className="text-center">100%</td>
              <td className="text-center">96.67%</td>
              <td className="text-center">99.37%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger">
              <div className="ms-2">
                Siran Cao
                </div>
                </td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
            </tr>
            <tr>
              <td className="text-danger">
              <div className="ms-2">
                Caroline Brown
                </div>
                </td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
              <td className="text-center">100%</td>
            </tr>
         
          </tbody>
        </table>
      </div>
    </div>
  );
}

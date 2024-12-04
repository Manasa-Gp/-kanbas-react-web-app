import { FaFileImport } from "react-icons/fa6";
import { FaFileExport } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

export default function GradeFiles() {
    return (
      <div className="float-end mb-3">

          <button
            id="wd-import-btn"
            className="btn btn-lg me-1 grayed square-button"
          >
               <FaFileImport className="position-relative me-2" />
            Import
          </button>
          <button
            id="wd-export-btn"
            className="btn btn-lg me-1 grayed square-button"
          >
              <FaFileExport className="position-relative me-2" />
            Export
          </button>
          <button
            id="wd-settings-btn"
            className="btn btn-lg grayed square-button"
          >
              <IoMdSettings className="position-relative icon-large" />
          </button>
        
      </div>
      
      
    );
  }
  

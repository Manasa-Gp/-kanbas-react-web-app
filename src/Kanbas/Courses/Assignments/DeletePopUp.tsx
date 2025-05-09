
export default function AssignDelete({assignmentId, deleteAssignment}: {
    assignmentId: string; deleteAssignment: (assignmentId: string) => void;
    }) {
      return (
        <div id={`wd-delete-assignment-${assignmentId}-dialog`} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  "Delete Assognment" </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <span> Are you sure you want to delete the assignment</span>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel </button>
                <button onClick={() => deleteAssignment(assignmentId)} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Delete </button>
                  
              </div>
            </div>
          </div>
        </div>
      );
    }
    
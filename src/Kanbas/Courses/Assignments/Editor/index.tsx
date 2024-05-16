export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label><br /><br />
        <input id="wd-name" value="A1 - ENV + HTML" />
        <br /><br />
        <textarea id="wd-description" rows={8} cols={47}>
        The assignment is available online Submit a 
        link to the landing page of your Web application 
        running on Netlify. The landing page should 
         include the following: Your full name and section, 
         Links to each of thelab assignments Link to the 
         Kanbas application, Links to all relevant source 
         code repositories.The Kanbas application should 
         include a link to navigate back to the landing page.
        </textarea>
        <br />
        <br/>
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment group</label>
            </td>
            <td>
            <select id="wd-group">
          <option selected value="assignments">ASSIGNMENTS</option>
        </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
            <select id="wd-display-grade-as">
          <option selected value="p">Percentage</option>
        </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
            <select id="wd-submission-type">
          <option selected value="Online">Online</option>
        </select><br/>
            <br/>
            <label>Online Entry options</label>
            <br/>
            <input type="checkbox"
                  name="check-entry-options" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text entry</label><br/>
            <input type="checkbox"
                  name="check-genre" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>
            <input type="checkbox"
                  name="check-genre" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
            <input type="checkbox"
                  name="check-genre" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotations</label><br/>
            <input type="checkbox"
                  name="check-genre" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Assign</label>
            </td>
            <td>
                <label htmlFor="wd-assign-to">Assign to </label><br/>
                <input id="wd-points" placeholder="Everyone" />
              <tr>
              <br/>
              <label htmlFor="wd-due-date">Due</label><br/>
              <input type="date" value="2024-05-13"/>
              </tr>
              <br/>
              <tr>
              <td>
              <label htmlFor="wd-available from">Avaiable from</label><br/>
              <input type="date" value="2024-05-13"/>
              </td>
              <td>
              <label htmlFor="available until">Until</label><br/>
              <input type="date" value="2024-05-20"/>
              </td>
              </tr>
            </td>
          </tr>
               
        </table>
        <hr style={{ textAlign: 'right' }} />
            <button style={{ float: 'right', marginLeft: '10px' }}>Cancel</button>
            <button style={{ float: 'right' }}>Save</button>
      </div>
  );}
  
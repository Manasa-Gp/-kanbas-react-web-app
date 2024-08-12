import * as client from "./client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile, setCurrentUser, setProfileUser, updateProfiler } from "./reducer";

export default function Profile() {
  const profileFromStore = useSelector((state: any) => state.accountReducer.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      dispatch(setProfileUser(account));
    } catch (err: any) {
      console.log("Profile error:", err);
      navigate("/Kanbas/Account/Signin");
    }
  };

  const signout = async () => {
    try {
      await client.signout();
      dispatch(clearProfile());
      dispatch(setCurrentUser(null));
      navigate("/Kanbas/Account/Signin");
    } catch (err) {
      console.error("Error during signout:", err);
    }
  };

  const updateProfile = async () => {
    try {
      await client.updateUser(profileFromStore._id, profileFromStore);
      dispatch(updateProfiler(profileFromStore)); // Ensure this action updates the Redux store
      

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {profileFromStore && (
        <div>
          {/* <input
            value={profileFromStore._id}
            className="form-control mb-2"
            disabled
          /> */}
          <input
            placeholder="username"
            value={profileFromStore.username || ""}
            onChange={(e) => dispatch(setProfileUser({ ...profileFromStore, username: e.target.value }))}
            className="form-control mb-2"
          />
          <input
            placeholder="password"
            value={profileFromStore.password || ""}
            onChange={(e) => dispatch(setProfileUser({ ...profileFromStore, password: e.target.value }))}
            className="form-control mb-2"
          />
          <input
            placeholder="first name"
            value={profileFromStore.firstName || ""}
            onChange={(e) => dispatch(setProfileUser({ ...profileFromStore, firstName: e.target.value }))}
            className="form-control mb-2"
          />
          <input
           placeholder="last name"
            value={profileFromStore.lastName || ""}
            onChange={(e) => dispatch(setProfileUser({ ...profileFromStore, lastName: e.target.value }))}
            className="form-control mb-2"
          />
          <input
          placeholder="dob"
            value={profileFromStore.dob || ""}
            onChange={(e) => dispatch(setProfileUser({ ...profileFromStore, dob: e.target.value }))}
            type="date"
            className="form-control mb-2"
          />
          <input
          placeholder="email"
            value={profileFromStore.email || ""}
            onChange={(e) => dispatch(setProfileUser({ ...profileFromStore, email: e.target.value }))}
            className="form-control mb-2"
          />
          <select
            value={profileFromStore.role || "USER"}
            onChange={(e) => dispatch(setProfileUser({ ...profileFromStore, role: e.target.value }))}
            className="form-control mb-2"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      )}
      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
        Update
      </button>
      <button onClick={signout} className="btn btn-danger w-100">
        Sign out
      </button>
    </div>
  );
}

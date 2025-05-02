import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Signup from "./Signup";
import Session from "./Session"; // Import the Session component

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <Session> {/* Wrap the routes inside Session to handle session state */}
      <div>
        <div className="d-flex">
          <div className="d-none d-md-block">
            <AccountNavigation />
          </div>
          <div className="flex-fill p-4 pt-0">
            <Routes>
              {/* Default Route: If user is logged in, navigate to Profile, else Signin */}
              <Route
                path="/"
                element={
                  currentUser ? (
                    <Navigate to="/Kanbas/Account/Profile" />
                  ) : (
                    <Navigate to="/Kanbas/Account/Signin" />
                  )
                }
              />

              {/* Signin Route */}
              <Route
                path="/signin"
                element={currentUser ? <Navigate to="/Kanbas/Account/Profile" /> : <Signin />}
              />

              {/* Signup Route */}
              <Route
                path="/signup"
                element={currentUser ? <Navigate to="/Kanbas/Account/Profile" /> : <Signup />}
              />

              {/* Protected Profile Route: Only accessible if user is logged in */}
              <Route
                path="/profile"
                element={currentUser ? <Profile /> : <Navigate to="/Kanbas/Account/Signin" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Session>
  );
}

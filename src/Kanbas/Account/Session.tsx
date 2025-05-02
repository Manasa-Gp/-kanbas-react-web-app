import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<string | null>(null); // For error handling
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      console.log("Fetching session...");
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile. Please log in again.");
      // Optionally redirect to login page if the error is related to authentication
      navigate("/login");  // Replace with the correct route for login
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return <div>Loading...</div>; // A loading state while fetching profile
  }

  if (error) {
    return <div>{error}</div>; // Display error message if any error occurs
  }

  return children; // If everything is successful, render children
}

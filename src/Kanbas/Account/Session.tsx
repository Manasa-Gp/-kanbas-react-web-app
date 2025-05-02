import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";  // Assuming this sets the user state
import * as client from "./client";
import { useNavigate } from "react-router-dom";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<string | null>(null); // For error handling
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the user profile and store in Redux
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser)); // Store the user data in Redux
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile. Please log in again.");
      navigate("/signin");  // Redirect to sign-in page if error occurs
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return <div>Loading...</div>; // Show loading state while session is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error if there is one
  }

  return children; // If session is valid, render children
}

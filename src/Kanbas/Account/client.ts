import axios from "axios";

// Create an Axios instance with credentials enabled for cross-origin requests
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

// Helper function to handle errors
const handleError = (error: any) => {
  if (error.response) {
    // The request was made, but the server responded with an error
    console.error("API Error:", error.response.status, error.response.data);
  } else if (error.request) {
    // The request was made, but no response was received
    console.error("No response received:", error.request);
  } else {
    // Something else triggered the error (e.g., wrong Axios configuration)
    console.error("Error:", error.message);
  }
  throw error;  // Rethrow to be handled in the calling function
};

// API call to sign in
export const signin = async (credentials: any) => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
  } catch (error) {
    handleError(error);  // Handle and log error
  }
};

// API call to fetch the profile data
export const profile = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    console.log("Profile data:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);  // Handle and log error
  }
};

// API call to sign up
export const signup = async (credentials: any) => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, credentials);
    return response.data;
  } catch (error) {
    handleError(error);  // Handle and log error
  }
};

// API call to sign out
export const signout = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
  } catch (error) {
    handleError(error);  // Handle and log error
  }
};

// Fetch courses by user ID
export const fetchCoursesByUserId = async (userId: any) => {
  try {
    const response = await axios.get(`${USERS_API}/${userId}/courses`);
    return response.data;
  } catch (error) {
    handleError(error);  // Handle and log error
  }
};

// Fetch user enrollments by username
export const getUserEnrollments = async (username: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${USERS_API}/${username}/enrollments`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching user enrollments:", error);
    // Return an empty array on error to match the expected return type
    return [];
  }
};


// Enroll a user in a course
export const enrollInCourse = async (username: string, courseId: string): Promise<void> => {
  try {
    console.log("Enrolling user:", username, "in course:", courseId);
    await axios.post(`${USERS_API}/${username}/enroll`, { courseId });
  } catch (error) {
    handleError(error);  // Handle and log error
  }
};

// Update user data
export const updateUser = async (userId: any, userData: any) => {
  try {
    const response = await axios.put(`${USERS_API}/${userId}`, userData);
    return response.data;
  } catch (error) {
    handleError(error);  // Handle and log error
  }
};

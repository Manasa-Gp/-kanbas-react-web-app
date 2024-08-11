import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  console.log("Profiler data:",response.data);
  return response.data;
};



export const signup = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    credentials
  );
  return response.data;
};
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const fetchCoursesByUserId = async (userId: any) => {
  const response = await axios.get(`${USERS_API}/${userId}/courses`);
  return response.data;
};

export const getUserEnrollments = async (username: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${USERS_API}/${username}/enrollments`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching user enrollments:", error);
    throw error; 
  }
};

export const enrollInCourse = async (username: string, courseId: string): Promise<void> => {
  try {
    console.log("clients",username,courseId);
    await axios.post(`${USERS_API}/${username}/enroll`, { courseId });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error; 
  }
};

export const updateUser = async (userId: any, userData: any) => {
  const response = await axios.put(`${USERS_API}/${userId}`, userData);
  return response.data;
};
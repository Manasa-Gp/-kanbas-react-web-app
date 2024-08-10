import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as client from '../Courses/client';
import { useSelector } from 'react-redux';
import * as pr_client from '../Account/client';
import { useNavigate } from 'react-router-dom';

export default function AddCoursePage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const profileUser = useSelector((state: any) => state.accountReducer.profile) || null;
  console.log("profileUser", profileUser);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      setCourses(courses);
    } catch (err) {
      setError('Failed to fetch courses');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnroll = async () => {
    try {
      if (!profileUser || !selectedCourse) {
        setError('Please select a course and make sure you are logged in.');
        return;
      }
     console.log(`Enrolling ${selectedCourse}`)
      await pr_client.enrollInCourse(profileUser.username, selectedCourse);
      setSuccess('Successfully enrolled in course');
      setError('');
      
      // Redirect to Kanbas/Dashboard
      navigate('/Kanbas/Dashboard');
    } catch (err) {
      setError('Failed to enroll in course');
      setSuccess('');
    }
  };

  return (
    <div className="p-4">
      <h1>Add Course</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="mb-3">
        <label htmlFor="courseSelect" className="form-label">Select a Course</label>
        <select
          id="courseSelect"
          className="form-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select a Course --</option>
          {courses.map((course: any) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleEnroll}
        disabled={!selectedCourse}
      >
        Enroll
      </button>
    </div>
  );
}

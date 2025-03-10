import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundImage from "../assets/bus-background.jpeg";
import LogoImage from "../assets/vanmate logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    school: '',
    parentContact: '',
    grade: 'Grade 1',
    gender: 'Male',
    occupation: '',
    homeAddress: '',
    nearestTown: '',
    pickupLocation: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    localStorage.setItem('vanmateUserData', JSON.stringify({
      studentName: formData.studentName,
      parentName: formData.parentName,
      school: formData.school,
      // Add other relevant fields
    }));
    
    console.log('Form submitted:', formData);
    
    // Navigate to the dashboard with the student name as state
    navigate('/van-dashboard', { 
      state: { 
        studentName: formData.studentName,
        newRegistration: true 
      } 
    });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden" 
         style={{ backgroundColor: '#F5E9C9' }}>
      
      {/* Background school bus image with reduced opacity */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src={BackgroundImage}
          alt="School bus background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between p-4 border-b bg-opacity-90"
           style={{ backgroundColor: '#F5E9C9' }}>
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={LogoImage} alt="Vanmate Logo" className="w-10 h-10 mr-2" />
            <span className="text-xl font-semibold text-black-600">VANMATE</span>
          </Link>
        </div>
        <div className="flex space-x-2">
          <Link to="/login">
            <button className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800">Login</button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 text-white bg-gray-700 rounded">Register</button>
          </Link>
        </div>
      </nav>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto pt-8 px-4 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-black-700 mb-2">REGISTER</h1>
        </div>
        
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Brian Clark"
                required
              />
            </div>
            
            {/* Parent's/Guardian's Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent's/Guardian's Name</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
            
            {/* School */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <select
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              >
                <option value="">Select School</option>
                <option value="school1">School 1</option>
                <option value="school2">School 2</option>
              </select>
            </div>
            
            {/* Parent's/Guardian's Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent's/Guardian's Contact Number</label>
              <input
                type="tel"
                name="parentContact"
                value={formData.parentContact}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="+94"
                required
              />
            </div>
            
            {/* Grade - Updated with 13 options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              >
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
                <option value="Grade 13">Grade 13</option>
              </select>
            </div>
            
            {/* Gender - Updated with only 3 options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Occupation (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation (optional)</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
            
            {/* Home Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
              <textarea
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows="3"
                required
              ></textarea>
            </div>
            
            {/* Nearest town */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nearest town</label>
              <input
                type="text"
                name="nearestTown"
                value={formData.nearestTown}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Kamburupitiya"
                required
              />
            </div>
            
            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <div className="flex">
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
                <button type="button" className="bg-gray-200 p-2 border border-l-0 rounded-r">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button 
              type="submit" 
              className="px-8 py-3 text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
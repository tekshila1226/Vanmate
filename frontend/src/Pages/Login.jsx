import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundImage from "../assets/bus-background.jpeg";
import LogoImage from "../assets/vanmate logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', formData);
    // Navigate to student profile page after successful login
    navigate('/student-profile');
  };

  // Handler for forgot password link
  const handleForgotPassword = () => {
    navigate('/forgot-password');
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
            <button className="px-4 py-2 text-white bg-gray-700 rounded">Login</button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800">Register</button>
          </Link>
        </div>
      </nav>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto pt-16 flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h1 className="text-4xl font-semibold text-black-700 mb-6 text-center">Login</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
            </div>
            
            {/* Help Links */}
            <div className="flex justify-between text-sm mb-6">
              <Link to="/register" className="text-gray-600 hover:text-gray-800">
                Don't have an account? Register
              </Link>
              <Link 
                to="/forgot-password" 
                className="text-gray-600 hover:text-gray-800 hover:underline cursor-pointer"
              >
                Forgot Password
              </Link>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from "../assets/bus-background.jpeg";
import LogoImage from "../assets/vanmate logo.png";
import vanTrackingIcon from "../assets/vantracking.jpeg";
import attendanceIcon from "../assets/attendance.jpeg";
import driverManagementIcon from "../assets/drivermanagement.jpeg";

const VanMateDashboard = () => {
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
      <nav className="relative z-10 flex items-center justify-between p-4 border-b bg-#F5E9C9 bg-opacity-90">
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
            <button className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800">Register</button>
        </Link>
      </div>
      </nav>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto pt-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-black-700 mb-2">VanMate</h1>
          <p className="text-xl font-semibold text-black-600">School Van Management System</p>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Van Tracking Card */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 border rounded p-2">
              <img src={vanTrackingIcon} alt="Van Tracking" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-semibold text-black-700 mb-2">Van Tracking</h2>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar cons elementum tempus hac.
            </p>
          </div>
          
          {/* Daily Attendance Card */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 border rounded p-2">
              <img src={attendanceIcon} alt="Daily Attendance" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-semibold text-black-700 mb-2">Daily Attendance</h2>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar cons elementum tempus hac.
            </p>
          </div>
          
          {/* Driver Management Card */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 border rounded p-2">
              <img src={driverManagementIcon} alt="Driver Management" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-semibold text-black-700 mb-2">Driver Management</h2>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar cons elementum tempus hac.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VanMateDashboard;
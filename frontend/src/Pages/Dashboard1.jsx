import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from "../assets/vanmate logo.png"; // The black square logo with bus
import backgroundImage from "../assets/bus-background.jpeg"

const VanMateLanding = () => {
  const navigate = useNavigate();  //for navigation
  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{ 
        backgroundColor: '#F5E9C9', // Light beige/yellow bus color
      }}
    >
      {/* Background school bus image - make this a separate background image to match exactly */}
      <div 
        className="absolute inset-0 z-0 opacity-40 "
        
      >
          <img
            src={backgroundImage}
            className="w-full h-full object-cover"
          />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Title and subtitle - centered at top */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-black text-black tracking-wide mb-2">VANMATE</h1>
          <p className="text-3xl font-bold text-black">School Van Management System</p>
        </div>
        
        {/* Bottom section with logo and button */}
        <div className="flex items-center justify-between w-full max-w-3xl px-8">
          {/* Logo section - black square with logo */}
          <div className="w-48 h-48 bg-black flex items-center justify-center">
            <img 
              src={LogoImage}
              alt="VanMate Logo"
              className="w-36 h-36 object-contain"
            />
          </div>
          
          {/* Get Started Button */}
          <button 
            onClick={() => navigate("/dashboard")}   //navigate to dashboard
            className="bg-white text-black text-xl font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default VanMateLanding;
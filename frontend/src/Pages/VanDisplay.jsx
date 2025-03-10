import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackgroundImage from "../assets/bus-background.jpeg";
import LogoImage from "../assets/vanmate logo.png";
import { ChevronDown } from 'lucide-react';

const VanDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Student accounts
  const [studentAccounts] = useState([
    { id: 1, name: "Tekshila" },
    { id: 2, name: "Arjun" },
    { id: 3, name: "Priya" }
  ]);

  // Active student
  const [activeStudent, setActiveStudent] = useState(studentAccounts[0]);

  // Sample van data
  const vans = [
    { id: "01", route: "Kamburupitiya town --Thihagoda-- Matara", availableSeats: 0 },
    { id: "02", route: "Akuressa --Malimbada-- Matara", availableSeats: 3 },
    { id: "03", route: "Deniyaya --Morawaka-- Matara", availableSeats: 7 },
    { id: "04", route: "Hakmana --Dickwella-- Matara", availableSeats: 2 },
    { id: "05", route: "Weligama --Mirissa-- Matara", availableSeats: 4 },
    { id: "06", route: "Beliatta --Tangalle-- Matara", availableSeats: 6 }
  ];

  // Filter vans based on search input
  const filteredVans = vans.filter(van =>
    `Van ${van.id}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    van.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to the selected student's profile
  const handleStudentClick = (student) => {
    setActiveStudent(student);
    navigate(`/profile/${student.id}`, { state: { student } });
    setProfileDropdownOpen(false);
  };

  // Handle Book Seat button click - Navigate to van details page
  const handleBookSeat = (vanId) => {
    console.log("Book seat clicked for van:", vanId);
    navigate(`/van/${vanId}`);
  };

  // Handle card click
  const handleCardClick = (van) => {
    if (van.availableSeats > 0) {
      console.log("Card clicked for van:", van.id);
      navigate(`/van/${van.id}`);
    }
  };

  // Added console.log for debugging
  console.log("Current path:", location.pathname);

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#F5E9C9' }}>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img src={BackgroundImage} alt="School bus background" className="w-full h-full object-cover" />
      </div>

      {/* Navbar with Tabs */}
      <nav className="relative z-10 flex items-center justify-between p-4 border-b bg-opacity-90" style={{ backgroundColor: '#F5E9C9' }}>
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={LogoImage} alt="Vanmate Logo" className="w-10 h-10 mr-2" />
            <span className="text-xl font-semibold text-black">VANMATE</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8">
          <Link to="/van-dashboard">
            <button className={`px-4 py-2 rounded font-medium ${location.pathname === '/van-dashboard' ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}>
              Home
            </button>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className={`flex items-center px-4 py-2 rounded font-medium ${location.pathname.startsWith('/profile') ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}
            >
              Profile <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {/* Dropdown menu */}
            {profileDropdownOpen && (
              <div className="absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <p className="px-4 py-2 text-sm text-gray-700 font-semibold">Select Student:</p>
                  {studentAccounts.map(student => (
                    <button
                      key={student.id}
                      onClick={() => handleStudentClick(student)}
                      className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 text-gray-700"
                    >
                      {student.name}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => navigate('/login')}
                      className="block px-4 py-2 text-sm text-left w-full text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/facilities">
            <button className={`px-4 py-2 rounded font-medium ${location.pathname === '/facilities' ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}>
              Facilities
            </button>
          </Link>
        </div>
      </nav>

      {/* Welcome message */}
      <div className="relative z-10 container mx-auto pt-10 px-4">
        <h1 className="text-4xl font-semibold text-black mb-2">Hello {activeStudent.name}!</h1>
        <p className="text-xl text-black">Find the Best Seat for Your Child's Journey.</p>
      </div>

      {/* Search Box */}
      <div className="relative mb-10 max-w-md mx-auto mt-8">
        <input
          type="text"
          placeholder="Search for Van 01, Van 02..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* Van List Container */}
      <div className="container mx-auto px-6 pb-12">
        {/* Van List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVans.length > 0 ? (
            filteredVans.map((van) => (
              <div 
                key={van.id} 
                onClick={() => handleCardClick(van)}
                className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105 ${van.availableSeats > 0 ? 'cursor-pointer' : ''}`}
              >
                <h3 className="text-lg font-medium text-black mb-1">Van {van.id}</h3>
                <p className="text-black mb-1 text-center">{van.route}</p>
                <p className={`font-medium ${van.availableSeats > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {van.availableSeats > 0 ? `${van.availableSeats} seats available` : 'No seats available'}
                </p>
                {van.availableSeats > 0 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookSeat(van.id);
                    }} 
                    className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
                  >
                    Book Seat
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">No vans found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VanDashboard;
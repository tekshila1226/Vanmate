import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import BackgroundImage from "../assets/bus-background.jpeg";
import LogoImage from "../assets/vanmate logo.png";
import { ChevronDown } from 'lucide-react';

const VanDetail = () => {
  const { vanId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  
  // Added console.log for debugging
  console.log("VanDetail component mounted with vanId:", vanId);
  console.log("Current path:", location.pathname);
  
  // Student accounts (same as in VanDashboard for consistency)
  const [studentAccounts] = React.useState([
    { id: 1, name: "Tekshila" },
    { id: 2, name: "Arjun" },
    { id: 3, name: "Priya" }
  ]);

  // Active student
  const [activeStudent, setActiveStudent] = React.useState(studentAccounts[0]);

  // Van data mapping based on vanId
  const vansData = {
    "01": {
      driver: "S. K. Kumara",
      vehicleNo: "SD 4567",
      contactNumber: "+94 767035762",
      route: "Kamburupitiya town --Thihagoda-- Matara",
      dropOffSchools: "Sujatha Vidyalaya Matara",
      startingTime: "6.00 a.m.",
      returnTime: "1.30 p.m.",
      totalSeats: 20,
      availableSeats: 0
    },
    "02": {
      driver: "R. P. Gunawardena",
      vehicleNo: "WP 5823",
      contactNumber: "+94 713452198",
      route: "Akuressa --Malimbada-- Matara",
      dropOffSchools: "St. Thomas College Matara",
      startingTime: "6.30 a.m.",
      returnTime: "2.00 p.m.",
      totalSeats: 15,
      availableSeats: 3
    },
    "03": {
      driver: "M. D. Perera",
      vehicleNo: "SP 7895",
      contactNumber: "+94 772156432",
      route: "Deniyaya --Morawaka-- Matara",
      dropOffSchools: "St. Servatius College Matara",
      startingTime: "5.45 a.m.",
      returnTime: "1.45 p.m.",
      totalSeats: 22,
      availableSeats: 7
    },
    "04": {
      driver: "A. B. Silva",
      vehicleNo: "SP 3254",
      contactNumber: "+94 763214789",
      route: "Hakmana --Dickwella-- Matara",
      dropOffSchools: "Rahula College Matara",
      startingTime: "6.15 a.m.",
      returnTime: "2.15 p.m.",
      totalSeats: 18,
      availableSeats: 2
    },
    "05": {
      driver: "K. L. Fernando",
      vehicleNo: "SP 1478",
      contactNumber: "+94 785632147",
      route: "Weligama --Mirissa-- Matara",
      dropOffSchools: "St. Mary's Convent Matara",
      startingTime: "6.45 a.m.",
      returnTime: "1.15 p.m.",
      totalSeats: 16,
      availableSeats: 4
    },
    "06": {
      driver: "B. C. Wijesinghe",
      vehicleNo: "SP 6985",
      contactNumber: "+94 712589634",
      route: "Beliatta --Tangalle-- Matara",
      dropOffSchools: "Matara Central College",
      startingTime: "5.30 a.m.",
      returnTime: "2.30 p.m.",
      totalSeats: 25,
      availableSeats: 6
    }
  };

  // Get van data based on vanId or use a default if not found
  const vanData = vansData[vanId] ? { id: vanId, ...vansData[vanId] } : {
    id: vanId || "01",
    driver: "S. K. Kumara",
    vehicleNo: "SD 4567",
    contactNumber: "+94 767035762",
    route: "Kamburupitiya town --Thihagoda-- Matara",
    dropOffSchools: "Sujatha Vidyalaya Matara",
    startingTime: "6.00 a.m.",
    returnTime: "1.30 p.m.",
    totalSeats: 20,
    availableSeats: 5
  };

  // Navigate to the selected student's profile
  const handleStudentClick = (student) => {
    setActiveStudent(student);
    navigate(`/profile/${student.id}`, { state: { student } });
    setProfileDropdownOpen(false);
  };

  // Handle Add Child
  const handleAddChild = () => {
    // Implementation for adding a child
    console.log("Add child for van:", vanId);
  };

  // Handle Message Driver
  const handleMessageDriver = () => {
    // Implementation for messaging driver
    console.log("Message driver of van:", vanId);
  };

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

      {/* Van Detail Content */}
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-8 max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-6">Van {vanData.id}</h1>
            
            <div className="space-y-4">
              <p><span className="font-medium">Driver - </span>{vanData.driver}</p>
              <p><span className="font-medium">Vehicle no - </span>{vanData.vehicleNo}</p>
              <p><span className="font-medium">Driver Contact number - </span>{vanData.contactNumber}</p>
              <p><span className="font-medium">Route - </span>{vanData.route}</p>
              <p><span className="font-medium">Drop-off Schools - </span>{vanData.dropOffSchools}</p>
              <p><span className="font-medium">Starting morning Time - </span>{vanData.startingTime}</p>
              <p><span className="font-medium">Return journey starting Time - </span>{vanData.returnTime}</p>
              <p><span className="font-medium">Total No. of seats - </span>{vanData.totalSeats}</p>
              <p><span className="font-medium">Available seats - </span>{vanData.availableSeats}</p>
            </div>

            <div className="mt-8 flex space-x-4">
              <button 
                className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                onClick={handleAddChild}
              >
                Add Child
              </button>
              <button 
                className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                onClick={handleMessageDriver}
              >
                Send Message to driver
              </button>
            </div>
          </div>
          
          <div className="md:ml-6 mt-6 md:mt-0 flex flex-col items-center gap-6">
            <div className="bg-gray-100 p-4 rounded w-44 h-44 flex items-center justify-center">
              <p className="text-gray-500">Driver photo</p>
            </div>
            <div className="bg-gray-100 p-4 rounded w-44 h-44 flex items-center justify-center">
              <p className="text-gray-500">Van photo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VanDetail;
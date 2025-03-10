import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronDown, MapPin } from 'lucide-react';
import BackgroundImage from "../assets/bus-background.jpeg";
import LogoImage from "../assets/vanmate logo.png";

const StudentProfile = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Get student from location state or use default
  const studentFromState = location.state?.student;
  
  // Student accounts for dropdown
  const [studentAccounts] = useState([
    { id: 1, name: "Tekshila" },
    { id: 2, name: "Arjun" },
    { id: 3, name: "Priya" }
  ]);

  // Active student
  const [activeStudent, setActiveStudent] = useState(studentFromState || studentAccounts[0]);

  const [studentData, setStudentData] = useState({
    studentName: 'Brian Clerk',
    studentId: 'St001',
    parentName: 'John Doh',
    contactNo: '+94 767035762',
    grade: '7',
    pickupLocation: 'School entrance',
    school: 'Sujatha Vidyalaya Matara',
    assignedVanId: 'Van01',
    assignedVanDriver: 'S K Kumara',
    driverContactNo: '+94 767035762',
    lastPaymentMonth: 'September',
    notificationCount: 0,
    dailyAttendanceStatus: 'Submitted'
  });

  useEffect(() => {
    // Simulate API fetch for student data
    setTimeout(() => {
      // In a real app, this would be an API call using studentId
      setLoading(false);
      
      // Set active student based on the student ID
      const foundStudent = studentAccounts.find(student => student.id === parseInt(studentId));
      if (foundStudent) {
        setActiveStudent(foundStudent);
      }
    }, 500);
  }, [studentId, studentAccounts]);

  // Navigate to the selected student's profile
  const handleStudentClick = (student) => {
    setActiveStudent(student);
    navigate(`/profile/${student.id}`, { state: { student } });
    setProfileDropdownOpen(false);
  };

  // Navigation handlers
  const handleEditProfile = () => {
    navigate(`/edit-profile/${studentId || activeStudent.id}`);
  };
  
  const navigateToAttendance = () => {
    navigate('/attendance');
  };
  
  const navigateToVanTracking = () => {
    navigate('/van-tracking');
  };
  
  const navigateToPayment = () => {
    navigate('/payment');
  };

  const navigateToLogout = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center" style={{ backgroundColor: '#F5E9C9' }}>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#F5E9C9' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img src={BackgroundImage} alt="School bus background" className="w-full h-full object-cover" />
      </div>

      {/* Top Navbar */}
      <nav className="relative z-10 flex items-center justify-between p-4 border-b bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => navigate("/")} className="flex items-center">
            <img src={LogoImage} alt="Vanmate Logo" className="w-8 h-8 mr-2" />
            <span className="text-xl font-semibold text-gray-700">VANMATE</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <button 
            onClick={() => navigate("/")}
            className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900"
          >
            Home
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center px-4 py-2 font-medium text-purple-700"
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
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => navigate("/facilities")}
            className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900"
          >
            Facilities
          </button>
        </div>
      </nav>

      {/* Side Navigation */}
      <div className="flex">
        <div className="w-48 bg-white shadow-md h-screen fixed z-10">
          <div className="py-4 px-6">
            <button
              onClick={navigateToAttendance}
              className="w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium"
            >
              Attendance
            </button>
            <hr className="my-2 border-gray-200" />
            
            <button
              onClick={navigateToVanTracking}
              className="w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium"
            >
              Van Tracking
            </button>
            <hr className="my-2 border-gray-200" />
            
            <button
              onClick={navigateToPayment}
              className="w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium"
            >
              Payment
            </button>
            <hr className="my-2 border-gray-200" />
            
            <button
              onClick={handleEditProfile}
              className="w-full text-left py-3 text-gray-700 hover:text-gray-900 font-medium"
            >
              Edit Profile
            </button>
            <hr className="my-2 border-gray-200" />
            
            <div className="pt-24">
              <button
                onClick={navigateToLogout}
                className="w-full text-left py-3 text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-48 flex-1 relative z-10 p-6">
          <div className="max-w-4xl bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Student Profile</h2>
            
            {/* Student Information Card */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 gap-3">
                <div className="profile-item">
                  <p className="text-gray-500 text-sm">Student name - {studentData.studentName}</p>
                </div>
                
                <div className="profile-item">
                  <p className="text-gray-500 text-sm">Student ID - {studentData.studentId}</p>
                </div>
                
                <div className="profile-item">
                  <p className="text-gray-500 text-sm">Grade - {studentData.grade}</p>
                </div>
                
                <div className="profile-item flex items-center">
                  <p className="text-gray-500 text-sm">Pickup Location - </p>
                  <MapPin className="h-4 w-4 text-gray-400 ml-1" />
                </div>
                
                <div className="profile-item">
                  <p className="text-gray-500 text-sm">School - {studentData.school}</p>
                </div>
                
                <div className="profile-item">
                  <p className="text-gray-500 text-sm">Assigned Van ID - {studentData.assignedVanId}</p>
                </div>
                
                <div className="profile-item">
                  <p className="text-gray-500 text-sm">Assigned Van Driver - {studentData.assignedVanDriver}</p>
                </div>
                
                <div className="profile-item">
                  <p className="text-gray-500 text-sm">Driver contact no - {studentData.driverContactNo}</p>
                </div>
              </div>
            </div>
            
            {/* Dashboard Cards */}
            <div className="grid grid-cols-3 gap-6">
              {/* Daily Attendance Card */}
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-gray-700 font-medium mb-2">Daily Attendance Update</h3>
                <p className="text-sm text-gray-600 bg-green-100 rounded-full py-1 px-3 inline-block">
                  {studentData.dailyAttendanceStatus}
                </p>
              </div>
              
              {/* Last Payment Card */}
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-gray-700 font-medium mb-2">Last Payment Month</h3>
                <p className="text-sm text-gray-600">{studentData.lastPaymentMonth}</p>
              </div>
              
              {/* Notifications Card */}
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-gray-700 font-medium mb-2">Notifications</h3>
                <p className="text-sm text-gray-600">
                  {studentData.notificationCount > 0 
                    ? `${studentData.notificationCount} unread notifications` 
                    : 'No new notifications'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for additional styling */}
      <style jsx>{`
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 18px;
          color: #6D7A8C;
        }
        
        .profile-item {
          padding: 6px 0;
        }
      `}</style>
    </div>
  );
};

export default StudentProfile;
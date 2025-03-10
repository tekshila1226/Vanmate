import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import BackgroundImage from "../assets/bus-background.jpeg";
import LogoImage from "../assets/vanmate logo.png";

const EditProfile = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Student accounts for dropdown
  const [studentAccounts] = useState([
    { id: 1, name: "Tekshila" },
    { id: 2, name: "Arjun" },
    { id: 3, name: "Priya" }
  ]);

  // Active student
  const [activeStudent, setActiveStudent] = useState(studentAccounts[0]);

  const [studentData, setStudentData] = useState({
    studentName: 'Brian Clerk',
    parentName: 'John Doh',
    contactNo: '+94767035762',
    homeAddress: '',
    grade: '7',
    nearestTown: 'Kamburupitiya',
    school: 'Sujatha Vidyalaya Matara',
    pickupLocation: '',
    username: '',
    existingPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    assignedVan: '01'  // Sample assigned van
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    // Validate form data
    if (studentData.newPassword !== studentData.confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }

    // Simulate API call
    console.log("Saving profile changes:", studentData);
    alert('Profile updated successfully');
  };

  const handleRemoveVan = async () => {
    // Simulate API call
    console.log("Removing van for student:", studentId);
    setStudentData({
      ...studentData,
      assignedVan: null
    });
    alert('Van removed successfully');
  };

  const handleAddNewVan = () => {
    // Navigate to van display page
    navigate('/van-dashboard');
  };

  // Navigate to the selected student's profile
  const handleStudentClick = (student) => {
    setActiveStudent(student);
    navigate(`/profile/${student.id}`, { state: { student } });
    setProfileDropdownOpen(false);
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

      {/* Navbar with Tabs */}
      <nav className="relative z-10 flex items-center justify-between p-4 border-b bg-opacity-90" style={{ backgroundColor: '#F5E9C9' }}>
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => navigate("/")} className="flex items-center">
            <img src={LogoImage} alt="Vanmate Logo" className="w-10 h-10 mr-2" />
            <span className="text-xl font-semibold text-black">VANMATE</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8">
          <button 
            onClick={() => navigate("/van-dashboard")}
            className="px-4 py-2 rounded font-medium text-gray-600 hover:text-black"
          >
            Home
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center px-4 py-2 rounded font-medium text-black border-b-2 border-black"
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

          <button 
            onClick={() => navigate("/facilities")}
            className="px-4 py-2 rounded font-medium text-gray-600 hover:text-black"
          >
            Facilities
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto py-6 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Student Profile</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Student name</label>
                <input 
                  type="text" 
                  name="studentName" 
                  value={studentData.studentName} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Parent/Guardian name</label>
                <input 
                  type="text" 
                  name="parentName" 
                  value={studentData.parentName} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Parent/Guardian Contact no</label>
                <input 
                  type="text" 
                  name="contactNo" 
                  value={studentData.contactNo} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Home Address</label>
                <input 
                  type="text" 
                  name="homeAddress" 
                  value={studentData.homeAddress} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Grade</label>
                <select 
                  name="grade" 
                  value={studentData.grade} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none bg-white"
                >
                  <option value="">Select Grade</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Nearest town</label>
                <select 
                  name="nearestTown" 
                  value={studentData.nearestTown} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none bg-white"
                >
                  <option value="">Select Town</option>
                  <option value="Kamburupitiya">Kamburupitiya</option>
                  <option value="Matara">Matara</option>
                  <option value="Galle">Galle</option>
                  <option value="Colombo">Colombo</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">School</label>
                <input 
                  type="text" 
                  name="school" 
                  value={studentData.school} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Pickup Location</label>
                <div className="flex">
                  <input 
                    type="text" 
                    name="pickupLocation" 
                    value={studentData.pickupLocation} 
                    onChange={handleInputChange}
                    className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                  />
                  <button className="bg-white p-3 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Username</label>
                <input 
                  type="text" 
                  name="username" 
                  value={studentData.username} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Existing Password</label>
                <input 
                  type="password" 
                  name="existingPassword" 
                  value={studentData.existingPassword} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">New Password</label>
                <input 
                  type="password" 
                  name="newPassword" 
                  value={studentData.newPassword} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  name="confirmNewPassword" 
                  value={studentData.confirmNewPassword} 
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" 
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
              <button 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleRemoveVan}
                disabled={!studentData.assignedVan}
              >
                Remove Van
              </button>
              
              <button 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleAddNewVan}
              >
                Add new Van
              </button>
              
              <button 
                className="px-8 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handleSaveChanges}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for additional styling - will be included in the component */}
      <style jsx>{`
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 18px;
          color: #6D7A8C;
        }
        
        select {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 1em;
        }
      `}</style>
    </div>
  );
};

export default EditProfile;
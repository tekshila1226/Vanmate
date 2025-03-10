import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, AlertTriangle, Save } from 'lucide-react';
import BackgroundImage from "../assets/bus-background.jpeg";
import LogoImage from "../assets/vanmate logo.png";

const Attendance = () => {
  // Use the useNavigate hook correctly
  const navigate = useNavigate();
  
  const [attendanceData, setAttendanceData] = useState([
    { date: '01.11.2024', morning: '1', afternoon: '1', status: 'Submitted' },
    { date: '02.11.2024', morning: '1', afternoon: '1', status: 'Submitted' },
    { date: '03.11.2024', morning: '0', afternoon: '0', status: 'Not Submitted' },
    { date: '06.11.2024', morning: '0', afternoon: '0', status: 'Not Submitted' }
  ]);
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  
  // Add state for student ID
  const [currentStudentId, setCurrentStudentId] = useState(1); // Default to Brian's ID (1)

  // Handle attendance change
  const handleAttendanceChange = (index, period, value) => {
    const newData = [...attendanceData];
    newData[index][period] = value;
    
    // Update status based on morning and afternoon values
    if (newData[index].morning === '1' || newData[index].afternoon === '1') {
      newData[index].status = 'Submitted';
    } else {
      newData[index].status = 'Not Submitted';
    }
    
    setAttendanceData(newData);
  };
  
  // Save attendance and redirect to profile - fixed version
  const handleSaveAttendance = () => {
    setIsSaving(true);
    
    // Simulate API call with a callback to ensure redirect happens after "save"
    setTimeout(() => {
      console.log("Navigating to profile page...");
      setIsSaving(false);
      // Force redirect to profile page
      window.location.href = `/profile/${currentStudentId}`;
      
      // Alternative approach using navigate
      // navigate(`/profile/${currentStudentId}`, { replace: true });
    }, 800);
  };
  
  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };
  
  const addNewDate = (date) => {
    // Format date as DD.MM.YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    
    // Check if the date already exists
    const exists = attendanceData.some(item => item.date === formattedDate);
    
    if (!exists) {
      setAttendanceData([
        ...attendanceData, 
        { date: formattedDate, morning: '0', afternoon: '0', status: 'Not Submitted' }
      ]);
    }
    
    setShowCalendar(false);
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  const days = getDaysInMonth(currentMonth);
  
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
            <span className="text-xl font-semibold text-gray-600">VANMATE</span>
          </Link>
        </div>
        <div className="flex space-x-8">
          <Link to="/home" className="text-gray-600 hover:text-gray-800">Home</Link>
          <div className="relative">
            <Link to={`/profile/${currentStudentId}`} className="text-gray-600 hover:text-gray-800 font-medium">Profile</Link>
          </div>
          <Link to="/facilities" className="text-gray-600 hover:text-gray-800">Facilities</Link>
        </div>
      </nav>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className="w-48 bg-white bg-opacity-90 h-screen shadow-md">
          <nav className="mt-5 px-2">
            <Link to="/attendance" className="group flex items-center px-4 py-4 text-sm font-medium text-white rounded bg-purple-200 mb-1">
              <span className="text-gray-700">Attendance</span>
            </Link>
            <Link to="/van-tracking" className="group flex items-center px-4 py-4 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800">
              <span>Van Tracking</span>
            </Link>
            <Link to="/payment" className="group flex items-center px-4 py-4 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800">
              <span>Payment</span>
            </Link>
            {/* Fixed link with student ID parameter */}
            <Link 
              to={`/edit-profile/${currentStudentId}`}
              className="group flex items-center px-4 py-4 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800">
              <span>Edit Profile</span>
            </Link>
            <div className="mt-auto">
              <Link to="/logout" className="group flex items-center px-4 py-4 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800 absolute bottom-5">
                <span>Logout</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-center text-xl font-medium mb-6">Brian Clark's Attendance Sheet</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Morning</th>
                    <th className="px-4 py-3 text-left">Afternoon</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3 flex items-center">
                        {index === 3 && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        )}
                        <span>{item.date}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative inline-block">
                          <select 
                            value={item.morning}
                            onChange={(e) => handleAttendanceChange(index, 'morning', e.target.value)}
                            className="appearance-none border rounded py-1 px-3 pr-8 bg-white"
                          >
                            <option value="1">1</option>
                            <option value="0">0</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative inline-block">
                          <select 
                            value={item.afternoon}
                            onChange={(e) => handleAttendanceChange(index, 'afternoon', e.target.value)}
                            className="appearance-none border rounded py-1 px-3 pr-8 bg-white"
                          >
                            <option value="1">1</option>
                            <option value="0">0</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded text-sm ${
                          item.status === 'Submitted' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'bg-gray-50 text-gray-600'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center justify-center p-2 border rounded mr-4"
              >
                <Calendar className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Save button with improved redirect handling */}
              <button
                onClick={handleSaveAttendance}
                disabled={isSaving}
                className="flex items-center justify-center p-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {isSaving ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    <span>Save & Return to Profile</span>
                  </>
                )}
              </button>
              
              {/* Form submission for redirect alternative */}
              <form 
                method="GET"
                action={`/profile/${currentStudentId}`}
                style={{ display: 'none' }}
                id="profileRedirectForm"
              >
                <input type="hidden" name="saved" value="true" />
                <button type="submit">Redirect</button>
              </form>
              
              {showCalendar && (
                <div className="absolute z-10 mt-2 p-4 bg-white border rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={prevMonth} className="p-1">&lt;</button>
                    <div>{formatMonthYear(currentMonth)}</div>
                    <button onClick={nextMonth} className="p-1">&gt;</button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-xs font-medium p-1">{day}</div>
                    ))}
                    
                    {Array.from({ length: days[0].getDay() }, (_, i) => (
                      <div key={`empty-${i}`} className="p-2"></div>
                    ))}
                    
                    {days.map((day, i) => (
                      <button
                        key={i}
                        onClick={() => addNewDate(day)}
                        className="p-2 rounded hover:bg-gray-100 text-sm"
                      >
                        {day.getDate()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
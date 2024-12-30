import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiGrid,
  FiNavigation,
  FiMapPin,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
 import { AiOutlineCalendar } from "react-icons/ai";
import logImage from "../assets/Logo.png";
import Select from "react-select";


const StationForm = () => {
  const [isEditing, setIsEditing] = useState(true); // Editable state
  const [stationNo, setStationNo] = useState(""); // Station No
  const [location, setLocation] = useState(""); // Location

  const handleSave = () => {
    if (stationNo && location) {
      setIsEditing(false); // Hide fields after saving
      setMessage('Save successful!');
      setMessageType('success');
    } else {
      setMessage('Please select both Station No and Location before saving.');
      setMessageType('error');
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Show fields for editing
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Station No</label>
          {isEditing ? (

            
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={stationNo}
              onChange={(e) => setStationNo(e.target.value)}
            >
              <option value="">Select</option>
              <option value="00080">00080</option>
              <option value="00030">00030</option>
            </select>
          ) : (
            <p className="p-2 border rounded-md bg-gray-100">{stationNo}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Location</label>
          {isEditing ? (
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Kandy">Kandy</option>
              <option value="Colombo">Colombo</option>
            </select>
          ) : (
            <p className="p-2 border rounded-md bg-gray-100">{location}</p>
          )}
        </div>
      </div>

      

      <div className="flex justify-end mt-4">
        {isEditing ? (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleEdit}
          >
            Edit
          </button>
        )} 
      </div>
    </div>
  );
}


const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  
  const handleSignOut = () => {
    setIsModalOpen(true);
  };

  const confirmSignOut = () => {
    setIsModalOpen(false); // Close the modal
    localStorage.removeItem("authToken"); // Remove token
    navigate("/login"); // Navigate to login
    window.location.reload();
};


  const cancelSignOut = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const [trainName, setTrainName] = useState("");
  const [time, setTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  
  const [ticketAmounts, setTicketAmounts] = useState({
    class1: "",
    class2: "",
    class3: "",
  });
  
  const [bookingAmounts, setBookingAmounts] = useState({
    class1: "",
    class2: "",
    class3: "",
  });

  const clearFields = () => {
    setTrainName("");
    setTime("");
    setFrom("");
    setTo("");
    setDate("");
    setTicketAmounts({ class1: "", class2: "", class3: "" }); // Reset ticket amounts
    setBookingAmounts({ class1: "", class2: "", class3: "" }); // Reset booking amounts
  };
  

  const [selectedTrain, setSelectedTrain] = useState(null);

  const trainOptions = [
    { value: "Udarata Menike", label: "Udarata Menike" },
    { value: "Ruhunu Kumari", label: "Ruhunu Kumari" },
  ];

//Time
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Set the initial time on component mount
    updateTime();
  }, []);

  // Function to update the time to the current time
  const updateTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    setCurrentTime(formattedTime);
  };

//Date
const [date, setDate] = useState("");

  // Set the initial date to the current date when the component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  // Function to update the date to the current date
  const updateDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  };

  const [successMessage, setSuccessMessage] = useState("");

  const Fields = () => {
    setSuccessMessage("Submitted Successfully!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-500 text-white h-screen p-4 fixed flex flex-col">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center">
            <img src={logImage} alt="Logo" className="h-12 w-12" />
          </div>
          <p className="mt-4 text-lg font-semibold">GoByRail Admin</p>
        </div>

        {/* Navigation Menu */}
        <ul className="flex flex-col space-y-4 mt-5">
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <Link to="/AdminDashboard" className="flex items-center space-x-3">
              <MdDashboard size={20} />
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiUser size={20} />
            <p>User</p>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <AiOutlineCalendar size={20} />
            <p>Time Teble</p>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiNavigation size={20} />
            <p>Live Tracking</p>
          </li>
          <li className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiMapPin size={20} />
            <p>Stations</p>
          </li>
        </ul>

        {/* Footer */}
        <div className="mt-auto space-y-4">
          <p className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer">
            <FiSettings size={20} />
            <span>Settings</span>
          </p>
          <p
            className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer"
            onClick={handleSignOut}
          >
            <FiLogOut size={20} />
            <span>Sign out</span>
          </p>
        </div>
      </aside>

      {/* Modal for Sign Out Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Sign Out</h2>
            <p className="mb-4">Are you sure you want to sign out?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={cancelSignOut}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={confirmSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="ml-[40%] flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-[600px]">
          {/* Logo and Header */}
          <div className="flex items-center mb-4">
            <img src={logImage} alt="GoByRail" className="w-12 h-12 rounded-full" />
            <h1 className="text-2xl font-bold ml-4">Data Input Panel</h1>
          </div>

          {/* Station Form */}
          <StationForm />

          

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Train Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* React Select component */}
              <label className="block text-gray-700">Train Name</label>
              <Select
                options={trainOptions} // Provide an array of options in the format [{ value: '...', label: '...' }]
                value={trainOptions.find(option => option.value === trainName)} // Match the current trainName to an option
                onChange={(option) => setTrainName(option ? option.value : '')} // Handle clear action
                placeholder="Select"
                isClearable // Enables the clear button
                className="w-full"
              />
           </div>

            <div>
              <label className="block text-gray-700">Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={currentTime} // Bind to state
                onChange={(e) => setCurrentTime(e.target.value)} // Update state
              />
              <button onClick={updateTime} className="text-indigo-500 hover:underline mt-2 text-sm float-right">
                Reload
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">From</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={from} // Bind to state
                  onChange={(e) => setFrom(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Kandy">Kandy</option>
                <option value="Colonmbo">Colombo</option>
                
              </select>
            </div>
            <div>
              <label className="block text-gray-700">To</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={to} // Bind to state
              onChange={(e) => setTo(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Kandy">Kandy</option>
                <option value="Colombo">Colombo</option>
              </select>
            </div>
          </div>

          <div>
      <label className="block text-gray-700">Date</label>
      <input
        type="date"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={updateDate} className="text-indigo-500 hover:underline mt-2 text-sm float-right">
        Reload
      </button>
    </div>

          {/* Ticket and Booking */}
          <div>
          <table className="table-auto w-full text-center border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">Sets</th>
                <th className="border border-gray-300 px-2 py-1">Tickets Amount</th>
                <th className="border border-gray-300 px-2 py-1">Booking Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">1 Class</td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={ticketAmounts.class1} // Bind to state
                    onChange={(e) =>
                      setTicketAmounts({ ...ticketAmounts, class1: e.target.value })
                    } // Update state
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={bookingAmounts.class1} // Bind to state
                    onChange={(e) =>
                      setBookingAmounts({ ...bookingAmounts, class1: e.target.value })
                    } // Update state
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">2 Class</td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={ticketAmounts.class2} // Bind to state
                    onChange={(e) =>
                      setTicketAmounts({ ...ticketAmounts, class2: e.target.value })
                    } // Update state
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={bookingAmounts.class2} // Bind to state
                    onChange={(e) =>
                      setBookingAmounts({ ...bookingAmounts, class2: e.target.value })
                    } // Update state
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">3 Class</td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={ticketAmounts.class3} // Bind to state
                    onChange={(e) =>
                      setTicketAmounts({ ...ticketAmounts, class3: e.target.value })
                    } // Update state
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    className="w-full text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={bookingAmounts.class3} // Bind to state
                    onChange={(e) =>
                      setBookingAmounts({ ...bookingAmounts, class3: e.target.value })
                    } // Update state
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>


          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={clearFields}
            >
              Clear
            </button>

            <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        onClick={Fields}
      >
        Submit
      </button>

      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-8 py-4 rounded-md shadow-lg">
          {successMessage}
        </div>
      )}
          </div>  
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;

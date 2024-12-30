import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [filteredTrains, setFilteredTrains] = useState([]);

  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");


  const trains = [
    {
      name: "Udarata Menike",
      runsOn: "Everyday",
      from: { station: "Kandy", time: "1.00 PM" },
      to: { station: "Colombo", time: "3.40 PM" },
      date: "2024-12-19",
      duration: "5 hours",
    },
    {
      name: "1030",
      runsOn: "Everyday",
      from: { station: "Kandy", time: "06:15 AM" },
      to: { station: "Colombo", time: "08.51 AM" },
      date: "2024-12-19",
      duration: "3 hours",
    },
  ];

  // Automatically update date and time
  useEffect(() => {
    const now = new Date();
    setDate(now.toISOString().split("T")[0]);
    setTime(now.toTimeString().split(" ")[0].substring(0, 5)); // HH:mm
  }, []);

  const handleSearch = () => {
    const filtered = trains.filter((train) => train.date === date);
    if (filtered.length > 0) {
      setFilteredTrains(filtered);
    } else {
      alert("No trains available for the selected date.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?train')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl font-bold mb-2">Choose Your Adventure</h1>
          <p className="text-sm mb-6">Travel Smarter, Travel Better</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-7xl mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
        {/* Start Station Dropdown */}
        <select
          className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={startStation}
          onChange={(e) => setStartStation(e.target.value)}
        >
          <option value="">Start Station</option>
          <option value="Kandy">Kandy</option>
          <option value="Colombo">Colombo</option>
          <option value="Ambalangoda">Ambalangoda</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Avissawella">Avissawella</option>
          <option value="Badulla">Badulla</option>
          <option value="Batticaloa">Batticaloa</option>
          <option value="Beliatta">Beliatta</option>
          <option value="Ella">Ella</option>
          <option value="Galle">Galle</option>
          <option value="Hatton">Hatton</option>
          <option value="Jaffna">Jaffna</option>
          
        </select>

        {/* End Station Dropdown */}
        <select
          className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={endStation}
          onChange={(e) => setEndStation(e.target.value)}
        >
          <option value="">End Station</option>
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Ambalangoda">Ambalangoda</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Avissawella">Avissawella</option>
          <option value="Badulla">Badulla</option>
          <option value="Batticaloa">Batticaloa</option>
          <option value="Beliatta">Beliatta</option>
          <option value="Ella">Ella</option>
          <option value="Galle">Galle</option>
          <option value="Hatton">Hatton</option>
          <option value="Jaffna">Jaffna</option>
          
        </select>
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    />
    <input
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    />
    <button
      onClick={handleSearch}
      className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 w-full md:w-auto"
    >
      Search for trains
    </button>
  </div>
</div>


      {/* Available Trains Section */}
      <div className="p-6">
        <h2 className="text-center text-4xl font-bold mb-6">Available Trains</h2>
        <div className="space-y-5 max-w-7xl mx-auto">
          {filteredTrains.length > 0 ? (
            filteredTrains.map((train, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center p-4 border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-all"
                onClick={() => navigate("/tickets1")}
              >
                {/* Train Details */}
                <div className="flex-1 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {train.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Runs on: {train.runsOn}
                  </p>
                </div>

                {/* Journey Details */}
                <div className="flex-1 flex justify-between items-center">
                  <div className="text-center">
                    <p className="text-sm font-medium">{train.from.station}</p>
                    <p className="text-xs text-gray-500">{train.from.time}</p>
                  </div>
                  <div className="text-gray-500 text-center">
                    <p className="text-sm font-medium">{train.date}</p>
                    <p className="text-sm">{train.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{train.to.station}</p>
                    <p className="text-xs text-gray-500">{train.to.time}</p>
                  </div>
                </div>

                <div className="ml-4">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 text-indigo-500 hover:underline text-sm"
                  >
                    View Train Time Table
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No trains available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;

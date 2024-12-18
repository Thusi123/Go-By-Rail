import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "tailwindcss/tailwind.css";
import "leaflet/dist/leaflet.css";
import Header from "./Header";

const dummyTrainData = {
  trainName: "Ruhunu Kumari",
  speed: "80 km/h",
  eta: "09:45 AM",
  coordinates: { lat: 6.9271, lng: 79.8612 },
  route: [
    { lat: 6.9271, lng: 79.8612, station: "Station 1" },
    { lat: 6.9400, lng: 79.8640, station: "Station 2" },
    { lat: 6.9500, lng: 79.8700, station: "Station 3" },
  ],
  crowdLevels: { firstClass: 20, secondClass: 50, thirdClass: 80 },
};

const LiveTracking = () => {
  const navigate = useNavigate();
  const [trainData, setTrainData] = useState(dummyTrainData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrainData((prevData) => ({
        ...prevData,
        coordinates: {
          lat: prevData.coordinates.lat + 0.001,
          lng: prevData.coordinates.lng + 0.001,
        },
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      modalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const closeModal = () => setIsModalOpen(false);

  const getChartData = (crowdLevels) => ({
    labels: ["1st Class", "2nd Class", "3rd Class"],
    datasets: [
      {
        data: [
          crowdLevels.firstClass,
          crowdLevels.secondClass,
          crowdLevels.thirdClass,
        ],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
        hoverBackgroundColor: ["#388e3c", "#fbc02d", "#d32f2f"],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {showHeader && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-lg transition-all z-50">
          <Header />
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 pt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Live Train Tracking</h1>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            onClick={() => navigate("/Predictions")}
          >
            Back to Predictions
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Train Details</h2>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{trainData.trainName}</h3>
            <p className="text-gray-600">Speed: {trainData.speed}</p>
            <p className="text-gray-600">ETA: {trainData.eta}</p>
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
            onClick={openModal}
          >
            View Crowd Levels
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Train Route</h2>
        <div className="h-64 relative z-0">
          <MapContainer
            center={[trainData.coordinates.lat, trainData.coordinates.lng]}
            zoom={12}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[trainData.coordinates.lat, trainData.coordinates.lng]}>
              <Popup>{trainData.trainName}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Train Route (List View)</h2>
        <ul>
          {trainData.route.map((point, index) => (
            <li
              key={index}
              className="flex justify-between p-4 bg-gray-50 mb-2 rounded-lg shadow-sm"
            >
              <div className="font-bold">{point.station}</div>
              <div className="text-gray-600">
                {index === 0 ? "Current Location" : "Upcoming"}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative z-50">
            <h3 className="text-xl font-bold mb-4">
              Crowd Levels for {trainData.trainName}
            </h3>
            <Doughnut data={getChartData(trainData.crowdLevels)} />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTracking;

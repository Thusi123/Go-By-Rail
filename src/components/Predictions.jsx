import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Modal, Box, Card, CardContent, Button, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import "leaflet/dist/leaflet.css";
import "tailwindcss/tailwind.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Train details for crowd and location data
const trainData = [
  {
    train: "Udarata Menike",
    time: "09:00 AM",
    crowdLevels: { firstClass: 20, secondClass: 50, thirdClass: 80 },
    totalSeats: { firstClass: 44, secondClass: 198, thirdClass: 500 },
    coordinates: { lat: 6.9271, lng: 79.8612 },
  },
  {
    train: "Ruhunu Kumari",
    time: "09:30 AM",
    crowdLevels: { firstClass: 10, secondClass: 40, thirdClass: 60 },
    totalSeats: { firstClass: 44, secondClass: 198, thirdClass: 500 },
    coordinates: { lat: 6.9364, lng: 79.8449 },
  },
  {
    train: "Express C3",
    time: "10:00 AM",
    crowdLevels: { firstClass: 5, secondClass: 20, thirdClass: 30 },
    totalSeats: { firstClass: 44, secondClass: 198, thirdClass: 500 },
    coordinates: { lat: 6.9225, lng: 79.8671 },
  },
];

// Modal styling for better visual presentation
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,  // Increased width
  maxWidth: "90%",  // Reduced max-width to make it slightly smaller on large screens
  maxHeight: "90vh",  // Adjusted height for a more balanced appearance
  bgcolor: "background.paper",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",  // Softer, more elegant shadow
  p: 6,  // Increased padding for better spacing inside
  borderRadius: "15px",  // Slightly reduced border radius for a more modern look
  overflow: "auto",  // Ensures content is scrollable if too large
  zIndex: 1300,  // Ensures modal is always on top
};


// Reusable component for crowd levels using Doughnut chart
const DoughnutChart = ({ label, data, totalSeats, color }) => {
  const percentage = Math.round((data / totalSeats) * 100);
  const availableSeats = totalSeats - data;

  const chartData = {
    labels: ["Booked", "Available"],
    datasets: [
      {
        data: [data, availableSeats],
        backgroundColor: [color, "#f0f0f0"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    cutout: "75%",
  };

  return (
    <div style={{ margin: "20px", maxWidth: "100px" }}>
      <div style={{ position: "relative" }}>
        <Doughnut data={chartData} options={options} />
        <Typography
          variant="h6"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
          }}
        >
          {percentage}%
        </Typography>
      </div>
      <Typography variant="h6" textAlign="center" style={{ marginTop: "15px" }}>
        {label}
      </Typography>
      <ul style={{ textAlign: "left", padding: "0 20px", marginTop: "10px" }}>
        <li><b>Booked:</b> {data} seats</li>
        <li><b>Available:</b> {availableSeats} seats</li>
      </ul>
    </div>
  );
};

// Main component to display predictions
const Predictions = () => {
  const navigate = useNavigate();
  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleModalOpen = (train) => setSelectedTrain(train);
  const handleModalClose = () => setSelectedTrain(null);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <Box sx={{ maxWidth: 1000, margin: "auto", padding: 2 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Real-Time Train Predictions
        </Typography>

        {trainData.map((train, index) => (
          <Card
            key={index}
            sx={{ marginBottom: 2, boxShadow: 3, borderRadius: "10px" }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <div>
                  <Typography variant="h6">{train.train}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Departure: {train.time}
                  </Typography>
                </div>
                <Box display="flex" gap={2}>
                  <Button variant="contained" onClick={() => handleModalOpen(train)}>
                    View Crowd
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/live-tracking")}
                  >
                    Live Tracking
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Train Map
          </Typography>
          <div className="h-64">
            <MapContainer
              center={[6.9271, 79.8612]}
              zoom={10}
              className="h-full w-full rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {trainData.map((train, index) => (
                <Marker
                  key={index}
                  position={[train.coordinates.lat, train.coordinates.lng]}
                >
                  <Popup>{train.train}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Box>
      </Box>

      {selectedTrain && (
  <Modal open={Boolean(selectedTrain)} onClose={handleModalClose}>
    <Box sx={modalStyle}>
      <Typography variant="h6" gutterBottom>
        {selectedTrain.train} Crowd Levels
      </Typography>
      <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
        <DoughnutChart
          label="First Class"
          data={selectedTrain.crowdLevels.firstClass}
          totalSeats={selectedTrain.totalSeats.firstClass}
          color="green"
        />
        <DoughnutChart
          label="Second Class"
          data={selectedTrain.crowdLevels.secondClass}
          totalSeats={selectedTrain.totalSeats.secondClass}
          color="yellow"
        />
        <DoughnutChart
          label="Third Class"
          data={selectedTrain.crowdLevels.thirdClass}
          totalSeats={selectedTrain.totalSeats.thirdClass}
          color="red"
        />
      </Box>
      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handleModalClose}
      >
        Close
      </Button>
    </Box>
  </Modal>
)}

    </div>
  );
};

export default Predictions;

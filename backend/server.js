const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Train Schema
const trainSchema = new mongoose.Schema({
  trainName: String,
  time: String,
  from: String,
  to: String,
  date: String,
  ticketAmounts: {
    class1: Number,
    class2: Number,
    class3: Number,
  },
  bookingAmounts: {
    class1: Number,
    class2: Number,
    class3: Number,
  },
});

const Train = mongoose.model('Train', trainSchema);

// API Endpoints
app.post('/add-train', async (req, res) => {
  try {
    const newTrain = new Train(req.body);
    await newTrain.save();
    res.status(201).json({ message: 'Train data added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving train data', error });
  }
});

app.get('/trains', async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching train data', error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

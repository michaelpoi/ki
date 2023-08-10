const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Порт может быть указан через переменную среды, иначе используется порт 3000

// MongoDB Atlas connection string from .env file
const uri = process.env.MONGODB_URI;

// Middleware for parsing JSON data
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Create a schema for the data
const dataSchema = new mongoose.Schema({
  text1: String,
  text2: String,
  text3: String,
  text4: String,
  text5: String,
});

// Create a model for the data
const Data = mongoose.model('Data', dataSchema);

// Save data to MongoDB
app.post('/save', async (req, res) => {
  try {
    const data = req.body;
    const savedData = await Data.findOneAndUpdate({}, data, { upsert: true, new: true });
    res.status(200).json(savedData);
  } catch (error) {
    console.error('Error saving data:', error);
    res.sendStatus(500);
  }
});

// Get data from MongoDB
app.get('/getData', async (req, res) => {
  try {
    const data = await Data.findOne({});
    res.json(data);
  } catch (error) {
    console.error('Error getting data:', error);
    res.sendStatus(500);
  }
});

// Serve static files from the "public" folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/asset', express.static(path.join(__dirname, 'asset')));

// Serve admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

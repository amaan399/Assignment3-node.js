// app.js
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // HTTP request logger

// Routes for user-related requests
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export app for testing purposes

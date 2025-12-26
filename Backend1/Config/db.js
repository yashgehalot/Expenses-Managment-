// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error('Please check your MONGO_URI environment variable');
    process.exit(1);
  }
};

// --- IMPORTANT: Export it directly like this ---
module.exports = connectDB;
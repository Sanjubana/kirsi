const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kirsi';
    const conn = await mongoose.connect(uri);
    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`🔴 MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Continuing without MongoDB. Some routes may not work until the database is reachable.');
    return false;
  }
};

module.exports = connectDB;

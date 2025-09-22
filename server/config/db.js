// config/db.js
const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      // options depending on mongoose version; here defaults are fine
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

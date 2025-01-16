const mongoose = require("mongoose");


const MONGO_URI = "mongodb+srv://ushar3615:MPZY4DNipYSWjt0I@buisness.myaey.mongodb.net/?retryWrites=true&w=majority&appName=Buisness"

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    console.log(`MONGO_URI: ${MONGO_URI}`); // Log the URI for debugging
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;

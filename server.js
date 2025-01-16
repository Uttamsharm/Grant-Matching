const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const grantRoutes = require("./routes/grantRoutes");
const { errorHandler } = require("./utils/errorHandler");
const bodyParser = require('body-parser');
const cors = require("cors");

const PORT = 7000; // Port number for the server

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/grants", grantRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

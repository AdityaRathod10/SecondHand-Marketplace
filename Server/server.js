require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");


// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Allow CORS from the client URL
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Check if SECRET is defined
if (!process.env.SECRET) {
  console.error("JWT Secret is not defined in the environment variables");
  process.exit(1); // Exit if SECRET is not set
}

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("Loaded environment variables")
});

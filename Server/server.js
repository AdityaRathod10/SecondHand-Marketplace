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

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // Local development URL
  "https://second-handmarketplace.vercel.app", // Production URL
  "https://secondhandmarketplace.vercel.app" // Additional necessary URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
  console.log("Loaded environment variables");
});

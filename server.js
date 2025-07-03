const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const ConnectDb = require("./services/DBConnect");
const router = require("./routes/index");

// Create an Express application
const app = express();



// Middleware

app.use(express.json());
// Parse JSON bodies
app.use(morgan("dev"));
// Log requests to the console
app.use(cors());
// Enable CORS for all routes
dotenv.config();
// Load environment variables from .env file




// Database connection
ConnectDb();



// Routes
app.use('/api/v1',router);


// Serve a welcome message at the root URL
// This is the main entry point of the API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Restaurant App API</h1>");
});



// Start the server
app.listen(process.env.PORT || 8000, () => {
  console.log(
    `Server is running on port ${process.env.PORT || 3000}`.bgBrightWhite.cyan
      .bold
  );
});

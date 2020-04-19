// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Packages
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is started and listening on http://127.0.0.1:${port}`);
});

/* Routes */

// Get weather data
app.get("/data", (req, res) => res.status(200).send(projectData));

// Store weather data
app.post("/data", (req, res) => {
  const { date, temp, content, location, icon, description } = req.body;
  projectData = {
    date,
    temp,
    content,
    location,
    icon,
    description,
  };

  res.status(200).send(projectData);
});

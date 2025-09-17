/*
============================================================
 BIG PICTURE: What this file does
------------------------------------------------------------
This is the server (backend). It:
- Uses Express (a tool for building servers with Node.js).
- Listens for requests from the browser.
- Has a "/calculate" route that takes height + weight
  and returns the BMI (Body Mass Index).
============================================================
*/

import express from "express";
const app = express();

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static("public"));

// Allow Express to read data from HTML forms
app.use(express.urlencoded({ extended: true }));

// Allow Express to read JSON data
app.use(express.json());

// A route that handles POST requests to "/calculate"
app.post("/calculate", (req, res) => {
  // Get the form data and convert text values to numbers
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);

  // Formula for BMI: weight (kg) / height² (m²)
  const bmi = weight / (height * height);

  // Send back HTML that shows the BMI result
  res.send(`
        <p>Height of ${height}m and Weight of ${weight}kg gives a BMI of ${bmi.toFixed(
    2
  )}kg/m²</p>
    `);
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});

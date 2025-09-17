/*
============================================================
 BIG PICTURE: What this file does
------------------------------------------------------------
This is the server (backend). It:
- Uses Express to set up a simple web server.
- Keeps track of a "currentPrice" value (starting at 60).
- Provides a "/get-price" route that returns the current price.
- Each time someone asks for the price, it moves slightly
  up or down at random (simulating a changing Bitcoin price).
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

// A variable to store the current price (starts at 60)
let currentPrice = 60;

// Route that returns the price
app.get("/get-price", (req, res) => {
  // Change the price randomly by up to ±1
  currentPrice = currentPrice + Math.random() * 2 - 1;

  // Send the price back as plain text, formatted with 1 decimal place
  res.send(`$${currentPrice.toFixed(1)}`);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
// To run the server: npm start
// To run with auto-restart on changes: npm run dev
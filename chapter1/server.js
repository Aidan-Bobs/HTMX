/*
============================================================
 BIG PICTURE: What this file does
------------------------------------------------------------
This is our "server" code. A server is just a program that
listens for requests (like when you visit a page or click a button)
and sends back responses.

- We use "Express", a library that makes it easy to build servers.
- The server listens on port 3000 (so we can visit http://localhost:3000).
- It has a route "/users" that fetches some fake user data from an online
  test API and sends it back as HTML.
- HTMX (in index.html) will request this "/users" route and display the
  result on the page without reloading.

So: this file = the "backend" (brains that handle requests).
============================================================
*/

// Import the "express" library (a tool for building web servers in Node.js)
import express from "express";

// Create an "app" object which represents our web server
const app = express();

// Tell Express to serve static files (like HTML, CSS, JS) from the "public" folder
// This means if we put files in "public", the browser can load them directly
app.use(express.static("public"));

// This line helps Express read data that comes from HTML forms
// "extended: true" means it can handle complex objects (not just strings)
app.use(express.urlencoded({ extended: true }));

// This line helps Express read JSON data sent from the client
// (useful when working with APIs or JavaScript requests)
app.use(express.json());

// Define a route: when someone visits "/users" in their browser (or through HTMX)
// this function runs
app.get("/users", async (req, res) => {
  // Read a "limit" value from the request (how many users to fetch)
  // If none is provided, default to 10
  const limit = +req.query.limit || 10;

  // Fetch fake user data from an online test API
  // (jsonplaceholder is a free API for practice/testing)
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
  );

  // Convert the response into a JavaScript object (array of users)
  const users = await response.json();

  // Send back some HTML that lists the users
  // HTMX will take this HTML and insert it into the page
  res.send(`
        <h2>Users</h2>
        <ul class="list-group">
            ${users
              .map((user) => `<li class="list-group-item">${user.name}</li>`)
              .join("")}
        </ul>
    `);
});

// Start the server and tell it to listen on port 3000
// When the server is ready, print a message in the console
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});

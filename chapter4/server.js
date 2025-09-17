/*
============================================================
 BIG PICTURE: What this file does
------------------------------------------------------------
This is the server (backend). It:
- Uses Express to run a web server.
- Listens for POST requests to "/search".
- Fetches a list of fake users from a free API.
- Filters those users based on the search term (name or email).
- Sends back table rows (<tr> elements) with the results.
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

// Route for searching users
app.post("/search", async (req, res) => {
  // Read the search term from the form input
  const searchTerm = req.body.search.toLowerCase();

  // If nothing was typed, return an empty table row
  if (!searchTerm) {
    return res.send("<tr></tr>");
  }

  // Fetch a list of users from the placeholder API
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await response.json();

  // Filter users: keep only ones whose name OR email includes the search term
  const searchResults = users.filter((user) => {
    const name = user.name.toLowerCase();
    const email = user.email.toLowerCase();
    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  // Turn each matching user into a table row (<tr>...</tr>)
  // .map creates the HTML for each row
  // .join("") smashes them all into one string
  const searchResultHTML = searchResults
    .map(
      (user) =>
        `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>`
    )
    .join("");

  // Send the rows back to the browser
  res.send(searchResultHTML);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});

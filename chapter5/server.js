/*
============================================================
 BIG PICTURE: What this file does
------------------------------------------------------------
This is the server (backend). It:
- Uses Express to set up a web server.
- Handles POST requests to "/email".
- Validates whether the submitted email matches a pattern.
- Sends back HTML that contains:
  * the same input field (with the typed value kept)
  * a Bootstrap alert saying either "Valid email" or "Invalid email".
============================================================
*/

import express from "express";
const app = express();

// Serve static files from "public"
app.use(express.static("public"));

// Allow Express to read form data
app.use(express.urlencoded({ extended: true }));

// Allow Express to read JSON data
app.use(express.json());

// Route for validating the email field
app.post("/email", (req, res) => {
  // Get the email the user typed
  const submittedEmail = req.body.email;

  // Regex pattern to check if email looks valid
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // If email matches the regex, it's valid
  if (emailRegex.test(submittedEmail)) {
    return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <!-- Success message -->
                <div class="alert alert-success" role="alert">
                    Valid email, thank you!
                </div>
          </div>    
        `);
  } else {
    // Otherwise, it's invalid
    return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <!-- Error message -->
                <div class="alert alert-danger" role="alert">
                    Invalid email, please enter a valid email address!
                </div>
          </div>     
        `);
  }
});

// Start server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});

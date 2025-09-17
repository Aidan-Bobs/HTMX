/*
============================================================
 BIG PICTURE: What this file does
------------------------------------------------------------
This is the server (backend). It:
- Serves the profile card and handles edit requests.
- "/user/:id/edit" → returns an HTML form for editing the profile.
- "/user/:id" (PUT request) → updates the profile with new data
  and returns the updated card.
- HTMX handles swapping the card <-> form dynamically.
============================================================
*/

import express from "express";
const app = express();

// Serve static files (HTML, CSS, JS) from "public"
app.use(express.static("public"));

// Allow Express to read form data
app.use(express.urlencoded({ extended: true }));

// Allow Express to read JSON data
app.use(express.json());

// Route to return the edit form for a given user
app.get("/user/:id/edit", (req, res) => {
  res.send(`
        <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name"
                name="name" value="Jada Mathele">
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea type="text" class="form-control" id="bio"
                name="bio">
Daughter of Ahayah | Software Developer | Coding Trainer | Nail Technician
                </textarea>
            </div>
            <!-- Save button sends data back via PUT -->
            <button type="submit" class="btn btn-primary">
                Save Changes
            </button>
            <!-- Cancel just reloads the original index page -->
            <button type="submit" hx-get="/index.html"
            class="btn btn-secondary">
                Cancel
            </button>
        </form>
    `);
});

// Route to update user info (PUT request)
app.put("/user/:id", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;

  // Send back the updated profile card HTML
  res.send(`
    <div class="card" style="width: 18rem;"
        hx-target="this"
        hx-swap="outerHTML"
        >
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
                ${bio}
            </p>
            <button href="#" class="btn btn-primary"
            hx-get="/user/1/edit">
                Click To Edit
            </button>
        </div>
    </div>
    `);
});

// Start server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});

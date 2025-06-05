const express = require("express");
const app = express();
const PORT = 3000;

// Serve static files from "public" folder
app.use(express.static("public"));

// JSON middleware for POST requests
app.use(express.json());
app.get("/hello", (req, res) => {
  res.send("Hello from nodejs");
});
// POST route example
app.post("/data", (req, res) => {
  const receivedData = req.body;
  res.send({ message: "Data received!", data: receivedData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

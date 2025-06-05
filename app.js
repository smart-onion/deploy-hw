const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const app = express();
const PORT = 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString:
    "postgresql://deploy_hw_db_user:ewStApP3HTaJPjeTA0sKZC2R6hsRK7kO@dpg-d10v23q4d50c73b717u0-a/deploy_hw_db",
  ssl: {
    rejectUnauthorized: false, // required for some hosted services
  },
});

// Middleware
app.use(express.json());
app.use(express.static("public"));

// GET: fetch data
app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM deploy"); // change table name accordingly
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

// POST: insert data
app.post("/api/data", async (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  try {
    await pool.query("INSERT INTO deploy (id, name) VALUES ($1, $2)", [
      id,
      name,
    ]);
    res.json({ message: "Data inserted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

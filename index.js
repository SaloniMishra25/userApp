import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import express from "express";
import methodOverride from "method-override";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// MySQL 
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "learn_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Home Route
app.get("/", async (req, res) => {
  const q = "SELECT COUNT(*) AS total FROM user";
  try {
    const [rows] = await pool.query(q);
    const count = rows[0]?.total ?? 0;
    res.render("home", { count });
  } catch (err) {
    console.error(err);
    res.send("DB Error");
  }
});

// Show all users
app.get("/users", async (req, res) => {
  const q = "SELECT * FROM user";
  try {
    const [users] = await pool.query(q);
    res.render("users", { users });
  } catch (err) {
    console.error(err);
    res.send("DB Error");
  }
});

// Edit user form
app.get("/users/:id/edit", async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM user WHERE id = ?";
  try {
    const [rows] = await pool.query(q, [id]);
    const user = rows[0];
    res.render("edit", { user });
  } catch (err) {
    console.error(err);
    res.send("DB Error");
  }
});

// Update user route
app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { password: formPass, username: newUsername } = req.body;
  const q = "SELECT * FROM user WHERE id = ?";
  try {
    const [rows] = await pool.query(q, [id]);
    const user = rows[0];
    if (!user) return res.send("User not found");
    if (formPass !== user.password) return res.send("Wrong password");
    const q2 = "UPDATE user SET username = ? WHERE id = ?";
    await pool.query(q2, [newUsername, id]);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.send("DB Error");
  }
});

// get random data (faker)
const getRandomUser = () => ({
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

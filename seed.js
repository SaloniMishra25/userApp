// seed.js
require("dotenv").config();
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false },
});

// Generate a fake user as array
const getRandomUser = () => [
  faker.string.uuid(),
  faker.internet.username(),
  faker.internet.email(),
  faker.internet.password(),
];

let data = [];
for (let i = 1; i < 100; i++) {
  data.push(getRandomUser());
}

const q = "INSERT INTO user (id, username, email, password) VALUES ?";

pool.query(q, [data], (err, result) => {
  if (err) throw err;
  console.log(result);
});




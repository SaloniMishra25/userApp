# userapp

A simple User Management Application built using **Node.js, Express, MySQL, and EJS**.

Faker.js is used to generate random user data which can be inserted into a MySQL database.
The project provides **CRUD operations** and a small **REST API** to view, edit, and update users.

---

## 🚀 Features

* Generate fake users using `@faker-js/faker`.
* Insert and manage users in a MySQL database.
* Full CRUD (Create, Read, Update, Delete) operations.
* REST API endpoints + EJS-based web views.
* UUID used to uniquely identify users.

---

## 📦 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure MySQL Connection

The default connection inside `index.js` looks like this:

```js
{
  host: 'localhost',
  user: 'root',
  database: 'learn_app',
  password: 'your_mysql_password'
}
```

Update these values or switch to environment variables.

### 3. Start the app

```bash
# dev mode (auto-reload)
npm run dev

# production / normal mode
npm start
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 🧪 Seeder / Faker Usage

This project includes logic to generate random users using Faker.

To quickly test a random user:

```js
console.log(getRandomUser());
```

To insert fake users into MySQL, ensure your DB connection is active, then run the seeding script (if present) or call the seeding function from the app.

---

## 📘 Notes

* Project uses **ESM modules** (`type: "module"` in `package.json`).
* You may configure environment variables using `dotenv` (optional).

---

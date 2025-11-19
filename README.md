# userapp

A simple User Management Application built using Node.js, Express, MySQL, and EJS.

Faker.js is used to generate random user data which can be inserted into a MySQL database.
The project provides CRUD operations and a small REST API to view, edit, and update users.

## Features

- Generate fake users with `@faker-js/faker`.
- Insert and manage users in a MySQL database.
- Basic CRUD (Create, Read, Update, Delete) operations via web views (EJS) and REST endpoints.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Ensure MySQL server is running and accessible. The project currently uses the following default connection in `index.js`:

```js
{
  host: 'localhost',
  user: 'root',
  database: 'learn_app',
  password: 'your_mysql_password'
}
```

Update these settings in `index.js` or switch to environment variables as needed.

3. Start the app:

```bash
# development with auto-reload (requires nodemon)
npm run dev

# or start normally
npm start
```

4. Visit the app in your browser (example port depends on `index.js` / Express setup, commonly `http://localhost:3000`).

## Seeder / Faker usage

The repository includes code to generate random users using Faker. To quickly test fake data without a running DB, you can temporarily comment out the DB connection in `index.js` and run:

```js
console.log(getRandomUser());
```

To persist fake users to the database, ensure the DB connection is configured and active, then run the seeding script (if present) or call the seeding function from the app.

## Notes

- `package.json` includes `type: "module"` so ESM `import`/`export` syntax is used.
- If you want environment-based credentials, add `dotenv` and load `.env` in `index.js`.

## Next steps I can help with

- Add a `.env` example and update `index.js` to read DB credentials from environment variables.
- Add a `seed.js` script to bulk-insert fake users into MySQL.
- Fix `index.js` to use `mysql2/promise` for async/await style connections (recommended).

Tell me which you'd like me to implement next and I'll make the changes.

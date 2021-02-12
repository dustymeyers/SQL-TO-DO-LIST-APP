const express = require('express');
const pool = require('./modules/pool');
const app = express();

const PORT = 5000;

app.use(express.static('server/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("I'm listening", PORT);
});

// GET /tasks
// return all tasks from tasks table
app.get('/tasks', function (req, res) {
  console.log('GET /tasks');
  // Query the database
  pool
    // Select all rows from "tasks" table
    .query('SELECT * FROM "tasks";')
    // Get back DB Results
    .then((dbRes) => {
      console.log(dbRes.rows);
      // send back each full row
      res.send(dbRes.rows);
    })
    // Or handle DB Error
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

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
    .query(`SELECT * FROM "tasks" ORDER BY "task_id" ASC;`)
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

// POST /tasks
// add a task
app.post('/tasks', function (req, res) {
  /**
   * Query to DB should look like:
   *
   * INSERT INTO "tasks"
   *    ("task")
   * VALUES
   *    ('This is a task I must finish.')
   */
  console.log(req.body);

  // Declare a variable to hold our SQL query string
  let queryTxt = `
    INSERT INTO "tasks"
      ("task")
    VALUES
      ($1);
  `;

  // Declare a variable to hold the string we want to send to DB
  let queryArg = req.body.task;

  // Query the DB to add task
  pool
    // use queryTxt and queryArg as message
    .query(queryTxt, [queryArg])
    // Get back DB Results
    // Should just be an OK
    .then(() => {
      // Send an OK
      res.sendStatus(201);
    })
    // Or hand DB Error
    .catch((err) => {
      console.log(err);
      // send internal error
      res.sendStatus(500);
    });
});

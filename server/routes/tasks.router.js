const express = require('express');

const router = express.Router();

const pool = require('../modules/pool');

// GET /tasks
// return all tasks from tasks table
router.get('/', function (req, res) {
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
router.post('/', function (req, res) {
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

// PUT /tasks/complete/:id
// Mark a task as complete
router.put('/complete/:id', function (req, res) {
  // target the id value of :id
  let taskId = req.params.id;

  console.log(`Targeting task with ID: ${taskId}`);
  // set a variable to hold the SQL string that will update the task
  let queryTxt = `
    UPDATE "tasks" 
    SET "complete" = true 
    WHERE "task_id" = $1;
  `;

  pool
    // query the DB using the SQL string and pg will send it at this id
    .query(queryTxt, [taskId])
    // if DB successful takes data sends back OK
    .then((resDb) => {
      res.sendStatus(200);
    })
    // if something went wrong, sends back error
    .catch((err) => {
      console.log(err);

      res.sendStatus(500);
    });
});

// DELETE /tasks/:id
// Delete a task (row) from DB
router.delete('/:id', function (req, res) {
  // target the id value of :id
  let taskId = req.params.id;

  console.log(`Delete request for id: ${taskId}`);

  let queryTxt = `
    DELETE FROM "tasks"
    WHERE "task_id" = $1;
  `;

  pool
    // query DB with SQL String and set $1 to taskId
    .query(queryTxt, [taskId])
    .then((resDb) => {
      console.log(`Task deleted with id: ${taskId}`);
      // get an OK back
      res.sendStatus(200);
    })
    // or resolve error
    .catch((err) => {
      console.log(`Error making database query ${queryTxt}`, err);

      res.sendStatus(500);
    });
});

module.exports = router;

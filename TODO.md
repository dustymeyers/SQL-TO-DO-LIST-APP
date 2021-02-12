# TODO

## FRONT END

- [ ] Form to input todo list tasks
  - [ ] Delete Button
    - [ ] Removes it from DOM
  - [ ] Mark as complete
    - [ ] on completion, change the the visual of the task
      - Could be background color change, checkbox, DECIDE ON ONe
- [ ] Render to DOM on task creation

### Required Styling

- [ ] Background color
- [ ] Font family
- [ ] Font size
- [ ] text color & or background color of tasks to show whether or not they have been completed

## BACK END

- [ ] Store user created tasks in DB
  - [x] weekend-to-do-app
- [ ] task completion should be stored on DB
- [ ] Delete removes from DB

We will attempt to hold this data with two tables, one to keep a list of our projects and a second that keeps a list of tasks for said project.

BASE MODE

| tasks table         |
| ------------------- |
| id                  |
| task (VARCHAR(256)) |
| complete (BOOLEAN)  |

STRETCH

| projects table                      |
| ----------------------------------- |
| id                                  |
| project name (VARCHAR(16))          |
| project description (VARCHAR(1024)) |

| tasks table          |
| -------------------- |
| id                   |
| project id (integer) |
| task (VARCHAR(256))  |
| complete (BOOLEAN)   |

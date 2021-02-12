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
  - [ ] weekend-to-do-app
- [ ] task completion should be stored on DB
- [ ] Delete removes from DB

Maybe create two tables, one to keep a list of our projects and a second that keeps a list of tasks for said project

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

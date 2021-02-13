$(document).ready(readyOn);

function readyOn() {
  console.log("I'm so ready!");
  // Render on load
  getTasks();
  // Event Listener for task submission
  $(document).on('click', '#submit-task', submitTask);
}

// get tasks from DB and render them to the DOM
// TODO - REFACTOR
function getTasks() {
  // clear out table data
  $('#task-table-body').empty();
  // Send GET request to /tasks
  $.ajax({
    type: 'GET',
    url: '/tasks',
  })
    // When we get our request back render to DOM
    .then(function (toDoList) {
      console.log('These are the tasks from DB', toDoList);
      // Loop through data received
      for (let task of toDoList) {
        let completeButton;

        // check if tasks are complete
        // if false give option to complete
        // if true show completed
        if (!task.complete) {
          completeButton = `<button class="completion-submit">Complete</button>`;
        } else {
          completeButton = 'Completed';
        }

        // append the dom
        $('#task-table-body').append(`
          <tr>
            <td class="complete-status" data-id${task.task_id}>${completeButton}</td>
            <td class="task-out">${task.task}</td>
            <td>
              <button class="delete-button" data-id=${task.task_id}>Delete</button>
            </td>
          </tr>
        `);

        // Check if task is complete or not
        /* if (tasks[i].complete === true) {
          $('#task-table-body').append(`
        <tr>
          <td class="complete-true">Task is Complete!</td>
          <td class="task-out">${tasks[i].task}</td>
          
          <td>
            <button class="delete-button">Delete</button>
          </td>
        </tr>
      `);
        } else {
          $('#task-table-body').append(`
          <tr>
            <td class="complete-false">
              <button class="completion-submit" data-complete="true">
                Complete
              </button>
            </td>
            <td class="task-out">${tasks[i].task}</td>
            <td>
              <button class="delete-button">Delete</button>
            </td>
          </tr>
        
        `); */
      }
    })
    .catch((err) => {
      console.log('Error :', err);
      alert('Something went wrong.');
    });
}

// Submit task
function submitTask() {
  console.log('in submitTask');
  // Bundle up the task to be added to DB
  let taskObject = {
    task: $('#task-in').val(),
  };
  // Have AJAX make a POST request
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskObject,
  })
    .then(function (response) {
      $('#task-in').val('');
      getTasks();
    })
    .catch((err) => {
      console.log('error: ', err);
      alert('Something went wrong.');
    });
}

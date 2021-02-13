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
    .then(function (tasks) {
      console.log('These are the tasks from DB', tasks);
      // Loop through data received
      for (let i = 0; i < tasks.length; i++) {
        // Check if task is complete or not
        if (tasks[i].complete === true) {
          $('#task-table-body').append(`
        <tr>
          <td class="task-out"><p>${tasks[i].task}</p></td>
          <td class="complete-false">
            <p>
              Complete!
              <button class="completion-submit" data-complete="false">
                Not Completed
              </button>
            </p>
          </td>
          <td>
            <button class="delete-button">Delete</button>
          </td>
        </tr>
      `);
        } else {
          $('#task-table-body').append(`
          <tr>
            <td class="task-out"><p>${tasks[i].task}</p></td>
            <td class="complete-true">
              <p>
                Not Complete...
                <button class="completion-submit" data-complete="true">
                  Completed
                </button>
              </p>
            </td>
            <td>
              <button class="delete-button">Delete</button>
            </td>
          </tr>
        
        `);
        }
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

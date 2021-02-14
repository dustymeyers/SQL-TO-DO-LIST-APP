$(document).ready(readyOn);

function readyOn() {
  console.log("I'm so ready!");

  // Render on load
  getTasks();

  // Event Listener for task submission button
  $('form').submit('#submit-task', submitTask);

  // Event Listener for task completion button
  $('#task-table-body').on('click', '.completion-submit', completeTask);

  // Event listener for delete task button
  $('#task-table-body').on('click', '.delete-button', deleteTask);
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
        let completeButton, trClass;

        // check if tasks are complete
        // if false give option to complete
        // if true show completed
        if (!task.complete) {
          completeButton = `
            <button class="completion-submit btn btn-outline-success" data-id="${task.task_id}">
              Complete
            </button>
          `;

          trClass = 'class="table-primary"';
        } else {
          completeButton = `<img src="./images/checkmark.png" alt="Green check mark" height="30" />`;

          trClass = 'class="table-success"';
        }

        // append the dom
        $('#task-table-body').append(`
          <tr ${trClass}>
            <td class="complete-status">${completeButton}</td>
            <td class="task-out">${task.task}</td>
            <td class="delete-cell">
              <button class="delete-button btn btn-outline-danger" data-id="${task.task_id}">Delete</button>
            </td>
          </tr>
        `);
      }
    })
    .catch((err) => {
      console.log('Error :', err);
      alert('Something went wrong.');
    });
}

// Submit task
function submitTask(event) {
  // prevent default load on form submission
  event.preventDefault();

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
    .then((response) => {
      $('#task-in').val('');

      getTasks();
    })
    .catch((err) => {
      console.log('error: ', err);

      alert('Something went wrong.');
    });
}

// update task as complete
function completeTask() {
  // set a value for taskId
  let taskId = $(this).data('id');

  console.log('Completed task with id: ', taskId);

  $.ajax({
    method: 'PUT',
    url: `/tasks/complete/${taskId}`,
  })
    .then((response) => {
      // render updated data
      getTasks();
    })
    .catch((err) => {
      console.log('Completion Error: ', err);

      alert('Something went wrong..', err);
    });
}

// delete task
function deleteTask() {
  // set a value for taskId
  let taskId = $(this).data('id');

  swal({
    title: "This can't be undone!",
    text: "Are you sure you're ready to delete this?",
    icon: 'warning',
    dangerMode: true,
    buttons: true,
  }).then((willDelete) => {
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${taskId}`,
    })
      .then((response) => {
        // render updated data
        getTasks();
      })
      .catch((err) => {
        console.log('Deletion error: ', err);

        alert('Something went wrong..', err);
      });

    if (willDelete) {
      swal('Deleted!', 'Your to do task has been deleted!', 'success');
    }
  });

  console.log('Deleted task with id:', taskId);
}

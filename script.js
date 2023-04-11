// DOM elements
const form = document.getElementById('todo-form');
const input = document.querySelector('input[name="task-name"]');
const remainingBtn = document.getElementById('show-remaining-tasks-btn');
const completedBtn = document.getElementById('show-completed-tasks-btn');
const totalBtn = document.getElementById('show-total-tasks-btn');
const deleteBtn = document.getElementById('delete-all-tasks-btn');
const selectBtn = document.getElementById('select-all-tasks-btn');
const uncheckBtn = document.getElementById('uncheck-all-tasks-btn');
const todosList = document.querySelector('.todos');
const checkbox = document.querySelector('.todos');


// Initialize tasks array from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Function to update task count
function updateTaskCount() {
  const remainingCount = tasks.filter(function(task) {
    return !task.completed;
  }).length;
  const completedCount = tasks.filter(function(task) {
    return task.completed;
  }).length;
  remainingBtn.querySelector('#remaining-tasks').textContent = remainingCount;
  completedBtn.querySelector('#completed-tasks').textContent = completedCount;
  totalBtn.querySelector('#total-tasks').textContent = tasks.length;
}

// Function to add task to the list
function addTask(event) {
  event.preventDefault();
  if (input.value) {
    const task = {
      id: Date.now(),
      name: input.value,
      completed: false
    };
    tasks.push(task);
    saveTasks();
    displayTasks();
    updateTaskCount(); // update count after adding task
    input.value = '';
  }
}



checkbox.addEventListener('change', function() {
  task.completed = this.checked;
  label.classList.toggle('completed');
  saveTasks();
  displayTaskCounters(); // update count immediately
});



// Function to display all tasks
function displayTasks() {

  todosList.innerHTML = '';

  tasks.forEach(function(task) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}>
      <label for="${task.id}" class="task-name ${task.completed ? 'completed' : ''}" contenteditable>${task.name}</label>
      <i class="fas fa-trash-alt"></i>
    `;

    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    const label = taskItem.querySelector('label.task-name');
    const deleteBtn = taskItem.querySelector('.fa-trash-alt');

    checkbox.addEventListener('change', function() {
      task.completed = this.checked;
      label.classList.toggle('completed');
      saveTasks();
      displayTaskCounters();
      updateTaskCount(); // update count after checking/unchecking task

      if (task.completed) {
        todosList.appendChild(taskItem); // move completed tasks to the end
      } else {
        todosList.prepend(taskItem); // move incomplete tasks to the top
      }
    });

    label.addEventListener('input', function() {
      task.name = this.innerText;

      saveTasks();
    });

    deleteBtn.addEventListener('click', function() {
      tasks = tasks.filter(function(item) {
        return item.id !== task.id;
      });

      saveTasks();
      displayTasks();
      updateTaskCount(); // update count after deleting task
    });

    if (task.completed) {
      todosList.appendChild(taskItem); // append completed tasks to the end
    } else {
      todosList.prepend(taskItem); // prepend incomplete tasks to the top
    }
  });

  displayTaskCounters();
  updateTaskCount(); // update count after displaying tasks
}



// Function to display task counters
function displayTaskCounters() {

  const remainingCount = tasks.filter(function(task) {
    return !task.completed;
  }).length;

  const completedCount = tasks.filter(function(task) {
    return task.completed;
  }).length;

  remainingBtn.querySelector('#remaining-tasks').textContent = remainingCount;
  completedBtn.querySelector('#completed-tasks').textContent = completedCount;
  totalBtn.querySelector('#total-tasks').textContent = tasks.length;
}



// Function to show remaining tasks
function showRemainingTasks() {
    const remainingTasks = tasks.filter(function(task) {
        return !task.completed;
    });

    todosList.innerHTML = '';

    remainingTasks.forEach(function(task) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML =` <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}> <label for="${task.id}" class="${task.completed ? 'completed' : ''}" contenteditable>${task.name}</label> <i class="fas fa-trash-alt"></i> `;
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        const label = taskItem.querySelector('label');
        const deleteBtn = taskItem.querySelector('.fa-trash-alt');

        checkbox.addEventListener('change', function() {
            task.completed = this.checked;
            label.classList.toggle('completed');
            saveTasks();
            displayTaskCounters();
        });

        label.addEventListener('input', function() {
            task.name = this.innerText;
            saveTasks();
        });


        deleteBtn.addEventListener('click', function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayRemainingTasks();
        });

        todosList.appendChild(taskItem);

    });

    displayTaskCounters();
}



// Function to show completed tasks
function showCompletedTasks() {

    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    });

    todosList.innerHTML = '';

    completedTasks.forEach(function(task) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML =` <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}> <label for="${task.id}" class="${task.completed ? 'completed' : ''}" contenteditable>${task.name}</label> <i class="fas fa-trash-alt"></i> `;
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        const label = taskItem.querySelector('label');
        const deleteBtn = taskItem.querySelector('.fa-trash-alt');

        checkbox.addEventListener('change', function() {
            task.completed = this.checked;
            label.classList.toggle('completed');
            saveTasks();
            displayTaskCounters();
        });

        label.addEventListener('input', function() {
            task.name = this.innerText;
            saveTasks();
        });

        deleteBtn.addEventListener('click', function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayCompletedTasks();
        });

            todosList.appendChild(taskItem);
        });

            displayTaskCounters();
        }

        // Function to show all tasks
        function showAllTasks() {
            displayTasks();
        }

        // Function to delete all tasks
        function deleteAllTasks() {
            tasks = tasks.filter(function(task) {
                return !task.completed;
            });
            saveTasks();
            displayTasks();
        }


        // Function to select all tasks
        function selectAllTasks() {
        tasks.forEach(function(task) {
            task.completed = true;
        });

    saveTasks();
    displayTasks();
}


// Function to uncheck all tasks
function uncheckAllTasks() {
    tasks.forEach(function(task) {
        task.completed = false;
    });

    saveTasks();
    displayTasks();
}


// Event listeners
form.addEventListener('submit', addTask);
remainingBtn.addEventListener('click', showRemainingTasks);
completedBtn.addEventListener('click', showCompletedTasks);
totalBtn.addEventListener('click', showAllTasks);
deleteBtn.addEventListener('click', deleteAllTasks);
selectBtn.addEventListener('click', selectAllTasks);
uncheckBtn.addEventListener('click', uncheckAllTasks);


// Initial display
displayTasks();
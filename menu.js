// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask(taskText) {
  tasks.push({ text: taskText, completed: false });
  saveTasks();
  displayTasks();
}


function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

// Function to filter tasks
function filterTasks(status) {
  if (status === 'all') {
    return tasks;
  } else if (status === 'active') {
    return tasks.filter(task => !task.completed);
  } else if (status === 'completed') {
    return tasks.filter(task => task.completed);
  }
}

// Function to display tasks
function displayTasks() {
  const taskList = document.getElementById('task-list');
  const filter = document.getElementById('filter').value;
  const filteredTasks = filterTasks(filter);
  taskList.innerHTML = '';
  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add('completed');
    }
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-button';
    toggleButton.textContent = 'Toggle';
    toggleButton.addEventListener('click', () => toggleTask(index));
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    taskActions.appendChild(toggleButton);
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);
    li.appendChild(taskText);
    li.appendChild(taskActions);
    taskList.appendChild(li);
  });
}

// Function to edit a task
function editTask(index) {
  const newTaskText = prompt('Edit the task:', tasks[index].text);
  if (newTaskText !== null) {
    tasks[index].text = newTaskText;
    saveTasks();
    displayTasks();
  }
}

// Event listener for form submission
document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = document.getElementById('task').value.trim();
  if (taskText !== '') {
    addTask(taskText);
    document.getElementById('task').value = '';
  }
});

// Event listener for filter selection
document.getElementById('filter').addEventListener('change', () => {
  displayTasks();
});

// Initial display of tasks
displayTasks();

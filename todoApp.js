const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load tasks from file
let tasks = [];
try {
  const data = fs.readFileSync('tasks.json');
  tasks = JSON.parse(data);
} catch (error) {
  console.log('Error loading tasks:', error.message);
}

function saveTasks() {
  const data = JSON.stringify(tasks);
  fs.writeFileSync('tasks.json', data);
}

function displayTasks() {
  console.log('=== Todo List ===');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
  console.log('================');
}

function addTask() {
  rl.question('Enter task description: ', (description) => {
    tasks.push(description);
    saveTasks();
    console.log('Task added successfully.');
    displayTasks();
    promptUser();
  });
}

function deleteTask() {
  displayTasks();
  rl.question('Enter the task number to delete: ', (taskNumber) => {
    const index = taskNumber - 1;
    if (index >= 0 && index < tasks.length) {
      const deletedTask = tasks.splice(index, 1);
      saveTasks();
      console.log(`Deleted task: ${deletedTask}`);
      displayTasks();
    } else {
      console.log('Invalid task number.');
    }
    promptUser();
  });
}

function updateTask() {
  displayTasks();
  rl.question('Enter the task number to update: ', (taskNumber) => {
    const index = taskNumber - 1;
    if (index >= 0 && index < tasks.length) {
      rl.question('Enter the new task description: ', (newDescription) => {
        tasks[index] = newDescription;
        saveTasks();
        console.log('Task updated successfully.');
        displayTasks();
      });
    } else {
      console.log('Invalid task number.');
    }
    promptUser();
  });
}

function promptUser() {
  console.log('\nchoose the work?');
  console.log('1. Add task');
  console.log('2. Delete task');
  console.log('3. Update task');
  console.log('4. Exit');

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        deleteTask();
        break;
      case '3':
        updateTask();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        promptUser();
        break;
    }
  });
}

console.log('Welcome to the Todo List App!');
displayTasks();
promptUser();
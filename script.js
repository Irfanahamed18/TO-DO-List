let tasks = [];

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addBtn = document.getElementById("addBtn");
const taskContainer = document.getElementById("taskContainer");
const filterSelect = document.getElementById("filter");

// Load from localStorage
window.onload = function () {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskContainer.innerHTML = "";
  const filter = filterSelect.value;

  tasks
    .filter(task => filter === "all" || task.status === filter)
    .forEach((task, index) => {
      const card = document.createElement("div");
      card.className = "task-card";

      card.innerHTML = `
        <div class="task-info">
          <h3>${task.text}</h3>
          <small>Due: ${task.date || "No date"}</small><br>
          <span class="task-status status-${task.status}">${task.status}</span>
        </div>
        <div class="task-actions">
          <button class="edit" onclick="editTask(${index})">Edit</button>
          <button class="done" onclick="changeStatus(${index}, 'completed')">Complete</button>
          <button class="cancel" onclick="changeStatus(${index}, 'cancelled')">Cancel</button>
          <button class="delete" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;

      taskContainer.appendChild(card);
    });

  saveTasks();
}

addBtn.onclick = function () {
  const text = taskInput.value.trim();
  const date = taskDate.value;

  if (text) {
    tasks.push({ text, date, status: "pending" });
    taskInput.value = "";
    taskDate.value = "";
    renderTasks();
  }
};

filterSelect.onchange = renderTasks;

function changeStatus(index, newStatus) {
  tasks[index].status = newStatus;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

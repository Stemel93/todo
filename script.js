// Al caricamento dell'app prende tutti i task dal Local Storage
window.onload = loadTasks;

// Al submit aggiunge un task
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
  document.querySelector('.task').disabled = true;
});

function loadTasks() {
  // Controlla se il local storage ha qualche task
  // Se non ne ha fermiamo con un return
  if (localStorage.getItem("tasks") == null) return;

  // Prende i task dal localstorage e li trasfgorma in un array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Foreach su i task e li aggiunge alla lista
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
      <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)"><i class="fa-regular fa-pen-to-square" onclick="enableEdit(this)"></i>
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    document.querySelector('.task').disabled = true;
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // se i task sono vuoti return
  if (task.value === "") {
    alert("Per favore aggiungi un incarico");
    return;
  }
  // controlla se l'incarico esiste gia'
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("L'incarico gia' esiste");
    return;
  }

  // aggiunge l'incarico al local storage
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  // crea le listel
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
  <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)"><i class="fa-regular fa-pen-to-square" onclick="enableEdit(this)"></i>
  <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  // pulisce l'input
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
      

    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
  if (event.nextElementSibling.classList.contains("completed")) {
  event.parentNode.children[1].style.color = "gray"
  } else {event.parentNode.children[1].style.color = "white"}
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // elimina il task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

// funzione per abilitare l'edit di un incarico
function enableEdit(event) {
    event.parentNode.children[1].disabled = false;
    event.parentNode.children[1].style.color = "yellow"
}

// mette in store l'incarico corrente per verificare cambiamenti
var currentTask = null;

// prende l'incarico corrente sul focus dell'input
function getCurrentTask(event) {
  currentTask = event.value;
  
}

// modifica l'incarico corrente e lo cambia nel localstorage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // controlla se nel modificare l'incarico corrente si lascia un valore vuoto
  if (event.value === "") {
    alert("L'incarico e' vuoto");
    event.value = currentTask;
    document.querySelector('.task').disabled = true;
    event.parentNode.children[1].style.color = "white"
    return;
  }
  // Da errore se l'incarico corrente modificato esiste gia'
  tasks.forEach(task => {
    if (task.task === event.value) {

      alert("L'incarico gia' esiste");
      event.value = currentTask;
      document.querySelector('.task').disabled = true;
      event.parentNode.children[1].style.color = "white"
      return;
    }
  });
  // aggiorna l'incarico
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
      document.querySelector('.task').disabled = true;
      event.parentNode.children[1].style.color = "white"
    }
  });
  // aggiorna il localstorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// login page

const username = document.querySelector('input[placeholder="Username"]');
const password = document.querySelector('input[placeholder="Password"]');

document.querySelector("#login").addEventListener("click", e => {
  e.preventDefault();
  if (password.value !== '' || username.value !== '') {
    window.location.href = "todo.html"
    

  } else {
    alert("Inserisci dei dati")
  }
  
});
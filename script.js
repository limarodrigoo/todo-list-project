const ORDENEDLIST = document.getElementById('lista-tarefas');

function createTask() {
  const taskBtn = document.getElementById('criar-tarefa');
  taskBtn.addEventListener('click', () => {
    ('texto-tarefa');

    const inputElement = document.getElementById('texto-tarefa');
    const newLi = document.createElement('li');

    newLi.innerHTML = inputElement.value;
    ORDENEDLIST.appendChild(newLi);
    inputElement.value = '';
  });
}

function selectTask() {
  ORDENEDLIST.addEventListener('click', (evento) => {
    const taskItem = evento.target;
    const selectedItem = document.querySelector('.selected');
    if (selectedItem === null) {
      taskItem.classList.add('selected');
    } else if (taskItem.classList.contains('selected')) {
      taskItem.classList.remove('selected');
    } else {
      selectedItem.classList.remove('selected');
      taskItem.classList.add('selected');
    }
  });
}

function completeTask() {
  ORDENEDLIST.addEventListener('dblclick', (evento) => {
    const item = evento.target;
    if (item.classList.contains('completed')) {
      item.classList.remove('completed');
    } else {
      item.classList.add('completed');
    }
  });
}

function clearAll() {
  const clearBtn = document.getElementById('apaga-tudo');

  clearBtn.addEventListener('click', () => {
    const allTasks = document.querySelectorAll('li');
    for (let i = 0; i < allTasks.length; i += 1) {
      allTasks[i].remove();
    }
    localStorage.clear();
  });
}

function clearCompleted() {
  const completedBtn = document.getElementById('remover-finalizados');

  completedBtn.addEventListener('click', () => {
    const allCompleted = document.querySelectorAll('.completed');
    for (let index = 0; index < allCompleted.length; index += 1) {
      allCompleted[index].remove();
    }
  });
}

function saveTasks() {
  const saveBtn = document.getElementById('salvar-tarefas');

  saveBtn.addEventListener('click', () => {
    const taskToStorage = [];
    const classToStorage = [];
    const allTasks = document.querySelectorAll('li');

    for (let i = 0; i < allTasks.length; i += 1) {
      taskToStorage.push(allTasks[i].innerHTML);
      classToStorage.push(allTasks[i].className);
    }
    localStorage.setItem('tasks', JSON.stringify(taskToStorage));
    localStorage.setItem('class', JSON.stringify(classToStorage));
  });
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  const storedClass = JSON.parse(localStorage.getItem('class'));
  if (storedTasks !== null) {
    for (let i = 0; i < storedTasks.length; i += 1) {
      const newLi = document.createElement('li');
      newLi.innerHTML = storedTasks[i];
      newLi.className = storedClass[i];
      ORDENEDLIST.appendChild(newLi);
    }
  }
}

createTask();
selectTask();
completeTask();
clearAll();
clearCompleted();
saveTasks();
loadTasks();

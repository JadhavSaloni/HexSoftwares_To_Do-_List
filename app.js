const newTask = document.getElementById("newTask");
const addtask = document.getElementById("addtask");
const taskname = document.getElementById("taskname");

let editTodo = null;
//  for adding task
const addTodo = () => {
  const inputText = newTask.value.trim();
  if (inputText.length <= 0) {
    alert("Invalid Input");
    return false;
  }

  if (editTodo) {
    const taskText = editTodo.querySelector(".task-text");
    taskText.innerHTML = inputText;
    editlocalTodo(taskText);
    addtask.innerHTML = '<i class="fa-solid fa-plus"></i>';
    newTask.value = "";
    editTodo = null;
    return;
  }

  const li = document.createElement("li");
  li.classList.add("task");

  const p = document.createElement("p");
  p.classList.add("task-text");

  p.innerHTML = inputText;
  li.appendChild(p);

  taskname.appendChild(li);

  //   edit button
  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editBtn.classList.add("edit");
  li.appendChild(editBtn);

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.classList.add("edit");
  li.appendChild(deleteBtn);

  newTask.value = "";

  localTodo(inputText);
};

// onclick on trash box task will be deleted and if we click on edit it will come inn input and then delete
const updateTodo = (e) => {
  if (e.target.classList.contains("fa-trash")) {
    const taskItem = e.target.closest("li");
    taskname.removeChild(taskItem);
    deletelocalTodo(taskItem);
  }

  if (e.target.classList.contains("fa-pen")) {
    editTodo = e.target.closest("li");
    const taskText = editTodo.querySelector(".task-text");
    newTask.value = taskText.innerHTML;
    newTask.focus();
    addtask.innerHTML = '<i class="fa-solid fa-pen"></i>';
  }
};

// saving todo task in localstorage
const localTodo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo.trim());
  localStorage.setItem("todos", JSON.stringify(todos));
};

// getting localstorage on screen 
const getlocalTodo = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  localStorage.setItem("todos", JSON.stringify(todos));
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("task");

    const p = document.createElement("p");
    p.classList.add("task-text");

    p.innerHTML = todo;
    li.appendChild(p);

    taskname.appendChild(li);

    //   edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.classList.add("edit");
    li.appendChild(editBtn);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add("edit");
    li.appendChild(deleteBtn);

    newTask.value = "";
  });
};

// for deleting todo from localstorage
const deletelocalTodo = (todo) =>{
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    localStorage.setItem("todos", JSON.stringify(todos));
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    if(todoIndex !== -1){
    todos.splice(todoIndex,1);
    }
    localStorage.setItem("todos",JSON.stringify(todos));
}

//for storing edited task in localstorage
const editlocalTodo = (todo) =>{
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let oldTask = todo.textContent.trim(); 
    console.log("Old Task:", oldTask);
    console.log("Todos Array:", todos);
    let todoIndex = todos.indexOf(oldTask);
    if(todoIndex !== -1){
        todos[todoIndex] = newTask.value.trim();
    }
    localStorage.setItem("todos", JSON.stringify(todos));   
    
    console.log("New Value:", newTask.value.trim());
    
  }
  

document.addEventListener('DOMContentLoaded',getlocalTodo);
addtask.addEventListener("click", addTodo);
taskname.addEventListener("click", updateTodo);

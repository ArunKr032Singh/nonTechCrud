// variables 
const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".controls .clear-btn"),
taskBox = document.querySelector(".task-box");

let editId;
let isEditableTask = false;
// getting localstorage todo-list 
let todos = JSON.parse(localStorage.getItem("todo-list"));
// console.log(todos);
// console.log(!todos);
// localStorage.clear();


// step-1 
taskInput.addEventListener("keyup", e =>{
    let userTask = taskInput.value.trim();

    if(e.key == "Enter" && userTask){

        if(!isEditableTask){
            // if todo isn't exist pass an empty array 
            if(!todos){
            todos = [];   
        }
        let taskInfo = {name:userTask, status:"pending"};
        todos.push(taskInfo);
        }else{
        isEditableTask = false;
        todos[editId].name = userTask;
    } 
    taskInput.value = "";
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showToDoList("all"); 
}
    // console.log(userTask);
})

// step-2 
function showToDoList(filter)
{
    let liTag = "";
    if(todos)
    {
        todos.forEach((todo, id) =>{
            let isCompleted = todo.status == "completed" ? "checked" : "";

            if(filter == todo.status || filter == "all"){

                // template literals 
                liTag += `
                    <li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                            <ul class="task-menu">
                                <li onclick='editTask(${id}, "${todo.name}")'><i class="fa-solid fa-pen"></i>Edit</li>

                                <li onclick='deleteTask(${id},"${filter}")'><i class="fa-solid fa-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>
                `;

            } 
            // console.log(todo,id);
        });
    }
    taskBox.innerHTML = liTag || `<span>You Don't Have Any Task Hhere</span>`;
}
showToDoList("all");
// step-3
function updateStatus(selectedTask)
{
    // console.log(selectedTask);
    let taskName = selectedTask.parentElement.lastElementChild;
    // console.log(taskName);
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}
// step-4 
function showMenu(selectedTask){
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");

    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != selectedTask){
            menuDiv.classList.remove("show");
        }
    })
}
// step-5 
function deleteTask(deleteId, filter)
{
    // console.log(deletedId);
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showToDoList(filter);
}
// step-6 
function editTask(taskId, taskName){
    // console.log(taskId,taskName);
    editId = taskId;
    isEditableTask = true;
    taskInput.value = taskName;
}
// step-7 
filters.forEach(btn =>{
    btn.addEventListener("click", () =>{
        // console.log(btn);
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDoList(btn.id);
    })
})
// step-8 
clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    console.log(todos);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showToDoList("all");
});
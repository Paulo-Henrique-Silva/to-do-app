const inputTask = document.querySelector("#ipt-task");
const btnAdd = document.querySelector("#btn-add");
const ulTodo = document.querySelector("#ul-todo");

//fires button event when user press enter in input task field
inputTask.addEventListener("keypress", event => {
    if (event.key == "Enter")
        btnAdd.click();
});

//add new task
btnAdd.addEventListener("click", () => {
    const newTask = document.createElement("li");
    
    newTask.textContent = inputTask.value;
    ulTodo.append(newTask);

    inputTask.value = "";
    inputTask.focus();
});
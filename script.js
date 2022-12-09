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
    if (inputTask.value != "")
    {
        const newTask = document.createElement("li");

        const taskSpan = document.createElement("span");
        const h3Task = document.createElement("h3");
        const btnTask = document.createElement("input");
        const inputCheckSpan = document.createElement("input");

        inputCheckSpan.type = "checkbox";
        taskSpan.append(inputCheckSpan);
        h3Task.textContent = inputTask.value;
        btnTask.type = "submit";
        btnTask.value = "del";
        
        //if a task is marked as completed
        inputCheckSpan.addEventListener("change", () => {
            if (inputCheckSpan.checked)
            {
                h3Task.className = "finished-task";
                ulTodo.append(newTask);
            }
            else
            {
                h3Task.className = "";
                ulTodo.prepend(newTask);
            }

        });

        btnTask.addEventListener("click", () => {
            newTask.innerHTML = "";
        });

        newTask.append(taskSpan);
        newTask.append(h3Task);
        newTask.append(btnTask);

        ulTodo.prepend(newTask);

        inputTask.value = "";
        inputTask.focus();
    }
});
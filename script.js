const inputTask = document.querySelector("#ipt-task");
const btnAddTask = document.querySelector("#btn-add");
const ulTodo = document.querySelector("#ul-todo");

//get and creates tasks from cookies
let tasks = getCookieValue("tasks");
let completedTasks = getCookieValue("completedTasks");

//check cookies
if (tasks == "")
{
    completedTasks = "";
    createCookie("tasks", tasks);
    createCookie("completedTasks", completedTasks);
}
else
{
    let taskArray = tasks.split("@");
    
    for (let task of taskArray)
    {
        if (task != "")
        {
            inputTask.value = task;
            createTask();
            inputTask.value = "";
            inputTask.focus();
        }
    }
}

console.log(document.cookie);

//fires button event when user press enter in input task field
inputTask.addEventListener("keyup", event => {
    //removes @ to avoid conflicts
    inputTask.value = inputTask.value.replaceAll("@", "");

    if (event.key == "Enter")
        btnAddTask.click();
});

//add new task
btnAddTask.addEventListener("click", () => {
    //trims user input.
    inputTask.value = String(inputTask.value).trim();

    if (inputTask.value == "")
    {
        window.alert("It's not possible to insert an empty task!");
    }
    else if (tasks.split("@").some(taskText => taskText == inputTask.value)) //if there is a duplicated task
    {
        window.alert("It's not possible to insert a duplicated task!");
    }
    else
        createTask();

    inputTask.value = "";
    inputTask.focus();
});

function createTask()
{
    const newTask = document.createElement("li");

    const taskSpan = document.createElement("span");
    const h3Task = document.createElement("h3");
    const btnRemoveTask = document.createElement("input");
    const inputCheckSpan = document.createElement("input");

    //if it is a new task
    if (!tasks.split("@").some(taskText => taskText == inputTask.value))
    {
        tasks = tasks != "" ? tasks + inputTask.value + "@" : inputTask.value + "@";
        completedTasks = completedTasks != "" ? completedTasks + "false@" : "false@";

        createCookie("tasks", tasks);
        createCookie("completedTasks", completedTasks);
    }
    else
    {
        //sees if the task is marked as completed
        let tasksArray = tasks.split("@");
        let completedTasksArray = completedTasks.split("@");
        
        for (let i = 0; i < tasksArray.length; i++)
        {
            if (tasksArray[i] == inputTask.value)
            {
                inputCheckSpan.checked = completedTasksArray[i] == "true";
                break;
            }
        }
    }
    
    inputCheckSpan.type = "checkbox";

    //changes task marker.
    inputCheckSpan.addEventListener("change",  () => {
        let tasksArray = tasks.split("@");
        let completedTasksArray = completedTasks.split("@");
        
        for (let i = 0; i < tasksArray.length; i++)
        {
            if (tasksArray[i] == inputCheckSpan.parentElement.parentElement.firstChild.nextSibling.textContent)
            {
                //changes in array
                completedTasksArray[i] = completedTasksArray[i] == "true" ? "false" : "true";

                //updates completed task
                completedTasks = completedTasksArray.reduce((total, element) => {
                    total += "@";

                    return total + element;
                });
                break;
            }
        }

        //updates cookies
        createCookie("completedTasks", completedTasks);

        markTask();
    });

    taskSpan.append(inputCheckSpan);
    
    h3Task.textContent = inputTask.value;

    btnRemoveTask.type = "submit";
    btnRemoveTask.value = "";

    //removes a certain task from list.
    btnRemoveTask.addEventListener("click", () => {
        let tasksArray = tasks.split("@");
        let completedTasksArray = completedTasks.split("@");
        
        //if the user wants to delete the only task remaning
        if (completedTasksArray.length <= 2)
            completedTasks = "";
        else
        {
            for (let i = 0; i < tasksArray.length; i++)
            {
                if (tasksArray[i] == newTask.firstChild.nextSibling.textContent)
                {
                    completedTasksArray[i] = "";

                    //updates completed task
                    completedTasksArray = completedTasksArray.filter(taskCompletedText => taskCompletedText != "");
                    
                    completedTasks = completedTasksArray.reduce((total, element) => {
                        total += "@";

                        return total + element;
                    });

                    completedTasks += "@"
                    break;
                }
            }
        }

        createCookie("completedTasks", completedTasks);

        //removes task from cookies
        tasks = tasks.replace(newTask.firstChild.nextSibling.textContent + "@", "");
        createCookie("tasks", tasks)
        
        //If the innertHtml is deleted, therefore all the content disappers.
        newTask.innerHTML = "";
        newTask.style.display = "none";
    });

    //appends elements of task
    newTask.append(taskSpan);
    newTask.append(h3Task);
    newTask.append(btnRemoveTask);

    markTask();

    function markTask()
    {
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
    }
}

//creates a cookie with no expire date
function createCookie(name, value)
{
    document.cookie = `${name}=${value}; path=/`;
}

function getCookieValue(name)
{
    const cookiesDecoded = decodeURIComponent(document.cookie);
    const cookies = cookiesDecoded.split("; "); //creates an array of cookies.
    let value = "";

    cookies.forEach
    (
        cookie =>
        {
            if (cookie.indexOf(name) == 0) //if the name of the cookie is in the beginning
            {
                value = cookie.substring(name.length + 1); //creates a substring of value (name=value)
            }
        }
    )

    return value;
}
const inputTask = document.querySelector("#ipt-task");
const btnAdd = document.querySelector("#btn-add");
const ulTodo = document.querySelector("#ul-todo");

let tasks;

if (getCookieValue("tasks") == null)
{
    tasks = "";
    createCookie("tasks", "");
}
else
    tasks = getCookieValue("tasks").split("@");

console.log(document.cookie);

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
        btnTask.value = "";
        
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

        //remove a certain task from list. If the innertHtml is deleted, therefore all the contente disappers.
        btnTask.addEventListener("click", () => {
            newTask.innerHTML = "";
            newTask.style.display = "none";
        });

        //appends elements of task
        newTask.append(taskSpan);
        newTask.append(h3Task);
        newTask.append(btnTask);

        ulTodo.prepend(newTask);

        inputTask.value = "";
        inputTask.focus();
    }
});

//creates a cookie with no expire date
function createCookie(name, value)
{
    document.cookie = `${name}=${value}; path=/`;
}

function deleteCookie(name)
{
    //overwrite a cookie with a past expired date; Therefore, it gets deleted.
    createCookie(name, null, null);
}

function getCookieValue(name)
{
    const cookiesDecoded = decodeURIComponent(document.cookie);
    const cookies = cookiesDecoded.split("; "); //creates an array of cookies.
    let value = null;

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
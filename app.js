//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

//Load all Event Listners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
    //Add a task
    form.addEventListener('submit', addTask);

    //load from local storage
    document.addEventListener('DOMContentLoaded', getItems)

    //remove task event
    taskList.addEventListener('click', removeTask);

    //Clear tasks
    clearBtn.addEventListener('click', clearTasks);

    //Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
}

//Get Items from Local Storage
function getItems(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create a list item
    const li = document.createElement('li');
    li.className = 'collection-item';
    
    //Creating the text node and appending to the li
    li.appendChild(document.createTextNode(task));

    //Create new link element
    const link = document.createElement('a');

    //Add Class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Clear input
    taskInput.value = '';
    })
}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task!');
    } else {
        //Create a list item
    const li = document.createElement('li');
    li.className = 'collection-item';
    
    //Creating the text node and appending to the li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element
    const link = document.createElement('a');

    //Add Class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';
    }
    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure ?")){
            e.target.parentElement.parentElement.remove();

            removeItemFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//removing an item from local storage
function removeItemFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setitem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    //querySelectorAll returns a node list - no need for passing to an array
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


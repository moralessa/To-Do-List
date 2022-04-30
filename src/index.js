import "./styles.scss"
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap'
import {pinExpanded, expandNav, unPinExpanded, hoverPopUp, destroyPopUp} from './modules/nav.js';
import {populateTaskInput, depopulateTaskInput, createButtonToggle} from './modules/add.js';
import {Task, createNewTask} from './modules/task.js';


//Array of tasks
let tasksArr = [];
//Array of projects
let projectsArr = [];
//taskCount for id purposes
let taskCount = 0;

//Nav dom functionality
const navButton2 = document.getElementById('bars-T')
const navButton = document.getElementById('bars');
const pin = document.getElementById('lock');
const unpin = document.getElementById('unlock');
navButton.addEventListener('click', expandNav);
navButton2.addEventListener('click', expandNav);
pin.addEventListener('click', pinExpanded);
unpin.addEventListener('click', unPinExpanded);

//Nav link pop up dom functionality
const inbox = document.getElementById('inbox');
const calendar = document.getElementById('week');
const add = document.getElementById('add');
inbox.addEventListener('mouseenter', function(){hoverPopUp(inbox)});
inbox.addEventListener('mouseleave', destroyPopUp);
calendar.addEventListener('mouseenter', function(){hoverPopUp(calendar)});
calendar.addEventListener('mouseleave', destroyPopUp);
add.addEventListener('mouseenter', function(){hoverPopUp(add)});
add.addEventListener('mouseleave', destroyPopUp);

//Task card dom functionality
const navLinkAddTask = document.getElementById('add');
navLinkAddTask.addEventListener('click', populateTaskInput);
const addTask = document.getElementById('add-task');
addTask.addEventListener('click', populateTaskInput);
const secondoverLay = document.getElementById('secondoverLay');
secondoverLay.addEventListener('click', depopulateTaskInput);
const taskCancel = document.getElementById('task-cancel');
taskCancel.addEventListener('click', depopulateTaskInput);
const taskCreate = document.getElementById('task-create');
taskCreate.addEventListener('click', taskAddition);


//Task Create button toggle functionality 
const taskDescInput = document.getElementById('task-desc');
taskDescInput.addEventListener('keypress', createButtonToggle)


//Add task  
function taskAddition(){
    if (!taskCreate.classList.contains('active')){
        return;
    }
        
    taskCount++;
    
    createNewTask(taskCount, 'hello', 56, tasksArr);
    console.log(tasksArr);
}
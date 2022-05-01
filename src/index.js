import "./styles.scss"
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap'
import {pinExpanded, expandNav, unPinExpanded, hoverPopUp, destroyPopUp, populateNavProjects} from './modules/nav.js';
import {populateTaskInput, depopulateTaskInput, createButtonToggle} from './modules/add.js';
import {createNewTask, removeTask} from './modules/task.js';
import {createNewProject, removeTaskFromProject} from './modules/project.js'
import {populateMain} from './modules/mainpopulation.js'

(function(){ // function to set min date of input to the current date
    const date = new Date();
    const dateInput = document.getElementById('task-due-date');
    const v = date.toLocaleDateString('en-CA');
    dateInput.value = v;
})();
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


//Task Addition functionality
function taskAddition(){
    if (!taskCreate.classList.contains('active')){
        return;
    }
    
    //Increment task count for ID of task
    taskCount++;
    //Obtain task description, date, and project
    const description = taskDescInput.value;   
    const date = new Date(document.getElementById('task-due-date').value);
    const dateFormatted = date.toLocaleDateString('en-US');
    const projectName = document.getElementById('project-name').value;

    //Call Respective functions to create task and add an aditional project if necessary
    let newTask = createNewTask(taskCount, description, dateFormatted, tasksArr);
    projectAddition(projectName, newTask);
    setTimeout(() =>{
        taskDescInput.value = '';
        document.getElementById('project-name').value = '';
    }, 1000)

    //depopulate task card
    depopulateTaskInput();

    console.log(tasksArr);
    console.log(projectsArr);
}

//Project additon functionality
function projectAddition(name, task){
    if(name == ''){
        name = 'Inbox';   
    }
    //Check if project exists if so add task to project and return
    let ndx;
    projectsArr.forEach((project, index) =>{
        if(project.name ==  name){
            ndx = index;
            return ;
        }
    })
    
    if(ndx == undefined){
        let newProject = createNewProject(name, projectsArr);
        newProject.tasks.push(task);
        populateNavProjects(projectsArr);
        checkIfMainIsPopulized(newProject);
    }else{
        projectsArr[ndx].tasks.push(task);
        populateNavProjects(projectsArr);
        checkIfMainIsPopulized(projectsArr[ndx])
    }

    
}


//Check if Main content is populized with project that we are adding project onto
//If so populate main so the user can see the newly added task
function checkIfMainIsPopulized(target){
    let temp = document.querySelector('.title');
    if(temp == null || temp.textContent !== target.name){
        return;
    }
    else if(temp.textContent === target.name){
        populateMain(target);
    }
}

//functionality to remove task 
function callRemoveTask(task, project){
    tasksArr = removeTask(task, tasksArr);
    console.log(tasksArr);
    removeTaskFromProject(task, project, projectsArr);
    console.log(projectsArr);
}


export {callRemoveTask};
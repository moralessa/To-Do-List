import "./styles.scss"
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap'
import Icon from './images/icons8-check-circle-100.png'
import {pinExpanded, expandNav, unPinExpanded, hoverPopUp, destroyPopUp, populateNavProjects, removeNavProject} from './modules/nav.js';
import {populateTaskInput, depopulateTaskInput, createButtonToggle} from './modules/add.js';
import {createNewTask, removeTask} from './modules/task.js';
import {createNewProject, removeProject, removeTaskFromProject} from './modules/project.js'
import {populateMain} from './modules/mainpopulation.js'


//Array of tasks
let tasksArr = [];
//Array of projects
let projectsArr = [];
//taskCount for id purposes
let taskCount = 2;



(function(){ // IIFE to set min date of input to the current date and fill inbox with dummy data and add event 
    //listener for inbox nav list items
    const date = new Date();
    const dateInput = document.getElementById('task-due-date');
    const dateFormattedCA = date.toLocaleDateString('en-CA');
    dateInput.value = dateFormattedCA;
    dateInput.min = dateFormattedCA;
    const dateFormattedUs = date.toLocaleDateString('en-US')
    const tasksItems = ['Take out the trash', 'Feed the fishes', 'Use Suru'];
    let newProject = createNewProject('Inbox', projectsArr);
    for(let i = 0; i < tasksItems.length; i++){
        let newTask = createNewTask(i, tasksItems[i], dateFormattedUs, tasksArr);
        newProject.tasks.push(newTask);
    }
    populateMain(newProject);
    const inboxNavSelection = document.getElementById('project-Inbox');
    const inboxIconSelection = document.getElementById('inbox');
    inboxIconSelection.addEventListener('click', () =>{
        populateMain(newProject);
    })
    inboxNavSelection.addEventListener('click', () => {
        populateMain(newProject);
    })
})();

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
const add = document.getElementById('add');
inbox.addEventListener('mouseenter', function(){hoverPopUp(inbox)});
inbox.addEventListener('mouseleave', destroyPopUp);
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


//Inbox icon and nav selection event listener

//Task Create button toggle functionality 
const taskDescInput = document.getElementById('task-desc');
taskDescInput.addEventListener('keyup', createButtonToggle);


//Time Zone fix
function toDate(isoDateString){
    return new Date(`${isoDateString}T12:00:00`);
}

//Task Addition functionality
function taskAddition(){
    if (!taskCreate.classList.contains('active')){
        return;
    }
    
    //Increment task count for ID of task
    taskCount++;
    //Obtain task description, date, and project
    const description = taskDescInput.value;   
    const date = toDate(document.getElementById('task-due-date').value);
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
    removeTaskFromProject(task, project, projectsArr);
}

//funcitonality to remove project
function callRemoveProject(project){
    projectsArr = removeProject(project, projectsArr);
    console.log(projectsArr);
    removeNavProject(project);
    populateMain(projectsArr[0]);
}


export {callRemoveTask, callRemoveProject};
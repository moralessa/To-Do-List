import{removeTask} from './task.js';
import{removeTaskFromProject} from './project.js';
import {callRemoveTask} from '../index.js';

function populateMain(project){
    let main = document.querySelector('.main');
    let temp = document.getElementById('content');
    if(!main.contains(temp)){
        let content = document.createElement('div');
        content.setAttribute('id', 'content');
        main.append(content);
        let title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = `${project.name}`;
        content.append(title);
        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', `delete-${project.name}`);
        deleteButton.classList.add('btn-delete');
        deleteButton.textContent = "Delete Project";
        content.append(deleteButton);
    }

    //Check if populated main is correctly populated for the right project
    let titleElement = document.querySelector('.title');
    if(titleElement.textContent !== project.name){
        depopulateMain();
        populateMain(project);
    }

    project.tasks.forEach(task => {
        populateSingleTask(task, content, project);
    })
}

function populateSingleTask(task, parent, project){
    let temp = document.getElementById(`task-${task.id}`);
    if(parent.contains(temp)){
        return;
    }

    let taskContainer = document.createElement('div');
    taskContainer.classList.add('task');
    taskContainer.setAttribute('id', `task-${task.id}`);
    let circle = document.createElement('div');
    circle.classList.add('circle');
    taskContainer.append(circle);
    let taskDesc = document.createElement('p');
    taskDesc.classList.add('task-desc');
    taskDesc.textContent = `${task.desc}`;
    taskContainer.append(taskDesc);
    let taskDate = document.createElement('p');
    taskDate.classList.add('task-date');
    taskDate.textContent = `${task.date}`;
    taskContainer.append(taskDate);
    parent.append(taskContainer);
    taskContainer.addEventListener('click', () => {
        callRemoveTask(task.id, project);
        removeTaskAnimation(taskContainer);;
    })
}

function depopulateMain(){
    let content = document.getElementById('content');
    content.remove();
}

function removeTaskAnimation(parentContainer){
    let crossOut = document.createElement('div');
    parentContainer.classList.add('removed');
    crossOut.classList.add('cross-out');
    parentContainer.append(crossOut);
}


export {populateMain};
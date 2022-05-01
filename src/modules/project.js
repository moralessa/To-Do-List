import {removeTask} from './task.js';

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
}

function createNewProject(name, arr){
    let newProject = new Project(name);
    arr.push(newProject);
    return newProject;
}

function removeTaskFromProject(id, project, arr){
    let ndx;
    arr.forEach((tempProject, index) => {
        if(tempProject.name == project.name){
            ndx = index;
        }
    })
    if(ndx == undefined){
        console.log('somethings up');
        return;
    }
    arr[ndx].tasks = removeTask(id, arr[ndx].tasks);
}

export {Project, createNewProject, removeTaskFromProject};
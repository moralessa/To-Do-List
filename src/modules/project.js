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
        return;
    }
    arr[ndx].tasks = removeTask(id, arr[ndx].tasks);
}

function removeProject(project, arr){
    let ndx;
    arr.forEach((tempProject, index) =>{
        if(tempProject.name == project.name){
            ndx = index;
        }
    })
    return arr.filter(project => project.name !== arr[ndx].name);
}

export {Project, createNewProject, removeTaskFromProject, removeProject};
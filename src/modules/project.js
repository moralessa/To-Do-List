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

function removeTaskFromProject(id){
    
}

export {Project, createNewProject};
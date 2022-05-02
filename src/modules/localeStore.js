function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


function addTaskCountToLocale(count){
    if (storageAvailable('localStorage')) {
        localStorage.setItem('task-count', count);
        console.log(localStorage);
      }
      else {
        console.log('Cannot use locale storage on this browser');
      }
}


function addTaskToLocale(task){
    if (storageAvailable('localStorage')) {
        let taskSerialized = JSON.stringify(task);
        localStorage.setItem(`task-${task.id}`, taskSerialized);
      }
      else {
        console.log('Cannot use locale storage on this browser');
      }
}

function addTaskToProjectLocale(task, project){
    if (storageAvailable('localStorage')) {
        let count = Number(localStorage.getItem('project-count'));
        for(let i =0; i <= count; i++){
            let projectDeserialized = JSON.parse(localStorage.getItem(`project-${i}`));
            if(projectDeserialized == null){
                continue;
            }else if(project.name == projectDeserialized.name){
                let temp = projectDeserialized;
                temp.tasks.push(task);
                addProjectToLocale(temp, i);
            }
        }
      }
      else {
        console.log('Cannot use locale storage on this browser');
      }
}

function addProjectToLocale(project, count){
    if (storageAvailable('localStorage')) {
        let projectSerialized = JSON.stringify(project);
        localStorage.setItem(`project-${count}`, projectSerialized);
        localStorage.setItem(`project-count`, count);
      }
      else {
        console.log('Cannot use locale storage on this browser');
      }
}

function getTaskCount(){
   return localStorage.getItem('task-count');
}

function getProjectCount(){
    return localStorage.getItem('project-count');
}

function getTasks(){
    let count = Number(localStorage.getItem('task-count'));
    let tasksArr = [];
    for(let i = 0; i <= count; i++){
        let taskDeserialized = JSON.parse(localStorage.getItem(`task-${i}`));
        if(taskDeserialized == null){
            continue;
        }
        tasksArr.push(taskDeserialized);
    }
    return tasksArr;
}

function getProjects(){
    let count = Number(localStorage.getItem('project-count'));
    let projectsArr = [];
    for(let i =0; i <= count; i++){
        let projectDeserialized = JSON.parse(localStorage.getItem(`project-${i}`));
        if(projectDeserialized == null){
            continue;
        }
        projectsArr.push(projectDeserialized);
    }
    return projectsArr;
}

function removeTaskFromLocale(id){
    localStorage.removeItem(`task-${id}`);
}

function removeTaskFromProjectLocale(id ,project){
    if (storageAvailable('localStorage')) {
        let count = Number(localStorage.getItem('project-count'));
        for(let i =0; i <= count; i++){
            let projectDeserialized = JSON.parse(localStorage.getItem(`project-${i}`));
            if(projectDeserialized == null){
                continue;
            }else if(project.name == projectDeserialized.name){
                let temp = projectDeserialized;
                temp.tasks = temp.tasks.filter(currentTask => currentTask.id !== id);
                addProjectToLocale(temp, i);
            }
        }
      }
      else {
        console.log('Cannot use locale storage on this browser');
      }
}

function removeProjectFromLocale(project){
    if (storageAvailable('localStorage')) {
        let count = Number(localStorage.getItem('project-count'));
        for(let i =0; i <= count; i++){
            let projectDeserialized = JSON.parse(localStorage.getItem(`project-${i}`));
            if(projectDeserialized == null){
                continue;
            }else if(project.name == projectDeserialized.name){
                localStorage.removeItem(`project-${i}`);
            }
        }
      }
      else {
        console.log('Cannot use locale storage on this browser');
      }
}

export {addTaskToLocale, addTaskToProjectLocale, addProjectToLocale, addTaskCountToLocale, getTaskCount, getProjectCount,
    getTasks, getProjects, removeTaskFromProjectLocale, removeTaskFromLocale, removeProjectFromLocale};
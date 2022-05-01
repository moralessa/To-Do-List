class Task {
    constructor(id, desc, date) {
        this.id = id;
        this.desc = desc;
        this.date = date;
    }
}

function createNewTask(id, desc, date, arr){
    let newTask = new Task(id, desc, date);
    arr.push(newTask);
    return newTask;
}

function removeTask(id, arr){
    return arr.filter(task => task.id !== id);
}


export {createNewTask, removeTask}
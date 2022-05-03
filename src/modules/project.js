// eslint-disable-next-line import/extensions
import { removeTask } from './task.js';

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

function createNewProject(name, arr) {
  const newProject = new Project(name);
  arr.push(newProject);
  return newProject;
}

function removeTaskFromProject(id, project, arr) {
  let ndx;
  const newArr = arr;
  arr.forEach((tempProject, index) => {
    if (tempProject.name === project.name) {
      ndx = index;
    }
  });

  if (ndx === undefined) {
    return;
  }
  newArr[ndx].tasks = removeTask(id, arr[ndx].tasks);
}

function removeProject(project, arr) {
  let ndx;
  arr.forEach((tempProject, index) => {
    if (tempProject.name === project.name) {
      ndx = index;
    }
  });
  return arr.filter((tempProject) => tempProject.name !== arr[ndx].name);
}

export {
  Project, createNewProject, removeTaskFromProject, removeProject,
};

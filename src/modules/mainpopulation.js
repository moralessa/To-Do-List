/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/extensions
import { callRemoveTask, callRemoveProject } from '../index.js';

function removeTaskAnimation(parentContainer) {
  const crossOut = document.createElement('div');
  parentContainer.classList.add('removed');
  crossOut.classList.add('cross-out');
  parentContainer.append(crossOut);
}

function populateSingleTask(task, parent, project) {
  const temp = document.getElementById(`task-${task.id}`);
  if (parent.contains(temp)) {
    return;
  }

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');
  taskContainer.setAttribute('id', `task-${task.id}`);
  const circle = document.createElement('div');
  circle.classList.add('circle');
  taskContainer.append(circle);
  const taskDesc = document.createElement('p');
  taskDesc.classList.add('task-desc');
  taskDesc.textContent = `${task.desc}`;
  taskContainer.append(taskDesc);
  const taskDate = document.createElement('p');
  taskDate.classList.add('task-date');
  taskDate.textContent = `${task.date}`;
  taskContainer.append(taskDate);
  parent.append(taskContainer);
  taskContainer.addEventListener('click', () => {
    callRemoveTask(task.id, project);
    removeTaskAnimation(taskContainer);
  });
}

function depopulateMain() {
  const content = document.getElementById('content');
  content.remove();
}

function populateMain(project) {
  const main = document.querySelector('.main');
  const temp = document.getElementById('content');
  if (!main.contains(temp)) {
    const content = document.createElement('div');
    content.setAttribute('id', 'content');
    main.append(content);
    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = `${project.name}`;
    content.append(title);
    if (project.name !== 'Inbox') {
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', `delete-${project.name}`);
      deleteButton.classList.add('btn-delete');
      deleteButton.textContent = 'Delete Project';
      content.append(deleteButton);
      deleteButton.addEventListener('click', () => {
        callRemoveProject(project);
      });
    }
  }

  // Check if populated main is correctly populated for the right project
  const titleElement = document.querySelector('.title');
  if (titleElement.textContent !== project.name) {
    depopulateMain();
    populateMain(project);
  }

  project.tasks.forEach((task) => {
    // eslint-disable-next-line no-undef
    populateSingleTask(task, content, project);
  });
}

// eslint-disable-next-line import/prefer-default-export
export { populateMain };

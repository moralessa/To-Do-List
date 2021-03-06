/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-cycle
import { populateMain } from './mainpopulation.js';

function expandNav() {
  const main = document.querySelector('.main');
  const aside = document.querySelector('.aside');
  const overlay = document.getElementById('overLay');
  const unpin = document.getElementById('unlock');
  const linkSmall = document.querySelector('.nav-links');
  const linkExpanded = document.querySelector('.expanded');
  if (unpin.classList.contains('d-none')) {
    overlay.classList.remove('d-none');
  } else {
    main.classList.add('small');
  }
  if (aside.classList.contains('large')) {
    aside.classList.remove('large');
    linkSmall.classList.remove('d-none');
    linkExpanded.classList.add('d-none');
    overlay.classList.add('d-none');
    main.classList.remove('small');
  } else {
    aside.classList.add('large');
    linkSmall.classList.add('d-none');
    linkExpanded.classList.remove('d-none');
  }
}

function pinExpanded() {
  const main = document.querySelector('.main');
  const unpin = document.getElementById('unlock');
  const overlay = document.getElementById('overLay');
  const pin = document.getElementById('lock');
  main.classList.add('small');
  unpin.classList.remove('d-none');
  pin.classList.add('d-none');
  overlay.classList.add('d-none');
}

function unPinExpanded() {
  const main = document.querySelector('.main');
  const unpin = document.getElementById('unlock');
  const overlay = document.getElementById('overLay');
  const pin = document.getElementById('lock');
  main.classList.remove('small');
  unpin.classList.add('d-none');
  pin.classList.remove('d-none');
  overlay.classList.remove('d-none');
}

function hoverPopUp(param) {
  const popUp = document.createElement('p');
  popUp.classList.add('pop-up');
  param.appendChild(popUp);
  switch (param.id) {
    case 'inbox':
      popUp.textContent = 'Inbox';
      break;
    case 'week':
      popUp.textContent = 'Calendar';
      break;
    case 'add':
      popUp.textContent = 'Add';
      break;
    default:
      popUp.textContent = 'NavLink';
      break;
  }
  setTimeout(() => {
    popUp.style.opacity = '1';
  }, 1500);
}

function destroyPopUp() {
  const popUps = document.querySelectorAll('.pop-up');
  for (let i = 0; i < popUps.length; i += 1) {
    popUps[i].remove();
  }
}

function populateNavProjects(arr) {
  const projectsContainer = document.getElementById('projects');
  arr.forEach((project) => {
    const temp = document.getElementById(`project-${project.name}`);
    if (temp == null) {
      const listItem = document.createElement('li');
      listItem.setAttribute('id', `project-${project.name}`);
      listItem.classList.add('blue-text', 'expanded-item');
      const text = document.createElement('span');
      text.textContent = `${project.name}`;
      listItem.append(text);
      projectsContainer.append(listItem);
      listItem.addEventListener('click', () => {
        populateMain(project);
      });
    }
  });
}

function removeNavProject(project) {
  const projectToRemove = document.getElementById(`project-${project.name}`);
  projectToRemove.remove();
}

export {
  expandNav, pinExpanded, unPinExpanded, hoverPopUp,
  destroyPopUp, populateNavProjects, removeNavProject,
};

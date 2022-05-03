function populateTaskInput() {
  const input = document.getElementById('task-input');
  const overLay = document.getElementById('secondoverLay');
  overLay.classList.remove('d-none');
  input.classList.remove('d-none');
  setTimeout(() => {
    input.style.opacity = 1;
  }, 250);
}

function depopulateTaskInput() {
  const input = document.getElementById('task-input');
  const overLay = document.getElementById('secondoverLay');
  overLay.classList.add('d-none');
  input.style.opacity = 0;
  setTimeout(() => {
    input.classList.add('d-none');
  }, 500);
}

function createButtonToggle() {
  const taskCreate = document.getElementById('task-create');
  const taskDescInput = document.getElementById('task-desc');
  if (taskDescInput.value === '') {
    taskCreate.classList.remove('active');
  } else {
    taskCreate.classList.add('active');
  }
}

export { populateTaskInput, depopulateTaskInput, createButtonToggle };

function populateInput(){
    const input = document.getElementById('task-input');
    const overLay = document.getElementById('secondoverLay');
    overLay.classList.remove('d-none');
    input.classList.remove('d-none');
    input.style.opacity = 1;
}

function depopulateInput(){
    const input = document.getElementById('task-input');
    const overLay = document.getElementById('secondoverLay');
    overLay.classList.add('d-none');
    input.style.opacity = 0;
    setTimeout(function(){
        input.classList.add('d-none');
    }, 500);
}

export {populateInput, depopulateInput};
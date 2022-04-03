function expandNav(){
    const main = document.querySelector('.main');
    const aside = document.querySelector('.aside');
    const overlay = document.getElementById('overLay');
    const unpin = document.getElementById('unlock');
    const linkSmall = document.querySelector('.nav-links');
    const linkExpanded = document.querySelector('.expanded');
    if(unpin.classList.contains('d-none')){
        overlay.classList.remove('d-none');
    }else{
        main.classList.add('small');
    }
    if(aside.classList.contains('large')){
        aside.classList.remove('large');
        linkSmall.classList.remove('d-none');
        linkExpanded.classList.add('d-none');
        overlay.classList.add('d-none');
        main.classList.remove('small');
    }else{
        aside.classList.add('large');
        linkSmall.classList.add('d-none');
        linkExpanded.classList.remove('d-none');
    }
}

function pinExpanded(){
    const main = document.querySelector('.main');
    const unpin = document.getElementById('unlock');
    const overlay = document.getElementById('overLay');
    const pin = document.getElementById('lock');
    main.classList.add('small');
    unpin.classList.remove('d-none');
    pin.classList.add('d-none');
    overlay.classList.add('d-none');
}

function unPinExpanded(){
    const main = document.querySelector('.main');
    const unpin = document.getElementById('unlock');
    const overlay = document.getElementById('overLay');
    const pin = document.getElementById('lock');
    main.classList.remove('small');
    unpin.classList.add('d-none');
    pin.classList.remove('d-none');
    overlay.classList.remove('d-none');
}

function hoverPopUp(param){
    let popUp = document.createElement('p');
    popUp.classList.add('pop-up');
    param.appendChild(popUp);
    switch(param.id){
        case 'search':
            popUp.textContent = 'Search';
            break;
        case 'inbox':
            popUp.textContent = 'Inbox';
            break;
        case 'week':
            popUp.textContent = 'Calendar';
            break;
        case 'add':
            popUp.textContent = 'Add';
    }
    setTimeout(function(){
        popUp.style.opacity = '1';
    }, 1500);
}

function destroyPopUp(){
    const popUps = document.querySelectorAll('.pop-up');
    for(let i = 0; i < popUps.length; i++){
        popUps[i].remove();
    }
}

export{expandNav, pinExpanded, unPinExpanded, hoverPopUp, destroyPopUp};
import "./styles.scss"
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap'
import {pinExpanded, expandNav, unPinExpanded, hoverPopUp, destroyPopUp} from './modules/nav.js';
import {populateInput, depopulateInput} from './modules/add.js';

const navButton2 = document.getElementById('bars-T')
const navButton = document.getElementById('bars');
const pin = document.getElementById('lock');
const unpin = document.getElementById('unlock');
navButton.addEventListener('click', expandNav);
navButton2.addEventListener('click', expandNav);
pin.addEventListener('click', pinExpanded);
unpin.addEventListener('click', unPinExpanded);
const search = document.getElementById('search');
const inbox = document.getElementById('inbox');
const calendar = document.getElementById('week');
const add = document.getElementById('add');
search.addEventListener('mouseenter', function(){hoverPopUp(search)});
search.addEventListener('mouseleave', destroyPopUp);
inbox.addEventListener('mouseenter', function(){hoverPopUp(inbox)});
inbox.addEventListener('mouseleave', destroyPopUp);
calendar.addEventListener('mouseenter', function(){hoverPopUp(calendar)});
calendar.addEventListener('mouseleave', destroyPopUp);
add.addEventListener('mouseenter', function(){hoverPopUp(add)});
add.addEventListener('mouseleave', destroyPopUp);
const addTask = document.getElementById('add-task');
addTask.addEventListener('click', populateInput);
const secondoverLay = document.getElementById('secondoverLay');
secondoverLay.addEventListener('click', depopulateInput);
const taskCancel = document.getElementById('task-cancel');
taskCancel.addEventListener('click', depopulateInput);
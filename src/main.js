import "./style.css";
import loadFontAwesome from './javascripts/icons.js';
import { toDosController, toDoManager } from "./javascripts/controllers.js";
import { domManager} from "./javascripts/DOMmanager.js";
import { parseISO, startOfToday, format  } from "date-fns";



const tempDate = format(startOfToday(), 'MMM/dd/yyyy');

toDosController.addToDo('taskName1','description',tempDate,'Mid');
toDosController.addToDo('taskName2','description',tempDate,'Mid');
toDosController.addToDo('taskName3','description',tempDate,'Mid');
toDosController.addToDo('taskName4','description',tempDate,'Mid');



loadFontAwesome();

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}else {
    console.log('Looks like we are in production mode!');

}

///Rendering sidebar

const body = document.querySelector('.container');
domManager.renderSideNav(body);

//Tasks list
//I need to refactor my classes to incorporate projects so that I can manipulate the task sidebar
// then start working on the main page rendering.

//Lastly I just need to be able to edit them all



const addNewTask = document.querySelector('.add-new-task');
const taskForm = document.querySelector('.modal');


addNewTask.addEventListener('click', () => {
    taskForm.classList.toggle('active');
});
const closeButton = document.querySelector('#closeModal');
closeButton.addEventListener('click', () => {
    taskForm.classList.toggle('active');
});
const modalBack = document.querySelector('.modal-container');
window.onclick = function(event) {
    
    if (event.target == modalBack) {
        taskForm.classList.toggle('active');
    }
}
// Adding task items to Today page
const taskContainer = document.querySelector('.task-container');
const detailContainer = document.querySelector('.detail');
domManager.RenderToDo(toDoManager.getToDo(), taskContainer, detailContainer);

console.log(toDoManager.getToDo());

const submitNewTask = document.querySelector('.taskAddButton');
submitNewTask.addEventListener('click', (e) => {
    e.preventDefault();

    const taskName = document.getElementById ('taskName').value;
    const description = document.getElementById ('description').value;
    const date = format(parseISO(document.getElementById ('date').value), 'MMM/dd/yyyy');
    
    const priority = document.getElementById ('priority').value;

    console.log ({taskName, description, date, priority});

    toDosController.addToDo(taskName,description,date,priority);
    domManager.RenderToDo(toDoManager.getToDo(), taskContainer, detailContainer);

    taskForm.classList.toggle('active');
});


export const toDosController = (function () {
    // // keep track of what page the user is on, so that added items go
    // // to the correct project. defaults to home page on load
    
    // let currentProject = "home";

    // // change currentProject
    // function changeCurrentProject(newProject) {
    //     currentProject = newProject;
    // }

    // // get currentProject
    // function getCurrentProject() {
    //     return currentProject;
    // }

    function createSubTask(name) {
        return {name};
    }

    // TodoClass

    function createToDo(name, description, date, priority,checked=false,subtask=[]) {
        return {
            name,
            description,
            date, 
            priority,
            checked,
            subtask
        }
    }

    function addSubtask(name,toDoTask){
        const newSubTask = createSubTask(name);
        toDoTask.subtask.push(newSubTask);
    }
    function removeSubtask(i, toDoTask){
        toDoTask.subtask.splice(i,1);
    }
    function editSubTask(i, name,toDoTask){
        toDoTask.subtask[i].name = name;
    }

    // create 

    function addToDo(name ,description, date, priority) {
        const newToDo = createToDo(name ,description, date, priority);
        toDoManager.addToDo(newToDo);
    }

    

    return {createToDo, addToDo, addSubtask, removeSubtask, editSubTask};
})();

export const toDoManager = (function () {
    let toDoList = [];


    function addToDo (toDo) {
        toDoList.push(toDo);
    }

    function editToDo (i, newToDo) {
        toDoList[i] = newToDo;
    }

    function removeToDo (i) {
        toDoList.splice(i,1);
    }

    function getToDo () {
        return toDoList;
    }

    return {addToDo, getToDo, removeToDo, editToDo}
})();
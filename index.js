import Storage from "./src/storage.js";
import UI from "./src/UI.js";
import Project from "./src/project.js";

UI.displayProjects();

const btnNewProject = document.getElementById('new-project');
const btnCancelProject = document.getElementById('cancel');
const btnAddProject = document.getElementById('add-project');
const btnListView = document.getElementById('list-view');
const btnCancelTask = document.getElementById('task-cancel');
const btnAddTask = document.getElementById('add-task');

btnNewProject.addEventListener('click', UI.openModal);
btnCancelProject.addEventListener('click', UI.closeModal);
btnListView.addEventListener('click', UI.displayProjects);
btnCancelTask.addEventListener('click', UI.closeTaskModal);
btnAddTask.addEventListener('click', () => {
    const name = document.querySelector('.title-full').textContent;
    const task = document.getElementById('task-name').value;
    Storage.addTask(name,task);
    UI.displayTasks(name);
    UI.closeTaskModal();
    UI.clearTaskValue();
})
btnAddProject.addEventListener('click', () => {

    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;
    const dueDate = document.getElementById('project-due-date').value;
    const tasks = [];

    const newProject = new Project(name, description, dueDate, tasks);

    Storage.addProject(newProject);
    UI.closeModal();
    UI.clearValues();
    UI.displayProjects();
});


// ---------- DELETING A PROJECT ----------


document.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        const name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        Storage.removeProject(name);
        UI.displayProjects();
    }
})


// ---------- DISPLAY FULL PROJECT DETAILS ----------


document.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-edit')){
        UI.displayFullProject(e);
        UI.displayTasks(e.target.parentElement.parentElement.firstChild.nextElementSibling.textContent);
    }
});


// ---------- ADD A NEW TASK TO A PROJECT ----------


document.addEventListener('click', (e) => {
    if(e.target.classList.contains('new-task')){
        UI.openTaskModal();
    }
});


// ---------- REMOVING A TASK FROM A PROJECT ----------


document.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-task')){
        const name = document.querySelector('.title-full').textContent;
        const taskToDelete = e.target.previousElementSibling.textContent;
        Storage.removeTask(name, taskToDelete);
        UI.displayTasks(name);
    };
})
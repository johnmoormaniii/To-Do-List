import Storage from "./storage.js";

export default class UI{
    static openModal(){
        document.getElementById('modal').classList.add('active');
    };

    static closeModal(){
        document.getElementById('modal').classList.remove('active');
    };

    static clearValues(){
        document.getElementById('project-name').value = ``;
        document.getElementById('project-description').value = ``;
        document.getElementById('project-due-date').value = ``;
    };

    static openTaskModal(){
        document.getElementById('task-modal').classList.add('active');
    }

    static closeTaskModal(){
        document.getElementById('task-modal').classList.remove('active');
    }

    static clearTaskValue(){
        document.getElementById('task-name').value = ``;
    }

    static displayProjects(){
        const projectsContainer = document.querySelector('.projects');
        projectsContainer.innerHTML = ``;

        const sidebar = document.querySelector('.sidebar-projects');
        sidebar.innerHTML = ``;

        const projects = Storage.getProjects();
        projects.forEach((project) => {
            const newProject = document.createElement('div');
            newProject.classList.add('project');
            newProject.innerHTML = `
                <div class="title">${project.name}</div>
                    <div class="due-date">${project.dueDate}</div>
                    <div class="icons">
                        <i class="far fa-edit"></i>
                        <div class="delete">X</div>
                    </div>
            `;

            projectsContainer.appendChild(newProject);

            const projectSidebar = document.createElement('div');
            projectSidebar.classList.add('project-sidebar');
            projectSidebar.textContent = project.name;

            sidebar.appendChild(projectSidebar);
        });
    }

    static displayFullProject(e){
        const name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const projects = Storage.getProjects();
        
        projects.forEach((project) => {
            if(project.name === name){
                const projectsContainer = document.querySelector('.projects');
                projectsContainer.innerHTML = ``;

                const fullProject = document.createElement('div');
                fullProject.classList.add('project-full');
                fullProject.innerHTML = `
                    <div class="project-info-full">
                        
                        <div class="title-full">${project.name}</div>
                        <div class="due-date-full">${project.dueDate}</div>
                    </div>
                    <div class="description-full">${project.description}</div>
                    <div class="tasks-container">
                        <div class="new-task" id="new-task">New Task</div>
                        <div class="tasks">

                        </div>
                    </div>
                `;

                projectsContainer.appendChild(fullProject);
                console.log(fullProject);
            }
        })
    };

    static displayTasks(name){
        
        const projects = Storage.getProjects();

        projects.forEach((project) => {
            if(project.name === name){
                const tasks = document.querySelector('.tasks');
                tasks.innerHTML = ``;

                (project.tasks).forEach((task) => {
                    const newTask = document.createElement('div');
                    newTask.classList.add('task');
                    newTask.innerHTML = `
                        <div class="task-name">${task}</div>
                        <div class="remove-task">&times;</div>
                    `;
                    tasks.appendChild(newTask);
                })
            }
        })
    }
}
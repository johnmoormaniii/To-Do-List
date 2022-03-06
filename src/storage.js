export default class Storage{

    static getProjects(){
        let projects;
        if(JSON.parse(localStorage.getItem('projects')) == null){
            projects = [];
            console.log(projects);
        } else{
            projects = JSON.parse(localStorage.getItem('projects'));
            console.log(projects);
        }
        return projects;
    }

    static addProject(newProject){
        const projects = Storage.getProjects();
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));
        console.log(JSON.parse(localStorage.getItem('projects')));
    }

    static removeProject(name){
        const projects = Storage.getProjects();
        projects.forEach((project, index) => {
            if(project.name === name){
                projects.splice(index, 1);
            };
        });
        localStorage.setItem('projects', JSON.stringify(projects));
    };

    static addTask(name, task){
        const projects = Storage.getProjects();

        projects.forEach((project) => {
            if((project.name) === name){
                (project.tasks).push(task);
            };
            console.log(project.tasks);
        });
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static removeTask(name, taskToDelete){

        const projects = Storage.getProjects();

        projects.forEach((project) => {
            if(project.name === name){
                (project.tasks).forEach((task, index) => {
                    if(task === taskToDelete){
                        (project.tasks).splice(index, 1);
                    }
                })
            }
        });

        localStorage.setItem('projects', JSON.stringify(projects));
    }
}
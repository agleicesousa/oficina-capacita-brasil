document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const yearSpan = document.getElementById('ano-atual');

    yearSpan.textContent = new Date().getFullYear();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');

        const taskName = document.createElement('span');
        taskName.textContent = taskText;
        taskName.classList.add('task-name');

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completar';
        completeBtn.classList.add('complete');
        completeBtn.addEventListener('click', () => {
            taskName.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(taskName);
        li.appendChild(actions);
        taskList.appendChild(li);
    }
});
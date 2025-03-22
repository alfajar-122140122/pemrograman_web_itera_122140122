document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    
    loadTasks();
    
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Silakan masukkan tugas!');
            return;
        }
        
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        
        taskInput.value = '';
        taskInput.focus();
        
        saveTasks();
    }
    
    function createTaskElement(text, isCompleted = false) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        
        const taskText = document.createElement('div');
        taskText.classList.add('task-text');
        if (isCompleted) {
            taskText.classList.add('completed');
        }
        taskText.textContent = text;
        
        const taskButtons = document.createElement('div');
        taskButtons.classList.add('task-buttons');
        
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.textContent = '✓';
        completeBtn.addEventListener('click', function() {
            taskText.classList.toggle('completed');
            saveTasks();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
        });
        
        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(deleteBtn);
        taskItem.appendChild(taskText);
        taskItem.appendChild(taskButtons);
        
        return taskItem;
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(function(taskItem) {
            const taskText = taskItem.querySelector('.task-text').textContent;
            const isCompleted = taskItem.querySelector('.task-text').classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('todoTasks');
        
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(function(task) {
                const taskItem = createTaskElement(task.text, task.completed);
                taskList.appendChild(taskItem);
            });
        }
    }
});
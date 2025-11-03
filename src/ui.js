// Importamos las funciones de persistencia
import { getTasks, saveTasks } from './storage.js';

const taskList = document.getElementById('task-list');

// Función que maneja la lógica de negocio (basada en ID)
const handleTaskAction = (id, action) => {
    let tasks = getTasks();
    
    if (action === 'toggle') {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
    } else if (action === 'delete') {
        tasks = tasks.filter(task => task.id !== id);
    }

    saveTasks(tasks);
    renderTasks(); // Volver a dibujar la UI
};

/**
 * Crea el elemento HTML de una tarea.
 */
const createTaskElement = (task) => {
    const listItem = document.createElement('li');
    listItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    listItem.setAttribute('data-id', task.id);
    
    listItem.innerHTML = `
        <span class="task-item-text">${task.text}</span>
        <div class="task-actions">
            <button class="complete-btn" title="Completar">✔</button>
            <button class="delete-btn" title="Eliminar">✖</button>
        </div>
    `;

    // Eventos que llaman a la función de negocio (handleTaskAction)
    listItem.querySelector('.complete-btn').addEventListener('click', () => {
        handleTaskAction(task.id, 'toggle');
    });

    listItem.querySelector('.delete-btn').addEventListener('click', () => {
        handleTaskAction(task.id, 'delete');
    });

    return listItem;
};

/**
 * Renderiza todas las tareas en el DOM.
 */
export const renderTasks = () => {
    taskList.innerHTML = ''; // Limpiar la lista
    const tasks = getTasks(); // Obtener datos del storage

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
};

/**
 * Maneja la adición de una nueva tarea desde el formulario.
 * @param {string} text - El texto de la nueva tarea.
 */
export const addNewTask = (text) => {
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    renderTasks();
};
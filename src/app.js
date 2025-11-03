// src/app.js

import { renderTasks, addNewTask } from './ui.js';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

// Función de inicialización
const init = () => {
    // 1. Manejar el envío del formulario
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío y recarga
        
        const text = taskInput.value.trim();
        if (text === '') return;

        addNewTask(text); // Llama a la lógica de UI
        taskInput.value = ''; // Limpia el input
    });

    // 2. Renderizar la lista al cargar la página
    renderTasks();
};

// Se ejecuta al cargar el DOM
document.addEventListener('DOMContentLoaded', init);
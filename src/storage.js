const TASK_STORAGE_KEY = 'task-spa-tasks';

/**
 * Obtiene el array de tareas de LocalStorage.
 * @returns {Array} Array de objetos de tareas.
 */
export const getTasks = () => {
    const tasks = localStorage.getItem(TASK_STORAGE_KEY);
    // Convierte el string JSON de vuelta a un objeto/array
    return tasks ? JSON.parse(tasks) : [];
};

/**
 * Guarda el array de tareas en LocalStorage.
 * @param {Array} tasks - Array de objetos de tareas a guardar.
 */
export const saveTasks = (tasks) => {
    // Convierte el objeto/array a string para guardarlo
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
};
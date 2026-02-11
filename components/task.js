//get results from the local storage 
export async function loadTasks() {
    const result = await chrome.storage.local.get('tasks');
    return result.tasks || [];
}

//save tasks to chrome local storage 
export async function saveTasks(tasks) {
    await chrome.storage.local,set({tasks})
}

// Add a new task and save
export async function addTask(title) {
    const tasks = await loadTasks();
    tasks.push({text: title});
    await saveTasks(tasks);
    return tasks;
}

// Remove a task by index and save
export async function removeTask(index) {
    const tasks = await loadTasks();
    tasks.splice(index, 1);
    await saveTasks(tasks);
    return tasks;
}

// Update a task by index and save
export async function updateTask(index, newTask) {
    const tasks = await loadTasks();
    tasks[index] = newTask;
    await saveTasks(tasks);
    return tasks;
}
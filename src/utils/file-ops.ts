import fs from "fs";
import { Task } from "../types.js";

const TASKS_FILE = 'tasks.json';

function ensureTasksFileExists() {
  if (!fs.existsSync(TASKS_FILE)) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify([]), 'utf8');
  }
}

export function getTasks(callback: (allTasks: Task[]) => void) {
  ensureTasksFileExists();
  fs.readFile(TASKS_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    try {
      const allTasks = JSON.parse(data);
      if (!Array.isArray(allTasks)) {
        console.error('JSON data is not an array!');
        return;
      }
      callback(allTasks);
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return;
    }
  })
}

export function writeTasks(
  updatedTasks: string,
  id: number,
  action: 'added' | 'updated' | 'deleted',
) {
  ensureTasksFileExists();
  fs.writeFile(TASKS_FILE, updatedTasks, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
    } else {
      console.log(`Task ${action} successfully (ID: ${id})`);
    }
  });
}
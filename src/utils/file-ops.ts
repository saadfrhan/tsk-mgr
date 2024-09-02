import fs from "fs";
import { Task } from "../types.js";

export function getTasks(callback: (allTasks: Task[]) => void) {
  fs.readFile('tasks.json', 'utf8', (err, data) => {
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
  fs.writeFile('tasks.json', updatedTasks, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
    } else {
      console.log(`Task ${action} successfully (ID: ${id})`);
    }
  });
}
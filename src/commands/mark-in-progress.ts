import { Command } from "commander";
import { getTasks, writeTasks } from "../utils/file-ops.js";

export const markInProgressCommand = new Command("mark-in-progress")
  .argument("<id>", "ID of the task")
  .action((id: string) => {
    getTasks((allTasks) => {
      const updatedTasks = allTasks.map((task) => {
        if (task.id === parseInt(id, 10)) {
          return { ...task, status: 'in-progress' };
        }
        return task;
      });
      writeTasks(JSON.stringify(updatedTasks, null, 2), parseInt(id, 10), 'updated');
    });
  })
  .description("Mark a task as in progress");
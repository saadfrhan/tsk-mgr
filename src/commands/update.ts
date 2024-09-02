import { Command } from "commander";
import { getTasks, writeTasks } from "../utils/file-ops.js";

export const updateCommand = new Command("update")
  .argument("<id>", "ID of the task")
  .argument("[title]", "New title of the task")
  .argument("[description]", "New description of the task")
  .action((id: string, title: string, description: string) => {
    getTasks((allTasks) => {
      const updatedTasks = allTasks.map((task) => {
        if (task.id === parseInt(id, 10)) {
          return { ...task, title, updatedAt: new Date().toISOString(), description };
        }
        return task;
      });
      writeTasks(JSON.stringify(updatedTasks, null, 2), parseInt(id, 10), 'updated');
    });
  })
  .description("Update the title of a task");
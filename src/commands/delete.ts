import { Command } from "commander";
import { getTasks, writeTasks } from "../utils/file-ops.js";

export const deleteCommand = new Command("delete")
  .argument("<id>", "ID of the task")
  .action((id: string) => {
    getTasks((allTasks) => {
      const updatedTasks = allTasks.filter((task) => task.id !== parseInt(id, 10));
      writeTasks(JSON.stringify(updatedTasks, null, 2), parseInt(id, 10), 'deleted');
    });
  });
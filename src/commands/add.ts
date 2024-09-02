import { Command } from "commander";
import { getTasks, writeTasks } from "../utils/file-ops.js";
import { Task } from "../types.js";

export const addCommand = new Command("add")
  .argument("<title>", "Title of the task")
  .argument("[description]", "Description of the task")
  .action(
    (
      title: string,
      description: string | undefined
    ) => {
      getTasks((allTasks) => {
        const newTask: Task = {
          id: allTasks.length + 1,
          title,
          status: "todo",
          createdAt: new Date().toISOString(),
        };
        if (description) {
          newTask.description = description;
        }
        allTasks.push(newTask);
        const updatedTasks = JSON.stringify(allTasks, null, 2);
        writeTasks(updatedTasks, newTask.id, 'added');
      });
    },
  )
  .description("Add a new task to the list");
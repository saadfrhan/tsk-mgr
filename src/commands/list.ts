import { Command } from "commander";
import { getTasks } from "../utils/file-ops.js";

export const listCommand = new Command("list")
  .argument("[status]")
  .action((status: string | undefined) => {
    getTasks((allTasks) => {
      if (status) {
        const filteredTasks = allTasks.filter((task) => task.status === status);
        console.log(JSON.stringify(filteredTasks, null, 2));
      } else {
        console.log(JSON.stringify(allTasks, null, 2));
      }
    });
  })
  .description("List all tasks");
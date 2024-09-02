#!/usr/bin/env node

import { Command } from "commander";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { updateCommand } from "./commands/update.js";
import { deleteCommand } from "./commands/delete.js";
import { markInProgressCommand } from "./commands/mark-in-progress.js";
import { markDoneCommand } from "./commands/mark-done.js";

const program = new Command();

program.name("tsk-mgr").description("A Task Management CLI");

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(updateCommand);
program.addCommand(deleteCommand);
program.addCommand(markInProgressCommand);
program.addCommand(markDoneCommand);

program.parse(process.argv);
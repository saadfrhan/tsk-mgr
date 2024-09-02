# Task CLI

A task manager CLI built with TypeScript, supporting the following features:
- Add a new task to the list
- List all tasks
- Update the title of a task
- Delete a task from the list
- Mark a task as in progress
- Mark a task as done
- Read and write tasks to a JSON file

## Run

To run the CLI, simply execute the following command in the terminal:

```bash
pnpm dlx tsk-mgr
```

## Usage

### Help

```
Usage: main [options] [command]

Options:
  -h, --help             display help for command

Commands:
  add <title>            Add a new task to the list
  list [status]          List all tasks
  update <id> <title>    Update the title of a task
  delete <id>            Delete a task from the list
  mark-in-progress <id>  Mark a task as in progress
  mark-done <id>         Mark a task as done
  help [command]         display help for command
```

## Run locally

1. Clone the repository:

```bash
git clone https://github.com/saadfrhan/tsk-mgr
```

1. Install the dependencies:

```bash
pnpm install
```

1. Link the package:

```bash
pnpm --global link
```

1. Run the calculator:

```bash
tsk-mgr
```

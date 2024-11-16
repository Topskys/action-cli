import uiAction from "./ui";
import listAction from "./list";
import createAction from "./create";
import { addAction, removeAction } from "./template";
import updateAction from "./update";

const commands = {
  "create <project-name>": {
    description: "Create a new project",
    options: [
      {
        cmd: "-f, --force",
        msg: "overwrite target directory if it exists",
      },
      {
        cmd: "--template [template-name]",
        msg: "specify a template to use",
      },
    ],
    action: createAction,
  },
  list: {
    description: "List available templates",
    action: listAction,
  },
  "add <template-name> <template-url>": {
    description: "add a new template",
    action: addAction,
  },
  "remove <template-name>": {
    description: "remove an existing template",
    action: removeAction,
  },
  ui: {
    description: "Open the web-based UI",
    options: [
      {
        cmd: "-p, --port [port]",
        msg: "specify the port to run the UI on",
      },
      {
        cmd: "-h, --host [host]",
        msg: "specify the host to run the UI on",
      },
    ],
    action: uiAction,
  },
  update: {
    description: "Update the cli to the latest version",
    options: [
      {
        cmd: "-t, --tool [tool]",
        msg: "specify the tool to run",
      },
    ],
    action: updateAction,
  },
};

export default commands;

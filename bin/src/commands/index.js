"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = __importDefault(require("./ui"));
var list_1 = __importDefault(require("./list"));
var create_1 = __importDefault(require("./create"));
var template_1 = require("./template");
var commands = {
    'create <project-name>': {
        description: 'Create a new project',
        options: [
            {
                cmd: '-f, --force',
                msg: 'overwrite target directory if it exists'
            },
            {
                cmd: '--template [template-name]',
                msg: 'specify a template to use'
            }
        ],
        action: create_1.default,
    },
    list: {
        description: 'List available templates',
        action: list_1.default,
    },
    'add <template-name> <template-url>': {
        description: 'add a new template',
        action: template_1.addAction,
    },
    'remove <template-name>': {
        description: 'remove an existing template',
        action: template_1.removeAction,
    },
    ui: {
        description: 'Open the web-based UI',
        options: [
            {
                cmd: '-p, --port [port]',
                msg: 'specify the port to run the UI on'
            },
            {
                cmd: '-h, --host [host]',
                msg: 'specify the host to run the UI on'
            }
        ],
        action: ui_1.default,
    },
};
exports.default = commands;

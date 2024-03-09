#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var pack = __importStar(require("../package.json"));
var commands_1 = __importDefault(require("./commands"));
var figlet_1 = __importDefault(require("figlet"));
var chalk_1 = __importDefault(require("chalk"));
var program = new commander_1.Command();
var name = Object.keys(pack.bin)[0];
program.name(name).usage("<command> [option]").helpOption('-h,--help').version("".concat(pack.name, " ").concat(pack.version));
Object.keys(commands_1.default).forEach(function (command) {
    var current = program.command(command);
    if (commands_1.default[command].options && commands_1.default[command].options.length > 0) {
        commands_1.default[command].options.forEach(function (item) {
            current.option(item.cmd, item.msg || ''); // 附加命令
        });
    }
    current.action(commands_1.default[command].action); // 处理命令
    current.description(commands_1.default[command].description);
});
program.on("--help", function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log("\r\n".concat(figlet_1.default.textSync("Action-cli", {
        font: "3D-ASCII",
        horizontalLayout: "default",
        verticalLayout: "default",
        // width: 120,
        whitespaceBreak: true,
    }), "\nRun ").concat(chalk_1.default.cyan(name + ' <command> --help'), " for detailed usage of given command."));
});
program.parse();

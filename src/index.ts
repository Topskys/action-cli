#! /usr/bin/env node
import { Command } from 'commander';
import * as pkg from '../package.json';
import commands from '@/commands';
import figlet from 'figlet';
import chalk from 'chalk';

const program = new Command();
const name = Object.keys(pkg.bin)[0];

program.name(name).usage(`<command> [option]`).helpOption('-h,--help').version(`${pkg.name} ${pkg.version}`);

Object.keys(commands).forEach(command => {
    const current = program.command(command);
    if (commands[command].options && commands[command].options.length > 0) {
        commands[command].options.forEach(item => {
            current.option(item.cmd, item.msg || ''); // 附加命令
        });
    }
    current.action(commands[command].action); // 处理命令
    current.description(commands[command].description);
});

program.on("--help", (...args) => {
    console.log(`\r\n${figlet.textSync("Action-cli", {
        font: "3D-ASCII",
        horizontalLayout: "default",
        verticalLayout: "default",
        // width: 120,
        whitespaceBreak: true,
    })}\nRun ${chalk.cyan(name + ' <command> --help')} for detailed usage of given command.`);
});

program.parse();
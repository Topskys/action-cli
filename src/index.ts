#! /usr/bin/env node

import { Command } from 'commander';
import * as pack from '../package.json';
import commands from '@/commands';


const program = new Command();

program.usage(`<command> [option]`).helpOption('-h,--help').version(pack.version);

Object.keys(commands).forEach(command => {
    const current = program.command(command);
    if (commands[command].options && commands[command].options.length > 0) {
        commands[command].options.forEach(item => {
            current.option(item.cmd, item.msg || ''); // 附加命令
        });
    }
    current.action(commands[command].action); // 处理命令
});

program.parse();
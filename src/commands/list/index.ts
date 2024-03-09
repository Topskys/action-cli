import chalk from 'chalk';
import * as fs from 'fs-extra';

/**
 * list命令处理函数
 */
export default async () => {
    // 打印出所有模板
    const templates = JSON.parse(fs.readFileSync('template.json', { encoding: 'utf-8' }));
    console.log(Object.keys(templates).map(k => `${chalk.cyan(k)}：${templates[k]}`).join('\n'));
}
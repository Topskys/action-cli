import chalk from 'chalk';
import * as fs from 'fs-extra';
import path from 'path';

/**
 * list命令处理函数
 */
export default () => {
    // 打印出所有模板
    const templatePath = path.resolve(__dirname, '../../../template.json');
    const templates = JSON.parse(fs.readFileSync(templatePath, { encoding: 'utf-8' }));
    console.log(Object.keys(templates).map(k => `${chalk.cyan(k)}：${templates[k]}`).join('\n'));
}
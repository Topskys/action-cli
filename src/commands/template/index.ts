import ora from "ora";
import * as fs from 'fs-extra';

/**
 * add命令处理函数
 */
export const addAction = (templateName: string, templateUrl: string, options) => {
    const spinner = ora('Updating template...');
    spinner.start();
    const templates = JSON.parse(fs.readFileSync('template.json', { encoding: 'utf-8' }));
    templates[templateName.trim()] = templateUrl.trim();
    fs.writeFileSync('template.json', JSON.stringify(templates, null, 2));
    spinner.succeed('Updated successfully!');
    process.exit();
}

/**
 * remove命令处理函数
 */
export const removeAction = (templateName: string, options) => {
    const spinner = ora('Removing template...');
    spinner.start();
    const templates = JSON.parse(fs.readFileSync('template.json', { encoding: 'utf-8' }));
    if (templates[templateName.trim()]) {
        delete templates[templateName.trim()];
        fs.writeFileSync('template.json', JSON.stringify(templates, null, 2));
    }
    spinner.succeed('Removed successfully!');
    process.exit();
}
import ora from "ora";
import path from 'path';
import * as fs from 'fs-extra';

const templatePath = path.resolve(__dirname, '../../../template.json');

/**
 * add命令处理函数
 */
export const addAction = async (templateName: string, templateUrl: string, options) => {
    const spinner = ora('Updating template...');
    spinner.start();
    const templates = JSON.parse(fs.readFileSync(templatePath, { encoding: 'utf-8' }));
    templates[templateName.trim()] = templateUrl.trim();
    await fs.outputFile(templatePath, JSON.stringify(templates, null, 2));
    spinner.succeed('Updated successfully!');
    process.exit();
}

/**
 * remove命令处理函数
 */
export const removeAction = async (templateName: string, options) => {
    const spinner = ora('Removing template...');
    spinner.start();
    const templates = JSON.parse(fs.readFileSync(templatePath, { encoding: 'utf-8' }));
    if (templates[templateName.trim()]) {
        delete templates[templateName.trim()];
        await fs.outputFile(templatePath, JSON.stringify(templates, null, 2));
    }
    spinner.succeed('Removed successfully!');
    process.exit();
}
import ora from "ora";
import chalk from "chalk";
import * as path from 'path';
import * as fs from 'fs-extra';
import inquirer from 'inquirer';
import gitClone from 'git-clone';
import { readFile } from "@/utils/file";

/**
 * create命令附加参数处理函数
 */
export default async (projectName: string, options) => {
    const { force = null, template } = options;
    const targetDir = path.join(process.cwd(), projectName);
    try {
        if (fs.existsSync(targetDir)) {
            const questions = [
                {
                    type: 'confirm',
                    name: 'overwrite',
                    default: false,
                    message: `Target directory ${chalk.cyanBright(targetDir)} already exists. Overwrite?`,
                }
            ];
            const removeFolder = async () => {
                const spinner = ora(`Removing ${projectName}...`);
                spinner.start();
                await fs.remove(targetDir);
                spinner.succeed(`Removed ${projectName} Successfully.`);
            }
            if (force === null) {
                const answer = await inquirer.prompt(questions);
                if (!answer.overwrite) return; // 退出
                await removeFolder();
            } else {
                if (!force) return; // 退出
                await removeFolder();
            }
        }
        await downloadTemplate(projectName, targetDir, options);
    } catch (e) {
        console.log(`Error：${typeof e == 'string' ? e : JSON.stringify(e)}`);
        process.exit();
    }
}

/**
 * 克隆模板初始化项目
 * @param projectName 项目名
 * @param targetDir 项目目录
 */
const downloadTemplate = async (projectName: string, targetDir: string, options) => {
    const { template } = options;
    const templatePath = path.resolve(__dirname, '../../../template.json');
    const templates = JSON.parse(fs.readFileSync(templatePath, { encoding: 'utf-8' }));
    const HTTP_REG = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
    if (template) {
        if (HTTP_REG.test(template)) {
            clone(projectName, targetDir, template);
            return;// 退出
        } else {
            if (templates[template]) {
                clone(projectName, targetDir, templates[template]);
                return;// 退出
            }
        }
    }
    await handleSelect(projectName, targetDir, templates);
}

/**
 * 克隆
 * @param targetDir 工作目录
 * @param projectName 项目名称
 * @param url git仓库地址
 */
const clone = (projectName: string, targetDir: string, url: string) => {
    const spinner = ora(`Cloning ${url}...`);
    spinner.start();
    gitClone(url, targetDir, { checkout: 'main' }, async function (err) {
        if (!err) {
            spinner.succeed(`Initialization ${projectName} successfully. Now run:\n` + chalk.cyan(`  cd ${projectName}\n  npm install\n  npm run dev`));
            await fs.remove(path.join(targetDir, '.git'));
            process.exit();
        }
        spinner.fail(chalk.red(`Clone ${url} failed. ${typeof err == 'string' ? err : JSON.stringify(err)}`));
        process.exit();
    });
}

/**
 * 克隆
 * @param targetDir 工作目录
 * @param projectName 项目名称
 * @param templates 项目模板集合对象
 */
const handleSelect = async (projectName: string, targetDir: string, templates: any) => {
    const questions = [
        {
            type: 'list',
            name: 'framework',
            message: 'Select a framework：', // Please choose a template to create project
            choices: [
                { name: 'vue2', value: 'vue2' },
                { name: 'vue3', value: 'vue3' },
                { name: 'react', value: 'react' },
                { name: 'nestjs', value: 'nestjs' }
            ],
        },
        {
            type: 'list',
            name: 'ts',
            message: 'Use TypeScript?',
            choices: [
                {
                    name: 'Yes',
                    value: true
                },
                {
                    name: 'No',
                    value: false
                }
            ]
        }
    ];
    const answers = await inquirer.prompt(questions);
    const key = answers.framework + (answers.ts ? '+ts' : '');
    clone(projectName, targetDir, templates[key]);
}
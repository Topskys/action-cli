import ora from "ora";
import * as path from 'path';
import * as fs from 'fs-extra';
import inquirer from 'inquirer';
import { loading } from "@/utils";
import { exec } from 'child_process';
import { remove, mkdir, readDir, readFile, move } from '@/utils/file';
import { TARGET_DIR_EXISTS_MSG, URL_REG } from '@/utils/constant';
import { getTemplates } from '@/api';
import gitClone from 'git-clone';
import chalk from "chalk";

/**
 * create命令附加参数处理函数
 */
export default async (projectName: string, options) => {
    const targetDir = path.join(process.cwd(), projectName);
    try {
        if (fs.existsSync(targetDir)) {
            const questions = [
                {
                    type: 'confirm',
                    name: 'overwrite',
                    default: false,
                    message: `Target directory ${chalk.cyanBright(targetDir)} already exists. Is overwrote?`,
                }
            ];
            const answer = await inquirer.prompt(questions);
            if (answer.overwrite) {
                const spinner = ora(`Removing ${projectName}...`);
                spinner.start();
                await fs.remove(targetDir);
                spinner.succeed(`Removed ${projectName} Successfully.`);
            } else {
                // 退出
                return;
            }
        }
        await clone(projectName, targetDir);
    } catch (e) {
        console.log(`Error：${typeof e == 'string' ? e : JSON.stringify(e)}`);
        process.exit();
    }
}


/**
 * 下载模板
 * @param templateName 模板名称或仓库地址
 */
export async function downloadTemplate(templateName?: string) {
    const templatePath = path.join(process.cwd(), templateName);
    if (await readDir(templatePath)) {
        console.log(`${templatePath} is extended! Please remove it.`);
        process.exit();
    }
    if (URL_REG.test(templateName)) {
        await loading(`Downloading template...`, exec, `git clone ${templateName}`); // 下载模板
    } else {
        const templates: any = await getTemplates();//JSON.parse(await readFile("template.json"));
        const question = [
            {
                name: "template",
                type: 'list',
                message: "choose a template to create project",
                // default: "vue2", // expand 失效
                choices: templates.map(o => o.name),
            }
        ];
        const templateRepo = await inquirer.prompt(question);
        await loading(`Downloading template...`, exec, `git clone ${templates.find(o => o.key == templateRepo).value}`); // 下载模板
    }
    // const templatePath = path.resolve(process.cwd(), templateName);
    // await move(templatePath, './');
}


/**
 * 克隆模板初始化项目
 * @param projectName 项目名
 * @param targetDir 项目目录
 */
const clone = async (projectName: string, targetDir: string) => {
    const questions = [
        {
            type: 'list',
            name: 'framework',
            message: 'Select a framework：', // Please choose a template to create project
            choices: [
                { name: 'vue2', value: 'vue2' },
                { name: 'vue3', value: 'vue3' },
                { name: 'react', value: 'react' },
                { name: 'nest', value: 'nest' }
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
    const key = answers.framework + (answers.ts ? '&ts' : '');
    const projects = {
        'vue2': 'https://github.com/PanJiaChen/vue-element-admin',
        'vue3': 'https://github.com/PanJiaChen/vue-element-admin',
        'react': 'https://github.com/PanJiaChen/vue-element-admin',
        'react&ts': 'https://github.com/PanJiaChen/vue-element-admin',
        'vue2&ts': 'https://github.com/PanJiaChen/vue-element-admin',
        'vue3&ts': 'https://github.com/PanJiaChen/vue-element-admin',
    }

    const spinner = ora(`Clone ${projects[key]}...`);
    spinner.start();
    gitClone(projects[key], targetDir, { checkout: 'main' }, async function (err) {
        if (err && JSON.stringify(err) !== '{}') {
            spinner.fail(chalk.red(`Clone ${projects[key]} failed.`));
            console.log(`Error：${typeof err == 'string' ? err : JSON.stringify(err)}`);
            process.exit();
        } else {
            spinner.succeed(`Initialization ${projectName} successfully.Now run:\n` + chalk.cyan(`  cd ${projectName}\n  npm install\n  npm run dev`));
            await fs.remove(path.join(targetDir, '.git'));
            process.exit();
        }
    });
}
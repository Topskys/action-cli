import * as path from 'path';
import * as fs from 'fs-extra';
import inquirer from 'inquirer';
import { loading } from "@/utils";
import { exec } from 'child_process';
import { remove, mkdir, readDir, readFile, move } from '@/utils/file';
import { TARGET_DIR_EXISTS_MSG, URL_REG } from '@/utils/constant';
import { getTemplates } from '@/api';

/**
 * create命令附加参数处理函数
 */
export default async (projectName, options) => {
    const targetDir = path.join(process.cwd(), projectName); // 获取目标目录
    const exists = fs.existsSync(targetDir);

    try {
        if (exists) {
            if (options.force) {
                await remove(targetDir);
            } else {
                // 询问用户是否要覆盖重名目录
                const { isOverwrite } = await inquirer.prompt([
                    {
                        name: "isOverwrite", // 与返回值对应
                        type: "list", // list 类型
                        message: TARGET_DIR_EXISTS_MSG,
                        choices: [
                            { name: "Overwrite", value: true },
                            { name: "Cancel", value: false },
                        ],
                    },
                ]);
                if (!isOverwrite) {
                    console.log("Cancel");
                    return;
                } else {
                    await loading(`Removing ${projectName}, please wait a minute`, fs.remove, targetDir);
                }
            }
        }
        // 创建项目目录
        await mkdir(targetDir);
        // 下载模板
        await downloadTemplate(options.templateName);
    } catch (err) {
        console.log(JSON.stringify(err));
        process.abort();
    }

    // 
}


/**
 * 下载模板
 * @param templateName 模板名称或仓库地址
 */
export async function downloadTemplate(templateName?: string) {
    const templates:any = await getTemplates();//JSON.parse(await readFile("template.json"));
    const question = [
        {
            name: "template",
            type: 'list',
            message: "choose a template to create project",
            // default: "vue2", // expand 失效
            choices: templates.map(o => o.name),
        }
    ];
    const templateRepo = URL_REG.test(templateName) ? templateName : (await inquirer.prompt(question)).template;
    const templatePath = path.join(process.cwd(), templateRepo);
    if (await readDir(templatePath)) {
        console.log(`${templatePath} is extended! Please remove it.`);
        process.exit();
    }
    await loading(`Downloading template...`, exec, `git clone ${templates.find(o => o.key == templateRepo).value}`); // 下载模板
    // const templatePath = path.resolve(process.cwd(), templateName);
    // await move(templatePath, './');
}
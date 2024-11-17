import chalk from "chalk";
import * as path from "path";
import * as fs from "fs-extra";
import inquirer from "inquirer";
import { getDefaultBranch, gitClone, loading, readTemplates } from "@/utils";
import { HTTP_URL_REGEX } from "@/utils/constants";
import { CreateOptions, TemplateInfo } from "@/utils/types";

/**
 * 创建新项目的函数。
 *
 * @param projectName 新项目的名称。
 * @param options 创建选项，包含以下字段：
 *  - force: 是否覆盖已存在的项目目录。
 *  - template: 要使用的模板名称。
 *  - branch: 要使用的模板分支。
 *
 * @returns 无返回值，函数为异步操作。
 *
 * @throws 当遇到错误时，会捕获异常并在控制台输出错误信息，然后退出进程。
 */
export default async (projectName: string, options: CreateOptions) => {
  const { force, template, branch } = options;
  try {
    // 判断是否需要覆盖项目目录
    await overwrite(projectName, force);
    // 获取模板信息
    const templateInfo = await getTemplateInfo(template, branch);
    // 下载模板并创建项目目录
    await downloadTemplate(projectName, templateInfo);
  } catch (e) {
    console.error(`Creation failed, due to ${JSON.stringify(e)}`);
    process.exit();
  }
};

/**
 * 判断是否覆盖已存在的项目目录
 *
 * @param projectName 项目名称
 * @param force 是否强制覆盖
 * @returns 返回项目路径
 */
async function overwrite(projectName: string, force?: boolean) {
  const targetDir = path.join(process.cwd(), projectName);
  if (!fs.existsSync(targetDir)) return targetDir;
  // 如果目录已存在且没传force，则询问是否覆盖，否则终止程序
  if (typeof force === "boolean" && !force) return;
  // 如果没有传值force，则询问是否覆盖
  if (force == null) {
    const questions = [
      {
        type: "confirm",
        name: "overwrite",
        default: false,
        message: `Target directory ${chalk.cyanBright(
          targetDir
        )} already exists. Overwrite?`,
      },
    ];
    const answer = await inquirer.prompt(questions);
    if (!answer.overwrite) return; // 终止
  }
  // 删除目录并返回项目路径，重新创建项目目录
  await fs.remove(targetDir);
  return targetDir;
}

/**
 * 获取模板信息
 *
 * @param template 可选的模板名称或URL地址
 * @param branch 可选的分支名称，默认为 "main"
 * @returns 返回包含模板信息的对象，或undefined（如果未找到模板）
 */
async function getTemplateInfo(template?: string, branch?: string) {
  const templates = (await readTemplates()) as Record<string, string>;
  // 模板为空时
  if (!template) {
    const key = await selectTemplate(templates);
    return generateTemplateInfo(key, templates[key], branch);
  }
  // 传入template是url地址
  if (HTTP_URL_REGEX.test(template)) {
    return generateTemplateInfo(template, template, branch);
  }
  // 传入template是模板名称，但templates.json没有对应模板
  if (!templates[template]) {
    console.error(chalk.redBright(`${template} is not found`));
    return;
  }
  return generateTemplateInfo(template, templates[template], branch);
}

/**
 * 生成模板信息
 *
 * @param name 模板名称
 * @param url 模板的 URL
 * @returns 模板信息对象
 */
function generateTemplateInfo(name: string, url: string, branch?: string) {
  const templateInfo: TemplateInfo = {
    name,
    url,
    branch: branch || getDefaultBranch(url),
  };
  return templateInfo;
}

/**
 * 从给定的模板集合中选择一个模板
 *
 * @param templates 模板集合，键为模板名称，值为模板内容
 * @returns 返回用户选择的模板名称
 */
async function selectTemplate(templates: Record<string, string>) {
  const questions = [
    {
      type: "list",
      name: "template",
      message: "Select a template to create project：",
      choices: Object.keys(templates),
    },
  ];
  const answers = await inquirer.prompt(questions);
  return answers.template;
}

/**
 * 下载模板函数
 *
 * @param projectName 项目名称
 * @param templateInfo 模板信息
 * @returns 无返回值
 */
async function downloadTemplate(
  projectName: string,
  templateInfo: TemplateInfo
) {
  const loadingOptions = {
    text: "downloading...",
    cb: () => gitClone(projectName, templateInfo),
    okText:
      `Initialization ${projectName} successfully. Now run:\n` +
      chalk.cyan(`  cd ${projectName}\n  npm install\n  npm run dev`),
    failureText: chalk.red(`Initialization ${projectName} failed.\n`),
  };
  await loading(loadingOptions);
}

import chalk from "chalk";
import * as path from "path";
import * as fs from "fs-extra";
import inquirer from "inquirer";
import { getDefaultBranch, gitClone, loading, readTemplates } from "@/utils";
import { HTTP_URL_REGEX } from "@/utils/constants";
import { CreateOptions, TemplateInfo } from "@/utils/types";
import { execSync } from "child_process";

/**
 * 创建一个新的项目。
 *
 * @param projectName 新项目的名称。
 * @param options 创建选项，包括：
 *  - force: 是否强制覆盖已存在的项目目录。
 *  - template: 用于创建新项目的模板。
 *  - branch: 用于获取模板的分支。
 *  - run: 创建项目后是否自动运行。
 *  - packageManager: 用于运行项目的包管理器。
 *  - cmd 可选参数，指定自定义命令字符串
 */
export default async (projectName: string, options: CreateOptions) => {
  const { force, template, branch, run, packageManager, command } = options;
  try {
    // 判断是否需要覆盖项目目录
    const projectDir = await overwrite(projectName, force);
    // 获取模板信息
    const templateInfo = await getTemplateInfo(template, branch);
    // 下载模板并创建项目目录
    await downloadTemplate(projectName, templateInfo);
    // 自动运行项目
    await autoRun(run, projectDir, packageManager, command);
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
    if (!answer.overwrite) process.exit(); // 终止进程
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
    process.exit(); // 终止进程
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

/**
 * 自动运行项目
 *
 * @param run 是否自动运行项目，默认为 false
 * @param projectDir 项目目录路径
 * @param packageManager 包管理器
 * @param cmd 可选参数，指定自定义命令字符串
 */
async function autoRun(
  run?: boolean,
  projectDir?: string,
  packageManager?: string,
  cmd?: string
) {
  if (!run || !projectDir) return;
  if (!fs.existsSync(projectDir)) {
    console.error(chalk.red("Project directory not found."));
    process.exit(); // 终止进程
  }
  // 如果没有传run，则询问是否自动运行
  if (typeof run === "boolean" && !run) return;
  if (run == null) {
    const questions = [
      {
        type: "confirm",
        name: "autoRun",
        default: false,
        message: `run the project automatically after initialization. Auto?`,
      },
    ];
    const answer = await inquirer.prompt(questions);
    if (!answer.autoRun) process.exit(); // 终止进程
  }
  // 自动运行项目
  handleAutoRun(projectDir, packageManager, cmd);
}

/**
 * 自动运行项目
 *
 * @param projectDir 项目目录路径
 * @param packageManager 包管理工具，默认为 "pnpm"
 * @param cmd 可选参数，指定自定义命令字符串
 */
function handleAutoRun(
  projectDir: string,
  packageManager = "pnpm",
  cmd?: string
) {
  const command =
    cmd || `${packageManager} install && ${packageManager} run dev`;
  try {
    // 执行命令，继承stdio以直接在控制台显示输出
    execSync(command, { cwd: projectDir, stdio: "inherit" });
  } catch (e) {
    console.error(chalk.red("Run the project failed.\n"));
    process.exit(); // 终止进程
  }
}

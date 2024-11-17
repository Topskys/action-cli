import ora from "ora";
import path from "path";
import * as fs from "fs-extra";
import { readTemplates } from "@/utils";
import chalk from "chalk";
import { HTTP_URL_REGEX } from "@/utils/constants";

const templatePath = path.resolve(__dirname, "templates.json");

/**
 * 添加模板操作命令处理函数
 *
 * @param templateName 模板名称
 * @param templateUrl 模板URL
 * @param options 其他选项
 * @returns 无返回值
 * @throws 如果添加失败，则抛出异常
 */
export const addAction = async (
  templateName: string,
  templateUrl: string,
  options
) => {
  try {
    if (!HTTP_URL_REGEX.test(templateUrl)) {
      console.log(chalk.red("Please enter the correct URL!"));
      return;
    }
    const tempObj = (await readTemplates()) as Record<string, string>;
    tempObj[templateName.trim()] = templateUrl.trim();
    await fs.writeFile(templatePath, JSON.stringify(tempObj, null, 2));
    console.log(chalk.green("Added successfully!"));
  } catch (e) {
    console.log(chalk.red("Add failed!"));
  }
  process.exit();
};

/**
 * 从模板对象中删除指定模板名称对应的模板命令处理函数
 *
 * @param templateName 模板名称
 * @param options 其他选项（可选）
 */
export const removeAction = async (templateName: string, options) => {
  try {
    const tempObj = (await readTemplates()) as Record<string, string>;
    delete tempObj[templateName.trim()];
    await fs.writeFile(templatePath, JSON.stringify(tempObj, null, 2));
    console.log(chalk.green("Removed successfully!"));
  } catch (e) {
    console.log(chalk.red("Remove failed!"));
  }
  process.exit();
};

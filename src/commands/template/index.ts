import ora from "ora";
import path from "path";
import * as fs from "fs-extra";
import { readTemplateSync } from "@/utils";
import chalk from "chalk";

const templatePath = path.resolve(__dirname, "../../templates.json");

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
    if (!fs.existsSync(templatePath)) {
      fs.outputFileSync(templatePath, "{}");
    }
    const templateObj = readTemplateSync() as Record<string, string>;
    templateObj[templateName.trim()] = templateUrl.trim();
    fs.writeJSONSync(templatePath, templateObj, {
      encoding: "utf-8",
    });
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
    if (!fs.existsSync(templatePath)) {
      fs.outputFileSync(templatePath, "{}");
      process.exit();
    }
    const templateObj = readTemplateSync() as Record<string, string>;
    delete templateObj[templateName.trim()];
    fs.writeJSONSync(templatePath, templateObj, {
      encoding: "utf-8",
    });
    console.log(chalk.green("Removed successfully!"));
  } catch (e) {
    console.log(chalk.red("Remove failed!"));
  }
  process.exit();
};

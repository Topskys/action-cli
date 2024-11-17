import chalk from "chalk";
import { readTemplateSync } from "@/utils";
import * as pkg from "../../../package.json";

const name = Object.keys(pkg.bin)[0];

/**
 * list命令处理函数
 */
export default () => {
  const templates = readTemplateSync();
  console.log(
    Object.keys(templates)
      .map((k) => `${chalk.cyan(k)}：${templates[k]}`)
      .join("\n")
  );
  console.log(
    chalk.gray("\nUsage") +
      chalk.green(` ${name} add <template-name> <template-url> `) +
      chalk.gray("to add a template")
  );
  console.log(
    chalk.gray("Usage") +
      chalk.green(` ${name} remove <template-name> `) +
      chalk.gray("to remove a template") +
      "\n"
  );
  process.exit();
};

import { loading } from "@/utils";
import { LoadingOptions } from "@/utils/types";
import chalk from "chalk";
import process from "child_process";

/**
 * update命令处理函数
 */
export default async (options) => {
  let { tool } = options;
  const tools = ["npm", "cnpm", "pnpm", "yarn"];
  const loadingOptions: LoadingOptions = {
    cb: () => {
      if (!tools.includes(tool)) tool = "npm";
      process.execSync(`${tool} install action-cli@latest -g`);
    },
    okText: `${chalk.green("update successfully!")}`,
    failureText: `${chalk.red("update failed!")}`,
  };
  await loading(loadingOptions);
};

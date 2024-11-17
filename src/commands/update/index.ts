import chalk from "chalk";
import process from "child_process";
import { isPackageManger, loading } from "@/utils";
import { LoadingOptions } from "@/utils/types";

/**
 * update命令处理函数
 */
export default async (options) => {
  let { packageManager = "pnpm" } = options;
  const loadingOptions: LoadingOptions = {
    cb: () => {
      packageManager = isPackageManger(packageManager);
      process.execSync(`${packageManager} install action-cli@latest -g`);
    },
    okText: `${chalk.green("update successfully!")}`,
    failureText: `${chalk.red("update failed!")}`,
  };
  await loading(loadingOptions);
};

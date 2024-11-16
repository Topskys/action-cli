import ora from "ora";
import chalk from "chalk";
import * as path from "path";
import * as fs from "fs-extra";
import gitClone from "git-clone";
import axios from "axios";
import { NPM_URL } from "./constants";
import { LoadingOptions } from "./types";

// 重试次数
let retryCount = 0;

/**
 * 异步加载函数
 *
 * @param options 加载参数配置，包含回调函数
 * @param args 传递给回调函数的参数
 * @returns 回调函数执行的结果
 */
export async function loading(options: LoadingOptions, ...args) {
  // 解构参数
  const {
    message = "loading...\n",
    cb,
    succeedMessage = "Request succeed\n",
    failMessage = "Request fail\n",
    maxRetries = 2,
    retryDelay = 200,
  } = options;

  //  实例化加载动画
  const spinner = ora({
    text: message,
    spinner: {
      interval: 300,
      frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((v) =>
        chalk.blue(v)
      ),
    },
  });
  spinner.start();

  // 执行回调函数并等待其返回结果，如果执行失败则进行重试
  try {
    const result = await cb(...args);
    spinner.succeed(succeedMessage);
    return result;
  } catch (e) {
    if (retryCount <= maxRetries) {
      spinner.fail("Request fail, reTrying\n");
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, retryDelay);
      });
      return loading(options, ...args);
    } else {
      spinner.fail(failMessage);
    }
  }
}

/**
 * 克隆
 * @param targetDir 工作目录
 * @param projectName 项目名称
 * @param url git仓库地址
 */
export const clone = (projectName: string, targetDir: string, url: string) => {
  const spinner = ora(`Cloning ${url}...`);
  spinner.start();
  gitClone(url, targetDir, { checkout: "main" }, async function (err) {
    if (!err) {
      spinner.succeed(
        `Initialization ${projectName} successfully. Now run:\n` +
          chalk.cyan(`  cd ${projectName}\n  npm install\n  npm run dev`)
      );
      await fs.remove(path.join(targetDir, ".git"));
      process.exit();
    }
    spinner.fail(
      chalk.red(
        `Clone ${url} failed. ${
          typeof err == "string" ? err : JSON.stringify(err)
        }`
      )
    );
    process.exit();
  });
};

/**
 * 获取指定npm包的最新版本号
 *
 * @param name npm包名称
 * @returns 返回npm包的最新版本号，如果获取失败则返回undefined
 */
export async function getNpmLatestVersion(name: string) {
  let version: string;
  try {
    const npmPackageInfo = await axios.get(`${NPM_URL}${name}`);
    version = npmPackageInfo.data["dist-tags"].latest;
  } catch (err) {
    console.warn(err);
  }
  return version;
}

/**
 * 比较两个版本号的大小
 *
 * @param v1 第一个版本号，默认为 "0.0.0"
 * @param v2 第二个版本号，默认为 "0.0.0"
 * @param len 版本号的长度，默认为 3
 * @returns 如果 v1 大于 v2，则返回 true；否则返回 false
 */
function gt(v1 = "0.0.0", v2 = "0.0.0", len = 3) {
  const pad = (v) =>
    v.split(".").map(Number).concat(Array(len).fill(0)).slice(0, len);
  const [a, b] = [v1, v2].map(pad);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) return a[i] > b[i];
  }
  return false;
}

/**
 * 检查指定包是否有更新版本
 *
 * @param name 包名
 * @param version 当前版本号
 */
export async function checkVersion(name: string, version: string) {
  const latestVersion = await getNpmLatestVersion(name);
  const needUpdate = gt(latestVersion, version);
  if (needUpdate) {
    console.warn(
      `Detected latest version of action-cli: ${chalk.blackBright(
        latestVersion
      )}. Your current version is: ${chalk.blackBright(version)}`
    );
    console.log(
      `To update, use ${chalk.yellow(
        "npm install action-cli@latest -g"
      )}, or alternatively, run ${chalk.yellow("action update")}`
    );
  }
}

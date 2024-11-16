import ora from "ora";
import chalk from "chalk";
import * as path from 'path';
import * as fs from 'fs-extra';
import gitClone from 'git-clone';


/**
 * 加载中函数
 * @param message 加载中字符串（配置）
 * @param cb 回调函数
 * @param args 其他剩余参数，用于回调函数
 */
export async function loading(message = 'loading...', cb: Function, ...args: any[]) {
    const spinner = ora(message);
    spinner.start();
    try {
        const result = await cb(...args);
        spinner.succeed();
        return result;
    } catch (e) {
        spinner.fail("request fail, reTrying");
        await new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        return loading(message, cb, ...args);
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
    gitClone(url, targetDir, { checkout: 'main' }, async function (err) {
        if (!err) {
            spinner.succeed(`Initialization ${projectName} successfully. Now run:\n` + chalk.cyan(`  cd ${projectName}\n  npm install\n  npm run dev`));
            await fs.remove(path.join(targetDir, '.git'));
            process.exit();
        }
        spinner.fail(chalk.red(`Clone ${url} failed. ${typeof err == 'string' ? err : JSON.stringify(err)}`));
        process.exit();
    });
}

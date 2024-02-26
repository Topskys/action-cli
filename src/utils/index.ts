import ora from "ora";


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
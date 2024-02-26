import fs from "fs-extra";
import chalk from "chalk";

/**
 * 检查项目是否已经存在
 * @param path 目录
 * @returns Promise
 */
export const readDir = (path: string) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (!err) resolve('');
            reject(`${chalk.red('Note exists dir')} ${typeof err === 'string' ? err : JSON.stringify(err)}`);
        });
    })
}


/**
 * 创建项目工作目录
 * @param path 目录
 * @returns Promise
 */
export const mkdir = (path: string) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (!err) resolve('');
            reject(`${chalk.red('Can not make dir')} ${typeof err === 'string' ? err : JSON.stringify(err)}`);
        })
    })
}

/**
 * 删除目录
 * @param path 目录
 * @returns Promise
 */
export const remove = (path: string) => {
    return new Promise((resolve, reject) => {
        fs.rmdir(path, (err) => {
            if (!err) resolve('');
            reject(`${chalk.red('Can not remove dir')} ${typeof err === 'string' ? err : JSON.stringify(err)}`);
        })
    })
}


/**
 * 读取文件
 * @param path 路径
 * @returns Promise
 */
export const readFile = (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
            if (!err) resolve(data);
            reject(chalk.red(`Can not read ${path} \n ${typeof err === 'string' ? err : JSON.stringify(err)}`));
        })
    })
}


/**
 * 移动文件
 * @param oldPath 旧的路径
 * @param newPath 新路径
 * @returns Promise
 */
export const move = (oldPath: string, newPath: string) => {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (!err) resolve('');
            reject(`${chalk.red('Can not rename')} \n ${typeof err === 'string' ? err : JSON.stringify(err)}`);
        })
    })
}
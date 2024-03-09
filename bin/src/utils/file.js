"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.move = exports.readFile = exports.remove = exports.mkdir = exports.readDir = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var chalk_1 = __importDefault(require("chalk"));
/**
 * 检查项目是否已经存在
 * @param path 目录
 * @returns Promise
 */
var readDir = function (path) {
    return new Promise(function (resolve, reject) {
        fs_extra_1.default.readdir(path, function (err, files) {
            if (!err)
                resolve('');
            reject("".concat(chalk_1.default.red('Note exists dir'), " ").concat(typeof err === 'string' ? err : JSON.stringify(err)));
        });
    });
};
exports.readDir = readDir;
/**
 * 创建项目工作目录
 * @param path 目录
 * @returns Promise
 */
var mkdir = function (path) {
    return new Promise(function (resolve, reject) {
        fs_extra_1.default.mkdir(path, function (err) {
            if (!err)
                resolve('');
            reject("".concat(chalk_1.default.red('Can not make dir'), " ").concat(typeof err === 'string' ? err : JSON.stringify(err)));
        });
    });
};
exports.mkdir = mkdir;
/**
 * 删除目录
 * @param path 目录
 * @returns Promise
 */
var remove = function (path) {
    return new Promise(function (resolve, reject) {
        fs_extra_1.default.rmdir(path, function (err) {
            if (!err)
                resolve('');
            reject("".concat(chalk_1.default.red('Can not remove dir'), " ").concat(typeof err === 'string' ? err : JSON.stringify(err)));
        });
    });
};
exports.remove = remove;
/**
 * 读取文件
 * @param path 路径
 * @returns Promise
 */
var readFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs_extra_1.default.readFile(path, { encoding: 'utf-8' }, function (err, data) {
            if (!err)
                resolve(data);
            reject(chalk_1.default.red("Can not read ".concat(path, " \n ").concat(typeof err === 'string' ? err : JSON.stringify(err))));
        });
    });
};
exports.readFile = readFile;
/**
 * 移动文件
 * @param oldPath 旧的路径
 * @param newPath 新路径
 * @returns Promise
 */
var move = function (oldPath, newPath) {
    return new Promise(function (resolve, reject) {
        fs_extra_1.default.rename(oldPath, newPath, function (err) {
            if (!err)
                resolve('');
            reject("".concat(chalk_1.default.red('Can not rename'), " \n ").concat(typeof err === 'string' ? err : JSON.stringify(err)));
        });
    });
};
exports.move = move;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.move = exports.readFile = exports.remove = exports.mkdir = exports.readDir = void 0;
var fs = __importStar(require("fs-extra"));
var chalk_1 = __importDefault(require("chalk"));
/**
 * 检查项目是否已经存在
 * @param path 目录
 * @returns Promise
 */
var readDir = function (path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (err, files) {
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
        fs.mkdir(path, function (err) {
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
        fs.rmdir(path, function (err) {
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
        fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
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
        fs.rename(oldPath, newPath, function (err) {
            if (!err)
                resolve('');
            reject("".concat(chalk_1.default.red('Can not rename'), " \n ").concat(typeof err === 'string' ? err : JSON.stringify(err)));
        });
    });
};
exports.move = move;

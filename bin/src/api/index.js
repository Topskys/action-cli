"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = void 0;
var chalk_1 = __importDefault(require("chalk"));
exports.baseUrl = 'https://api.example.com';
var service = function (url, options) {
    return fetch(exports.baseUrl + url, options).then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 将响应数据解析为JSON格式
    }).catch(function (error) {
        // 处理请求过程中的错误
        console.error(chalk_1.default.red('Fetch请求出现问题'), typeof error == 'string' ? error : JSON.stringify(error));
        process.abort();
    });
};
exports.default = service;

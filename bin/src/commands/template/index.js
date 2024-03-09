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
exports.removeAction = exports.addAction = void 0;
var ora_1 = __importDefault(require("ora"));
var fs = __importStar(require("fs-extra"));
/**
 * add命令处理函数
 */
var addAction = function (templateName, templateUrl, options) {
    var spinner = (0, ora_1.default)('Updating template...');
    spinner.start();
    var templates = JSON.parse(fs.readFileSync('template.json', { encoding: 'utf-8' }));
    templates[templateName.trim()] = templateUrl.trim();
    fs.writeFileSync('template.json', JSON.stringify(templates, null, 2));
    spinner.succeed('Updated successfully!');
    process.exit();
};
exports.addAction = addAction;
/**
 * remove命令处理函数
 */
var removeAction = function (templateName, options) {
    var spinner = (0, ora_1.default)('Removing template...');
    spinner.start();
    var templates = JSON.parse(fs.readFileSync('template.json', { encoding: 'utf-8' }));
    if (templates[templateName.trim()]) {
        delete templates[templateName.trim()];
        fs.writeFileSync('template.json', JSON.stringify(templates, null, 2));
    }
    spinner.succeed('Removed successfully!');
    process.exit();
};
exports.removeAction = removeAction;

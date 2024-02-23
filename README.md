# Cli

## 初始化

```bash
# 初始化项目，该命令会提示你填写一些关于项目的信息，例如项目名称、版本、描述等。-y 参数表示所有提示都使用默认值，从而快速完成项目初始化。
npm init -y
# 新建./bin/entry文件并写入：
#! /usr/bin/env node
require('../index.js')
# 新建一个名为i./index.js的文件，作为可执行文件的入口文件，写入：
console.log('Hello World!')
# 修改package.json文件，将"bin"字段的值设置为"entry"，表示可执行文件名为entry。
# link到全局
cnpm link
# 测试
sun # 成功打印出Hello World!
```

## 安装依赖

```bash
# 安装commander模块，该模块用于处理命令行参数。
npm i commander@9.0.0
# 安装inquirer模块，该模块用于实现交互式命令行界面。
npm i inquirer@8.2.1
# 安装chalk模块，该模块用于添加颜色和样式到控制台输出。
npm i chalk@4.0.0
# 安装ora模块，该模块用于显示动画加载效果。
npm i ora@5.4.1
# 安装figlet模块，该模块用于生成ASCII艺术字。
npm i figlet@1.5.2
# 安装download-git-repo模块，该模块用于下载并提取Github/Git(template本地)仓库中的文件。
npm i download-git-repo@3.0.2
# 安装handlebars模块，该模块用于处理模板文件。
npm i handlebars@4.7.6
# 安装fs-extra模块，该模块用于对文件系统进行更强大的操作。
npm i fs-extra@10.0.1
# 安装log-symbols模块，该模块用于在控制台输出不同类型的日志符号。
npm i log-symbols@4.1.0
# 安装axios模块，该模块用于发起HTTP请求。
npm i axios@0.26.1
# 安装gitee-repo模块，该模块用于从Gitee仓库中下载模板文件。
npm i gitee-repo@0.0.2
```
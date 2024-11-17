# Action-cli

![Action-cli](https://img.shields.io/badge/Action-cli)
![NPM Version](https://img.shields.io/npm/v/action-cli)
![NPM Downloads](https://img.shields.io/npm/dy/action-cli)


[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://github.com/Topskys/action-cli)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Topskys/action-cli)

Action-cli is a CLI focused on powering the start of developer's web  project.

## ⚡ Installation
```sh
# global install
npm install -g action-cli
```

## 🚀 Usage

**Create**

Create a new project:
```sh
# create a new project
action create demo

```
Your can create a new project with the template of your choice:

```sh
# create a new project with the react+ts template
action create demo --template react+ts
# or
action create demo --template https://github.com/demo/react-admin-template.git

```

You can use the web-based UI to create a new project:
```sh
# open the web-based UI
action ui
```
**Template**

Show available templates:
```sh
# list available templates
action list
```
Add or remove a template:

```sh
# add a new template
action add vue-ts https://github.com/demo/vue-admin-template.git

# remove an existing template
action remove vue-ts
```

**Update**

When a new version is detected, you can use this command to update the scaffolding.
update action-cli:
```sh
# update action-cli
action update
```

**Help**

show help:
```sh
# show help
action help

# show help for command
action help create
```


## ✨ Changelog

- 重构create命令
- create命令新增分支、包管理器、自定命令功能
- 重构list命令
- 重构template命令
- 新增update命令，支持检测脚手架版本更新
- 优化打包体积

## ✨ Features

**Features:**


| command	| description	| option	| description |
| ------------ | ------------ | ------------ | ------------ |
| create \<project-name> | Create a project | 	-f，--force	|Overwrite target directory if it exists|
|    |  |--template <template-name>	| template or git-url（string）|
| list |	List available templates |	-	| - |
| add \<template-name> \<template-url> |	Add a new template	| - |	- |
| remove \<template-name> | Remove an existing template	| - |	- |
| ui	| Open the web-based UI |	-p, --port [port]	|Specify port (number)|
|-| -|-h, --host [host]	| Specify hostname (string)|
|-	|-|	-V，--version	|Display version number|
|-|-|-h，--help	|Display available CLI options|
| help [command]	|Display help for command|	--help	|Display help for command|
| ...|	-|	-|	-|


## Pictures
![Action-cli](https://github.com/Topskys/action-cli/blob/main/src/static/50f1ea3e69c84525889ff872e6aa07ad.png)

![Example](https://github.com/Topskys/action-cli/blob/main/src/static/f1ad8257d7db42019781cd69e0660c8a.png)


## 🛠️ Run

Development
```sh
# clone repo
git clone https://github.com/Topskys/action-cli.git

# install dependencies
pnpm install

# transform
pnpm run build

# global link
pnpm link

# todo
action create demo
```

## NPM
```sh
# login（https://registry.npmjs.org/） 
npm login
# publish
npm publish
```

## Blog
[CSDN](https://blog.csdn.net/qq_58062502)

## Git 提交规范参考

- `feat` 增加新的业务功能
- `fix` 修复业务问题/BUG
- `perf` 优化性能
- `style` 更改代码风格, 不影响运行结果
- `refactor` 重构代码
- `revert` 撤销更改
- `test` 测试相关, 不涉及业务代码的更改
- `docs` 文档和注释相关
- `chore` 更新依赖/修改脚手架配置等琐事
- `workflow` 工作流改进
- `ci` 持续集成相关
- `types` 类型定义文件更改
- `wip` 开发中

## Thanks

[【前端脚手架】实现一个自己的脚手架](https://www.bilibili.com/video/BV1PB4y1j7DY/?p=7&share_source=copy_web&vd_source=d50c6b3216dda73ea5961ad06d492fa2)

[【手把手教你实现前端脚手架】](https://www.bilibili.com/video/BV14o4y1T7Ra/?share_source=copy_web&vd_source=d50c6b3216dda73ea5961ad06d492fa2)

[【nebula-cli-frontend】](https://www.npmjs.com/package/nebula-cli-frontend)
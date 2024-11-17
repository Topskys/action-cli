# Action-cli

![Action-cli](https://img.shields.io/badge/Action-cli)
![NPM Version](https://img.shields.io/npm/v/action-cli)
![NPM Downloads](https://img.shields.io/npm/dy/action-cli)


[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/action-cli)
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
# create a new project with the react template
action create demo --template react
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

- Refactor the create command

- Add features to the create command including branching, package manager, automatic execution, and custom commands

- Refactor the list command

- Refactor the template command

- Add the update command, which supports detecting scaffolding version updates

- Optimize packaging


## ✨ Features


| command	| description	| option	| description |
| ------------ | ------------ | ------------ | ------------ |
| create \<project-name> | Create a project |-t, --template [template-name]	| template or git-url（string）|
|    |  | 	-f, --force	|Overwrite target directory if it exists|
|    |  |-b, --branch [branch-name]	| Specify a branch to clone |
|    |  |-r, --run	| Run the project after creation |
|    |  |-c, --command [command]	| Specify a command to run |
|    |  |-pm, --packageManager [package-manager]	| Specify a package manager to use |
| list |	List available templates |	-	| - |
| add \<template-name> \<template-url> |	Add a new template	| - |	- |
| remove \<template-name> | Remove an existing template	| - |	- |
| update | Update the cli to the latest version	| - |	- |
| ui	| Open the web-based UI |	-p, --port [port]	|Specify port (number)|
|-| -|-h,  --host [host]	| Specify hostname (string)|
|-	|-|	-V，--version	|Display version number|
|-|-|-h，--help	|Display available CLI options|
| help [command]	|Display help for command|	--help	|Display help for command|
| ...|	-|	-|	-|


## Screenshots


![o1](https://i-blog.csdnimg.cn/blog_migrate/e302771d8c20af304879a645d8bdb41b.png)


## Repository

[Topskys/action-cli](https://github.com/Topskys/action-cli)

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

## Blog

[实现一个自定义前端脚手架_前端自定义脚手架-CSDN博客](https://blog.csdn.net/qq_58062502/article/details/136307480?fromshare=blogdetail&sharetype=blogdetail&sharerId=136307480&sharerefer=PC&sharesource=qq_58062502&sharefrom=from_link)

## Thanks

[【前端脚手架】实现一个自己的脚手架](https://www.bilibili.com/video/BV1PB4y1j7DY/?p=7&share_source=copy_web&vd_source=d50c6b3216dda73ea5961ad06d492fa2)

[【手把手教你实现前端脚手架】](https://www.bilibili.com/video/BV14o4y1T7Ra/?share_source=copy_web&vd_source=d50c6b3216dda73ea5961ad06d492fa2)

[【nebula-cli-frontend】](https://www.npmjs.com/package/nebula-cli-frontend)
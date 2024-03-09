# Action-cli
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/nuke-cli)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cl4pper/nuke-cli)

Action-cli is a CLI focused on powering the start of developer's web  project.

**Features:**

| command	| description	| option	| description |
| ------------ | ------------ | ------------ | ------------ |
| create <project-name> | Create a project | 	-f，--force	|Overwrite target directory if it exists|
|    |  |--template <template-name>	| template or git-url（string）|
|list |	List available templates |	-	| - |
|add <template-name> <template-url>|	Add a new template	| - |	- |
| remove <template-name> | Remove an existing template	| - |	- |
|ui	| Open the web-based UI |	-p, --port [port]	|Specify port (number)|
|-| -|-h, --host [host]	| Specify hostname (string)|
|-	|-|	-V，--version	|Display version number|
|-|-|-h，--help	|Display available CLI options|
|help [command]	|Display help for command|	--help	|Display help for command|
| ...|	-|	-|	-|


## ⚡ Installation
```sh
# global install
npm install -g action-cli
```

## 🚀 Usage
```sh
# create a new project
action create demo -f --template react+ts
# or
action create demo -f --template https://github.com/demo/react-admin-template.git

# list available templates
action list

# add a new template
action add vue+ts https://github.com/demo/vue-admin-template.git

# remove an existing template
action remove vue+ts

# open the web-based UI
action ui

# display help for command
action help

# ...
```
## Pictures
[]()


## Run
Development
```sh
# install dependencies
pnpm install
# transform
pnpm run build
# global link
pnpm link
# todo
action create demo
```


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
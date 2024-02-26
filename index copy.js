const program = require("commander"); // 解析命令
const chalk = require("chalk");// 命令行美化
const Inquirer = require("inquirer"); // 命令行交互
const figlet = require("figlet"); // 命令行艺术



program.name("sun").usage(`<command>[option]`).version("1.0.0");
// console.log(`${chalk.green.underline.bold("Hello, sun!")} me`);

// new Inquirer.prompt([
//     {
//         name: "vue",
//         type: "checkbox",
//         message: "Check the feature needed for your project",
//         choices: [
//             {
//                 name: "Babel",
//                 checked: "true",
//             },
//             {
//                 name: "TypeScript",
//             }
//         ]
//     }
// ]);


// console.log(
//     "\r\n" +
//     figlet.textSync("sunny", {
//         font: "Ghost",
//         horizontalLayout: 'default',
//         verticalLayout: 'default',
//         width: 80,
//         whitespaceBreak: true
//     })
// )


program.command("create <project-name>").description("create a new project")
    .option("-f,--force", "overwrite target directory if it exists")
    .action((projectName, cmd) => {
        // 处理用户输入Create指令附加的参数
        // console.log(projectName, cmd) // demo { force: true }
    })


program.parse(process.argv);
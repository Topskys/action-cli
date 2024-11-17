import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import commands from "@/commands";
import { checkVersion, getPackageJson } from "@/utils";

const program = new Command();
const pkg = getPackageJson();
const name = Object.keys(pkg.bin)[0];

program
  .name(name)
  .usage(`<command> [option]`)
  .helpOption("-h,--help")
  .version(`${pkg.name} ${pkg.version}`);

// 注册命令  
Object.keys(commands).forEach((command) => {
  const current = program.command(command);
  if (commands[command].options && commands[command].options.length > 0) {
    commands[command].options.forEach((item) => {
      current.option(item?.cmd, item?.msg);
    });
  }
  current.action(commands[command].action);
  current.description(commands[command].description);
});

program.on("--help", (...args) => {
  console.log(
    `\r\n${figlet.textSync("Action-cli", {
      font: "3D-ASCII",
      horizontalLayout: "default",
      verticalLayout: "default",
      // width: 120,
      whitespaceBreak: true,
    })}\nRun ${chalk.cyan(
      name + " <command> --help"
    )} for detailed usage of given command.`
  );
});

// 检查版本信息
checkVersion(pkg.name, pkg.version);
// 解析命令
program.parse();

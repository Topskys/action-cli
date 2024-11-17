import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

export default defineConfig([
  {
    input: {
      index: "src/index.ts",
    },
    output: [
      {
        dir: "dist",
        format: "cjs",
      },
    ],
    plugins: [
      nodeResolve(),
      externals({
        devDeps: false, // 可以识别我们 package.json 中的依赖当作外部依赖处理 不会直接将其中引用的方法打包出来
      }),
      typescript(),
      json(),
      commonjs(),
      terser(),
      copy({
        targets: [
          {
            src: "src/templates.json", // 源路径
            dest: "dist", // 目标路径
          }, // 复制 templates.json 到 dist 目录下
        ],
        copyOnce: true, // 只复制一次
      }),
    ],
  },
]);

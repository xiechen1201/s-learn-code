import pluginJson from "@rollup/plugin-json";
import pluginTerser from "@rollup/plugin-terser";

export default {
    input: "./src/main.js",
    /* output: {
        file: "./dist/bundle.js",
        // 打包后的格式
        format: "cjs"
    }, */
    output: [
        {
            file: "./dist/bundle.js",
            format: "cjs"
        },
        {
            file: "./dist/bundle.min.js",
            format: "iife",
            name: "version",
            plugins: [pluginTerser()]
        }
    ],
    // 使用插件
    plugins: [pluginJson()]
};

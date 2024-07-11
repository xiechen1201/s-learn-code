/* import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { name as packageName } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    lib: {
      entry: './src/main.js', // 入口文件
      name: packageName,
      formats: ['umd'], // 使用 UMD 格式
      fileName: (format) => `${packageName}-${format}.js`
    },
    rollupOptions: {
      output: {
        // 保持输出文件名称格式与 Webpack 类似
        entryFileNames: `${packageName}-[name].js`,
        chunkFileNames: `${packageName}-[name].js`
      }
    }
  },
  plugins: [vue()]
});
 */

// ===============

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';

export default defineConfig({
  plugins: [
    vue(),
    qiankun('app-vue3', {
      useDevMode: true
    })
  ],
  server: {
    port: 7001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});

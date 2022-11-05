/// <reference types="vitest" />
import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
// import fs from 'fs/promises'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import { resolve } from 'path';

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_PORT, VITE_DROP_CONSOLE, VITE_DROP_DEBUGGER } = env;

  return {
    test: {
      environment: 'jsdom',
      includeSource: ['src/**/*.{js,ts,vue,tsx,jsx}'],
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
      deps: {
        inline: ['ant-design-vue'],
      },
    },
    // esbuild: {
    //   jsxFactory: 'h',
    //   loader: 'jsx',
    //   include: /src\/((?!type=template).)*\.tsx?$/,
    //   exclude: [],
    // },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     plugins: [
    //       {
    //         name: 'load-js-files-as-jsx',
    //         setup(build) {
    //           build.onLoad(
    //             { filter: /src\/((?!type=template).)*\.tsx?$/ },
    //             async (args) => ({
    //               loader: 'jsx',
    //               contents: await fs.readFile(args.path, 'utf8'),
    //             })
    //           );
    //         },
    //       },
    //     ],
    //   },
    // },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    resolve: {
      // 定义别名
      alias: {
        '@': resolve(__dirname, 'src'),
        '@store': resolve(__dirname, 'src/store'),
        '@components': resolve(__dirname, 'src/components'),
        '@util': resolve(__dirname, 'src/util'),
      },
    },
    build: {
      target: 'modules',
      outDir: 'dist', // 指定输出路径
      assetsDir: 'static', // 指定生成静态资源的存放路径
      minify: 'terser', // 混淆器,terser构建后文件体积更小
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: Boolean(VITE_DROP_CONSOLE), // 生产环境移除console
          drop_debugger: Boolean(VITE_DROP_DEBUGGER), // 生产环境移除debugger
        },
      },
      rollupOptions: {
        treeshake: false,
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
    server: {
      open: true, // 是否在浏览器打开
      port: Number(VITE_PORT), // 端口号
      host: '127.0.0.1',
    },
  };
};

/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    includeSource: ['src/**/*.{js,ts,vue,tsx,jsx}'],
    deps: {
      inline: [
        "ant-design-vue"
      ]
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver()],
    })
  ],
  resolve: {
    // 定义别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@util': path.resolve(__dirname, 'src/util')
    }
  },
  build: {
    target: 'modules',
    outDir: 'dist', // 指定输出路径
    assetsDir: 'static', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器,terser构建后文件体积更小
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true // 生产环境移除debugger
      }
    },
    rollupOptions: {
      treeshake: false,
      output: {
        manualChunks (id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  server: {
    open: true, // 是否在浏览器打开
    port: 8088, // 端口号
    host: '127.0.0.1'
  },
})

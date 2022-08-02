import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // 引入jsx组件

// 让调试工具显示组件名字
import vueSetupExtend from 'vite-plugin-vue-setup-extend'


// #1 配置 @ 路径别名
import path from 'path' // es6语法

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend(), vueJsx()],

  // #2 配置 @ 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // QQ 三方登录的回调uri为：http://www.corho.com:8080/#/login/callback
    // vite 中配置：www.corho.com:8080
    host: 'www.corho.com',
    port: 8080,
    // open: true,
    // cors: true, // 允许开发时 AJAX 跨域
  },

  // 自动导入 less 变量 和 mixins
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
                @import "@/assets/styles/variables.less";
                @import "@/assets/styles/mixins.less";
            `,
      },
    },
  },
})


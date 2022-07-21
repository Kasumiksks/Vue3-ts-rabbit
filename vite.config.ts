import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 让调试工具显示组件名字
import vueSetupExtend from 'vite-plugin-vue-setup-extend'


// #1 配置 @ 路径别名
import path from 'path' // es6语法

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],

  // #2 配置 @ 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
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

/*
 * @Author: Kasumi
 * @Date: 2022-07-24 09:43:29
 * @LastEditTime: 2022-07-24 10:06:53
 * @LastEditors: Kasumi
 * @Description: 使用 useIntersectionObserver 实现图片懒加载, 封装一个自定义指令
 * @FilePath: \vite-project-xtx\src\directives\index.ts
 * 你所热爱的, 就是你的生活
 */
import { App } from 'vue'
import defaultImg from '@/assets/images/200.png'
import { useIntersectionObserver } from '@vueuse/core'

export default {
  install(app: App) {
    app.directive('lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 把传过来的地址给图片真正的 src 属性
            el.src = binding.value

            // 加载失败给一个默认图片
            el.onerror = function () {
              this.src = defaultImg
            }

            // 停止监听
            stop()
          }
        })
      }
    })
  }
}

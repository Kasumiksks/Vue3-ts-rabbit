/*
 * @Author: Kasumi
 * @Date: 2022-07-24 10:15:06
 * @LastEditTime: 2022-07-24 10:29:33
 * @LastEditors: Kasumi
 * @Description: 数据懒加载工具组件
 * @FilePath: \vite-project-xtx\src\utils\hooks.ts
 * 你所热爱的, 就是你的生活
 */

import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export function useLazyData(callback: () => void) {
  // #1
  const target = ref(null)
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // #2
    if (isIntersecting) {
      stop()
      callback()
    }
  })
  // #3
  return target
}
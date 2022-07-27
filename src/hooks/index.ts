/*
 * @Author: Kasumi
 * @Date: 2022-07-27 20:14:15
 * @LastEditTime: 2022-07-27 20:14:19
 * @LastEditors: Kasumi
 * @Description: 倒计时组件
 * @FilePath: \vite-project-xtx\src\hooks\index.ts
 * 你所热爱的, 就是你的生活
 */
import { useIntervalFn } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

export function useCountDown(count: number = 60) {
  const time = ref(0)
  const { pause, resume } = useIntervalFn(
    () => {
      if (time.value <= 0) {
        time.value = 0
        return pause()
      }
      time.value--
    },
    1000,
    {
      immediate: false,
    }
  )

  // 组件销毁时清除定时器
  onUnmounted(() => {
    pause()
  })

  const start = (num?: number) => {
    time.value = num || count
    resume()
  }

  return {
    time,
    start,
  }
}
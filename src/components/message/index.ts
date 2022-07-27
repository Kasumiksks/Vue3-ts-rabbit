import { h, render } from 'vue'
import XtxMessage from './message.vue'

type Props = {
  type: 'success' | 'error' | 'warning'
  text: string

  duration?: number // 延迟2s后自动关闭
}

Message.error = function (text: string, duration = 2000) {
  Message({
    type: 'error',
    text,
    duration,
  })
}
Message.success = function (text: string, duration = 2000) {
  Message({
    type: 'success',
    text,
    duration,
  })
}
Message.warning = function (text: string, duration = 2000) {
  Message({
    type: 'warning',
    text,
    duration,
  })
}

const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

let timer: number = -1

export default function Message({ type, text, duration = 2000 }: Props) {
  const vNode = h(XtxMessage, { type, text })
  render(vNode, div)

  // 延迟2s后自动关闭
  clearTimeout(timer)
  // #4
  timer = window.setTimeout(() => {
    render(null, div)
  }, duration)
}
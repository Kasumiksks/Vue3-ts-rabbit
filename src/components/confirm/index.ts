import { h, render } from 'vue'
import XtxConfirm from './confirm.vue'
type Props = { text: string; title?: string }

const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

export default function Confirm({ text, title }: Props) {
  // #mark
  return new Promise((resolve, reject) => {
    const confirmCallback = () => {
      render(null, div)
      resolve(undefined)
    }
    const cancelCallback = () => {
      render(null, div)
      reject(undefined)
    }
    const vNode = h(XtxConfirm, {
      title,
      text,
      confirmCallback,
      cancelCallback,
    })
    render(vNode, div)
  })
}

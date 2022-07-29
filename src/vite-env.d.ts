/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type loginFn = ({ btnId: string }) => void
type loginObj = {
  // 检查 QQ 是否登录成功
  check: () => boolean
  // 获取 openId
  getMe: (callback: (openId: string) => void) => void
}

declare namespace QC {
  const Login: loginObj | loginFn
  const api: (api: 'get_user_info') => { success: (res: any) => void }
}
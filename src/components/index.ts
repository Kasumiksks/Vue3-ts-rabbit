// 统一的注册所有的全局组件
import XtxSkeleton from './skeleton/index.vue' // 骨架屏组件
import XtxCarousel from './carousel/index.vue' // 轮播图组件
import XtxMore from './more/index.vue'

import { App } from 'vue'
export default {
  install(app: App) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component('XtxMore', XtxMore)
  }
}
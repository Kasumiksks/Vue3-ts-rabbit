// 统一的注册所有的全局组件
import XtxSkeleton from './skeleton/index.vue' // 骨架屏组件
import XtxCarousel from './carousel/index.vue' // 轮播图组件
import XtxMore from './more/index.vue' // 商品顶部样式组件
import Bread from '@/components/bread/index.vue'    // 面包屑组件
import BreadItem from '@/components/bread/item.vue' // 面包屑组件
import XtxCity from '@/components/city/index.vue' // 城市选择组件
import XtxNumbox from '@/components/numbox/index.vue' // 数量选择组件


import { App } from 'vue'
export default {
  install(app: App) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component('XtxMore', XtxMore)
    app.component(Bread.name, Bread)
    app.component(BreadItem.name, BreadItem)
    app.component(XtxCity.name, XtxCity)
    app.component(XtxNumbox.name, XtxNumbox)
  }
}
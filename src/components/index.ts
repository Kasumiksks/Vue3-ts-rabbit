// 统一的注册所有的全局组件
import XtxSkeleton from './skeleton/index.vue' // 骨架屏组件
import XtxCarousel from './carousel/index.vue' // 轮播图组件
import XtxMore from './more/index.vue' // 商品顶部样式组件
import Bread from '@/components/bread/index.vue'    // 面包屑组件
import BreadItem from '@/components/bread/item.vue' // 面包屑组件
import XtxCity from '@/components/city/index.vue' // 城市选择组件
import XtxNumbox from '@/components/numbox/index.vue' // 数量选择组件
import XtxButton from '@/components/button/index.vue' // 按钮组件
import XtxCheckbox from '@/components/checkbox/index.vue' // 登录页面的多选框组件
import XtxMessage from '@/components/message/message.vue' // 消息提示组件
import XtxDialog from '@/components/dialog/index.vue' // 购物车结算界面的对话框组件
import XtxSwicth from '@/components/switch/index.vue'
import XtxTabs from '@/components/tabs/index.vue'
import XtxTabsPanel from '@/components/tabs/panel.vue'


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
    app.component(XtxButton.name, XtxButton)
    app.component(XtxCheckbox.name, XtxCheckbox)
    app.component(XtxMessage.name, XtxMessage)
    app.component('XtxDialog', XtxDialog)
    app.component(XtxSwicth.name, XtxSwicth)
    app.component(XtxTabs.name, XtxTabs)
    app.component(XtxTabsPanel.name, XtxTabsPanel)
  }
}
// 定义全局组件类型
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import Bread from '@/components/bread/index.vue'
import BreadItem from '@/components/bread/item.vue'
import XtxCity from '@/components/city/index.vue'
import XtxNumbox from '@/components/numbox/index.vue'
import XtxButton from '@/components/button/index.vue'
import XtxCheckbox from '@/components/button/index.vue'
import XtxMessage from '@/components/message/message.vue'
import XtxDialog from '@/components/dialog/index.vue'
import XtxSwicth from '@/components/switch/index.vue'
import XtxTabs from '@/components/tabs/index.vue'
import XtxTabsPanel from '@/components/tabs/panel.vue'


declare module 'vue' {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton
    XtxCarousel: typeof XtxCarousel
    XtxMore: typeof XtxMore
    Bread: typeof Bread
    BreadItem: typeof BreadItem
    XtxCity: typeof XtxCity
    XtxNumbox: typeof XtxNumbox
    XtxButton: typeof XtxButton
    XtxCheckbox: typeof XtxCheckbox
    XtxMessage: typeof XtxMessage
    XtxDialog: typeof XtxDialog
    XtxSwicth: typeof XtxSwicth
    XtxTabs: typeof XtxTabs
    XtxTabsPanel: typeof XtxTabsPanel
  }
}
export { }
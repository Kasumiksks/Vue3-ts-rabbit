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
  }
}
export { }
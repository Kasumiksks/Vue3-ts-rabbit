// 定义全局组件类型
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import Bread from '@/components/bread/index.vue'
import BreadItem from '@/components/bread/item.vue'
import XtxCity from '@/components/city/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton
    XtxCarousel: typeof XtxCarousel
    XtxMore: typeof XtxMore
    Bread: typeof Bread
    BreadItem: typeof BreadItem
    XtxCity: typeof XtxCity
  }
}
export { }
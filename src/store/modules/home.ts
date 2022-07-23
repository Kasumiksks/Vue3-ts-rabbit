import { defineStore } from "pinia";
import { BannerItem, GoodsHot, GoodsNew } from '@/types/goods'
import request from "@/utils/request";
import { TResponse } from "@/types/data";

export default defineStore('home', {
  state: () => ({
    bannerList: [] as BannerItem[],
    newGoodsList: [] as GoodsNew[],
    hotGoosList: [] as GoodsHot[]
  }),
  actions: {
    async getBannerList() {
      // 获取轮播图数据
      const res = await request.get<TResponse<BannerItem[]>>('/home/banner')
      this.bannerList = res.data.result
    },
    async getNewGoodsList() {
      // 获取新鲜好物数据
      const res = await request.get<TResponse<GoodsNew[]>>('home/new')
      this.newGoodsList = res.data.result
    },
    async getHotGoodsList() {
      // 获取人气推荐数据
      const res = await request.get<TResponse<GoodsHot[]>>('home/hot')
      console.log(res);

      this.hotGoosList = res.data.result
    }
  }
})
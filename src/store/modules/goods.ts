import request from "../../utils/request";
import { defineStore } from "pinia";
import { TResponse } from "@/types/data";
import { GoodsInfo } from "@/types/goods";


export default defineStore('goods', {
  state: () => ({
    info: {} as GoodsInfo
  }),
  actions: {
    async getGoodsInfo(id: string) {
      const res = await request.get<TResponse<GoodsInfo>>('/goods', {
        params: {
          id,
        },
      })
      console.log(res);
      this.info = res.data.result
    },
    resetGoodsInfo() {
      this.info = {} as GoodsInfo
    },
  }
})
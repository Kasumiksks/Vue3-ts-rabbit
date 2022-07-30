import { CartItem } from "@/types/cart";
import { TResponse } from "@/types/data";
import request from "@/utils/request";
import { defineStore } from "pinia";

export default defineStore('cart', {
  state: () => {
    return {
      list: [] as CartItem[], // 购物车数组
    }
  },
  actions: {
    // 添加到购物车的函数
    async addCart(data: { skuId: string; count: number }) {
      await request.post('/member/cart', data)
      this.getCartList() //重新渲染
    },

    // 获取购物车列表
    async getCartList() {
      const res = await request.get<TResponse<CartItem[]>>('/member/cart')
      this.list = res.data.result
    },

    // 删除购物车
    async deleteCart(skuIds: string[]) {
      await request.delete('/member/cart', {
        data: { ids: skuIds }
      })
      this.getCartList()
    }
  },
  getters: {
    // 计算有效商品列表 isEffective = true  filter
    effectiveList(): CartItem[] {
      return this.list.filter((item) => item.stock > 0 && item.isEffective)
    },
    // 有效商品总数量 把effctiveList中的每一项的count叠加起来
    effectiveListCounts(): number {
      return this.effectiveList.reduce((sum, item) => sum + item.count, 0)
    },
    // 总钱数  = 所有单项的钱数累加  单项的钱数 = 数量 * 单价
    effectiveListPrice(): string {
      return this.effectiveList
        .reduce((sum, item) => sum + item.count * Number(item.nowPrice), 0)
        .toFixed(2)
    }
  }
})
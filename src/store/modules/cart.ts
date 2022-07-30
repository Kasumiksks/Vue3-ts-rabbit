import { CartItem } from "@/types/cart";
import { TResponse } from "@/types/data";
import request from "@/utils/request";
import { defineStore } from "pinia";
import useStore from "..";

const useCartStore = defineStore('cart', {
  persist: true, // 开启持久化存储
  state: () => {
    return {
      list: [] as CartItem[], // 购物车数组
    }
  },
  actions: {
    // 添加到购物车的函数
    async addCart(data: CartItem) {
      if (this.isLogin) {
        const { skuId, count } = data
        await request.post('/member/cart', { skuId, count })
        this.getCartList()
      } else {
        const goods = this.list.find((item) => item.skuId === data.skuId)
        if (goods) {
          goods.count += data.count
        } else {
          this.list.unshift(data)
        }
      }
    },

    // 获取购物车列表
    async getCartList() {
      if (this.isLogin) {
        const res = await request.get<TResponse<CartItem[]>>('/member/cart')
        this.list = res.data.result
      } else {
        // 遍历发送请求, 校验更新sku商品的库存和价格, 是否有效
        this.list.forEach(async (cartItem) => {
          const { skuId } = cartItem
          // 根据 skuId 获取最新商品信息
          const res = await request.get<TResponse<CartItem>>(
            `/goods/stock/${skuId}`
          )
          // 保存最新商品信息
          const lastCartInfo = res.data.result
          // 更新商品现价
          cartItem.nowPrice = lastCartInfo.nowPrice
          // 更新商品库存
          cartItem.stock = lastCartInfo.stock
          // 更新商品是否有效
          cartItem.isEffective = lastCartInfo.isEffective
        })
      }
    },
    // 删除购物车
    async deleteCart(skuIds: string[]) {
      if (this.isLogin) {
        await request.delete('/member/cart', {
          data: { ids: skuIds }
        })
        this.getCartList()
      }
      else {
        this.list = this.list.filter(item => !skuIds.includes(item.skuId))
      }
    },

    // 修改商品数量和选中状态
    async updateCart(skuId: string, data: { selected?: boolean; count?: number }) {
      if (this.isLogin) {
        await request.put(`/member/cart/${skuId}`, data)
        // 重新获取购物车列表
        this.getCartList()
      } else {
        const goods = this.effectiveList.find((item) => item.skuId === skuId)
        if (data.selected !== undefined) {
          goods!.selected = data.selected
        }
        if (data.count !== undefined) {
          goods!.count = data.count
        }
      }
    },

    // 修改全选或者全不选
    async updateCartAllSelected(isSelected: boolean) {
      if (this.isLogin) {
        await request.put('/member/cart/selected', {
          selected: isSelected,
        })
        // 获取最新的购物车列表
        this.getCartList()
      } else {
        this.list.forEach((item) => {
          item.selected = isSelected
        })
      }
    },

    // 清空购物车
    clearCart() {
      this.list = []
    },

    // 合并购物车
    async mergeLocalCart() {
      const data = this.list.map(({ skuId, selected, count }) => ({
        skuId,
        selected,
        count
      }))
      await request.post('/member/cart/merge', data)
      // 合并成功，重新获取购物车列表
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
    },
    // 购物车全选状态
    isAllSelected(): boolean {
      return (this.effectiveList.length !== 0 && this.effectiveList.every((item) => item.selected))
    },

    // 已选择的列表
    selectedList(): CartItem[] {
      return this.effectiveList.filter((item) => item.selected)
    },
    // 已选择的商品总数
    selectedListCounts(): number {
      return this.selectedList.reduce((sum, item) => sum + item.count, 0)
    },
    // 已选择的列表总价
    selectedListPrice(): string {
      return this.selectedList
        .reduce((sum, item) => sum + item.count * Number(item.nowPrice), 0)
        .toFixed(2)
    },

    // 区分登录和未登录
    isLogin(): boolean {
      const { user } = useStore()
      return !!user.profile.token
    }
  }
})

export default useCartStore
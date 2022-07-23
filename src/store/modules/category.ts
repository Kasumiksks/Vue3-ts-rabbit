import request from "../../utils/request";
import { defineStore } from "pinia";
import { TResponse } from "@/types/data";
import { CategoryItem } from "@/types/goods";
import { topCategory } from '../constants'

const defaultCategory = topCategory.map(item => ({ name: item }))

export default defineStore('category', {
  state: () => ({
    list: defaultCategory as CategoryItem[]
  }),
  actions: {
    async getCategoryList() {
      const res = await request.get<TResponse<CategoryItem[]>>('/home/category/head')
      // 添加一个open属性
      res.data.result.forEach(item => item.open = false)
      this.list = res.data.result
    },
    show(id: string) {
      this.list.find(item => item.id === id)!.open = true
    },
    hide(id: string) {
      this.list.find(item => item.id === id)!.open = false
    }
  }
})
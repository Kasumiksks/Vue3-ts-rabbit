import request from "../../utils/request";
import { defineStore } from "pinia";
import { TResponse } from "@/types/data";
import { CategoryItem } from "@/types/goods";
import { topCategory } from '../constants'
import { SomeCategory, SubCategory } from '@/types/goods'

const defaultCategory = topCategory.map(item => ({ name: item }))

export default defineStore('category', {
  state: () => ({
    list: defaultCategory as CategoryItem[],
    someCategory: {} as SomeCategory,
    subCategory: {} as SubCategory
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
    },
    async getSomeCategory(id: string) {
      const res = await request.get<TResponse<SomeCategory>>('/category', {
        params: {
          id
        }
      })
      this.someCategory = res.data.result
    },
    async getSubFilter(id: string) {
      const res = await request.get<TResponse<SubCategory>>('/category/sub/filter', {
        params: {
          id
        }
      })
      this.subCategory = res.data.result
    },
  }
})
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home,
        },
        {// 一级商品分类
          path: '/category/:id',
          component: () => import('@/views/category/index.vue')
        },
        {// 二级商品分类
          path: '/category/sub/:id',
          component: () => import('@/views/category/sub.vue')
        },
        {// 商品弹层
          path: '/goods/:id',
          component: () => import('@/views/goods/index.vue'),
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
})
export default router
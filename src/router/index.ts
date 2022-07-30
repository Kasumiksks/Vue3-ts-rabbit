import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => { // 在路由切换或刷新的时候，滚动到页面最顶部
    return {
      top: 0,
    }
  },
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
        {// 商品详情
          path: '/goods/:id',
          component: () => import('@/views/goods/index.vue'),
        },
        {// 购物车页面
          path: '/cart',
          component: () => import('@/views/cart/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/login/callback',
      component: () => import('@/views/login/callback.vue')
    }
  ],
})
export default router
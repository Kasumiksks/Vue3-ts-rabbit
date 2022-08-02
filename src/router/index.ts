import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import useStore from '@/store'
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
        },
        {// 订单结算页面
          path: '/member/checkout',
          component: () => import('@/views/member/pay/checkout.vue')
        },
        {// 支付页面
          path: '/member/pay',
          component: () => import('@/views/member/pay/index.vue')
        },
        {// 支付结果页面
          path: '/pay/callback',
          component: () => import('@/views/member/pay/callback.vue')
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
    },
    { // 测试页面
      path: '/play',
      component: () => import('@/views/playground/index.vue')
    }
  ],
})

// 配置路由导航守卫，拦截 /member 开头的所有的地址
router.beforeEach((to, from, next) => {
  // 判断用户是否登录
  const { cart } = useStore()
  if (cart.isLogin) {
    next()
  }
  else {
    if (to.path.includes('/member')) {
      next({
        path: '/login',
        // 增加回跳的url地址
        query: {
          redirectUrl: to.fullPath
        }
      })
    }
    else {
      next()
    }
  }
})
export default router
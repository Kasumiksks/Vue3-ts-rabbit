<!--
 * @Author: Kasumi
 * @Date: 2022-07-23 11:13:14
 * @LastEditTime: 2022-07-24 16:17:32
 * @LastEditors: Kasumi
 * @Description: 不同的商品分类详情页面模块组件
 * @FilePath: \vite-project-xtx\src\views\category\index.vue
 * 你所热爱的, 就是你的生活
-->

<script lang="ts" setup name="TopCategory">
import useStore from '@/store'
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router'
import GoodsItem from './components/goods-item.vue';
const { category, home } = useStore()
const route = useRoute()
category.getSomeCategory(route.params.id as string)

// watch(
//   () => route.params.id,
//   (newValue) => {
//     if (!newValue) return // 从分类页跳转到首页会报错，需要判断路由地址
//     // 报错: 先点击一级类目，再点击其分类下的二级类目
//     if (route.fullPath !== `/category/${newValue}`) return
//     category.getSomeCategory(newValue as string)
//   },
//   {
//     immediate: true
//   }
// )

/* 
watch 只跟踪明确监视的源，回调仅会在源确实改变了才会被触发，这让我们对如何触发回调有更多的控制权。

watchEffect 会自动追踪依赖的变化，一般来说代码会更简洁，但其响应性依赖关系则不那么显式
*/
watchEffect(() => {
  // 只有是一级分类的情况下，才发送这个请求
  const id = route.params.id as string
  if (route.fullPath === `/category/${id}`) {
    category.getSomeCategory(id)
  }
})

home.getBannerList()
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 渲染面包屑导航 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ category.someCategory.name }}</XtxBreadItem>
      </XtxBread>

      <!-- 轮播图 -->
      <XtxCarousel :slides="home.bannerList" style="height: 500px" auto-play />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in category.someCategory.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img :src=item.picture />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in category.someCategory.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }

  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
<!--
 * @Author: Kasumi
 * @Date: 2022-07-23 21:08:34
 * @LastEditTime: 2022-07-24 11:09:56
 * @LastEditors: Kasumi
 * @Description: 人气推荐模块
 * @FilePath: \vite-project-xtx\src\views\home\components\home-hot.vue
 * 你所热爱的, 就是你的生活
-->
<script lang="ts" setup name="HomeHot">
import useStore from '@/store';
import HomePanel from './home-panel.vue'
import { useLazyData } from '@/utils/hooks'
import HomeSkeleton from './home-skeleton.vue'

const { home } = useStore()
const target = useLazyData(home.getHotGoodsList)
// 数据懒加载

</script>
<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
      <template #right>
        <XtxMore path="/" />
      </template>
      <!-- 面板内容 -->
      <!-- Transition : 动画 -->
      <Transition name="fade">
        <ul class="goods-list" v-if="home.hotGoosList.length > 0">
          <li v-for="item in home.hotGoosList" :key="item.id">
            <RouterLink :to="`/goods/${item.id}`">
              <img :src=item.picture alt="" v-lazy="item.picture" />
              <p class="name ellipsis">{{ item.title }}</p>
              <p class="price">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <!-- 骨架屏 -->
        <HomeSkeleton v-else />
      </Transition>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
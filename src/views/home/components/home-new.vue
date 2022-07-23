<!--
 * @Author: Kasumi
 * @Date: 2022-07-23 18:16:59
 * @LastEditTime: 2022-07-23 21:15:56
 * @LastEditors: Kasumi
 * @Description: 新鲜好物模块
 * @FilePath: \vite-project-xtx\src\views\home\components\home-new.vue
 * 你所热爱的, 就是你的生活
-->

<script lang="ts" setup>
import useStore from '@/store';
import HomePanel from './home-panel.vue'

const { home } = useStore()
home.getNewGoodsList()
</script>
<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in home.newGoodsList" :key="item.id">
          <RouterLink :to="`/goods/${item.id}`">
            <img :src=item.picture alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
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
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
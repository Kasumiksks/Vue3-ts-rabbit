<!--
 * @Author: Kasumi
 * @Date: 2022-07-23 14:57:09
 * @LastEditTime: 2022-07-24 15:24:18
 * @LastEditors: Kasumi
 * @Description: 右侧轮播图模块
 * @FilePath: \vite-project-xtx\src\views\home\components\home-banner.vue
 * 你所热爱的, 就是你的生活
-->

<script lang="ts" setup name="HomeBanner">
import useStore from '@/store';

const { home } = useStore()
home.getBannerList()
</script>

<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel :slides="home.bannerList" auto-play />
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  :deep(.carousel-btn.prev) {
    left: 270px !important;
  }

  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
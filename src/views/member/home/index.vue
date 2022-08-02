<!--
 * @Author: Kasumi
 * @Date: 2022-08-02 10:53:26
 * @LastEditTime: 2022-08-02 10:57:32
 * @LastEditors: Kasumi
 * @Description: 个人中心组件
 * @FilePath: \vite-project-xtx\src\views\member\home\index.vue
 * 你所热爱的, 就是你的生活
-->

<script setup lang="ts">
import HomeOverview from './components/home-overview.vue'
import HomePanel from './components/home-panel.vue'
</script>

<template>
  <div class="member-home">
    <HomeOverview />
    <HomePanel title="收藏的商品" />
    <HomePanel title="我的足迹" />
  </div>
</template>
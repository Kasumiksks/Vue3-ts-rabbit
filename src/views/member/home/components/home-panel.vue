<!--
 * @Author: Kasumi
 * @Date: 2022-08-02 10:56:46
 * @LastEditTime: 2022-08-02 15:52:39
 * @LastEditors: Kasumi
 * @Description: 个人中心面板组件
 * @FilePath: \vite-project-xtx\src\views\member\home\components\home-panel.vue
 * 你所热爱的, 就是你的生活
-->

<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>

<template>
  <div class="home-panel">
    <div class="header">
      <h4>{{ title }}</h4>
      <XtxMore to="/" />
    </div>
    <!-- 商品列表 -->
    <div class="goods-list"></div>
  </div>
</template>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h4 {
      font-size: 22px;
      font-weight: normal;
    }
  }
}
</style>
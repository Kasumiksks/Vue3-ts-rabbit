<!--
 * @Author: Kasumi
 * @Date: 2022-07-27 15:03:21
 * @LastEditTime: 2022-08-02 17:02:41
 * @LastEditors: Kasumi
 * @Description: 测试页面组件
 * @FilePath: \vite-project-xtx\src\views\playground\index.vue
 * 你所热爱的, 就是你的生活
-->

<script lang="ts" setup>
import { ref } from 'vue'

// 订单状态
const orderStatus = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' },
]
const activeName = ref('test1')
</script>

<template>
  <xtx-tabs v-model="activeName">
    <XtxTabsPanel name="all" label="全部">
      <h1>全部的内容</h1>
    </XtxTabsPanel>
    <XtxTabsPanel v-for="item in orderStatus" :key="item.label" :name="item.name" :label="item.label">
      <h1>{{ item.name }}的内容</h1>
    </XtxTabsPanel>
  </xtx-tabs>
</template>
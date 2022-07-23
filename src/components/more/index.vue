<!--
 * @Author: Kasumi
 * @Date: 2022-07-23 18:04:26
 * @LastEditTime: 2022-07-23 20:41:04
 * @LastEditors: Kasumi
 * @Description: 商品模块的通用顶部组件
 * @FilePath: \vite-project-xtx\src\components\more\index.vue
 * 你所热爱的, 就是你的生活
-->
<script lang="ts" setup name="XtxMore">
defineProps({
  path: {
    type: String,
    default: '/',
  },
})
</script>
<template>
  <RouterLink :to="path" class="xtx-more">
    <span>
      <slot>查看全部</slot>
    </span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>

<style scoped lang="less">
.xtx-more {
  margin-bottom: 2px;

  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }

  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }

  &:hover {

    span,
    i {
      color: @xtxColor;
    }
  }
}
</style>

<!--
 * @Author: Kasumi
 * @Date: 2022-07-27 10:42:36
 * @LastEditTime: 2022-07-27 10:42:38
 * @LastEditors: Kasumi
 * @Description: 登录页面的头部组件
 * @FilePath: \vite-project-xtx\src\views\login\components\login-header.vue
 * 你所热爱的, 就是你的生活
-->
<script setup lang="ts" name="LoginHeader"></script>
<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <h3 class="sub">
        <slot></slot>
      </h3>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped lang="less">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(@/assets/images/logo.png) no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: @xtxColor;
      letter-spacing: -5px;
    }
  }
}
</style>
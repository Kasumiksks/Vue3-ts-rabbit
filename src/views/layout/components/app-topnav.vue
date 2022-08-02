<!--
 * @Author: Kasumi
 * @Date: 2022-07-21 15:56:36
 * @LastEditTime: 2022-08-02 10:48:22
 * @LastEditors: Kasumi
 * @Description: 公共顶部通栏组件
 * @FilePath: \vite-project-xtx\src\views\layout\components\app-topnav.vue
 * 你所热爱的, 就是你的生活
-->

<script lang="ts" setup name="AppTopnav">
import Message from '@/components/message';
import router from '@/router';
import useStore from '@/store';

const { user } = useStore()

const logout = () => {
  user.logout()
  router.push('/login')
  Message.success('退出成功')
} 
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="user.profile.token">
          <li>
            <RouterLink to="/member"><i class="iconfont icon-user"></i>{{ user.profile.nickname
                || user.profile.account
            }}</RouterLink>
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/login">请先登录</RouterLink>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li>
          <RouterLink to="/member">会员中心</RouterLink>
        </li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
<!--
 * @Author: Kasumi
 * @Date: 2022-08-01 21:24:04
 * @LastEditTime: 2022-08-01 22:02:14
 * @LastEditors: Kasumi
 * @Description: 购物车结算页面的对话框
 * @FilePath: \vite-project-xtx\src\components\dialog\index.vue
 * 你所热爱的, 就是你的生活
-->
<script lang="ts" setup name="XtxDialog">
import { onClickOutside } from '@vueuse/core';
import { ref, watch } from 'vue';

const props = defineProps({
  title: { // 标题
    type: String,
    default: ''
  },
  visible: { // 控制对话框显示与否
    type: Boolean,
    default: false
  }
})

// 点击组件内关闭按钮能关闭对话框
const emit = defineEmits<{
  (evName: 'update:visible', visible: boolean): void
}>()

const closeDialog = () => {
  emit('update:visible', false)
}

// 点击外部阴影部分要能关闭对话框
const target = ref(null)
onClickOutside(target, () => closeDialog())

// 控制动画
const show = ref(false)
watch(
  () => props.visible,
  (value) => {
    setTimeout(() => {
      show.value = value
    });
  },
  {
    immediate: true
  }
)
</script>
<template>
  <div class="xtx-dialog" v-if="visible" :class="{ fade: show }">
    <div class="wrapper" ref="target" :class="{ fade: show }">
      <div class="header">
        <!-- 对话框标题 -->
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="closeDialog"></a>
      </div>
      <div class="body">
        <!-- 对话框内容 -->
        <slot />
      </div>
      <div class="footer">
        <!-- 底部具名插槽 -->
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0.5);

  // background: rgba(0, 0, 0, 0);
  // &.fade {
  //   transition: all 0.4s;
  //   background: rgba(0, 0, 0, 0.5);
  // }
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    // transform: translate(-50%, -60%);
    // opacity: 0;
    // &.fade {
    //   transition: all 0.4s;
    //   transform: translate(-50%, -50%);
    //   opacity: 1;
    // }
    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }

    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }

    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
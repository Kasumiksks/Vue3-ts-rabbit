<!--
 * @Author: Kasumi
 * @Date: 2022-07-27 09:19:21
 * @LastEditTime: 2022-07-27 09:41:40
 * @LastEditors: Kasumi
 * @Description: 按钮组件
 * @FilePath: \vite-project-xtx\src\components\button\index.vue
 * 你所热爱的, 就是你的生活
-->

<script setup lang="ts" name="XtxButton">
import { PropType } from 'vue';

const emit = defineEmits<{
  (evName: 'click', e: MouseEvent): void
}>()
defineProps({
  size: {
    type: String as PropType<'large' | 'middle' | 'small' | 'mini'>,
    default: 'middle',
  },
  type: {
    type: String as PropType<'default' | 'primary' | 'plain' | 'gray'>,
    default: 'default',
  },
})
</script>
<template>
  <button class="xtx-button ellipsis" :class="[size, type]" @click="emit('click', $event)">购物车</button>
</template>

<style scoped lang="less">
.xtx-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}

.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}

.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}

.small {
  width: 100px;
  height: 32px;
}

.mini {
  width: 60px;
  height: 32px;
}

.default {
  border-color: #e4e4e4;
  color: #666;
}

.primary {
  border-color: @xtxColor;
  background: @xtxColor;
  color: #fff;
}

.plain {
  border-color: @xtxColor;
  color: @xtxColor;
  background: lighten(@xtxColor, 50%);
}

.gray {
  border-color: #ccc;
  background: #ccc;
  color: #fff;
}
</style>
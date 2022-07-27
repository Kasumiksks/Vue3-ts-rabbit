<!--
 * @Author: Kasumi
 * @Date: 2022-07-27 11:55:28
 * @LastEditTime: 2022-07-27 12:05:58
 * @LastEditors: Kasumi
 * @Description: 登录页面的多选框组件
 * @FilePath: \vite-project-xtx\src\components\checkbox\index.vue
 * 你所热爱的, 就是你的生活
-->

<script lang="ts" setup name="XtxCheckbox">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const change = () => {
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}
</script>

<template>
  <div class="xtx-checkbox" @click="change">
    <i class="iconfont icon-checked" v-if="modelValue"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span>
      <slot />
    </span>
  </div>
</template>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;

  .icon-checked {
    color: @xtxColor;

    ~span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>
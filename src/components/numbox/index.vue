<!--
 * @Author: Kasumi
 * @Date: 2022-07-26 17:11:20
 * @LastEditTime: 2022-07-26 18:05:59
 * @LastEditors: Kasumi
 * @Description: 数量选择组件
 * @FilePath: \vite-project-xtx\src\components\numbox\index.vue
 * 你所热爱的, 就是你的生活
-->

<script lang="ts" setup name="XtxNumbox">
import { getCurrentInstance } from 'vue' // 支持输入操作

// 接收 v-model 时的 modelValue 属性并指定默认值
// 接收传递过来的 min 和 max 属性并指定默认值
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 20,
  },
})

// 点击加减按钮控制外部数据的变化
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const decrement = () => {
  if (props.modelValue <= props.min) return
  emit('update:modelValue', props.modelValue - 1)
}

const increment = () => {
  if (props.modelValue >= props.max) return
  emit('update:modelValue', props.modelValue + 1)
}

// 支持输入操作
const proxy = getCurrentInstance()?.proxy

const handleChange = (e: Event) => {
  // 拿到目标断言为 HTMLInputElement
  const element = e.target as HTMLInputElement
  // 拿到输入的值，转成数字，转出来的结果可能有两种，一种是数字，另一种是 NaN
  let value = +element.value
  // 如果是 NaN，说明输入的有字符串，就把 value 变成默认的 1
  if (isNaN(value)) value = 1
  // 判断边界
  if (value >= props.max) value = props.max
  if (value <= props.min) value = props.min
  // 更新外界的值
  emit('update:modelValue', value)
  // 强制更新
  proxy?.$forceUpdate()
}
</script>
<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="decrement">-</a>
      <input type="text" :value="modelValue" @change="handleChange($event)" />
      <a href="javascript:;" @click="increment">+</a>
    </div>
  </div>
</template>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    >a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    >input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
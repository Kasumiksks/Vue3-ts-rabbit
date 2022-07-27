<script lang="ts" setup name="PlayGround">
// h 等价于 createVNode
// createVNode 作用：创建虚拟 DOM (一个 JS 对象, 可以模拟真实 DOM 结构)
import { h, onMounted, render } from 'vue'
// 参数 1：创建的虚拟 DOM 的节点类型，比如 div、h1、a、img
// 参数 2：虚拟 DOM 拥有的属性，是一个对象
// 参数 3：虚拟 DOM 节点的内容
// <h1 title="标题" id="box" class="content">我是标题</h1>
const vNode = h('h1', { title: '标题', id: 'box', className: 'content' }, '我是标题')

onMounted(() => {
  // 参数 1：虚拟 DOM
  // 参数 2：真实的 DOM，虚拟 DOM 的挂载点
  render(vNode, document.querySelector('.box')!)
})
</script>

<template>
  <div class="box"></div>
</template>

<style scoped lang="less">
:deep(.content) {
  color: red;
}
</style>
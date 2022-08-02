<script setup lang="tsx" name="XtxTabs">
import { provide, toRefs, useSlots, VNode } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (evName: 'update:modelValue', panelName: string): void
  (evName: 'tab-click', { name, index }: { name: string; index: number }): void
}>()

const handleClick = (panel: VNode, index: number) => {
  emits('update:modelValue', panel.props!.name)
  emits('tab-click', {
    name: panel.props!.name,
    index,
  })
}

// 提供数据
// !通过点去取数据会丢失响应式
const { modelValue } = toRefs(props)
provide('activeName', modelValue)

const slots = useSlots()
const Tab = () => {
  // 内容
  // #1 正常接收数据
  const arr = slots.default?.()!
  const panels: VNode[] = []
  arr.forEach((item) => {
    if ((item.type as any).name === 'XtxTabsPanel') {
      // 正常的 XtxTabsPanel 节点
      panels.push(item)
    } else {
      if (Array.isArray(item.children)) {
        item.children.forEach((item) => {
          panels.push(item as VNode)
        })
      }
    }
  })
  // !根据 panels 的 label 生成标题
  // 标题
  const navs = (
    <nav>
      {panels.map((panel: VNode, index: number) => (
        <a
          key={index}
          href='javascript:;'
          class={{
            active: props.modelValue === panel.props!.name,
          }}
          onClick={() => handleClick(panel, index)}
        >
          {panel.props!.label}
        </a>
      ))}
    </nav>
  )
  return <div class='xtx-tabs'>{[navs, panels]}</div>
}
</script>
<template>
  <Tab />
</template>

<style lang="less">
.xtx-tabs {
  background: #fff;

  >nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    >a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;

      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>

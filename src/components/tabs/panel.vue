<script setup lang="ts" name="XtxTabsPanel">
import { inject } from 'vue';

defineProps<{
  label?: string
  name?: string
}>()

// 接收数据
const activeNameValue = inject('activeNameValue')
</script>

<template>
  <div class="xtx-tabs-panel" v-show="activeNameValue === name">
    <slot></slot>
  </div>
</template>
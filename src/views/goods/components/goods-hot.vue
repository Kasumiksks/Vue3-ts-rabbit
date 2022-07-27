<!--
 * @Author: Kasumi
 * @Date: 2022-07-27 10:09:20
 * @LastEditTime: 2022-07-27 10:38:31
 * @LastEditors: Kasumi
 * @Description: 热榜组件
 * @FilePath: \vite-project-xtx\src\views\goods\components\goods-hot.vue
 * 你所热爱的, 就是你的生活
-->
<script setup lang="ts" name="GoodsHot">
import { TResponse } from '@/types/data';
import { CategoryGoods } from '@/types/goods';
import request from '@/utils/request';
import GoodsItem from '@/views/category/components/goods-item.vue'
import { PropType, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  type: {
    type: Number as PropType<1 | 2 | 3>,
    default: 1,
  },
})
// #2
const titleObj = {
  1: '24小时热销榜',
  2: '周热销榜',
  3: '总热销榜',
}
const route = useRoute()
const id = route.params.id
const list = ref<CategoryGoods[]>([])
const getList = async () => {
  const res = await request.get<TResponse<CategoryGoods[]>>('/goods/hot', {
    params: {
      id,
      type: props.type
    }
  })
  list.value = res.data.result
}

getList()
</script>

<template>
  <div class="goods-hot">
    <h3>{{ titleObj[props.type] }}</h3>
    <div class="goods-list">
      <!-- 商品区块 -->
      <GoodsItem v-for="(item, index) in list" :key="index" :goods="item" />
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-hot {
  background-color: #fff;
  margin-bottom: 20px;

  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
<!--
 * @Author: Kasumi
 * @Date: 2022-07-24 18:15:16
 * @LastEditTime: 2022-07-24 20:14:53
 * @LastEditors: Kasumi
 * @Description: 城市选择组件
 * @FilePath: \vite-project-xtx\src\components\city\index.vue
 * 你所热爱的, 就是你的生活
-->
<script lang="ts" setup name="XtxCity">
// 注意这里一定不能为空，否则组件注册不成功，坑。
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { AreaList } from '../../types/goods';
import axios from 'axios';

export type CityResult = {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
  countyCode: string
  countyName: string
}
const target = ref(null)
const active = ref(false)

const toggle = () => {
  active.value = !active.value
}

onClickOutside(target, () => {
  active.value = false
})

// 获取城市列表
const cityList = ref<AreaList[]>()
const getCityList = async () => {
  const res = await axios.get<AreaList[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
  cityList.value = res.data
  cacheList.value = res.data
}
getCityList()

const cacheList = ref<AreaList[]>([])
// 切换城市数据，并记录曾选中的内容
const changeResult = ref({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
})
const selectCity = (city: AreaList) => {
  if (city.level === 0) {
    // 省
    changeResult.value.provinceName = city.name
    changeResult.value.provinceCode = city.code
    cityList.value = city.areaList
  }
  if (city.level === 1) {
    // 市
    changeResult.value.cityName = city.name
    changeResult.value.cityCode = city.code
    cityList.value = city.areaList
  }
  if (city.level === 2) {
    // 县（区）
    changeResult.value.countyName = city.name
    changeResult.value.countyCode = city.code
    // 关闭弹窗
    active.value = false

    // 子传父
    emit('changeCity', changeResult.value)
  }
}
// #3 监听关闭弹窗的处理，恢复数据
watch(active, (value) => {
  // 当关闭 active 的时候，需要回复数据
  if (!value) {
    cityList.value = cacheList.value
  }
})

// 接收完整地址信息
defineProps<{
  userAddress?: string
}>()

// 选择完毕将信息传给父组件
// #1 选择的城市结果类型


// #2
const emit = defineEmits<{
  (e: 'changeCity', value: CityResult): void
}>()
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" :class="{ active }" @click="toggle">
      <span class="placeholder">请选择配送地址</span>
      <span class="value" v-if="userAddress">{{ userAddress }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span class="ellipsis" v-for="item in cityList" :key="item.code" @click="selectCity(item)">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
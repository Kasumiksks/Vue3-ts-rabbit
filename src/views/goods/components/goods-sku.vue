<!--
 * @Author: Kasumi
 * @Date: 2022-07-26 10:07:05
 * @LastEditTime: 2022-07-30 09:55:46
 * @LastEditors: Kasumi
 * @Description: 商品详情的选择功能的子组件
 * @FilePath: \vite-project-xtx\src\views\goods\components\goods-sku.vue
 * 你所热爱的, 就是你的生活
-->

<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Sku, Spec, SpecValue } from '@/types/goods'
import bwPowerSet from '@/utils/power-set';
const props = defineProps<{
  goods: GoodsInfo
  skuId?: string
}>()

const changeState = (btnObj: SpecValue, spec: Spec) => {
  if (btnObj.selected) {
    btnObj.selected = false
  } else {
    // 点亮自己，先干掉所有人
    spec.values.forEach((bt) => {
      bt.selected = false
    })
    btnObj.selected = true
  }
  updateDisabledStatus(props.goods.specs, pathMap)

  // #2
  const selected = getSelectedSpec(props.goods.specs).filter((v) => v)
  if (selected.length === props.goods.specs.length) {
    // 说明全部选中
    // 2. 去 pathMap 找到对应的 skuId
    const key = selected.join(spliter)
    const [skuId] = pathMap[key]
    // 3. 子传父，给父组件
    emit('changeSku', skuId)
  }
  else {
    emit('changeSku', '')
  }
}

const spliter = '🥰'
// 根据skus数据得到路径字典对象
const getPathMap = (skus: Sku[]) => {
  const pathMap: { [key: string]: string[] } = {}
  skus.forEach((sku) => {
    // 1. 过滤出有库存有效的sku
    if (sku.inventory) {
      // 2. 得到每一个 sku 的规格数组
      // ['黑色', '30cm', '日本']
      const specs = sku.specs.map((spec) => spec.valueName)
      // 3. 得到每一个 sku 的规格数组的子集
      // [[], ['黑色'], ['30cm'], ['黑色', '30cm'], ['日本'],['黑色', '日本'],['30cm', '日本']，['黑色', '30cm', '日本']]
      const powerSet = bwPowerSet(specs)
      // 4. 归类整理成方便查找的字典
      powerSet.forEach((set) => {
        // set => 数组 => 转字符串 => 方便当做对象的 key
        const key = set.join(spliter)
        if (pathMap[key]) {
          // 已经有key往数组追加
          pathMap[key].push(sku.id)
        } else {
          // 没有key设置一个数组
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
console.log(getPathMap(props.goods.skus))

// 遍历所有按钮，判断按钮.name 作为 key，在 pathMap 字典中能否找到
const updateDisabledStatus = (specs: Spec[], pathMap: { [key: string]: string[] }) => {
  // 循环每一个 btnObj 的时候
  // 【尝试】用原来【选中】的数据，分别和每一个 btnObj 中 name 进行组合，看看能不能在 pathMap 中找到
  // 明确：这些操作的目的并不会影响后续的选中状态，而是其他按钮的禁用/启用
  specs.forEach((spec, i) => {
    spec.values.forEach((btnObj) => {
      // #1 遍历每一个 spec 的时候，如果 spec 中的 btnObj 被选中了，那么就没有必要再往下了，也就没有必要计算 btnObj 的禁用状态了
      if (btnObj.selected) return
      // #2 点击按钮后【先】打勾进行选中，而 getSelectedSpec 拿到的正是当前选中的结果
      const originSpecs = getSelectedSpec(specs) // 一上来的时候是 ['', '', '']
      // 把每一行中的每一个放到数组对应的位置
      originSpecs[i] = btnObj.name
      // 这儿也符合一上来就对每一个规格进行检测的情况，可以通过打印 originSpecs 查看
      // #3
      const key = originSpecs.filter((v) => v).join(spliter)
      if (pathMap[key]) {
        btnObj.disabled = false
      } else {
        btnObj.disabled = true
      }
      /* if (pathMap[btnObj.name]) {
          btnObj.disabled = false
      } else {
          btnObj.disabled = true
      } */
    })
  })
}
const pathMap = getPathMap(props.goods.skus)
updateDisabledStatus(props.goods.specs, pathMap)
// 禁用的时候不允许选中
const changeSku = (btnObj: SpecValue, spec: Spec) => {
  if (btnObj.disabled) return
  if (btnObj.selected) {
    btnObj.selected = false
  } else {
    // 点亮自己，先干掉所有人
    spec.values.forEach((bt) => {
      bt.selected = false
    })
    btnObj.selected = true
  }
  updateDisabledStatus(props.goods.specs, pathMap)
}

// 获取选中的规格
function getSelectedSpec(specs: Spec[]) {
  const arr: string[] = []
  // specs => 所有规格
  specs.forEach((spec, i) => {
    // i => 可以理解为所有规格中的行
    // 根据spec的values中找是否有，selected为true的，把selected为true的那个按钮存储起来
    const btnObj = spec.values.find((item) => item.selected)
    // 把选中的按钮的 name 放到数组的对应位置
    // arr.push(btnObj ? btnObj.name : "")
    if (btnObj) {
      arr[i] = btnObj.name
    } else {
      arr[i] = ''
    }
  })
  return arr
}

// 初始化时，设置默认选中效果
// 从所有的 skus 中找 sku.id 等于传递过来 skuId 的那一项 【sku】
// 遍历每一个规格中的按钮，如果 btnObj.name 等于 【sku】 下 specs 中对应选项的 valueName，则选中
function initDefaultSelected(goods: GoodsInfo, skuId: string | undefined) {
  if (skuId === undefined) return
  // 1. 找到sku信息
  const sku = goods.skus.find((sku) => sku.id === skuId)
  if (!sku) return
  // 2. 遍历每个按钮，按钮值和sku的值相同，就选中
  goods.specs.forEach((spec, i) => {
    // i => 规格的行
    /* spec.values.forEach((btnObj) => {
  btnObj.selected = btnObj.name === sku.specs[i].valueName
}) */
    const value = sku.specs[i].valueName
    const btnObj = spec.values.find((btnObj) => btnObj.name === value)
    btnObj!.selected = true
  })
}
initDefaultSelected(props.goods, props.skuId)

const emit = defineEmits<{
  (e: 'changeSku', skuId: string): void
}>()
</script>

<template>
  <div class="goods-sku">
    <!-- 每一行 -->
    <dl v-for="spec in goods.specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <!-- 每一行中的每一个按钮 -->
        <template v-for="btnObj in spec.values" :key="btnObj.name">
          <img v-if="btnObj.picture" :src="btnObj.picture" alt="" :title="btnObj.name"
            @click="changeState(btnObj, spec)" :class="{ selected: btnObj.selected, disabled: btnObj.disabled }" />
          <span v-else @click="changeState(btnObj, spec)"
            :class="{ selected: btnObj.selected, disabled: btnObj.disabled }">{{ btnObj.name
            }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
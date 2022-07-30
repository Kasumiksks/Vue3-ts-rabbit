<!--
 * @Author: Kasumi
 * @Date: 2022-07-24 17:01:45
 * @LastEditTime: 2022-07-30 16:40:12
 * @LastEditors: Kasumi
 * @Description: 商品详情页面
 * @FilePath: \vite-project-xtx\src\views\goods\index.vue
 * 你所热爱的, 就是你的生活
-->

<script lang="ts" setup name="Goods">
import useStore from '@/store';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import GoodsImage from '../goods/components/goods-image.vue'
import GoodsSale from '../goods/components/goods-sale.vue'
import GoodsInfo from '../goods/components/goods-info.vue'
import GoodsSku from './components/goods-sku.vue';
import GoodsDetail from './components/goods-detail.vue';
import GoodsHot from './components/goods-hot.vue';
import Message from '@/components/message';
import { CartItem } from '@/types/cart';

const route = useRoute()
const { goods, cart } = useStore()

watchEffect(() => {
  const id = route.params.id as string
  if (route.fullPath === `/goods/${id}`) {
    goods.getGoodsInfo(id)
  }
})

watchEffect(() => {
  const id = route.params.id as string
  if (route.fullPath === `/goods/${id}`) {
    goods.resetGoodsInfo()
    goods.getGoodsInfo(id)
  }
})

// 默认选中
const changeSku = (skuId: string) => {
  // 1. 根据接收到的 skuId 找到对应的 sku
  // 2. 修改商品的价钱库存
  currentSkuId.value = skuId
  const sku = goods.info.skus.find((item) => item.id === skuId)
  if (sku) {
    goods.info.inventory = sku.inventory
    goods.info.price = sku.price
    goods.info.oldPrice = sku.oldPrice
  }
}
let count = ref(1)

const currentSkuId = ref('')
const addCart = async () => {
  // 如果没有 skuId 就打回去
  if (!currentSkuId.value) Message.warning('请选择完整信息')

  const sku = goods.info.skus.find((item) => item.id === currentSkuId.value)!
  const attrsText = sku.specs.map((item) => item.name + ':' + item.valueName).join(' ')
  // 未登录状态需要传入整个数据
  await cart.addCart({
    skuId: currentSkuId.value,
    count: count.value,
    id: goods.info.id,
    name: goods.info.name,
    picture: goods.info.mainPictures[0],
    price: goods.info.price,
    attrsText,
    selected: true,
    nowPrice: goods.info.price,
    stock: goods.info.inventory,
    isEffective: true,
  } as CartItem)
  Message.success('加入购物车成功')
  console.log('加入购物车')
}
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div v-if="goods.info.categories">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :to="`/category/${goods.info.categories[1].id}`">{{ goods.info.categories[1].name }}
          </XtxBreadItem>
          <XtxBreadItem :to="`/category/sub/${goods.info.categories[0].id}`">{{ goods.info.categories[0].name }}
          </XtxBreadItem>
          <XtxBreadItem>{{ goods.info.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <div class="media">
            <GoodsImage :images="goods.info.mainPictures" />
            <GoodsSale :goods="goods.info" />
          </div>
          <div class="spec">
            <GoodsInfo :goods="goods.info" />
            <!-- 商品规格 -->
            <GoodsSku :goods="goods.info" skuId="1369155864430120962" @changeSku="changeSku" />
            <!-- 数字选择框 -->
            <XtxNumbox v-model="count" />
            <!-- 按钮组件 -->
            <XtxButton style="margin-top: 20px" :class="['middle', 'primary']" @click="addCart">
              <slot>加入购物车</slot>
            </XtxButton>
          </div>
        </div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs">
              <!-- 商品详情 -->
              <GoodsDetail :goods="goods.info" />
            </div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside">
            <GoodsHot />
          </div>
        </div>
      </div>

      <!-- 占位的 -->
      <div v-else>
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info"></div>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside">
            <GoodsHot :type="1" />
            <GoodsHot :type="2" />
            <GoodsHot :type="3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
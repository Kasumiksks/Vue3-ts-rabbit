// 分类导航的数据类型
export type CategoryItem = {
  id: string
  name: string
  picture: string
  children: CategoryItem[] // 分类下的二级分类
  open: boolean
  goods: CategoryGoods[] // 分类下的商品
}

export type CategoryGoods = {
  id: string
  name: string
  picture: string
  desc: string
  price: string
  discount?: any
  orderNum?: number
}

// 轮播数据的类型
export type BannerItem = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: string
}

// 新鲜好物的数据类型
export type GoodsNew = {
  desc: string
  id: string
  name: string
  picture: string
  price: string
}

// 人气推荐的数据类型
export type GoodsHot = {
  id: string
  picture: string
  title: string
  alt: string
}

// 某个分类下数据的类型
export type SomeCategory = {
  id: string
  name: string
  picture: string
  children: CategoryItem[]
}

// 二级分类商品数据
export type SaleProperty = {
  id: string
  name: string
  properties: {
    id: string
    name: string
  }[]
}

export type SubCategory = {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  brands: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
  }[]
  saleProperties: SaleProperty[]
  goods: CategoryGoods[]
}

// 商品模块的类型声明
export type GoodsInfo = {
  id: string
  brand: {
    name: string
  }
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: any[]
  videoScale: number
  mainPictures: string[]
  isPreSale: boolean
  isCollect?: any
  recommends?: any
  userAddresses?: any
  evaluationInfo?: any
  categories: {
    id: string
    name: string
  }[]
  specs: Spec[]
  skus: Sku[]
}

// 城市列表类型
export type AreaList = {
  code: string
  level: number
  name: string
  areaList: AreaList[]
}

// 商品的规格的值的类型
export type SpecValue = {
  desc: string
  name: string
  picture: string
  selected: boolean // 控制选中与否
  disabled: boolean // 控制禁用与否
}
// 商品的规格类型
export type Spec = {
  name: string
  values: SpecValue[]
}

// 数据中的 SKU 也需要有类型
export type Sku = {
  id: string
  inventory: number
  oldPrice: string
  price: string
  skuCode: string
  specs: {
    name: string
    valueName: string
  }[]
}
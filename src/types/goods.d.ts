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
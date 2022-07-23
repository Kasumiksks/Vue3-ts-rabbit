// 返回数据的通用类型
export type TResponse<T> = {
  code: string
  message: string
  result: T
}
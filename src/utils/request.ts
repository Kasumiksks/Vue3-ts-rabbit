import Message from '@/components/message'
import axios, { AxiosError } from 'axios'

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError<{ message: string, code: string }>) {
    // 泛型表示 error.response.data 的类型
    if (!error.response) {
      Message.error('网络异常,请稍后重试')
    } else {
      // 这里同意配置提示后, 真正发请求的 catch 那儿就不必再写提示了
      // 除非有特殊的情况, 当catch 那里也有 Message.error 的时候会覆盖这里
      Message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default request
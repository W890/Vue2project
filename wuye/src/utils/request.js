import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://community.byesame.com/',
  timeout: 120000,
  headers: { 'X-Custom-Header': 'foobar' }
})
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log()
    // 在请求体headers中设置token 用于权限api的请求
    if (config.url != '/login') {
      config.headers.Authorization = localStorage.getItem('token')
    }
    console.log(localStorage.getItem('token'))

    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance

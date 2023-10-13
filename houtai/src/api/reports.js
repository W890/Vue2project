// 第一步引入封装好的axios
import axios from '../utils/request'

// 获取权限列表
export const GetReportsList = (type) => {
  return axios.request({
    // 请求地址
    url: 'reports/type/1',
    // 请求方式
    method: 'get'
    // get请求要使用params 来进行传参
    // post请求用data

  })
}

// 第一步引入封装好的axios
import axios from '../utils/request'

// 登录接口
export const Login = (data) => {
  return axios.request({
    url: 'users/login',
    method: 'post',
    data
  })
}

// 垂直提示信息条
export const GetPosterData = (params) => {
    return axios.request({
      url: 'poster/getPosterData',
      method: 'get',
      params
    })
}
// 通知栏
export const GetRepairData = (params)=>{
  return axios.request({
      // 请求地址
      url:'poster/getRepairData',
      // 请求方式
      method:'get',
      params
  })
}
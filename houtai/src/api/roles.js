// 第一步引入封装好的axios
import axios from '../utils/request'

// 获取权限列表
export const GetRightsList = (type) => {
  return axios.request({
    // 请求地址
    url: '/rights/' + type,
    // 请求方式
    method: 'get'
    // get请求要使用params 来进行传参
    // post请求用data

  })
}

// 分配权限
export const Setrights = (data) => {
  return axios.request({
    // 请求地址
    url: `roles/${data.id}/rights`,
    // 请求方式
    method: 'post',
    // get请求要使用params 来进行传参
    // post请求用data
    data
  })
}

// 获取角色列表
export const GetRolesList = (params) => {
  return axios.request({
    // 请求地址
    url: '/roles',
    // 请求方式
    method: 'get',
    // get请求要使用params 来进行传参
    // post请求用data
    params
  })
}
// 获取单条角色信息
export const GetOneRoles = (id) => {
  return axios.request({
    // 请求地址
    url: '/roles/' + id,
    // 请求方式
    method: 'get'
    // get请求要使用params 来进行传参
    // post请求用data

  })
}
// 修改单条角色信息
export const EditRoles = (data) => {
  return axios.request({
    // 请求地址
    url: '/roles/' + data.id,
    // 请求方式
    method: 'put',
    // get请求要使用params 来进行传参
    // post请求用data
    data
  })
}

// 添加角色
export const AddRoles = (data) => {
  return axios.request({
    // 请求地址
    url: '/roles',
    // 请求方式
    method: 'post',
    // get请求要使用params 来进行传参
    // post请求用data
    data
  })
}
// 删除角色
export const DeleRoles = (id) => {
  return axios.request({
    // 请求地址
    url: '/roles/' + id,
    // 请求方式
    method: 'delete'
    // get请求要使用params 来进行传参
    // post请求用data

  })
}

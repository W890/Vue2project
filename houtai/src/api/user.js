// 第一步引入封装好的axios
import axios from "../utils/request";

//导出 定义请求接口
export const Login = (data)=>{
    return axios.request({
        // 请求地址
        url:'/login',
        // 请求方式
        method:'post',
        data
    })
}
// 获取左侧菜单
export const GetMenusList = (data)=>{
    return axios.request({
        // 请求地址
        url:'/menus',
        // 请求方式
        method:'get',
        data
    })
}

// 获取用户列表
export const GetUsersList = (params)=>{
    return axios.request({
        // 请求地址
        url:'/users',
        // 请求方式
        method:'get',
        // get请求要使用params 来进行传参
        // post请求用data
        params
    })
}
// 添加用户
export const AddUsers = (data)=>{
    return axios.request({
        // 请求地址
        url:'/users',
        // 请求方式
        method:'post',
        // get请求要使用params 来进行传参
        // post请求用data
        data
    })
}
// 删除用户
export const DeleUsers = (id)=>{
    return axios.request({
        // 请求地址
        url:'/users/'+id,
        // 请求方式
        method:'delete',
        // get请求要使用params 来进行传参
        // post请求用data
    
    })
}
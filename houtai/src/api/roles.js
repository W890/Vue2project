// 第一步引入封装好的axios
import axios from "../utils/request";

// 获取角色列表
export const GetRolesList = (data)=>{
    return axios.request({
        // 请求地址
        url:'/roles',
        // 请求方式
        method:'get',
        data
    })
}

// 添加角色列表
export const AddRolesList = (data)=>{
    return axios.request({
        // 请求地址
        url:'/roles',
        // 请求方式
        method:'post',
        data
    })
}

// 编辑角色列表
export const EditRoles = (data)=>{
    return axios.request({
        // 请求地址
        url:'/roles'+id,
        // 请求方式
        method:'put',
    })
}
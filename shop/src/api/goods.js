// 第一步引入封装好的axios
import axios from "../utils/request";

//导出 定义请求接口
export const GetGoodsInfo = (id)=>{
    return axios.request({
        // 请求地址
        url:'/goods/detail?id='+id,
        // 请求方式
        method:'get'
    })
}
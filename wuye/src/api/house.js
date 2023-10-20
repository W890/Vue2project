// 第一步引入封装好的axios
import axios from '../utils/request'

// unit
export const GethouseData = (params) => {
    return axios.request({
        url: 'house/gethouseList',
        method: 'get',
        params
    })
}
// unit上传数据
export const Addunit = (data) => {
    return axios.request({
        url: 'house/addunitList',
        method: 'post',
        data
    })
}
// unit删除数据
export const Delunit = (params) => {
    return axios.request({
        url: 'house/delunitList',
        method: 'get',
        params
    })
}

// unit搜索数据
export const Searchunit = (params) => {
    return axios.request({
        url: 'house/searchList',
        method: 'get',
        params
    })
}

// number批量删除
export const Delnum = (params) => {
    return axios.request({
        url: 'house/delnumList',
        method: 'get',
        params
    })
}
// number查询
export const SearchNum = (params) => {
    return axios.request({
        url: 'house/searchnumList',
        method: 'get',
        params
    })
}
// park数据/查询
export const Parkdata = (params) => {
    return axios.request({
        url: 'parking/getParkData',
        method: 'get',
        params
    })
}


// paytype数据
export const GetCostData = (params) => {
    return axios.request({
        url: 'cost/getCostData',
        method: 'get',
        params
    })
}
// paytype数据添加
export const Addparkdata = (data) => {
    return axios.request({
        url: 'parking/addParkData',
        method: 'post',
        data
    })
}

// paymessage数据
export const DelparkData = (params) => {
    return axios.request({
        url: 'parking/delParkData',
        method: 'get',
        params
    })
}

// paymessage数据
export const Getparkorder = (params) => {
    return axios.request({
        url: 'parking/getParkOrder',
        method: 'get',
        params
    })
}

// cost/addCostData
export const Addcostdata = (data) => {
    return axios.request({
        url: 'cost/addCostData',
        method: 'post',
        data
    })
}


// 数据删除
export const DelCostData = (params) => {
    return axios.request({
        url: 'cost/delCostData',
        method: 'get',
        params
    })
}


// paymessage数据
export const GetMessageData = (params) => {
    return axios.request({
        url: 'cost/getPayMessage',
        method: 'get',
        params
    })
}

// post数据
export const GetPostData = (params) => {
    return axios.request({
        url: 'poster/getPosterData',
        method: 'get',
        params
    })
}

// poster/addPoster
export const AddPoster = (data) => {
    return axios.request({
        url: 'poster/addPoster',
        method: 'post',
        data
    })
}

// poster/delPoster
export const DelPoster = (params) => {
    return axios.request({
        url: 'poster/delPoster',
        method: 'get',
        params
    })
}


// GetUsersByTypeData
export const GetUsersByTypeData = (params) => {
    return axios.request({
        url: 'users/getUsersByTypePage',
        method: 'get',
        params
    })
}

// GetUsersData
export const GetUsersData = (params) => {
    return axios.request({
        url: 'users/getUsersData',
        method: 'get',
        params
    })
}

// GetMenuData
export const GetMenuData = (params) => {
    return axios.request({
        url: 'admin/getMenuData',
        method: 'get',
        params
    })
}


// GetlogindataData
export const GetlogindataData = (params) => {
    return axios.request({
        url: 'users/getLoginData',
        method: 'get',
        params
    })
}
// GetMyId
export const GetMyId = (data) => {
    return axios.request({
        url: 'users/getMyId',
        method: 'post',
        data
    })
}




// 维修部分
// one

// GetlogindataData
export const Weixiuone = (params) => {
    return axios.request({
        url: 'poster/getRepairData',
        method: 'get',
        params
    })
}
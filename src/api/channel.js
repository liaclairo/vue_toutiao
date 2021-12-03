// 频道相关的请求模块

import request from "../utils/resquest"

// 获取所有频道列表信息
export const getAllChannels=()=>{
    return request({
        method:"GET",
        url:"/v1_0/channels",      
    })
}

//添加用户频道 
export const addUserChannel=(data)=>{
    return request({
        method:"PATCH",
        url:"/v1_0/user/channels",
        data   
    })
}

//删除指定用户频道 
export const deleteUserChannel=(channelId)=>{
    return request({
        method:"DELETE",
        url:`/v1_0/user/channels/${channelId}`,
        channelId   
    })
}
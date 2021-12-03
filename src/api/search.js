// 搜索相关的请求模块

import request from "../utils/resquest"

// 获取所有频道列表信息
export const getSuggestions=(q)=>{
    return request({
        method:"GET",
        url:"/v1_0/suggestion",
        params:{q}      
    })
}

// 获取搜索结果
export const getSearchResult=(params)=>{
    return request({
        method:"GET",
        url:"/v1_0/search",
        params     
    })
}

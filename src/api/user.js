// 用户相关请求模块

import request from '../utils/resquest' 

// 登录注册
export const login=(data)=>{
    return request({
        method:'POST',
        url:'/v1_0/authorizations',
        data
    })
}

// 发送短信验证码
export const sendMessage=(mobile)=>{
    return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}`
    })
}

// 获取登录用户信息
export const getUserInfo=()=>{
    return request({
        method:'GET',
        url:'/v1_0/user',
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}

// 获取用户的频道列表
export const getUserChannels=()=>{
    return request({
        method:'GET',
        url:'/v1_0/user/channels'  
    })
}

// 关注用户
export const addFollow=(aut_id)=>{
    return request({
        method:'POST',
        url:'/v1_0/user/followings' ,
        data:{
            target:aut_id
        } 
    })
}
// 取消关注
export const deleteFollow=(aut_id)=>{
    return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${aut_id}` 
    })
}

// 获取用户个人资料

export const getProfile=()=>{
    return request({
        method:'GET',
        url:'/v1_0/user/profile' 
    })
}

// 编辑用户个人资料

export const editProfile=(data)=>{
    return request({
        method:'PATCH',
        url:'/v1_0/user/profile',
        data 
    })
}

// 编辑用户头像
export const editPhoto=(data)=>{
    return request({
        method:'PATCH',
        url:'/v1_0/user/photo',
        data 
    })
}

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
// 评论相关请求模块

import request from '../utils/resquest' 

// 获取评论或者评论回复
export const getComments=(params)=>{
    return request({
        method:'GET',
        url:'/v1_0/comments',
        params
    })
}

// 点赞评论
export const addCommentLike=(com_id)=>{
    return request({
        method:"POST",
        url:'/v1_0/comment/likings',
        data:{
            target:com_id
        }
    })
}
// 取消评论点赞
export const deleteCommentLike=(com_id)=>{
    return request({
        method:"DELETE",
        url:`/v1_0/comment/likings/${com_id}`
    })
}

// 对文章或者评论进行评论
export const pubComment=data=>{
    return request({
        method:"POST",
        url:'/v1_0/comments',
        data
    })
}
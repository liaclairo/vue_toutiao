// 文章相关请求模块

import request from "../utils/resquest"

// 获取文章列表
export const getArticle=(params)=>{
    return request({
        method:"GET",
        url:"/v1_0/articles",
        params
    })
}

// 获取文章
export const getArticleById=(article_id)=>{
    return request({
        method:"GET",
        url:`/v1_0/articles/${article_id}`
    })
}

// 收藏文章
export const addArticleCollect=(article_id)=>{
    return request({
        method:"POST",
        url:'/v1_0/article/collections',
        data:{
            target:article_id
        }
    })
}
// 取消文章收藏
export const deleteArticleCollect=(article_id)=>{
    return request({
        method:"DELETE",
        url:`/v1_0/article/collections/${article_id}`
    })
}

// 喜欢文章
export const addArticleLike=(article_id)=>{
    return request({
        method:"POST",
        url:'/v1_0/article/likings',
        data:{
            target:article_id
        }
    })
}
// 取消文章喜欢
export const deleteArticleLike=(article_id)=>{
    return request({
        method:"DELETE",
        url:`/v1_0/article/collections/${article_id}`
    })
}


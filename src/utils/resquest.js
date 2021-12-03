// 封装axios模块

import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'

const request=axios.create({
    baseURL:'http://toutiao.itheima.net/',//基础路径
    transformResponse: [function (data) {
      // 后端返回的数据可能不是 JSON 格式字符串
      // 如果不是的话，那么 JSONbig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        // console.log('转换失败', err)
        // 如果转换失败了，则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }
  
      // axios 默认在内部使用 JSON.parse 来转换处理原始数据
      // return JSON.parse(data)
    }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    const {user}=store.state
    // 如果用户已登录
    if(user){
        // 加请求头Authorization字段
        config.headers.Authorization=`Bearer ${user.token}`
        // console.log(config)
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应拦截器
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });



export default request
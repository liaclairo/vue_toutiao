// 封装axios模块

import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import router from '@/router'
import { Toast } from 'vant'



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

// 用于刷新token的请求体
const RefrshTokenRes=axios.create({
  baseURL:'http://toutiao.itheima.net/'
})

// 请求拦截器，给请求加上token
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

// 响应拦截器,统一处理返回的错误
// Add a response interceptor
request.interceptors.response.use(
  // 在2xx范围内的任何状态代码都会触发此函数，这里主要用于处理响应数据
  response => {
    return response
  },
  // 任何超出2xx范围的状态码都会触发此函数，这里主要用于处理响应错误
 async error => {
    const { status } = error.response
    const {user} = store.state
    if (status === 401) { 
      // 未授权
      // 1.如果用户未登录
      if(!user || !user.token){
        Toast.fail({
          message:'请先登录',
          forbidClick:true,
          duration:800
        })
        // 直接跳转到登录页面，让用户登录
       return  redirectLogin()
      }
      // 2.token过期，则用RefrshTokenRes发送请求
      try {
        // RefrshTokenRes请求成功,得到新的token
        const {data:res}=await RefrshTokenRes({          
          method:'PUT',
          path:'/v1_0/authorizations',         
          headers:{
            Authorization:`Bearer ${user.refresh_token}`
          }
        }) 
        console.log(res)
        // 把新的token更新到容器
        user.token=res.data.token
        store.commit('setUser',user)
        // 重新发一次之前的请求
          // err.cofig是本次请求相关的配置对象
        return request(err.config)
       
      } catch (error) {
        // RefrshTokenRes请求失败,(可能是refresh_token十四天到期)，则跳转到登录页面，要求用户登录 
        redirectLogin()
        Toast.fail('用户登录已过期')
      }

    } else if (status === 403) {
       // 没有权限
    } else if (status === 404) {
       // 资源不存在
      Toast.fail({
        message: '请求资源不存在',
        forbidClick: true
      })
    } else if (status >= 500) { // 服务端异常
      Toast.fail({
        message: '服务端异常，请稍后重试',
        forbidClick: true
      })
    }

    // 将未处理的异常往外抛
    return Promise.reject(error)
  })
function redirectLogin(){
  router.replace({
    // name要跳转的页面
    name:'login',
    // query传递要查询的参数,查询参数会以问号作为分隔符，放到url后面
    query:{
      // fullPath是当前页面的完整路径
      redirect:router.history.current.fullPath
    }
  })
  console.log(router)
}


export default request
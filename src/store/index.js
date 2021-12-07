import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem,removeItem} from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登录信息（token等数据）
    user:getItem('user'),
    // 要缓存的页面数组
    cachePages:[]
  },
  mutations: {
    
    // 修改用户登录状态（token等数据）
    setUser(state,data){
      state.user=data
      // 把数据存储到本地存储中，防止页面刷新数据丢失
      setItem('user',state.user)
    },
   
    // 添加要缓存的组件
    addCachePage(state,page){
      // 如果该组件还未缓存，就进行缓存
      if(!state.cachePages.includes(page)){
        state.cachePages.push(page)
      }
    },
    // 移除已缓存的组件
    removeCachePage(state,page){
      let index=state.cachePages.indexOf(page)
      // 如果该组件已缓存，就取消缓存
      if(index!==-1){
        state.cachePages.splice(index,1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

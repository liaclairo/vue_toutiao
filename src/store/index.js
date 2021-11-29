import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem,removeItem} from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登录信息（token等数据）
    user:getItem('user')
  },
  mutations: {
    // 修改用户登录状态（token等数据）
    setUser(state,data){
      state.user=data
      // 把数据存储到本地存储中，防止页面刷新数据丢失
      setItem('user',state.user)
    },
    // removeUser(state,name){
    //   // 把数据存储到本地存储中，防止页面刷新数据丢失
    //   removeItem(name)
    // }
  },
  actions: {
  },
  modules: {
  }
})

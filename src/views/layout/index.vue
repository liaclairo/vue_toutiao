<template>
  <div>
    <!-- 路由占位符 -->
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to='/' icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/qa' icon="question-o">问答</van-tabbar-item>
      <van-tabbar-item to='/video' icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to='/my' icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: "Layout",
  data() {
      return {
          active:0,

      }
  },
 
  mounted(){
    // 一登录就缓存layout的子路由
    this.$store.commit('addCachePage','Layout')
  }
};
</script>
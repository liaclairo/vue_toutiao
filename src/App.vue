<template>
  <div id="app">
    <!-- keep-alive仅对该路由出口渲染的组件有效 -->
    <!--include属性表示仅对组件名为include中的路由出口渲染的组件进行缓存  -->
    <keep-alive :include="cachePages">
      <!-- 一级路由出口 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "App",
   computed:{
    // 拿到要缓存的组件数组
    ...mapState(['cachePages'])
  },
};
</script>


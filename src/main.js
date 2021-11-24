import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式


// 引入vant组件和样式
import Vant from 'vant';
import 'vant/lib/index.css';

// 全局注册vant组件
Vue.use(Vant);
//引入 lib-flexible 动态设置 REM 基准值（html 标签的字体大小）
import 'amfe-flexible'
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

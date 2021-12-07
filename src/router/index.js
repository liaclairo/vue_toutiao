// 配置路由模块

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Dialog } from 'vant'
Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requiresAuth: false }//是否需要登录校验
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',//默认子路由
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }

      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    meta: { requiresAuth: false },
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/chat',
    name: 'chat',
    component: () => import('@/views/chat'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// 前置路由守卫
// to: 要访问的页面路由信息
// from: 来自哪个页面的路由信息
// next：放行的标记
router.beforeEach((to, from, next) => {
  // 如果需要登录校验
  if (to.meta.requiresAuth) {
    // 如果已登录，直接放行
    if (store.state.user) {
      return next()
    } 
    // 未登录，问用户是否需要登录
    Dialog.confirm({
      title: '提示消息',
      message: '该功能需要登录，确认登录吗？',
    }).then(() => {
        // 确认前往登录，跳转到登录页面
        router.push({
          name: 'login',
          query: {
            redirect: router.history.current.fullPath
          }
        })
      }).catch(() => {
        // 不想登录，终止路由跳转
        next(false)
      });
  } else {
    // 不需要登录校验，直接放行
    next()
  }
})





export default router

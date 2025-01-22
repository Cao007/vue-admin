import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '@/components/Home/index.vue'
import Welcome from '@/views/Welcome.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import DynamicRoutes from './config'
import { useRouterStore } from '@/stores/router'
import { storeToRefs } from 'pinia'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎体验vue-admin'
        },
        component: Welcome
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    meta: {
      title: '页面不存在'
    },
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const routerStore = useRouterStore()
  const { isGetRouter } = storeToRefs(routerStore)
  const { changeIsGetRouter } = routerStore

  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      if (!isGetRouter.value) { // 判断是否已经获取过路由
        DynamicRoutes.forEach((item) => { // 动态添加路由
          router.addRoute("home", item)
        })
        changeIsGetRouter(true)
        next(to.fullPath)
      } else {
        next()
      }
    }
  }
})

export default router;
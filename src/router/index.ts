import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import DataView from '@/views/DataView.vue'
import FormView from '@/views/FormView.vue'
import PermissionRoleView from '@/views/PermissionRoleView.vue'
import PermissionBttonView from '@/views/PermissionBttonView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dataView',
    name: 'dataView',
    component: DataView
  },
  {
    path: '/formView',
    name: 'formView',
    component: FormView
  },
  {
    path: '/permission',
    name: 'permission',
    children: [
      {
        path: 'permissionRoleView',
        name: 'permissionRoleView',
        component: PermissionRoleView,
        // 让路由组件NewsItem，接受params参数或query参数
        // props(route: any) {
        //   return route.query;
        // }
      },
      {
        path: 'permissionBttonView',
        name: 'permissionBttonView',
        component: PermissionBttonView,
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
import Center from '@/views/Center/Center.vue'
import NewsAdd from '@/views/News/NewsAdd.vue'
import NewsList from '@/views/News/NewsList.vue'
import ProductAdd from '@/views/Product/ProductAdd.vue'
import ProductList from '@/views/Product/ProductList.vue'
import UserAdd from '@/views/User/UserAdd.vue'
import UserList from '@/views/User/UserList.vue'

const DynamicRoutes = [
  {
    name: 'Center',
    path: '/Center',
    meta: {
      title: '个人中心'
    },
    component: Center
  },
  {
    name: 'NewsAdd',
    path: '/News/NewsAdd',
    meta: {
      title: '新闻添加'
    },
    component: NewsAdd
  },
  {
    name: 'NewsList',
    path: '/News/NewsList',
    meta: {
      title: '新闻列表'
    },
    component: NewsList
  },
  {
    name: 'ProductAdd',
    path: '/Product/ProductAdd',
    meta: {
      title: '产品添加'
    },
    component: ProductAdd
  },
  {
    name: 'ProductList',
    path: '/Product/ProductList',
    meta: {
      title: '产品列表'
    },
    component: ProductList
  },
  {
    name: 'UserAdd',
    path: '/User/UserAdd',
    meta: {
      title: '用户添加'
    },
    component: UserAdd
  },
  {
    name: 'UserList',
    path: '/User/UserList',
    meta: {
      title: '用户列表'
    },
    component: UserList
  }
]

export default DynamicRoutes;
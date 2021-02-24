import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login'
// 使用上vue-router
Vue.use(VueRouter)

// 定义路由
const routes = [
  // {
  //   path: '/login',
  //   component: Login
  // }
  {
    path: '/login',
    // 取名字
    name: 'login',
    // 路由懒加载的写法 以前是先导入组件 然后写名字
    component: () => import('../views/login/')
  },
  {
    path: '/',
    component: () => import('../views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('../views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('../views/article'),
    // 将动态路由参数映射到组件的props中，无论是访问还是维护性都很方便
    props: true
  },
  {
    path: '/user/profile',
    name:'userProfile',
    component: () => import('../views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router

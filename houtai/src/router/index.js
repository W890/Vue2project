import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:'首页'
    },
    children:[
      {
        path: '/users',
        component: () => import('../views/User.vue')
      },
      {
        path: '/roles',
        component: () => import('../views/Roles.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  routes
})

// 定义路由导航守卫
router.beforeEach((to,from,next)=>{
  // to:将要访问的路径
  // from :从哪里来
  // next:是个函数代表放行 next()
//  获取token
let token = localStorage.getItem('token')
// 判断是不是去登录如果是就放行
if(to.path==='/login') return next()
// 如果没有token就去登录
if(!token) return next('/login')
// 放行
  next()

})

// 后置守卫
router.afterEach((to,from)=>{
  // meta:路由身上的信息
  document.title =  (to.meta.title || '后台管理')
})
export default router

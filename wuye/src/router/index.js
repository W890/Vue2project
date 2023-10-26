import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页'
    },
    children: [
      {
        // 首页
        path: '/first',
        component: () => import('../views/First.vue'),
        meta: {
          title: '首页'
        },
      },
      {
        // house
        path: '/house/unit',
        component: () => import('../views/Unit.vue'),
        meta: {
          title: '房屋单元'
        },
      },
      {
        // house/add
        path: '/house/add',
        component: () => import('../views/Add.vue'),
        meta: {
          title: '增加表单'
        },
      },
      {
        // house/number
        path: '/house/number',
        component: () => import('../views/Number.vue'),
        meta: {
          title: '房号管理'
        },
      },
      {
        // house/devicelnfo
        path: '/house/devicelnfo',
        component: () => import('../views/Devicelnfo.vue'),
        meta: {
          title: '房屋设备'
        },
      },
      {
        // parking/parkMessage
        path: '/parking/parkMessage',
        component: () => import('../views/ParkMessage.vue'),
        meta: {
          title: '车位信息'
        },
      },
      {
        // parking/parkpay
        path: '/parking/parkpay',
        component: () => import('../views/ParkPay.vue'),
        meta: {
          title: '车位订单'
        },
      },
      {
        // pay/paytype
        path: '/pay/paytype',
        component: () => import('../views/PayType.vue'),
        meta: {
          title: '缴费类型'
        },
      },
      {
        // pay/paymessage
        path: '/pay/paymessage',
        component: () => import('../views/PayMessage.vue'),
        meta: {
          title: '缴费信息'
        },
      },
      {
        // service/postMessage
        path: '/service/postMessage',
        component: () => import('../views/PostMessage.vue'),
        meta: {
          title: '公告信息'
        },
      },
      {
        // service/repair
        path: '/service/repair',
        component: () => import('../views/Repair.vue'),
        meta: {
          title: '维修处理'
        },
      },
      {
        // service/feedback
        path: '/service/feedback',
        component: () => import('../views/Feedback.vue'),
        meta: {
          title: '维修处理'
        },
      },
      {
        //  user/userMessage
        path: '/user/userMessage',
        component: () => import('../views/UserMessage.vue'),
        meta: {
          title: '普通用户信息'
        },
      },
      {
        // user/adminMessage
        path: '/user/adminMessage',
        component: () => import('../views/AddminMessage.vue'),
        meta: {
          title: '管理员信息'
        },
      },
      {
        //user/Message
        path: '/user/Message',
        component: () => import('../views/Message.vue'),
        meta: {
          title: '用户总表查询'
        },
      },
      {
        // menu/menuData
        path: '/menu/menuData',
        component: () => import('../views/MenuData.vue'),
        meta: {
          title: '菜单列表'
        },
      },
      {
        // menu/loginData
        path: '/menu/loginData',
        component: () => import('../views/LoginData.vue'),
        meta: {
          title: '登录日志'
        },
      },
      {
        //personal/message
        path: '/personal/message',
        component: () => import('../views/Messages.vue'),
        meta: {
          title: '我的信息'
        },
      },
      {
        //personal/change
        path: '/personal/change',
        component: () => import('../views/Change.vue'),
        meta: {
          title: '密码修改'
        },
      },
      {
        //personal/joinChat
        path: '/personal/joinChar',
        component: () => import('../views/JoinChar.vue'),
        meta: {
          title: '小区群聊'
        },
      },
      {
        //personal/joinChat
        path: '/service/smartRepair',
        component: () => import('../views/weixiu/WeixiuOne.vue'),
        meta: {
          title: '智能设备维修'
        },
      },
      {
        //service/houseRepair
        path: '/service/houseRepair',
        component: () => import('../views/weixiu/WeixiuTwo.vue'),
        meta: {
          title: '家居设备维修'
        },
      },
    ]
  },
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录'
    },
  }
]

const router = new VueRouter({
  routes
})

// 定义路由导航守卫
router.beforeEach((to, from, next) => {
  // to:将要访问的路径
  // from :从哪里来
  // next:是个函数代表放行 next()
  //  获取token
  const token = localStorage.getItem('token')
  // 判断是不是去登录如果是就放行
  if (to.path === '/login') return next()
  // 如果没有token就去登录
  if (!token) return next('/login')
  // 放行
  next()
})

// 后置守卫
router.afterEach((to, from) => {
  // meta:路由身上的信息
  document.title = (to.meta.title || '社区服务')
})

export default router

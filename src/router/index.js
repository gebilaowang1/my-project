import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', 
      redirect: '/Login'
    },
    { path: '/Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/Home',
      component: () => import('../components/Home.vue'),
      redirect: '/Welcome',
      children: [
        { 
          path: '/Welcome',
          name: '首页',
          component: () => import('../components/Welcome.vue')
        },
        { 
          path: '/List',
          name: '门店列表',
          component: () => import('../components/Shops/List.vue')
        },
        { 
          path: '/Money',
          name: '门店财务',
          component: () => import('../components/Shops/Money.vue')
        },
        { 
          path: '/Video',
          name: '早会视频',
          component: () => import('../components/Administration/Video.vue')
        },
        { 
          path: '/Sanitation',
          name: '卫生核查',
          component: () => import('../components/Administration/Sanitation.vue')
        },
        { 
          path: '/Payment',
          name: '付款提醒',
          component: () => import('../components/Administration/Payment.vue')
         },
        { path: '/Assets',
          name: '固定资产',
          component: () => import('../components/Administration/Assets.vue')
        },
        { path: '/Use',
          component: () => import('../components/Administration/News/Use.vue')
        },
        { path: '/Storage',
          component: () => import('../components/Administration/News/Storage.vue')
        },
        { path: '/Scrapping',
          component: () => import('../components/Administration/News/Scrapping.vue')
        },
        { path: '/Transfer',
          component: () => import('../components/Administration/News/Transfer.vue')
        },
        { path: '/Consumables',
          name: '日常耗品',
          component: () => import('../components/Administration/Consumables.vue')
        },
        { path: '/Announcement',
          name: '公告内容', 
          component: () => import('../components/System/Announcement.vue')
        },
        { 
          path: '/Performance',
          name: '日常播报',
          component: () => import('../components/System/Performance.vue')
        },
        { path: '/Presets',
          name: '预设消息',
          component: () => import('../components/System/Presets.vue')
        },
        { path: '/Logbook',
          name: '登录日志',
          component: () => import('../components/System/Book/Logbook.vue')
        },
        { path: '/Lodger',
          name: '房客日志',
          component: () => import('../components/System/Book/Lodger.vue')
        },
        { path: '/Estate',
          name: '楼盘日志',
          component: () => import('../components/System/Book/Estate.vue')
        },
        { path: '/push',
          name: '推送日志',
          component: () => import('../components/System/Book/push.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/Login') return next()
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/Login')
  next()
})

export default router

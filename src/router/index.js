import Vue from 'vue'
import Router from 'vue-router'
import main1 from '../pages/main1'
import main2 from '../pages/main2'
import main3 from '../pages/main3'
import page1 from '../pages/children/page1'
import page2 from '../pages/children/page2'
import page3 from '../pages/children/page3'
import page4 from '../pages/children/page4'
import goods from '../pages/Goods'
import search from '../pages/Search'
import note from '../pages/Note'
import cart from '../pages/Cart'
import login from '../pages/Login/login'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  // mode: 'history',    //该模式下没有 # 前缀
  routes: [
    {
      path:'/login',
      component:login,

    },
    {
      path: '/',
      component: main2,
      meta: { requiresAuth: true }
    },
    {
      path: '/main1',
      name: 'main1',
      component: main1,
      meta: { requiresAuth: true },
      children:[{
        path: '/',
        component: page1,
        meta: { requiresAuth: true }
      },{
        path: 'page1/:id',
        name: 'main1/page1',
        component: page1,
        meta: { requiresAuth: true }
      }]
    },
    {
      path: '/main2',
      name: 'main2',
      component: main2,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          component: page1,
          meta: { requiresAuth: true }
        },{
          path: 'page1/:id',
          name: 'main2/page1',
          component: page1,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/main3',
      name: 'main3',
      component: main3,
      meta: { requiresAuth: true }
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods,
      meta: { requiresAuth: true }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: { requiresAuth: true }
    },
    {
      path: '/note',
      name: 'note',
      component: note,
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
      meta: { requiresAuth: true }
    }
  ]
})

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/Home';

//push
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
}

//replace
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err);
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: '首页', keep: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "views" */ 'views/Login'),
    meta: { title: '登录' }
  },
  {
    path: '/common/privacy',
    name: 'privacy',
    component: () => import(/* webpackChunkName: "views" */ 'views/Common/Privacy'),
    meta: { title: '隐私政策' }
  },
  {
    path: '/guide/:type',
    name: 'guide',
    component: () => import(/* webpackChunkName: "views" */ 'views/Guide'),
    meta: { title: '服务指南' }
  },
  {
    path: '/retrieve',//找回密码
    name: 'Retrieve',
    component: () => import(/* webpackChunkName: "views" */ 'views/Retrieve'),
    meta: { title: '找回密码' }
  },
  {
    path: '/product/detail/:id',//商品详情
    name: 'detail',
    component: () => import(/* webpackChunkName: "views" */ 'views/Detail'),
    meta: { title: '商品详情' }
  },
  {
    path: '/result',//搜索
    name: 'Result',
    component: () => import(/* webpackChunkName: "views" */ 'views/Result'),
    meta: { title: '搜索' }
  },
  {
    path: '/cart',//购物车
    name: 'Cart',
    component: () => import(/* webpackChunkName: "views" */ 'views/Cart'),
    meta: { permission: true, title: '购物车' }
  },
  {
    path: '/brand/:id',//品牌页
    name: 'Brand',
    component: () => import(/* webpackChunkName: "views" */ 'views/Brand'),
    meta: { title: '品牌' }
  },
  {
    path: '/hotel',//酒店板块
    component: () => import(/* webpackChunkName: "views" */ 'views/HotelTour'),
    meta: { title: '酒店首页' },
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "views" */ 'views/HotelTour/Home'),
        meta: { title: '酒店' }
      },
      {
        path: '/hotel/detail/:id',
        component: () => import(/* webpackChunkName: "views" */ 'views/HotelTour/Detail'),
        meta: { title: '酒店详情' }
      },
      {
        path: '/hotel/reser',
        component: () => import(/* webpackChunkName: "views" */ 'views/HotelTour/Reser'),
        meta: { title: '酒店预定' }
      }
    ]
  },
  {
    path: '/tour',//旅游板块
    component: () => import(/* webpackChunkName: "views" */ 'views/HotelTour'),
    meta: { title: '旅游首页' },
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "views" */ 'views/HotelTour/Home'),
        meta: { title: '旅游' }
      },
      {
        path: '/tour/detail/:id',
        component: () => import(/* webpackChunkName: "views" */ 'views/HotelTour/Detail'),
        meta: { title: '景点详情' }
      },
      {
        path: '/tour/reser',
        component: () => import(/* webpackChunkName: "views" */ 'views/HotelTour/Reser'),
        meta: { title: '景点预定' }
      }
    ]
  },
  // 提交订单
  {
    path: '/submit',
    component: () => import(/* webpackChunkName: "views" */ 'views/Submit'),
    meta: { title: '订单' },
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "views" */ 'views/Submit/Submit'),
        meta: { title: '生成订单' }
      },
      {
        path: 'pay',
        component: () => import(/* webpackChunkName: "views" */ 'views/Submit/Payment'),
        meta: { title: '提交订单' }
      },
      {
        path: 'scan',
        component: () => import(/* webpackChunkName: "views" */ 'views/Submit/Scan'),
        meta: { title: '扫码支付' }
      },
    ]
  },
  {
    path: '/center',//个人中心
    component: () => import(/* webpackChunkName: "center" */ 'views/Center'),
    meta: { title: '个人中心首页' },
    children: [
      // 个人中心
      {
        path: '/',
        component: () => import(/* webpackChunkName: "center" */ 'views/Center/Center'),
        meta: { permission: true, title: '个人中心' },

      },

      // 服务订单
      {
        path: '/service/order/:type',
        name: 'service-order',
        component: () => import(/* webpackChunkName: "center" */ '../views/Center/Service'),
        meta: { permission: true, title: '服务订单' },
      },
      {
        path: '/service/detail/:id',
        name: 'service-detail',
        component: () => import(/* webpackChunkName: "center" */ '../views/Center/Service/Detail'),
        meta: { permission: true, title: '服务订单详情' },
      },
      // 个人中心 - 账号管理
      {
        path: '/account',
        component: () => import(/* webpackChunkName: "center" */ '../views/Center/Account'),
        meta: { title: '账号管理' },
        children: [
          {
            path: 'address',
            component: () => import(/* webpackChunkName: "center" */ '../views/Center/Account/Address'),
            meta: { permission: true, title: '收货地址' },
          },
          {
            path: 'infor',
            component: () => import(/* webpackChunkName: "center" */ '../views/Center/Account/Infor'),
            meta: { permission: true, title: '个人信息' },
          },
          {
            path: 'bind',
            component: () => import(/* webpackChunkName: "center" */ '../views/Center/Account/Bind'),
            meta: { permission: true, title: '绑定个人信息' },
          },
          {
            path: 'cert',
            component: () => import(/* webpackChunkName: "center" */ '../views/Center/Account/Cert'),
            meta: { permission: true, title: '实名认证' },
          },
        ]
      },
      {
        path: '/favorite',
        component: () => import(/* webpackChunkName: "center" */ '../views/Center/Favorite'),
        meta: { title: '我的收藏' },
      },
      {
        path: '/comment',
        component: () => import(/* webpackChunkName: "center" */ '../views/Center/Comment'),
        meta: { permission: true, title: '评论中心' },
      },
      // 商品订单
      {
        path: '/goods',
        component: () => import(/* webpackChunkName: "center" */ 'views/Center/Goods'),
        children: [
          {
            path: '/goods/order',
            component: () => import(/* webpackChunkName: "center" */ 'views/Center/Goods/GoodsOrder'),
            meta: { permission: true, title: '我的订单' },
          },
          {
            path: '/goods/detail/:id',
            name: 'order-detail',
            component: () => import(/* webpackChunkName: "center" */ 'views/Center/Goods/OrderDetail'),
            meta: { permission: true, title: '订单详情' },
          },
          {
            path: '/goods/aftermarket',
            name: 'order-aftermarket',
            component: () => import(/* webpackChunkName: "center" */ 'views/Center/Goods/Aftermarket'),
            meta: { permission: true, title: '退款/售后' },
          },
          {
            path: '/aftermarket/detail/:id',
            name: 'aftermarket-detail',
            component: () => import(/* webpackChunkName: "center" */ 'views/Center/Goods/Aftermarket/Detail'),
            meta: { permission: true, title: '售后详情' },
          },
        ]
      },
      {
        path: '/coupons',
        component: () => import(/* webpackChunkName: "center" */ 'views/Center/Coupons'),
        meta: { permission: true, title: '我的优惠券' },
      }
    ]
  },
  {
    path: '*',
    redirect: '/',
    meta: { title: '首页' },
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savePosition) {
    const cb = {};
    if (to.hash) {
      cb.selector = to.hash;
    }

    if (savePosition) {
      cb.x = savePosition.x;
      cb.y = savePosition.y;
    } else {
      cb.x = 0;
      cb.y = 0;
    }

    return cb;
  },
  routes
});

export default router

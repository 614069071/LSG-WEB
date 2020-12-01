import Vue from 'vue';
import layer from 'vue-layer';
import VueCropper from 'vue-cropper'
import VueLazyload from 'vue-lazyload'
import { Pagination, DatePicker, Switch, Radio, Checkbox, Loading, Select, Option } from 'element-ui';
import store from '@/store';
import router from '@/router';
import request from '@/fetch';
import mixins from '@/utils/mixins';
import { delInfoCookie, formatTime, distinct } from '@/utils';
import 'vue-layer/lib/vue-layer.css';
import 'normalize.css';
import '@/styles/base.scss';
import '@/styles/common.scss';
import '@/styles/element-var.scss'
// import 'element-ui/lib/theme-chalk/index.css';

const $layer = layer(Vue);

Vue.mixin(mixins);
Vue.use(VueLazyload).use(Pagination).use(DatePicker).use(Switch).use(Radio).use(Loading).use(Checkbox).use(Select).use(Option).use(VueCropper);
Vue.prototype.$axios = request;
Vue.prototype.$layer = $layer;
Vue.prototype.$ELEMENT = { size: 'mini' };

const files = require.context('@/components', false, /\.vue$/);
files.keys().forEach(path => {
  const instance = files(path).default;
  const name = path.split(".")[1].slice(1);
  Vue.component(name, instance);
});

Vue.directive('login', {
  bind(el, binding) {
    el.loginClick = function () {
      const { token = '', sessionId = '' } = store.state.userinfo;
      if (token && sessionId) {
        router.push(binding.value);
      } else {
        store.commit('updateLoginToast', true);
      }
    }
    el.addEventListener('click', el.loginClick);
  },
  unbind(el) {
    el.removeEventListener('click', el.loginClick);
  }
});

Vue.filter('dealProvinces', (item) => {
  let province = '';
  let city = '';

  if (item.province === item.city) {
    province = item.province;
    city = item.city + '市';
  } else {
    province = item.province + '省';
    city = item.city;
  }
  return province + city + item.area;
});

Vue.filter('dealTime', (item, type = false) => {
  const date = new Date(item);
  const time = formatTime(date, type);
  return time;
});

// 映射订单状态
Vue.filter('mapOrderStatus', (type) => {
  const status = {
    0: '未支付',
    1: '待发货',
    2: '待收货',
    3: '已完成',
    4: '已退货',
    5: '申请退换货',
    6: '正在退换货',
    7: '已取消',
  };
  return status[type];
});

router.beforeEach((to, from, next) => {
  if (!store.state.userinfo.token || !store.state.userinfo.sessionId) {
    delInfoCookie();
    store.commit('setUserInfo', {});
  }

  if (!store.state.isPermission) {
    store.state.userinfo.token && store.dispatch('getGoodsToCart');
    store.state.userinfo.token && store.dispatch('getUserInfo');
    store.commit('setPermission');
  }

  if ((to.meta.permission && store.state.userinfo.token) || !to.meta.permission) {
    next();
  } else {
    next('/');
  }
});

var navRoutes = [];
router.afterEach((to, from) => {
  if (!(from.path === '/' && !from.name)) navRoutes.push(from);
  navRoutes.forEach(e => { if (e.path === '/') { e.meta.title = '首页' } });
  let arr2 = distinct(navRoutes, 'path');
  navRoutes = arr2.slice(-3);
  store.commit('setBreadRoutes', navRoutes);
});

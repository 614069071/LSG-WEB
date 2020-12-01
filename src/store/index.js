import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import actions from './actions';
import mutations from './mutations';
import { getInfoCookie } from '@/utils';

Vue.use(Vuex);

const userinfo = getInfoCookie();

export default new Store({
  state: {
    isPermission: false,
    userinfo: userinfo,
    lsCart: [],
    loginToast: false,
    breadRoutes: [],
  },
  mutations,
  actions
});

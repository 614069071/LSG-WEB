import Vue from 'vue'
import layer from 'vue-layer';
import fetch from '@/fetch';
const $layer = layer(Vue);

export default {
  // 初始化购物车
  getGoodsToCart({ commit }) {
    fetch.cartGet().then(res => {
      const lsCart = res.data.map(e => ({ itemId: e.itemId, num: e.num }));
      commit('addGoodsToCart', lsCart);
    })
  },
  // 添加商品至购物车
  addGoodsToCart({ commit, state }, data) {
    const { token, sessionId } = state.userinfo;
    if (token && sessionId) {
      fetch.cartAdd(data).then(() => {
        $layer.msg('添加成功');
        commit('addGoodsToCart', data);
      })
    } else {
      $layer.msg('请先登录');
    }
  },
  // 删除购物车商品
  remGoodsToCart({ commit }, data) {
    fetch.cartRemove(data).then(res => {
      console.log(res);
      commit('remGoodsToCart', data);
    })
  },
  // 获取用户信息
  getUserInfo({ commit, state }) {
    fetch.getUserInfo().then(res => {
      const { username, phone, nickName, email, headPic = '' } = res.data;
      const userinfo = { username, phone, nickName, email, headPic };
      const data = Object.assign({}, state.userinfo, userinfo);
      commit('setUserInfo', data);
    })
  }
}
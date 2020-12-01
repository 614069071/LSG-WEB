import { setCookie, isArray } from '@/utils';

export default {
  setPermission(state, data = true) {
    state.isPermission = data;
  },
  // 设置登录信息
  setUserInfo(state, data = {}) {
    const use = { token: data.token || '', sessionId: data.sessionId || '' };
    setCookie(use);
    state.userinfo = data;
  },
  setLoading(state, status = false) {
    state.loading = status;
  },
  // 添加购物车
  addGoodsToCart(state, data) {
    const isArr = isArray(data);
    let currentCart = [];
    if (isArr) {
      currentCart = data;
    } else {//商品单元
      currentCart = state.lsCart;
      const isHave = currentCart.some(e => {
        if (e.itemId === data.itemId) {
          e.num += data.num;
        }
        return e.itemId === data.itemId;
      })

      if (!isHave) {
        currentCart.push(data);
      }
    }

    state.lsCart = currentCart;
  },
  // 删除购物车
  remGoodsToCart(state, data) {
    const isArr = isArray(data);
    let currentCart = state.lsCart;

    if (isArr) {
      currentCart.forEach((e, i) => {
        data.forEach(v => {
          if (e.itemId === v) {
            currentCart.splice(i, 1);
          }
        })
      });
    } else {
      currentCart.forEach((e, i) => {
        if (e.itemId === data) {
          currentCart.splice(i, 1);
        }
      });
    }

    state.lsCart = currentCart;
  },
  // 更新购物车商品数量信息
  udtGoodsToCart(state, data) {
    const currentCart = state.lsCart;
    currentCart.forEach((e) => {
      if (e.itemId === data.itemId) {
        e.num = data.num;
      }
    });
    state.lsCart = currentCart;
  },
  // 清空购物车
  clearCart(state) {
    state.lsCart = [];
  },
  updateLoginToast(state, data = false) {
    state.loginToast = data;
  },
  // 面包屑导航
  setBreadRoutes(state, data = []) {
    state.breadRoutes = data;
  }
};
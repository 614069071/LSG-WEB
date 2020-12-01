import store from '@/store';
import router from '@/router';
import { delInfoCookie } from '@/utils';

export default {
  '10004': {
    title: '', callback() {
      delInfoCookie();
      store.commit('setUserInfo', {});
      router.push('/');
    }
  },
  '11001': { title: '登录错误' },
  '11002': { title: '注册错误' },
  '11003': { title: '没有对应用户' },
  '11004': { title: '验证码错误' },
  '11005': { title: '验证码存在' },
  '11006': { title: '验证码发送失败' },
  '11007': { title: '验证码错误或已失效' },
  '11008': { title: '信息不符合要求' },
  '11009': { title: '用户名或密码错误' },
  '11010': { title: '密码错误' },
  '11011': { title: '密码格式无效' },
  '13002': { title: '添加失败' },
  '99999': { title: '服务器错误' }
};
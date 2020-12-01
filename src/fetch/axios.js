// import Vue from 'vue';
// import layer from 'vue-layer';
import axios from "axios";
import store from '@/store';
import mixins from '@/utils/mixins';
import responseSatus from './status';

// const layder = layer(Vue);

// const baseURL = process.env.VUE_APP_URL;
const baseURL = 'https://api.laisigou.com/';
const serve = axios.create({ baseURL, timeout: 20 * 1000, withCredentials: false });

serve.interceptors.request.use(config => {
  const { token = '', sessionId = '' } = store.state.userinfo;
  token && (config.headers['LS-Token'] = token);
  sessionId && (config.headers['LS-Session-ID'] = sessionId || '');
  return config;
}, err => {
  // layder.msg(err.message || '请求失败');
  mixins.methods.loadeing(false);
  return Promise.reject(err);
});

serve.interceptors.response.use(response => {
  mixins.methods.loadeing(false);
  if (response.data.flag && response.data.code == 10000) {
    return response.data || response;
  } else {
    const code = response.data.code || '99999';
    // const msg = (responseSatus[code] || {}).title || response.data.msg || '服务器错误';
    responseSatus[code] && responseSatus[code].callback && responseSatus[code].callback();
    // layder.msg(msg);
    return Promise.reject(response.data);
  }
}, err => {
  console.log(err, 'response err');
  mixins.methods.loadeing(false);
  return Promise.reject(err);
});

export default serve;

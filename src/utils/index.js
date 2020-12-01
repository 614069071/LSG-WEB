import JsCookie from 'js-cookie';

export const storage = {
  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    localStorage.setItem(key, value);
  },
  get(key) {
    const value = localStorage.getItem(key) || '';
    let val = null;
    try {
      val = JSON.parse(value);
    } catch (e) {
      return value;
    }

    if (typeof val === 'number') {
      return value;
    }
    return val;
  },
  del(key) {
    localStorage.removeItem(key);
  }
}

export const storages = {
  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      sessionStorage.setItem(key, JSON.stringify(value));
      return;
    }
    sessionStorage.setItem(key, value);
  },
  get(key) {
    const value = sessionStorage.getItem(key) || '';
    let val = null;
    try {
      val = JSON.parse(value);
    } catch (e) {
      return value;
    }

    if (typeof val === 'number') {
      return value;
    }
    return val;
  },
  del(key) {
    sessionStorage.removeItem(key);
  }
}

// 防抖
export function debounce(fn, wait = 1000) {
  let cacheTime = 0;//触发的时间
  return function () {
    let currentTime = + new Date();
    if (currentTime - cacheTime > wait || !cacheTime) {
      fn.apply(this, arguments);
      cacheTime = currentTime;
    }
  };
}

// 节流
export function throttle(fn, wait = 200) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    let context = this;
    timer = setTimeout(function () {
      fn.apply(context, arguments);
    }, wait)
  }
}

// 获取随机数组
export function getRandomArray(arr, num) {
  var temp_array = [];
  for (var index in arr) {
    temp_array.push(arr[index]);
  }
  var return_array = [];
  for (var i = 0; i < num; i++) {
    if (temp_array.length > 0) {
      var arrIndex = Math.floor(Math.random() * temp_array.length);
      return_array[i] = temp_array[arrIndex];
      temp_array.splice(arrIndex, 1);
    } else {
      break;
    }
  }
  return return_array;
}

// 图片预览
export const preview = function (file) {
  let src = null;
  if (URL.createObjectURL) {
    src = URL.createObjectURL(file);
  } else {
    const fileReader = new FileReader();
    src = fileReader.readAsDataURL(file);
  }
  return src;
}

// 序列化时间
export const formatTime = (date, type = false) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const ymd = [year, month, day].map(formatNumber).join('-');
  const hms = [hour, minute, second].map(formatNumber).join(':');
  return type ? ymd + ' ' + hms : ymd;
}

// 统一格式
export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 批量设置cookie
export function setCookie(data = {}, expires = 7) {
  for (let key in data) {
    JsCookie.set(key, data[key], { expires });
  }
}

// 批量获取cookie
export function getCookie(data) {
  if (typeof data === 'string') {
    return JsCookie.get(data);
  }

  const result = {};
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    result[item] = JsCookie.get(item) || '';
  }
  return result;
}

// 批量删除cookie
export function delCookie(data) {
  if (typeof data === 'string') {
    JsCookie.remove(data);
    return;
  }

  for (let i = 0; i < data.length; i++) {
    JsCookie.remove(data[i]);
  }
}

const userinfo = ['token', 'sessionId'];

// 清除用户信息
export function delInfoCookie() {
  delCookie(userinfo);
}

// 获取用户信息
export function getInfoCookie() {
  return getCookie(userinfo);
}

// 是否是数组
export function isArray(data) {
  return Object.prototype.toString.call(data) === "[object Array]";
}

// 是否是对象
export function isObject(data) {
  return Object.prototype.toString.call(data) === "[object Object]";
}

// 滚动指定dom位置
export function scrollToView(dom = '') {
  const el = document.querySelector(dom);
  const scroll = el.offsetTop;
  scroll ? window.scroll(0, scroll) : el.scrollIntoView();
}

// 数组对象去重
export function distinct(arr, key) {
  var newobj = {}, newArr = [];
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (!newobj[item[key]]) {
      newobj[item[key]] = newArr.push(item);
    }
  }
  return newArr;
}

//获取随机数
export function getRandom() {
  const timeStamp = new Date().getTime();
  let returnStr = "";
  // let range = (max ? Math.round(Math.random() * (max - min)) + min : min);
  const arr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (var i = 0; i < 10; i++) {
    var index = Math.round(Math.random() * (arr.length - 1));
    returnStr += arr[index];
  }
  return timeStamp + returnStr;
}


// 校验相关
// 邮箱验证
export function checkEmail(str) {
  const reg = /[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/g;
  return reg.test(str);
}

// 校验手机
export function checkPhone(str) {
  const reg = /^1[3456789]\d{9}$/g;
  return reg.test(str);
}

// 删除字符串空格
export function removeSpace(str) {
  return str.replace(/\s+/g, '');
}

// 密码校验
export function checkPass(str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,20}$/;
  return reg.test(str);
}

// 密码校验
export function checkUsername(str) {
  const reg = /[a-zA-Z_0-9]{2,30}/;
  return reg.test(str);
}

// 手机号隐藏中间数字
export function dealPhone(str = '') {
  return str.slice(0, 3) + '****' + str.slice(7);
}




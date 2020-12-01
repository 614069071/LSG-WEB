import axios from './axios';
import api from './api';

export default {
  // 用户相关
  getSmsCode: params => axios.get(api.getSmsCode, { params }),//获取手机验证码
  getEmailCode: params => axios.get(api.getEmailCode, { params }),//获取邮箱验证码
  loginPass: data => axios.post(api.loginPass, data),//密码登录
  loginCode: data => axios.post(api.loginCode, data),//验证码登录
  modeifyPass: data => axios.post(api.modeifyPass, data),//新旧密码修改密码
  resetPass: data => axios.post(api.resetPass, data),//短信修改密码
  modeifyUsername: data => axios.post(api.modeifyUsername, data),//修改用户名
  getUserInfo: data => axios.post(api.getUserInfo, data),//获取用户信息
  modifyInfo: data => axios.post(api.modifyInfo, data),//修改用户信息
  modifyPhone: data => axios.post(api.modifyPhone, data),//修改手机号
  modifyEmail: data => axios.post(api.modifyEmail, data),//修改邮箱
  modifyAvator: data => axios.post(api.modifyAvator, data),//修改头像

  // 首页
  homePage: params => axios.get(api.homePage, { params }),//短信修改密码
  homeRecom: params => axios.get(api.homeRecom, { params }),//短信修改密码

  // 搜索
  productSearch: params => axios.get(api.productSearch, { params }),//查询
  productSearchFilter: params => axios.get(api.productSearchFilter, { params }),//条件查询

  // 普通商品详情
  productGetItem: id => axios.get(api.productGetItem + id),//查询普通单个商品
  getCommentList: params => axios.get(api.getCommentList, { params }),//普通商品评论列表
  favProduct: params => axios.get(api.favProduct, { params }),//收藏商品
  getFavList: params => axios.get(api.getFavList, { params }),//收藏列表
  delFavItem: params => axios.get(api.delFavItem, { params }),//删除单个收藏商品
  getBrowseList: params => axios.get(api.getBrowseList, { params }),//删除单个收藏商品

  // 单个商品
  itemGetInfo: id => axios.get(api.itemGetInfo + id),//单个商品详情

  // 收货地址
  addressMain: () => axios.get(api.addressMain),//省市区
  addressAdd: data => axios.post(api.addressAdd, data),//新增地址
  addressDelete: id => axios.get(api.addressDelete + id),//删除地址
  addressList: () => axios.get(api.addressList),//地址列表
  addressModify: data => axios.post(api.addressModify, data),//修改
  addressSetDefault: id => axios.get(api.addressSetDefault + id),//修改默认地址

  // 购物车
  cartGet: () => axios.get(api.cartGet),//查看购物车列表
  cartAdd: data => axios.post(api.cartAdd, data), //商品添加至购物车
  cartRemove: data => axios.post(api.cartRemove, data), //删除购物车 商品
  cartUpdate: data => axios.post(api.cartUpdate, data),//修改购物车商品 的 商品id
  cartRemoveBatch: data => axios.post(api.cartRemoveBatch, data),//修改购物车商品 的 商品id

  // 订单
  orderGetTypeList: (params) => axios.get(api.orderGetTypeList, { params }),//全部订单
  orderGetTypeSate: () => axios.get(api.orderGetTypeSate),//查询用户所有订单分类状态
  orderConfirm: (id, params) => axios.get(api.orderConfirm + id, { params }),//创建订单
  orderPreview: data => axios.post(api.orderPreview, data),//预览订单
  orderPreviewCart: data => axios.post(api.orderPreviewCart, data),//购物车预览订单
  orderGetCache: data => axios.get(api.orderGetCache + data),//根据cacheId查询订单
  orderGetCacheInfo: params => axios.get(api.orderGetCacheInfo, { params }),//根据cacheId查询订单
  orderGetInfo: id => axios.get(api.orderGetInfo + id),//根据orderId查询订单详情
  orderCancel: params => axios.get(api.orderCancel, { params }),//取消订单
  orderFinish: id => axios.get(api.orderFinish + id),//确认收货
  orderAlert: id => axios.get(api.orderAlert + id),//提醒发货

  // 品牌
  getBrandInfo: id => axios.get(api.getBrandInfo + id),//品牌详情
  getBrandList: (id, params) => axios.get(api.getBrandList + id, { params }),//根据品牌查询商品列表

  // 物流信息
  getShipmentInfo: id => axios.get(api.getShipmentInfo + id),//获取物流信息

  // 评价中心
  getCommentCenterList: params => axios.get(api.getCommentCenterList, { params }),//获取评论中心评论列表
  pushComment: data => axios.post(api.pushComment, data),//评价商品
  getCommentInfo: (orderId, ItemId) => axios.get(api.getCommentInfo + `${orderId}/${ItemId}`),//获取评价详情
  // 其他
  getAllType: () => axios.get(api.getAllType),//所有分类
  getWxPay: (id, params) => axios.get(api.getWxPay + id, { params }),//获取微信支付参数
  uploadFile: data => axios.post(api.uploadFile, data), //上传文件
};

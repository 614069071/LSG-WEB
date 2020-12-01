export default {
  // 用户相关
  getSmsCode: '/user/getSMS',//获取手机验证码
  getEmailCode: '/user/getEmail',//获取邮箱验证码
  loginPass: '/user/login/pass',// 密码登录
  loginCode: '/user/login/code',// 短信登录
  modeifyPass: '/user/modify/pass',// 新旧密码修改密码
  resetPass: '/user/resetPass',// 短信修改密码
  modeifyUsername: '/user/modify/username',//修改用户名
  getUserInfo: '/user/getInfo',// 获取用户信息
  modifyInfo: '/user/modify/info',// 修改用户信息
  modifyPhone: '/user/modify/phone',// 修改手机号
  modifyEmail: '/user/modify/email',// 修改邮箱
  modifyAvator: '/upload/avatar',// 修改头像

  // 首页
  homePage: '/homepage/',// 首页
  homeRecom: '/homepage/getRecommend',//专属推荐

  // 搜索
  productSearch: '/product/search',//搜索
  productSearchFilter: '/product/searchFilter',//条件搜索

  // 普通商品详情
  productGetItem: '/product/get/',//商品详情
  getCommentList: '/product/getReviews',//普通商品评论列表
  getBrowseList: '/product/browse/list',//最近浏览

  // 单个商品
  itemGetInfo: '/item/get/',//单个商品详情

  // 收藏
  favProduct: '/product/fav/status',//商品收藏
  getFavList: '/product/fav/listByUser',//收藏列表
  delFavItem: '/product/fav/del',//删除单个收藏商品

  // 收货地址
  addressMain: '/assets/address-location.json',//地址列表
  addressAdd: '/user/address/add',//新增地址
  addressDelete: '/user/address/del/',//删除地址
  addressList: '/user/address/list',//地址列表
  addressModify: '/user/address/modify',//修改
  addressSetDefault: '/user/address/modifyAddress/',//修改默认地址

  // 购物车
  cartAdd: '/cart/add', //商品添加至购物车
  cartGet: '/cart/get',//查看购物车列表
  cartUpdate: '/cart/modify',//修改购物车商品 的 商品id
  cartRemove: '/cart/remove', //删除购物车 商品
  cartRemoveBatch: '/cart/remove/Batch', //删除多个购物车

  // 订单
  orderGetTypeList: '/order/getUserOrders', //全部订单
  orderGetTypeSate: '/order/getOrderCountByState', //查询用户所有订单分类状态
  orderConfirm: '/order/confirm/', //创建订单
  orderPreview: '/order/preview', //预览订单
  orderPreviewCart: '/order/previewCart', //购物车预览订单
  orderGetCecheInfo: '/order/getUserOrders/', //根据cacheId查询订单
  orderGetCache: '/order/getPreviewedOrder/',//查询预览订单
  orderGetInfo: '/order/getOrder/',//根据orderId查询订单详情
  orderCancel: '/order/cancelOrder',//取消订单
  orderFinish: '/order/finish/',//取消订单
  orderAlert: '/order/alert/',//提醒发货

  // 品牌
  getBrandInfo: '/brand/getBrand/', //品牌详情
  getBrandList: '/product/getByBrandId/', //根据品牌查询商品列表

  // 物流信息
  getShipmentInfo: '/order/getShipmentInfo/',//获取物流信息

  // 评价中心
  getCommentCenterList: '/order/getProduct',//获取评论中心评论列表
  pushComment: '/order/review',//提交订单
  getCommentInfo: '/order/getReview/',// + orderId/ItemId 获取评价详情

  // 其他
  getAllType: '/homepage/getCategoryWithBrand', //获取所有分类
  getWxPay: '/pay/wechat/', //获取微信支付参数
  uploadFile: '/upload/file', //上传文件
};

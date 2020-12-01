import { Loading } from 'element-ui';
import router from '@/router';
let loadingInstance = Loading.service;
let laoding = null;

export default {
  methods: {
    loadeing(options) {
      if (typeof options == "boolean" && !options) {
        laoding && laoding.close();
        return;
      }
      laoding = loadingInstance(options);
    },
    dealink(item) {
      console.log(item);
      // product 商品 external 外部链接 search 搜索 category 分类 brand 品牌none 无链接
      const { link = '', linkType = '' } = item;
      if (!link) return;
      if (linkType === 'product') {
        router.push('/product/detail/' + link);
      } else if (linkType === 'search') {
        router.push('/result?keyword=' + link);
      } else if (linkType === 'brand') {
        router.push('/brand/' + link);
      } else if (linkType === 'external') {
        window.open(link);
      }
    }
  }
}
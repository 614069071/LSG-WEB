const TerserPlugin = require('terser-webpack-plugin')
const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];

module.exports = {
  // publicPath: '', // 打包文件相对路径
  outputDir: path.resolve(__dirname, 'homepage'),//正式: homepage 测试:hp-dev
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: '192.168.5.151:8081/',//倪林业
  //       // target: 'http://api-dev.laisigou.com:8080',//陈爽文
  //       // target: 'https://api.laisigou.com/',
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': '' },
  //       secure: false
  //     }
  //   }
  // },
  lintOnSave: false,
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('lib', resolve('src/lib'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'));
  },
  configureWebpack: config => {// eslint-disable-line
    if (process.env.NODE_ENV === 'production') {
      // Gzip
      // config.plugins.push(new CompressionWebpackPlugin({
      //   filename: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //   threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      //   minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      //   deleteOriginalAssets: false, // 删除原文件
      // }));
      return {
        optimization: {
          minimizer: [
            new TerserPlugin({
              sourceMap: false,
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        }
      }
    }
  }
}
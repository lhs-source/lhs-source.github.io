const webpackPlugins = require('./webpack.plugin');

module.exports = {
  outputDir: 'dist',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...webpackPlugins); // 상단에서 정의한 postPlugins 내용 삽입
    }
  },
  css: {
    sourceMap:true,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/css/common.scss";
          @import "@/assets/css/fontface.scss";
        `
      }
    }
  },
  devServer: {
    allowedHosts: 'all',
  }
}
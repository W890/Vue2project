const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
  // devServer: {
  //   https: false, //
  //   open: true, // 配置自动启动浏览器
  //   proxy: {
  //     '/api': {
  //       target: 'http://community.byesame.com/users',
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
})

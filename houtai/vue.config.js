const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    https: false, //
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://192.168.0.88:8888/api/private/v1',
        // target: 'http://localhost:3300',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})

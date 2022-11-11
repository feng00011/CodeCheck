const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: false,
  // // 配置webpack的路由代理（解决跨域问题，本来应该在webpack。config.js里设置的，但是Vue把他整合起来了
  devServer: {
    // 相当于一个代理服务器，这个服务器的地址和项目地址一致，所以从这个服务器分发给项目的数据，浏览器不会进行跨域拦截，而服务器之间又是没有跨域问题的，所以解决了跨域问题
    proxy: {
      // 当路径里带有/api时，会触发如下代理
      "/api": {
        // 目标服务器的地址
        target: "http://localhost:3000/",
        // pathRewrite: {"^/api" : ""}
        // 地址重写
      }
    }
  }
})

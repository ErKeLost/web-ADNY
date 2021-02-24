module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? './': '/',
  devServer: {
      open: true, //配置自动启动浏览器
      disableHostCheck: true, // Invalid Host/Origin header
      port: 8080,
      // host: '172.17.0.13',
      hot: true,
      // public: '172.17.0.13:3001' , // 本地ip
      headers:
      {
          "Access-Control-Allow-Origin": "*"
      },
      proxy: {
          '/api': {
              target: 'http://127.0.0.1:3000',   // 需要请求的地址
              ws: true,
              secure: false,
              changeOrigin: true,  // 是否跨域
              pathRewrite: {
                  '^/api': ''
              }
          }
      }  // 配置多个代理
  },
    configureWebpack: {
        module: {
          rules: [
            {
              test: /\.(html)$/,
              exclude: /node_modules/,
              use: {
                loader: 'html-loader',
                options: {
                  minimize: true
                }
              }
            }
          ]
        }
      },
}
module.exports = {
  publicPath:"./",
  outputDir:"dist",
  indexPath:"index.html",
  pages: {
    index: {
      //入口
      entry: "src/main.js",
    },
  },
  configureWebpack:{
    resolve:{
      alias:{
        cp:"@/components",
        as:"@/assets",
        rt:"@/router",
        pg:"@/pages",
        vw:"@/views",
      }
    }
  },
  devServer: {
    proxy: {
      '/amysoul': {
        target: 'http://121.40.159.226:6001',
				pathRewrite:{'^/amysoul':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
    },
  },
  lintOnSave: false, //关闭语法检查
};

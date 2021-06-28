
//引入 Node.js path 模块
const path = require('path');
const proxyConfig = require('./config/proxy.config');
const { modules } = require('./config/modules.config');

module.exports = {
  //multi-page配置
  pages: modules,
  //设置部署应用包时子路径，生产环境是：/模块名/; 测试环境是当前目录： ./
  publicPath: process.env.NODE_ENV === 'production' ?  `/${process.env.MODULE_NAME}/` : './',
  //按模块输出打包后的文件
  outputDir: `dist/${process.env.MODULE_NAME}`,
  //是否在保存的时候用 eslint-loader进行检查。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  lintOnSave: true,
  productionSourceMap:false,
  devServer: {
	//开发模式下，将请求代理到测试服务器，避免跨域，可配置多个节点。
    proxy: {
      ...proxyConfig,
    },
	//告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
	//contentBase: [path.join(__dirname, "static")],
	//提供静态内容的文件夹
    //contentBasePublicPath: ['/static'],
  },
  configureWebpack: (config) => {
    // 移除不需要打包分析的库
	//将需要忽略打包的都写在这个里面，但前提是index.html文件里面必须script引入
	//通过webpack之externals配置明显减少打包后vendors文件的大小
	//本工程先不考虑文件大小优化，先将js库打进去
    config.externals = {
      // vue: 'Vue',
      // vuex: 'Vuex',
      // 'vue-router': 'VueRouter',
      // axios: 'axios',
      // lodash: '_',
      // 'chart.js': 'Chart',
      // 'crypto-js': 'CryptoJS',
    };
  },
};

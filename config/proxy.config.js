/**
 * 导出代理配置
 * 仅作用于本地开发环境
 * devHost 测试服务器地址
 */
//测试服务器地址，开发过程中可以按照自己的实际情况修改这个地址
const devHost = 'http://10.200.11.10:9000';

module.exports = {
  '/api': {
	//代理的目标地址
    target: devHost,
	//如果接口跨域，需要进行这个参数配置
    changeOrigin: true,
	//重写url
    pathRewrite: {
      '^/api': '/api', //重写之后地址为 http://10.200.11.10:9000/api/xxxxxx
	  //'^/api': '/', //重写之后地址为 http://10.200.11.10:9000/xxxxxx
    },
  },
  '/apis': {
    target: devHost,
    changeOrigin: true,
    pathRewrite: {
      '^/apis': '/apis',
    },
  },
};

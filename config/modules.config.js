/**
 * 多模块入口配置
 */
const moduleArray = [
  { moduleName: 'discounts', title: '打折' },
  { moduleName: 'activity', title: '活动' },
];

const modules = {};

moduleArray.forEach((v) => {
    if (modules.hasOwnProperty(v.moduleName)) {
      throw new Error('modules配置存在同名模块，请修改');
    }
    compile(v);
});

function compile(v) {
	modules[v.moduleName] = {
    // page 的入口文件
    entry: `src/modules/${v.moduleName}/main.js`,
    // 模板文件
    template: 'public/index.html',
    //index.html 的输出路径配置 （dev环境可以用http://localhost:8080/webpack-dev-server 查看文件目录结构）
  	filename: process.env.NODE_ENV === 'production' ? 'index.html' : `${v.moduleName}/index.html`,
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: v.title || '',
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    //chunks: ['chunk-vendors', 'chunk-common', v.moduleName],
    favicon: 'public/favicon.ico',
  };
}

module.exports = {
  moduleArray,
  modules,
};

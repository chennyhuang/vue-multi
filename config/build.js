const { bgGreen, bgRed, green ,red, cyan, black } = require('chalk');
const { program } = require('commander');

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ora = require('ora');
const { spawn } = require('child_process');

program
	.version('0.0.1')
	.option('-a, --all', '打包所有模块')
	.option('-m, --mode <mode>', '指定环境模式 (默认值：production)', 'production') // 添加 mode 参数
	.parse(process.argv);
	
const options = program.opts();

//根据commander参数手动设置当前环境
if (options.mode === 'production') {
	process.env.NODE_ENV = 'production';
}

const { moduleArray,modules } = require('./modules.config');

//获取所有模块名称
const moduleNames = moduleArray.map((i) => i.moduleName);

console.log('moduleNames -- ',moduleNames);

//如果打包命令是 npm run build moduleA moduleB，program.args数组中的值就是 ['moduleA','moduleB']
//判断打包命令是否正确
if (program.args.length === 0 && !options.all) {
	console.log(red('请使用 npm run build [模块名] 或者 npm run build:all 命令进行打包'));
	process.exit(0);
}

//根据打包命令先删除本地已经打好的文件
const distPath = path.resolve(__dirname, '../dist');
if (options.all) {
	rmrf(distPath)
		.then(()=> {
			console.log(green('dist文件夹删除成功'));
			//开始打包
			beforeCompile();
		})
		.catch((err) => {
		  throw new Error(err);
		});
} else {
	const modulesPromise = [];
	program.args.forEach((item) => {
		if (moduleNames.includes(item)) {
			modulesPromise.push(rmrf(path.resolve(__dirname, `../dist/${item}`)));
		}
	});
	Promise.all(modulesPromise)
		.then(() => {
			console.log(green('指定的模块删除成功'));
			//开始打包
			beforeCompile();
		})
		.catch((err) => {
		  throw new Error(err);
		});
}

async function beforeCompile() {
	const buildArr = options.all ? moduleNames : program.args;
	console.log(green('需要参与打包的模块：',buildArr));
	//await放在forEach里面会报错
	// buildArr.forEach((item) => {
	// 	console.log(item);
	// 	if (moduleNames.includes(item)) {
	// 	  	await beginCompile(item);
	// 	} else {
	// 		console.log(red(`模块:${item}不存在`));
	// 		process.exit(0);
	// 	}
	// })
	for (var item of buildArr) {
		if (moduleNames.includes(item)) {
		  	await beginCompile(item);
		} else {
			console.log(red(`模块:${item}不存在`));
			process.exit(0);
		}
	}
}

function beginCompile(moduleName) {
	//开转轮
	const spinner = ora(`开始打包:${moduleName}`);
	spinner.start();
	return new Promise((resolve, reject) => {
		//创建异步子进程
		const subprocess = spawn('vue-cli-service', ['build', `--mode ${options.mode}`], {
		  env: {
		    ...process.env,
			//环境变量设置模块名
		    MODULE_NAME: moduleName
		  },
		  //如果是 true，则在 shell 内运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec
		  shell: true,
		});
	
		//使用on事件来捕获 子进程结束事件
		//'close' 事件在进程结束_并且_子进程的标准输入输出流已关闭后触发
		subprocess.on('close', (code) => {
			spinner.stop();
			console.log(cyan(`\n  ${moduleName}打包结束`));
			resolve();
		})
	})
}

//封装删除文件函数，使用promise，考虑到可能会选择性删除多个模块文件夹，需要用Promise.all汇总结果
function rmrf(path) {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) {
        reject(err);
      }
	  console.log(green('删除：' + path));
      resolve();
    });
  });
}





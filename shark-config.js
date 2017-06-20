const path = require('path');
const fs = require('fs');
const baseconfig = require('./shark-automation-config.js');
shark.baseconfig = baseconfig;
shark.webpack = {
	entry: 'filename'
};

//add es6 support
shark.plugins = {
	compile: [{
		name: 'compile-js',//如果name和内置的task一致，则会用此配置扩展该内置task。不然无需提供 
		plugins: {
			list: [{
				use: 'gulp-babel',//插件名 
				option: {
					presets: ['babel-preset-es2015'].map(require.resolve)
				}//插件的option参数 
			}],//gulp插件列表。 
			merge: 'append'
		}
	}]
	//不压缩js
	// ,min: [{
	// 	name: 'min-js',//如果name和内置的task一致，则会用此配置扩展该内置task。不然无需提供 
	// 	plugins: {
	// 		list: [],//gulp插件列表。 
	// 		merge: 'replace'
	// 	}
	// }]
};

shark.appConfig = function (app) {}
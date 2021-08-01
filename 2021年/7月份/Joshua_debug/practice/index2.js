// 项目中根据环境开启debug

// 执行命令：DEBUG=* NODE_ENV=production node index2.js
// 执行命令：DEBUG=* NODE_ENV=development node index2.js

const _ = require('lodash');
const debug = require('debug');
const debugA = debug('A:');
const debugB = debug('B:');

// 当环境为production时，所有的debugA均不会输出

if (process.env.NODE_ENV === 'production') {
  debugA.enabled = false;
}

debugA('hello world');
debugB('I am new to debug');

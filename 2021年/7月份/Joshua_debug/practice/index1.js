// 计算函数性能示例，传入一个纯数字数组，计算其平均值
// avgA 使用 lodash 库中 sum 求和
// avgB 使用ES5中 Array.proptype.reduce求和


// 执行命令：DEBUG=* node index1.js


const _ = require('lodash');
const debug = require('debug');
const debugA = debug('avgA:');
const debugB = debug('avgB:');
const testFixture = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 使用lodash sum求和
function avgA(arr) {
  return _.sum(arr) / arr.length;
}

// 使用原生reduce 求和
function avgB(arr) {
  return arr.reduce((cal, curr) => cal + curr, 0) / arr.length;
}

const range = _.range(0, 10000000, 1); // 创建一个从0-10000000的数组， 不包括10000000
range.forEach((index) => {
  const result = avgA(testFixture);
  if (index % 1000000 === 0) { // 每1000000的整数次就打印下执行时间
    debugA('time %d', index);
  }
})

range.forEach((index) => {
  const result = avgB(testFixture);
  if (index % 1000000 === 0) {
    debugB('time %d', index);
  }
})

debugA('time');
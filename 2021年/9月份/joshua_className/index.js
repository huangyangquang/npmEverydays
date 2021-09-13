var classNames = require('classnames');

console.log(classNames('foo', 'bar'));

console.log(classNames('foo', {bar: true, duck: false}));

console.log(classNames('foo', {bar: 1}, ['duck', {baz: true}]));

console.log(classNames(['duck', new Map(), function() {}, {'foo': true}, [1, 2, [3], 2]]))

var buttonType = 'primary';
var classname = classNames({
    [`btn-${buttonType}`]: true
})
console.log('classname', classname);

// 源码阅读：
// 将代码接口暴露给不同的引用方式
if (typeof module !== 'undefined' && module.exports) { // commonJs导入
    classNames.default = classNames;
    module.exports = classNames;
} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) { // amd导入
    // register as 'classnames', consistent with npm package name
    define('classnames', [], function () {
        return classNames;
    });
} else {
    window.classNames = classNames; // 浏览器导入
}

// 代码简写：
var hasOwn = {}.hasOwnProperty;
var params = {}

for (var key in params) {
    if (hasOwn.call(params, key) && params[key]) {
        console.log(key, params[key]);
    }
}

// 深层数组展开成字符串：
var arr = [1, 2, [0], 3, [4, 5, [6, 7, [8, 9]]]]

var open = function () {
    var strArr = []

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];

        var argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            strArr.push(arg);
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                var inner = open.apply(null, arg);
                if (inner) {
                    strArr.push(inner);
                }
            }
        }
    }

    return strArr.join()
}

console.log(open(arr));
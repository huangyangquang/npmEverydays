# 每天一个npm包 之 debug

<!-- TOC -->

- [每天一个npm包 之 debug](#每天一个npm包-之-debug)
    - [介绍：](#介绍)
    - [毫秒之差](#毫秒之差)
    - [通配符*](#通配符)
    - [环境变量](#环境变量)
    - [格式化](#格式化)
      - [自定义格式](#自定义格式)
    - [对浏览器的支持](#对浏览器的支持)
    - [对debug进行扩展](#对debug进行扩展)
    - [动态设置](#动态设置)
    - [检查调试目标是否已启用](#检查调试目标是否已启用)
  - [兴趣源码阅读](#兴趣源码阅读)
      - [如何判断是浏览器环境还是nodeJs环境呢？](#如何判断是浏览器环境还是nodejs环境呢)
      - [浏览器环境 / nodeJs环境 底层的打印是使用什么实现的呢？](#浏览器环境--nodejs环境-底层的打印是使用什么实现的呢)
      - [每一条打印出来的log, 后边都会随着一个时间，这个时间是怎么计算出来的呢？](#每一条打印出来的log-后边都会随着一个时间这个时间是怎么计算出来的呢)
      - [格式化是怎么现实的呢？ 格式化的扩展是怎么实现的呢？](#格式化是怎么现实的呢-格式化的扩展是怎么实现的呢)
    - [参考：](#参考)
- [社交信息 / Social Links:](#社交信息--social-links)

<!-- /TOC -->

### 介绍：
这是一个模仿 Node.js 核心调试技术的小型 JavaScript 调试实用程序。 适用于 Node.js 和 Web 浏览器。

debug包 暴露一个函数； 你只需要将你模块的名字传递给这个函数，它就会返回一个将console.error进行了封装的调试语句给你使用。 这将允许您切换到模块的不同部分以及整个模块的调试输出。

### 毫秒之差
当我们在积极开发应用程序，在认真设计我们的代码时，**查看一次 debug() 调用和下一次调用之间花费的时间**会很有用。 

例如，假设您在请求资源之前调用了一次 debug()，并且请求完成之后也调用了一次，两次调用将显示调用之间花费了多少时间。

### 通配符*
* 符号被用作通配符使用。
  
例如，假设您的库中具有名为“connect:bodyParser”、“connect:compress”、“connect:session”的调试器，可以不用像` DEBUG=connect:bodyParser,connect:compress,connect:session `这样一个一个列出来。

您可以简单地执行 `DEBUG=connect:*`，或者使用此模块运行所有内容只需使用 `DEBUG=*`。

### 环境变量
通过 Node.js 运行时，您可以设置一些环境变量来更改调试日志记录的行为：
| 变量名 | 用途 |
| ---- | ---- |
| DEBUG | 启用/禁用特定的调试命名空间。|
| DEBUG_HIDE_DATE | 隐藏调试输出中的日期（非 TTY）|
| DEBUG_COLORS | 是否在调试输出中使用颜色 |
| DEBUG_DEPTH | 对象检查深度 |
| DEBUG_SHOW_HIDDEN | 显示被检查对象的隐藏属性 |

> 注意：以 DEBUG_ 开头的环境变量最终会被转换为一个可与 %o/%O 格式化程序一起使用的 Options 对象。 有关完整列表，请参阅 [util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_object_options) 的 Node.js 文档。

### 格式化
Debug使用 printf-style 格式。 以下是官方支持的格式化程序：

| 格式 | 含义 |
| ---- | ---- |
| %O | 在多行上漂亮地打印一个对象 |
| %o | 在一行上漂亮地打印一个对象 |
| %s | 字符串 |
| %d | 数字（整数和浮点数） |
| %j | JSON。 如果参数包含循环引用，则替换为字符串 '[Circular]' |
| %% | 单个百分号 ('%')，这不会使用到参数或者变量 |

#### 自定义格式
您可以通过扩展 `debug.formatters 对象`添加自定义格式。

例如，如果您想添加对使用 %h 将 Buffer 渲染为十六进制的支持，您可以写下如下代码：
```
const createDebug = require('debug')
createDebug.formatters.h = (v) => {
  return v.toString('hex')
}

// …elsewhere
const debug = createDebug('foo')
debug('this is hex: %h', new Buffer('hello world'))
//   foo this is hex: 68656c6c6f20776f726c6421 +0ms
```

### 对浏览器的支持
您可以使用 browserify 构建一个浏览器就绪脚本，或者如果您不想自己构建它，可以使用 browserify-as-a-service 构建。

debug的启用状态由当前的 localStorage 来决定。 

考虑下面代码的情况，其中您有 worker:a 和 worker:b，如果您希望对两者进行调试。 您可以使用 localStorage.debug 启用此功能：

`localStorage.debug = 'worker:*'
`

然后刷新页面。

```
a = debug('worker:a');
b = debug('worker:b');

setInterval(function(){
  a('doing some work');
}, 1000);

setInterval(function(){
  b('doing some work');
}, 1200);

```

### 对debug进行扩展
您可以简单地扩展调试器debugger

```
const log = require('debug')('auth');

//creates new debug instance with extended namespace
const logSign = log.extend('sign');
const logLogin = log.extend('login');

log('hello'); // auth hello
logSign('hello'); //auth:sign hello
logLogin('hello'); //auth:login hello
```

### 动态设置
您还可以通过调用 enable() 方法动态启用调试：
```
let debug = require('debug');

console.log(1, debug.enabled('test'));

debug.enable('test');
console.log(2, debug.enabled('test'));

debug.disable();
console.log(3, debug.enabled('test'));
```

输出：
```
1 false
2 true
3 false

```

### 检查调试目标是否已启用
创建调试实例后，您可以通过检查 enabled 属性来确定它是否已启用：
```
const debug = require('debug')('http');

if (debug.enabled) {
  // do stuff...
}

```

您还可以手动切换此属性以强制启用或禁用调试实例。


## 兴趣源码阅读
#### 如何判断是浏览器环境还是nodeJs环境呢？
```
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = require('./browser.js'); // 浏览器环境
} else {
	module.exports = require('./node.js'); // nodeJs环境
}
```
解释：

检测Electron renderer/nwjs进程，因为它是节点，所以我们应该视为浏览器。

#### 浏览器环境 / nodeJs环境 底层的打印是使用什么实现的呢？
浏览器环境：
```
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

```

nodeJs环境：
```
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

```

common.js:
```
    ···
    ···
    const logFn = self.log || createDebug.log;
	logFn.apply(self, args);
    ···
    ···
```

#### 每一条打印出来的log, 后边都会随着一个时间，这个时间是怎么计算出来的呢？
首先，我们要知道，调试器是通过 `createDebug 函数` 生成的出来的；

其次，`createDebug 函数` 执行的返回值是一个名为`debug`的函数（实际上，这个就是一个闭包了）;

最后是，在这个`debug函数`中，通过`变量prevTime` 和 `变量curr`, 在配合 `Number(new Date())` 就可以算出这个时间了。

实际上，这个时间就是同一个调试器（或者说是调试语句，就是`debug函数`）调用的时间差，例子可以参考我的案例：index1.js

commonJs:
```
function setup {
    // ....

    function createDebug (namespace) {
        let prevTime;
        // ...

        
        function debug(...args) {
            
            const self = debug;
            
            // Set `diff` timestamp
            const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

            
        }

        return debug
    }

    // ...
    return createDebug;
}

module.exports = setup;
```

#### 格式化是怎么现实的呢？ 格式化的扩展是怎么实现的呢？
common.js:
```
    // ···
    // ···
	if (typeof args[0] !== 'string') {
		// Anything else let's inspect with %O
		args.unshift('%O');
	}

	// Apply any `formatters` transformations
	let index = 0;
	args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
		// If we encounter an escaped % then don't increase the array index
		if (match === '%%') {
			return '%';
		}
		index++;
		const formatter = createDebug.formatters[format];
		if (typeof formatter === 'function') {
			const val = args[index];
			match = formatter.call(self, val);

			// Now we need to remove `args[index]` since it's inlined in the `format`
			args.splice(index, 1);
			index--;
		}
		return match;
	});

    // ···
    // ···
```
browser.js:
```
const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

```
node.js:
```
const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
```


### 参考：
- https://www.npmjs.com/package/debug
- https://juejin.cn/post/6844903601395990541


# 社交信息 / Social Links:

(Welcome to pay attention, 欢迎关注)

Github：
[@huangyangquang](https://github.com/huangyangquang) | [最新技术追踪](https://github.com/huangyangquang/Latest-technology-tracking) | [javascript版算法](https://github.com/huangyangquang/Algorithm) | [早期前端知识总结 + 案例](https://github.com/huangyangquang/DEMO) | 欢迎Star✨✨✨


Social：
[新浪微博](https://weibo.com/u/6385661354) | [知乎](https://www.zhihu.com/people/cclv3) | [掘金](https://juejin.cn/user/2735240661699181) | [思否](https://segmentfault.com/u/c_z7wgq/articles) 

E-mail： fengquan.h@qq.com  

Old Blog：[CSDN](https://blog.csdn.net/huangyangquan3?type=blog)

微信公众号：前端学长Joshua  

![微信公众号](../static/img/wechatQrCode.jpg)
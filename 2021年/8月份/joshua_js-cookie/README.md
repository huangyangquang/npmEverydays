
hello, 大家好，我是 **前端学长Joshua (公众号)**。  
热心于做开源，写文章。  
目的为帮助在校大学生，刚入职场的小伙伴可以尽快搭建自己的前端学习体系。  
如果你有*学习上的困惑*，欢迎关注我，**找我交流，我实时回复大家**。
# js-cookie

<!-- TOC -->

- [js-cookie](#js-cookie)
  - [特性介绍：](#特性介绍)
  - [安装：](#安装)
  - [基础用法：](#基础用法)
  - [命名空间冲突:](#命名空间冲突)
  - [cookie属性的设置：](#cookie属性的设置)
    - [使用 withAttributes 设置全局默认项:](#使用-withattributes-设置全局默认项)
    - [expires](#expires)
    - [path](#path)
    - [domain](#domain)
    - [secure](#secure)
    - [sameSite](#samesite)
  - [cookie读写操作的转换器](#cookie读写操作的转换器)
    - [read (读)](#read-读)
    - [write (写)](#write-写)
  - [Q&A](#qa)
    - [如何将cookie的过期时间设置为在一天之内呢？](#如何将cookie的过期时间设置为在一天之内呢)
  - [社交信息 / Social Links](#社交信息--social-links)

<!-- /TOC -->

## 特性介绍：
js-cookie 是一个上手简单，轻量的，处理cookies的库
有如下特点：
1. 在所有浏览器是可用
2. 允许所有的字符集
3. 支持 ES6 模块化, AMD 和 CommonJs 模块化
4. 符合 RFC 6265
5. 有wiki
6. 允许自定义编码、解码
7. 小体积，小于 800 bytes

## 安装：
```
npm i js-cookie
```

下面直接介绍如何使用吧

```
const Cookies = require('js-cookie')
```

## 基础用法：

创建一个 cookie，在整个站点中有效：
```
Cookies.set('name', 'value')
```

创建一个cookie，有效期为7天，在整个站点上有效：
```
Cookies.set('name', 'value', { expires: 7 })
```

创建一个指定有效期的cookie，且对当前页面的路径有效：
```
Cookies.set('name', 'value', { expires: 7, path: '' })
```


读取cookie:
```
Cookies.get('name') // => 'value'
Cookies.get('nothing') // => undefined
```

读取所有哦cookie:
```
Cookies.get() // => { name: 'value' }
```

> 注意；无法通过传递 cookie 属性之一（在设置相关 cookie 时可能已使用或未使用的述下）来读取特定 cookie
```
Cookies.get('foo', { domain: 'sub.example.com' }) // `domain` won't have any effect...!
```
值为 foo 的 cookie 只能通过 .get() 来读取，前提是这个cookie是允许你的代码读取的 

通过指定 域和/或路径属性 来读取cookie是不会生效的

删除cookie:
```
Cookies.remove('name')
```

删除一个对当前页面路径有效的cookie：
```
Cookies.set('name', 'value', { path: '' })
Cookies.remove('name') // fail!, 需要指定 path字段，如下行代码
Cookies.remove('name', { path: '' }) // removed!
```

> 重要！ 当删除 cookie 并且这个cookie你有指定一些属性时，您必须传递用于设置 cookie 的完全相同的路径和域属性
```
Cookies.remove('name', { path: '', domain: '.yourdomain.com' })
```
> 注意：删除不存在的 cookie 既不会引发任何异常，也不会返回任何值。


## 命名空间冲突:

如果存在与命名空间 Cookies 发生冲突的任何危险，`noConflict 方法`将允许您定义一个新的命名空间, 同时你还可以保留并且继续使用原有的命名空间。 

这个方法在第三方站点上运行脚本时特别有用，例如 作为小部件或 SDK 的一部分。

比如：在当前网站上，已经有了一个“window.Cookies”, 那么我们作为时第三方，就可以使用 Cookies.noConflict() 这个函数来为我们的js-cookie api的使用 重新赋值另外一个变量名，这里就可以避免第三方和原有网站的命名冲突的情况

```
var Cookies2 = Cookies.noConflict()
Cookies2.set('name', 'value')
```
> 注意：使用 AMD 或 CommonJS 模块化规范时不需要 .noConflict 方法，因此它不会在这些环境中公开。

## cookie属性的设置：

可以通过 `withAttributes()` 创建 cookiesIns 的实例, 并且对设置 Cookie 属性全局默认值,  
或是  
通过将普通对象作为最后一个参数传递给 `Cookies.set(...)`。 每次调用 `Cookies.set(...)` 时，属性会覆盖全局默认属性。


### 使用 withAttributes 设置全局默认项:
```
const cookiesIns = Cookies.withAttributes({ path: '/', domain: '.example.com' })
```

### expires
规定cookie何时失效，会被删除 。 

类型：数字，它的含义是，从cookie被创建时算起的天数或一个 Date 实例。 如果省略，cookie 将成为会话 cookie。

要创建在不到一天内过期的 cookie，您可以查看 [Wiki 上的常见问题解答](https://github.com/js-cookie/js-cookie/wiki/Frequently-Asked-Questions#expire-cookies-in-less-than-a-day)。

默认值：是一个会话cookie, 当用户关闭浏览器时 Cookie 就会被删除。

例子：
```
Cookies.set('name', 'value', { expires: 365 })
Cookies.get('name') // => 'value'
Cookies.remove('name')
```

### path
类型：字符串，规定 cookie 可见的路径。

默认值：/

例子：
```
Cookies.set('name', 'value', { path: '' })
Cookies.get('name') // => 'value'
Cookies.remove('name', { path: '' })
```

### domain
类型：字符串，规定 cookie 可见的有效域（实际上就是域名）。   该 cookie 也将对该域名下的所有子域可见。

默认值：Cookie 仅对创建 cookie 的页面的域或子域可见

例子：假设在 site.com 上创建了一个 cookie：
```
Cookies.set('name', 'value', { domain: 'subdomain.site.com' })
Cookies.get('name') // => undefined (需要在'subdomain.site.com'这个域名下去读取这个cookie)
```

### secure
类型：true 或 false，指示 cookie 传输是否需要安全协议 (https)

默认值：false, 无安全协议要求。
```
Cookies.set('name', 'value', { secure: true })
Cookies.get('name') // => 'value'
Cookies.remove('name')
```

### sameSite
类型：字符串，允许控制浏览器是否与跨站点请求一起发送 cookie

默认值：未设置

例子：
```
Cookies.set('name', 'value', { sameSite: 'strict' })
Cookies.get('name') // => 'value'
Cookies.remove('name')
```

## cookie读写操作的转换器

### read (读)
根据api,创建一个新的Cookie实例对象，在这个实例对象上，重写默认解码的函数实现。

在这个库中，所有的 `get函数`， 都是依赖于正确的解码函数而执行的，比如：`Cookies.get()` and `Cookies.get('name')`, 将会运行每个 cookie 给定的转换器, 返回值就是 cookie 的值。

例子：读取一个cookie,这个cookie只能通过 `escape函数` 来进行解码
```
document.cookie = 'escaped=%u5317'
document.cookie = 'default=%E5%8C%97'

var cookies = Cookies.withConverter({
  read: function (value, name) {
    if (name === 'escaped') {
      return unescape(value)
    }
    // 对于所有其他的 cookie 都使用原来的解码方式
    return Cookies.converter.read(value, name)
  }
})
cookies.get('escaped') // 北
cookies.get('default') // 北
cookies.get() // { escaped: '北', default: '北' }
```

### write (写)
根据api,创建一个新的Cookie实例对象，在这个实例对象上，重写默认编码的函数实现。

例子：
```
Cookies.withConverter({
  write: function (value, name) {
    return value.toUpperCase()
  }
})
```

## Q&A
常见问题回答

### 如何将cookie的过期时间设置为在一天之内呢？
js-cookie 的expires 属性是支持一个Data实例对象的。  
这提供了很大的灵活性，因为 Date 实例可以指定任何时刻。

例子：
假设cookie是要在15分钟之后过期
```
var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
Cookies.set('foo', 'bar', {
    expires: inFifteenMinutes
});
```

你也可以设置cookie的有效时间只有半天
```
var inHalfADay = 0.5;
Cookies.set('foo', 'bar', {
    expires: inHalfADay
});
```

或者是 半个小时（30分钟）
```
var in30Minutes = 1/48;
Cookies.set('foo', 'bar', {
    expires: in30Minutes
});
```

## 社交信息 / Social Links
Github：
[@huangyangquang](https://github.com/huangyangquang) | [最新技术追踪](https://github.com/huangyangquang/Latest-technology-tracking) | [javascript版算法](https://github.com/huangyangquang/Algorithm) | [早期前端知识总结 + 案例](https://github.com/huangyangquang/DEMO) | 欢迎Star✨✨✨


Social：
[新浪微博](https://weibo.com/u/6385661354) | [知乎](https://www.zhihu.com/people/cclv3) | [掘金](https://juejin.cn/user/2735240661699181) | [思否](https://segmentfault.com/u/c_z7wgq/articles) 

E-mail： fengquan.h@qq.com  

Old Blog：[CSDN](https://blog.csdn.net/huangyangquan3?type=blog)

微信公众号：前端学长Joshua  
![公众号二维码]('../../../../../static/img/wechatQrCode.jpg')
 
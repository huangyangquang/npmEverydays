# Path-to-RegExp
> 将诸如 /user/:name 之类的路径字符串 转换为 正则表达式。

## 安装
```
npm install path-to-regexp --save
```

## 使用
```
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");
 
// pathToRegexp(path, keys?, options?)
// match(path)
// parse(path)
// compile(path)

```
path: 字符串、字符串数组或正则表达式。  
keys: 要填充路径中找到的键的数组。
options:
- sensitive: 当为true时，正则表达式将区分大小写。 （默认：false）
- strict: 当为 true 时，regexp 将不允许可选的尾随定界符匹配。 （默认：false）
- start: 当为true时，正则表达式将从字符串的开头开始匹配。 （默认值：true）
- delimiter: 默认分隔符，例如 [^/#?] 用于 :named 模式。 （默认： '/＃？'）
- EndsWith: 可选字符或字符列表，将其视为“结束”字符。
- encode: 在插入 RegExp 之前对字符串进行编码的函数。 （默认：x => x）
- prefixes: 解析时自动考虑前缀的字符列表。 （默认： 。/）

看个例子：  
```
const keys = [];
const regexp = pathToRegexp("/foo/:bar", keys);

// 这是将 path ("/foo/:bar") 转发为 正则表达式:
// regexp = /^\/foo(?:\/([^\/#\?]+?))[\/#\?]?$/i

// 这是要填充出类似的路径需要的信息，或是要求:
// keys = [{ 
//    name: 'bar', 
//    prefix: '/', 
//    suffix: '', 
//    pattern: '[^\\/#\\?]+?', 
//    modifier: '' 
// }]
```

注意：  
path-to-regexp 返回的 RegExp 用于有序数据（例如路径名、主机名）。  
它不能处理任意排序的数据（例如查询字符串、URL 片段、JSON 等）  
使用包含查询字符串的路径时，您需要转义问号 (?) ，以确保它不会将参数标记为可选。

### 参数Parameters
path 参数用于定义路径中参数的细节和需要填充键。
path 参数中有许多`参数类型`用来定义出我们需要的正则表达式格式以及我们需要的填充值

#### 命名参数Named Parameters
命名参数Named Parameters 是通过在参数名称 (:foo) 前加一个冒号来定义的。
```
const regexp = pathToRegexp("/:foo/:bar");
// keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]
 
regexp.exec("/test/route");
//=> [ '/test/route', 'test', 'route', index: 0, input: '/test/route', groups: undefined ]

// 因为命名参数要求有两个，这里只有一个参数
regexp.exec("/test");
// => null

regexp.exec("/test/$$$");
// => ['/test/$$$','test','$$$',index: 0,input: '/test/$$$',groups: undefined]

```
注意：  
参数名称必须使用“单词字符”（[A-Za-z0-9_]）

#### 自定义匹配参数Custom Matching Parameters
path中的参数可以有一个自定义的正则表达式，它会覆盖默认匹配 ([^/]+)。 例如，您可以匹配路径中的数字或名称：
```
const regexpNumbers = pathToRegexp("/icon-:foo(\\d+).png");
// keys = [{ name: 'foo', ... }]
 
regexpNumbers.exec("/icon-123.png");
//=> ['/icon-123.png', '123']
 
regexpNumbers.exec("/icon-abc.png");
//=> null
 
const regexpWord = pathToRegexp("/(user|u)");
// keys = [{ name: 0, ... }]
 
regexpWord.exec("/u");
//=> ['/u', 'u']
 
regexpWord.exec("/users");
//=> null
```
提示：反斜杠需要在 JavaScript 字符串中使用另一个反斜杠进行转义。

#### 自定义前缀和后缀Custom Prefix and Suffix
path中的参数可以包含在 {} 中，以便为您的细分创建自定义前缀或后缀：
```
const regexp = pathToRegexp("/:attr1?{-:attr2}?{-:attr3}?");
 
regexp.exec("/test");
// => ['/test', 'test', undefined, undefined]
 
regexp.exec("/test-test");
// => ['/test', 'test', 'test', undefined]
```

#### 未命名参数Unnamed Parameters
可以编写仅由正则表达式组成的未命名参数。 它的工作原理与命名参数相同，只是它会被数字索引：
```
const regexp = pathToRegexp("/:foo/(.*)");
// keys = [{ name: 'foo', ... }, { name: 0, ... }]
 
regexp.exec("/test/route");
//=> [ '/test/route', 'test', 'route', index: 0, input: '/test/route', groups: undefined ]
```

#### 修饰符Modifiers
修饰符必须放在参数之后（例如 /:foo?、/(test)?、/:foo(test)? 或 {-:foo(test)}?）。

#### 可选参数 Optional
参数可以以问号 (?) 为后缀，使参数可选。
```
const regexp = pathToRegexp("/:foo/:bar?");
// keys = [{ name: 'foo', ... }, { name: 'bar', prefix: '/', modifier: '?' }]
 
regexp.exec("/test");
//=> [ '/test', 'test', undefined, index: 0, input: '/test', groups: undefined ]
 
regexp.exec("/test/route");
//=> [ '/test/route', 'test', 'route', index: 0, input: '/test/route', groups: undefined ]
```












































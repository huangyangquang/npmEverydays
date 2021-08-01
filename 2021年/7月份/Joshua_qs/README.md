# 使用：
- 下载代码： https://github.com/huangyangquang/npmEverydays/blob/master/2021%E5%B9%B4/7%E6%9C%88%E4%BB%BD/Joshua_qs
- 执行node index.js, 查看输出结果

```
var qs = require('qs');

var obj = qs.parse('a=c');
console.log('obj: ', obj);

var str = qs.stringify(obj);
console.log('str: ', str);
```
## 解析成对象：

// 嵌套对象
```
var obj2 = qs.parse('foo[bar]=baz')
console.log('obj2: ', obj2);

var obj3 = qs.parse('foo[bar][baz]=foobarbaz')
console.log('obj3: ', obj3);
```

// 创建空对象
```
var nullObject = qs.parse('a[hasOwnProperty]=b', { plainObjects: true });
console.log('nullObject: ', nullObject);
console.log('nullObject是空对象', nullObject.toString)
```

// 覆盖原型上的值
```
var protoObject = qs.parse('a[hasOwnProperty]=b', { allowPrototypes: true });
console.log('protoObject: ', protoObject);
```

// URL编码的字符串
```
const urlObj = qs.parse('a%5Bb%5D=c')
console.log('urlObj: ', urlObj);
```

// 嵌套深度默认是5，可以通过depth来设置
```
var deep = qs.parse('a[b][c][d][e][f][g][h][i]=j', { depth: 1 });
console.log('deep: ', deep);
```

// 解析参数默认1000个，可以通过parameterLimit来设置
```
var limited = qs.parse('a=b&c=d', { parameterLimit: 1 });
console.log('limited: ', limited);
```

// 需要绕过前导问号，可以通过ignoreQueryPrefix来设置：
```
var prefixed = qs.parse('?a=b&c=d', { ignoreQueryPrefix: true });
console.log('prefixed: ', prefixed);
```

// 有指定的分隔符号，可以通过delimiter来设置：
```
var delimited = qs.parse('a=b;c=d', { delimiter: ';' });
console.log('delimited: ', delimited);
```

// 分隔符也可以是正则表达式：
```
var regexed = qs.parse('a=b;c=d,e=f', { delimiter: /[;,]/ });
console.log('regexed: ', regexed);
```

// 选项 allowDots 可用于启用点表示法：
```
var withDots = qs.parse('a.b=c', { allowDots: true });
console.log('withDots: ', withDots);
```

// 如果您必须处理旧版浏览器或服务，还支持将百分比编码的八位字节解码为 iso-8859-1：
```
var oldCharset = qs.parse('a=%A7', { charset: 'iso-8859-1' });
console.log('oldCharset: ', oldCharset);
```

## 解析成数组：
```
var withArray = qs.parse('a[]=b&a[]=c');
console.log('withArray: ', withArray);
```

// 可以指定字符在数组中的位置：
```
var withIndexes = qs.parse('a[1]=c&a[0]=b');
console.log('withIndexes: ', withIndexes);
```

> 请注意，数组中的索引和对象中的键之间的唯一区别是括号之间的值**必须是数字**才能创建数组。 
> 创建具有特定索引的数组时，qs 会将稀疏数组压缩为仅保留其顺序的现有值:
```
var noSparse = qs.parse('a[1]=b&a[15]=c');
console.log('noSparse: ', noSparse);
```

// 您还可以使用 allowSparse 选项来解析稀疏数组：
```
var sparseArray = qs.parse('a[1]=2&a[6]=5', { allowSparse: true });
console.log('sparseArray: ', sparseArray);
```

// 请注意，空字符串也是一个值，将被保留：
```
var withIndexedEmptyString = qs.parse('a[0]=b&a[1]=&a[2]=c&a[3]=');
console.log('withIndexedEmptyString: ', withIndexedEmptyString);
```

> qs 还将限制在数组中指定索引的最大索引为 20。任何索引大于 20 的数组成员将被转换为以索引为键的对象。 
> 这是处理某人发送的情况所必需的，例如，a[999999999] 并且需要大量时间来迭代这个庞大的数组。
```
var withMaxIndex = qs.parse('a[100]=b');
console.log('withMaxIndex: ', withMaxIndex);
```

// 可以通过传递 arrayLimit 选项来覆盖此限制：
```
var withArrayLimit = qs.parse('a[101]=b', { arrayLimit: 101 });
console.log('withArrayLimit: ', withArrayLimit);

var withArrayLimit1 = qs.parse('a[102]=b', { arrayLimit: 101 });
console.log('withArrayLimit1: ', withArrayLimit1);
```

// 要完全禁用数组解析，请将 parseArrays 设置为 false:
```
var noParsingArrays = qs.parse('a[]=b&a[]=c', { parseArrays: false });
console.log('noParsingArrays: ', noParsingArrays);
var noParsingArrays = qs.parse('a[]=b&a[3]=c', { parseArrays: false }); 
console.log('noParsingArrays: ', noParsingArrays);
```

// 如果混合符号， qs 会将两个项目合并为一个对象：
```
var mixedNotation = qs.parse('a[0]=b&a[b]=c');
console.log('mixedNotation: ', mixedNotation);
```

// 您还可以创建对象数组：
```
var arraysOfObjects = qs.parse('a[][b]=c');
console.log('arraysOfObjects: ', arraysOfObjects);

var arraysOfObjects1 = qs.parse('a[b][]=c');
console.log('arraysOfObjects1: ', arraysOfObjects1);
```

// 有人用逗号连接数组，qs可以解析：
```
var arraysOfObjects = qs.parse('a=b,c', { comma: true })
console.log('arraysOfObjects: ', arraysOfObjects);
```
> 注：（这不能转换嵌套对象，例如 a={b:1},{c:d}）


## 字符串化：
> qs.stringify(object, [options]);

// 字符串化时，默认情况下 qs URI 对输出进行编码。 对象按照您的预期进行字符串化：
```
console.log(qs.stringify({ a: 'b' }));
console.log(qs.stringify({ a: { b: 'c' } }))
```

// 可以通过将 encode 选项设置为 false 来禁用此编码：
```
var unencoded = qs.stringify({ a: { b: 'c' } }, { encode: false });
console.log('unencoded: ', unencoded);
```

// 可以通过将 encodeValuesOnly 选项设置为 true 来禁用键的编码：
```
var encodedValues = qs.stringify(
    { a: 'b', c: ['d', 'e=f'], f: [['g'], ['h']] },
    { encodeValuesOnly: true }
);
console.log('encodedValues: ', encodedValues);
```

// 编码也可以通过选项encoder设置为一个自定义的编码方法：
```
var encoded = qs.stringify({ a: { b: 'c' } }, { encoder: function (str) {
    // Passed in values `a`, `b`, `c`
    console.log(str)
    return // Return encoded string
}})
console.log('encoded: ', encoded);
```
// （注意：如果 encode 为 false，则编码器选项不适用）

// 类似于编码器，有一个用于解析的解码器选项decoder来覆盖属性和值的解码：
```
var decoded = qs.parse('x=z', { decoder: function (str) {
    // Passed in values `x`, `z`
    return str + 'JOSHUA'// Return decoded string
}})
console.log(decoded);
```

// 您可以使用提供给编码器的类型参数type，使用不同的逻辑对键和值进行编码：
```
var encoded1 = qs.stringify({ a: { b: 'c' } }, { encoder: function (str, defaultEncoder, charset, type) {
    if (type === 'key') {
        return 'key' + str// Encoded key
    } else if (type === 'value') {
        return 'value' + str// Encoded value
    }
}})
console.log(encoded1);
```

// 类型参数也提供给解码器：
```
var decoded1 = qs.parse('x=z', { decoder: function (str, defaultDecoder, charset, type) {
    if (type === 'key') {
        return // Decoded key
    } else if (type === 'value') {
        return // Decoded value
    }
}})
console.log(decoded1);
```

// 为清楚起见，用于讲解的例子可能看起来将超出这个部分，就好像输出不是 URI 编码的一样。 
// 请注意，在实际使用期间，这些情况下的返回值将都会进行 URI 编码。

// 当数组被字符串化时，默认情况下它们会被赋予显式索引：
```
console.log(qs.stringify({ a: ['b', 'c', 'd'] }));
// 'a[0]=b&a[1]=c&a[2]=d'
```

// 您可以通过将索引选项设置为 false 来覆盖它：
```
console.log(qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false }));
// 'a=b&a=c&a=d'
```

// 您可以使用 arrayFormat 选项来指定输出数组的格式：
```
console.log(qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' }));
// 'a[0]=b&a[1]=c'
console.log(qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' }));
// 'a[]=b&a[]=c'
console.log(qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' }));
// 'a=b&a=c'
console.log(qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' }));
// 'a=b,c'
```

// 当对象被字符串化时，默认情况下它们使用括号表示法：
```
console.log(qs.stringify({ a: { b: { c: 'd', e: 'f' } } }));
// 'a[b][c]=d&a[b][e]=f'
```

// 您可以通过将 allowDots 选项设置为 true 来覆盖它以使用点表示法：
```
console.log(qs.stringify({ a: { b: { c: 'd', e: 'f' } } }, { allowDots: true }));
// 'a.b.c=d&a.b.e=f'
```

// 空字符串和空值将省略该值，但等号 (=) 保持不变：
```
console.log(qs.stringify({ a: '' }));
```

// 没有值的键（例如空对象或数组）将不返回任何内容：
```
console.log('1', qs.stringify({ a: [] }));
console.log('2', qs.stringify({ a: {} }));
console.log('3', qs.stringify({ a: [{}] }));
console.log('4', qs.stringify({ a: { b: []} }));
console.log('5', qs.stringify({ a: { b: {}} }));
```

// 设置为 undefined 的属性将被完全省略：
```
console.log(qs.stringify({ a: null, b: undefined }));
```

// 查询字符串可以选择在前面加上问号：
```
console.log(qs.stringify({ a: 'b', c: 'd' }, { addQueryPrefix: true }));
```

// 分隔符也可以被 stringify 覆盖：
```
console.log(qs.stringify({ a: 'b', c: 'd' }, { delimiter: ';' }));
```

// 如果你只想覆盖 Date 对象的序列化，你可以提供一个 serializeDate 选项：
```
var date = new Date(7);
console.log(qs.stringify({ a: date }));
console.log(qs.stringify({ a: date }, { serializeDate: function (d) {
        return d.getTime(); } 
    }),
);
```

// 您可以使用 sort 选项来影响参数键的顺序：
```
function alphabeticalSort(a, b) {
    return a.localeCompare(b);
}
console.log(qs.stringify({ a: 'c', z: 'y', b : 'f' }, { sort: alphabeticalSort }));
```

// 最后，您可以使用 filter 选项来限制哪些 key 可以被包含在字符串化的输出中。
// 如果您传递一个函数，每个键都调用一次这个函数，通过执行这个函数来获取到返回值，替换key的值。
// 否则，如果您传递一个数组，它将用于选择字符串化的属性和数组索引：
```
function filterFunc(prefix, value) {
    if (prefix == 'b') {
        // Return an `undefined` value to omit a property.
        return;
    }
    if (prefix == 'e[f]') {
        return value.getTime();
    }
    if (prefix == 'e[g][0]') {
        return value * 2;
    }
    return value;
}
console.log('filter option')
console.log(qs.stringify({ a: 'b', c: 'd', e: { f: new Date(123), g: [2] } }, { filter: filterFunc }));
// 'a=b&c=d&e[f]=123&e[g][0]=4'
console.log(qs.stringify({ a: 'b', c: 'd', e: 'f' }, { filter: ['a', 'e'] }));
// 'a=b&e=f'
console.log(qs.stringify({ a: ['b', 'c', 'd'], e: 'f' }, { filter: ['a', 0, 2] }));
// 'a[0]=b&a[2]=d'
```


## null值的处理：

// 默认情况下，null 值被视为空字符串：
```
var withNull = qs.stringify({ a: null, b: '' });
console.log('withNull: ', withNull);
```

// 解析不区分带等号和不带等号的参数。 两者都转换为空字符串。
```
var equalsInsensitive = qs.parse('a&b=');
console.log('equalsInsensitive: ', equalsInsensitive);
```

// 要区分null值和空字符串，请使用 strictNullHandling 选项。 在结果字符串中，null值没有 = 符号：
```
var strictNull = qs.stringify({ a: null, b: '' }, { strictNullHandling: true });
console.log('strictNull: ', strictNull);
```

// 要将没有 = 的值解析回 null，请使用 strictNullHandling 选项：
```
var parsedStrictNull = qs.parse('a&b=', { strictNullHandling: true });
console.log('parsedStrictNull: ', parsedStrictNull);
```

// 要完全跳过具有null值的键的处理输出，请使用 skipNulls 选项：
```
var nullsSkipped = qs.stringify({ a: 'b', c: null}, { skipNulls: true });
console.log('nullsSkipped: ', nullsSkipped);
```

// 如果您正在与旧系统通信，您可以使用 charset 选项切换到 iso-8859-1：
```
var iso = qs.stringify({ æ: 'æ' }, { charset: 'iso-8859-1' });
console.log('iso: ', iso);
```

// iso-8859-1 中不存在的字符将被转换为数字实体，类似于浏览器所做的：
```
var numeric = qs.stringify({ a: '☺' }, { charset: 'iso-8859-1' });
console.log('numeric: ', numeric);
```


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
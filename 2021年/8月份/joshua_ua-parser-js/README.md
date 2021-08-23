# ua-parser-js

ua-parser-js 是一个 JavaScript 库，用于从 User-Agent(用户代理数据)中解析出浏览器、引擎、操作系统、CPU 和设备类型/模型等相关的设备信息，占用空间相对较小（6KB ~ 17KB），可在浏览器（客户端）或 node.js（服务器端）中使用。

案例：http://faisalman.github.io/ua-parser-js

## 文档
### 构造函数
- new UAParser([uastring][,extensions])
  - 返回值：一个新的实例对象

- UAParser([uastring][,extensions])
  - 返回值：一个对象 { ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} }

### 方法
- getBrowser()
  - 返回值： { name: '', version: '' }
```
# 常见的浏览器名称 'browser.name':
2345Explorer, 360 Browser, Amaya, Android Browser, Arora, Avant, Avast, AVG,
BIDUBrowser, Baidu, Basilisk, Blazer, Bolt, Brave, Bowser, Camino, Chimera,
Chrome Headless, Chrome WebView, Chrome, Chromium, Comodo Dragon, Dillo,
Dolphin, Doris, Edge, Electron, Epiphany, Facebook, Falkon, Fennec, Firebird,
Firefox [Reality], Flock, Flow, GSA, GoBrowser, ICE Browser, IE, IEMobile, IceApe, 
IceCat, IceDragon, Iceweasel, Instagram, Iridium, Iron, Jasmine, K-Meleon,
Kindle, Konqueror, LBBROWSER, Line, Links, Lunascape, Lynx, MIUI Browser,
Maemo Browser, Maemo, Maxthon, MetaSr Midori, Minimo, Mobile Safari, Mosaic,
Mozilla, NetFront, NetSurf, Netfront, Netscape, NokiaBrowser, Oculus Browser,
OmniWeb, Opera Coast, Opera [Mini/Mobi/Tablet], PaleMoon, PhantomJS, Phoenix, 
Polaris, Puffin, QQ, QQBrowser, QQBrowserLite, Quark, QupZilla, RockMelt, Safari, 
Sailfish Browser, Samsung Browser, SeaMonkey, Silk, Skyfire, Sleipnir, Slim, 
SlimBrowser, Swiftfox, Tesla, Tizen Browser, UCBrowser, Vivaldi, Waterfox, WeChat,
Weibo, Yandex, baidu, iCab, w3m, Whale Browser...

# 'browser.version' determined dynamically
```

- getDevice()
  - 返回值：{ model: '', type: '', vendor: '' }
```
# 常见设备类型 'device.type':
console, mobile, tablet, smarttv, wearable, embedded

# 常见供应商 'device.vendor':
Acer, Alcatel, Amazon, Apple, Archos, ASUS, AT&T, BenQ, BlackBerry, Dell,
Essential, Fairphone, GeeksPhone, Google, HP, HTC, Huawei, Jolla, Lenovo, LG, 
Meizu, Microsoft, Motorola, Nexian, Nintendo, Nokia, Nvidia, OnePlus, OPPO, Ouya,
Palm, Panasonic, Pebble, Polytron, Realme, RIM, Samsung, Sharp, Siemens,
Sony[Ericsson], Sprint, Tesla, Vivo, Vodafone, Xbox, Xiaomi, Zebra, ZTE, ...

# 'device.model' determined dynamically
```

- getEngine()
  - 返回值: { name: '', version: '' }
```
# 常见的渲染引擎 'engine.name'
Amaya, Blink, EdgeHTML, Flow, Gecko, Goanna, iCab, KHTML, Links, Lynx, NetFront,
NetSurf, Presto, Tasman, Trident, w3m, WebKit

# 'engine.version' determined dynamically
```

- getOS()
  - 返回值: { name: '', version: '' }
```
# 常见的系统 'os.name'
AIX, Amiga OS, Android, Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS,
Contiki, Fedora, Firefox OS, FreeBSD, Debian, DragonFly, Fuchsia, Gentoo, GNU,
Haiku, Hurd, iOS, Joli, KaiOS, Linpus, Linux, Mac OS, Mageia, Mandriva, MeeGo,
Minix, Mint, Morph OS, NetBSD, Nintendo, OpenBSD, OpenVMS, OS/2, Palm, PC-BSD,
PCLinuxOS, Plan9, PlayStation, QNX, Raspbian, RedHat, RIM Tablet OS, RISC OS,
Sailfish, Series40, Slackware, Solaris, SUSE, Symbian, Tizen, Ubuntu, Unix, 
VectorLinux, WebOS, Windows [Phone/Mobile], Zenwalk, ...

# 'os.version' determined dynamically
```

- getCPU()
  - 返回值: returns { architecture: '' }
```
# Possible 'cpu.architecture'
68k, amd64, arm[64/hf], avr, ia[32/64], irix[64], mips[64], pa-risc, ppc, sparc[64]
```

- getResult()
  - 返回值：{ ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} }

- getUA()
   - 返回当前实例对象的ua字符串

- setUA(uastring)
  - 设置要解析的 UA 字符串
  - 返回当前实例对象

### 用法
#### html中使用
```
<!doctype html>
<html>
<head>
<script src="ua-parser.min.js"></script>
<script>

    var parser = new UAParser();
    console.log(parser.getResult());
    /*
        /// 这将打印一个结构如下的对象：
        {
            ua: "",
            browser: {
                name: "",
                version: "",
                major: "" //@deprecated（被舍弃）
            },
            engine: {
                name: "",
                version: ""
            },
            os: {
                name: "",
                version: ""
            },
            device: {
                model: "",
                type: "",
                vendor: ""
            },
            cpu: {
                architecture: ""
            }
        }
    */
    // 默认结果取决于当前 window.navigator.userAgent 值

    // 我们使用一个自定义的userAgent字符串来作为一个例子：
    var uastring1 = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2";

    parser.setUA(uastring1);
    var result = parser.getResult();

    // 您也可以直接使用 UAParser 构造函数而无需创建实例：
    // var result = UAParser(uastring1);

    console.log(result.browser);        // {name: "Chromium", version: "15.0.874.106"}
    console.log(result.device);         // {model: undefined, type: undefined, vendor: undefined}
    console.log(result.os);             // {name: "Ubuntu", version: "11.10"}
    console.log(result.os.version);     // "11.10"
    console.log(result.engine.name);    // "WebKit"
    console.log(result.cpu.architecture);   // "amd64"

    // 另外一个例子：
    var uastring2 = "Mozilla/5.0 (compatible; Konqueror/4.1; OpenBSD) KHTML/4.1.4 (like Gecko)";
    console.log(parser.setUA(uastring2).getBrowser().name); // "Konqueror"
    console.log(parser.getOS());                            // {name: "OpenBSD", version: undefined}
    console.log(parser.getEngine());                        // {name: "KHTML", version: "4.1.4"}

    var uastring3 = 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11';
    console.log(parser.setUA(uastring3).getDevice().model); // "PlayBook"
    console.log(parser.getOS())                             // {name: "RIM Tablet OS", version: "1.0.0"}
    console.log(parser.getBrowser().name);                  // "Safari"

</script>
</head>
<body>
</body>
</html>
```

#### node.js环境中使用
- 安装
```
npm install ua-parser-js
```
- 代码
```
var http = require('http');
var parser = require('ua-parser-js');

http.createServer(function (req, res) {
    // get user-agent header
    var ua = parser(req.headers['user-agent']);
    // write the result as response
    res.end(JSON.stringify(ua, null, '  '));
})
.listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```

#### 在jQuery/Zepto 中使用 ($.ua)
尽管这个库是用 vanilla js 编写，但该库会自动检测 jQuery/Zepto 是否存在并创建 $.ua 对象 以及 window.UAParser 构造函数。   
要获取/设置用户代理，您可以使用：$.ua.get() / $.ua.set(uastring)。
```
// 假设我们在一个带有默认用户代理的浏览器中: 'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Sprint APA7373KT Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0':

// 打印userAgent细节：
console.log($.ua.device);           // {vendor: "HTC", model: "Evo Shift 4G", type: "mobile"}
console.log($.ua.os);               // {name: "Android", version: "2.3.4"}
console.log($.ua.os.name);          // "Android"
console.log($.ua.get());            // "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Sprint APA7373KT Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0"

// 在使用另外一个例子：
$.ua.set('Mozilla/5.0 (Linux; U; Android 3.0.1; en-us; Xoom Build/HWI69) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13');

console.log($.ua.browser.name);     // "Safari"
console.log($.ua.engine.name);      // "Webkit"
console.log($.ua.device);           // {vendor: "Motorola", model: "Xoom", type: "tablet"}
console.log(parseInt($.ua.browser.version.split('.')[0], 10));  // 4

// 为body标签添加 "ua-browser-safari ua-devicetype-tablet" 类名
// <body class="ua-browser-safari ua-devicetype-tablet">
$('body').addClass('ua-browser-' + $.ua.browser.name + ' ua-devicetype-' + $.ua.device.type);
```

#### 使用扩展参数 - extension
- UAParser([uastring,] extensions)
```
// 例子:
var myOwnListOfBrowsers = [
    [/(mybrowser)\/([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION]
];
var myParser = new UAParser({ browser: myOwnListOfBrowsers });
var myUA = 'Mozilla/5.0 MyBrowser/1.3';
console.log(myParser.setUA(myUA).getBrowser());  // {name: "MyBrowser", version: "1.3"}
```















// 使用：
var { pathToRegexp, match, parse, compile } = require("path-to-regexp");
 
// var keys = []
// var regexp = pathToRegexp('/foo/:bar', keys)

// console.log('keys: ', keys);
// console.log('regexp: ', regexp);

// console.log('==================================');

// // 参数：
var regexp = pathToRegexp('/:foo/:bar')
console.log('regexp: ', regexp);

var res = regexp.exec("/test/route");
console.log('res: ', res);

var res = regexp.exec("/test");
console.log('res: ', res);

var res = regexp.exec("/test/$$$");
console.log('res: ', res);

// console.log('==================================');

// // 自定义参数：
// var regexpNumbers = pathToRegexp("/icon-:foo(\\d+).png");
// console.log('regexpNumbers: ', regexpNumbers);
// console.log(regexpNumbers.exec("/icon-123.png"));
// console.log(regexpNumbers.exec("/icon-abc.png"));

// var regexpWord = pathToRegexp("/(user|u)")
// console.log('regexpWord: ', regexpWord);
// console.log(regexpWord.exec("/u"));
// console.log(regexpWord.exec("/users"));

// console.log('==================================');

// // 自定义前缀和后缀：
// var regexp = pathToRegexp("/:attr1?{-:attr2}?{-:attr3}?");
// console.log(regexp.exec("/test"));
// console.log(regexp.exec("/test-test"));
// console.log(regexp.exec("/test-test-test"));
// console.log(regexp.exec("/test-test-test-kkk"));

// console.log('==================================');

// // 未命名参数
// var regexp = pathToRegexp("/:foo/(.*)");
// console.log(regexp.exec("/test/route"));
// console.log(regexp.exec("/test/125625/15256"));

// console.log('==================================');

// // 可选参数
// var regexp = pathToRegexp("/:foo/:bar?");
// console.log(regexp.exec("/test"));
// console.log(regexp.exec("/test/route"));


// var regexp = pathToRegexp("/search/:tableName\\?useIndex=true&term=amazing");
// console.log(regexp.exec("/search/people?useIndex=true&term=amazing"));
// console.log(regexp.exec("/search/people?term=amazing&useIndex=true"));

// // 零个或多个参数匹配：
// var regexp = pathToRegexp("/:foo*");
// console.log(regexp.exec("/"));
// console.log(regexp.exec("/bar/baz"));

// // 一个或多个参数匹配：
// var regexp = pathToRegexp("/:foo+");
// console.log(regexp.exec("/"));
// console.log(regexp.exec("/bar/baz"));

// console.log('==================================');

// // Match:
// var Res = match("/user/:id", { decode: decodeURIComponent });
// console.log(Res("/user/123"));
// console.log(Res("/invalid"));
// console.log(Res("/user/caf%C3%A9"));

// var match = match("/café", { encode: encodeURI, decode: decodeURIComponent });
// console.log('match:', match("/user/caf%C3%A9"));

// console.log('==================================');

// // Parse:
// var tokens = parse("/route/:foo/(.*)");
// console.log('tokens: ', tokens);

// console.log('==================================');

// // Compile ("Reverse" Path-To-RegExp):
// var toPath = compile("/user/:id", { encode: encodeURIComponent });
// console.log(toPath({ id: 123 }));
// console.log(toPath({ id: "café" }));
// console.log(toPath({ id: "/" }));
// console.log(toPath({ id: ":/" }));

// console.log('==================================');

// var toPathRaw = compile("/user/:id")
// console.log(toPathRaw({ id: "%3A%2F" }));
// // console.log(toPathRaw({ id: ":/" }, { validate: false }));
























// 执行: 
// DEBUG=http node example/app.js

// 或者：

// DEBUG=worker:* node example/app.js
// DEBUG=worker:a node example/app.js


var debug = require('debug')('http'), 
    http = require('http'), 
    name = 'My App';

// fake app

debug('booting %o', name);

http.createServer(function(req, res){
  debug(req.method + ' ' + req.url);
  res.end('hello\n');
}).listen(3000, function(){
  debug('listening');
});

// fake worker of some kind

require('./worker');


// ===============其他写法=================================

// 执行：DEBUG=* node example/app.js

// var debug = require('debug'),
//     debugHttp = debug("http:"),
//     http = require('http'), 
//     name = 'My App';

// // fake app

// debugHttp('调试http')

// http.createServer(function(req, res){
//   debugHttp(req.method + ' ' + req.url)
//   res.end('hello\n');
// }).listen(3000, function(){
//   debugHttp('listening')
// });

// // fake worker of some kind

// require('./worker');
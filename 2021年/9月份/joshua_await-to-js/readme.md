# 源码兴趣阅读

```
function to(promise, errorExt) {
    return promise
        .then(function (data) { return [null, data]; })
        .catch(function (err) {
        if (errorExt) {
            Object.assign(err, errorExt);
        }
        return [err, undefined];
    });
}

export { to };
export default to;
```

导出的函数`to`，这个函数接收两个参数：  
1. promise
2. 包含自定义错误信息的对象

对`promise.then`进行异步操作的成功处理，如果函数执行出错，就由`.catch`进行异步操作的失败处理。

对于错误信息，允许开发人员进行自定义出入，最后会在内部将错误信息和最原始的报错信息进行合并

对于返回值，是期望使用者通过`解构`来获取到`to函数`的返回值

这样，我们在使用 async...await 方法时，采用 try...catch 捕获异常的话，如果有多个异步操作，需要每一次书写 try...catch。这样代码的简洁性较差。  
但是使用`to函数`进行封装，就可以使得代码更加简洁，优雅。

















# vue-code
vue源码分析

> observer模块代码分析

```
├── array.js         // 重写数组的方法,使push, pop, shift, unshift, splice, sort, reserver能够触发视图更新,或者说通知watcher
├── dep.js           // 建立变量的依赖,用来记录依赖这个变量的watcher
├── index.js         // 通过Object的setter和geeter建立拦截
├── scheduler.js     
├── traverse.js
└── watcher.js      // 实现watcher的主要代码
```
#### array.js

```
// vue重写了数组的一部分方法, 使它们的调用能通知watcher更新,在index.js里面这个
// 导出的对象将会作为数组数据的原型

// 取数组原型
const arrayProto = Array.prototype 
// 创建一个空对象,且原型指向数组的原型
export const arrayMethods = Object.create(arrayProto)

/**
 * 这里扩展或者说是重写了一部分数组的方法
 */
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // 把数组的原生方法取出来
  const original = arrayProto[method]
  // 定义arrayMethods的方法,def调用的是Obeject.defineProperty方法
  def(arrayMethods, method, function mutator (...args) {
    // 调用数组的原生方法处理数据
    const result = original.apply(this, args)
    // this.__obj__指向当前的observer实例
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 操作完成之后,需要对新的数据进行监听
    if (inserted) ob.observeArray(inserted)
    // 通知依赖此数组的watcher
    ob.dep.notify()
    // 把处理的结果返回
    return result
  })
})

```

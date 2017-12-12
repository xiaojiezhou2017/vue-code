# vue-code
vue源码分析

> vue源码目录结构(src目录下的文件)
```
compiler
│   ├── codegen    
│   ├── create-compiler.js     // 创建用来解析ast语法树的
│   ├── directives             // 编译自定义指令, 包含v-bind v-on v-model v-on
│   ├── helpers.js
│   ├── index.js
│   ├── optimizer.js           // 优化ast语法树
│   ├── parser                 // 转义, 包含了将html转义成ast语法树的过程
│   └── to-function.js
├── core                        // vue的核心, 虚拟dom, 双向绑定的逻辑在里面
│   ├── components              // vue组件 keep-alive
│   ├── config.js
│   ├── global-api              // 初始化全局的api,包含了vue.extend vue.minx vue.use等方法
│   ├── index.js
│   ├── instance                 // 导出vue实例
│   │   ├── events.js            // 事件处理
│   │   ├── index.js              
│   │   ├── init.js              // 在vue的原型上面挂载_init方法, 这个方式在新建vue对象的时候会调用
│   │   ├── inject.js            // 暂不清楚
│   │   ├── lifecycle.js         // 用来初始化vue的声明周期
│   │   ├── proxy.js             // 初始化代理
│   │   ├── render-helpers
│   │   ├── render.js            // 用来初始化vue._render方法, 在双向绑定, 更新dom的时候,会调用这个方法生成新的虚拟dom
│   │   └── state.js              
│   ├── observer                 // vue实现双向绑定的目录
│   │   ├── array.js             // 重写数组方法
│   │   ├── dep.js               // 双向绑定中的发布者     
│   │   ├── index.js             // 对data设置setter和getter拦截变化
│   │   ├── scheduler.js
│   │   ├── traverse.js 
│   │   └── watcher.js           //双向绑定中的订阅者
│   ├── util
│   └── vdom
│       ├── create-component.js        
│       ├── create-element.js
│       ├── create-functional-component.js
│       ├── helpers
│       ├── modules
│       │   ├── directives.js           
│       │   ├── index.js
│       │   └── ref.js
│       ├── patch.js             // 触发视图更新的时候, 进行dom diff, 这里包含了虚拟dom diff的算法  
│       └── vnode.js             // 虚拟dom类的定义, 在这里可以看到所有虚拟dom的属性 
├── platforms                    // 平台层用来和虚拟dom对接
│   ├── web
│   │   ├── compiler             // 编译模板
│   │   ├── runtime
│   │   │   ├── node-ops.js      // 提供给虚拟dom来调用, 混合虚拟dom到真实dom的方法       
│   │   │   ├── patch.js   
├── server
├── sfc
│   └── parser.js
└── shared
    ├── constants.js
    └── util.js
```

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
#### index.js
```
import Dep from './dep'
import VNode from '../vdom/vnode'
import { arrayMethods } from './array'
import {
  def,
  warn,
  hasOwn,
  hasProto,
  isObject,
  isPlainObject,
  isValidArrayIndex,
  isServerRendering
} from '../util/index'
// Object.getOwnPropertyNames 返回对象的所有自身属性的属性名(包括不可枚举属性) 不会获取原型链上的
// 获取数组操作对象的键值
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
export const observerState = {
  shouldConvert: true
}
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data
  constructor (value: any)
    this.value = value
    // 每一个对象或者数组类型数据都会新建一个依赖
    this.dep = new Dep()
    this.vmCount = 0
    // 把observer以__obj__的形式挂在到要检测的变量上面, 还记得上面arry.js this.__obj__吗
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // export const hasProto = '__proto__' in {} 能不能用 __proto__这个指向原型的私有属性
      const augment = hasProto
        ? protoAugment
        : copyAugment 
      // 让数组继承上面array.js导出的改变过后的对象, 这样能让push等操作通知watcher更新,也是为什么直接数组赋值arr[0]='haha'
      // 无法工作的原因
      augment(value, arrayMethods, arrayKeys)
      
      // 把数组中的每一项变成observer实例, 数组里面的数据类型有可能是Object或者Array,所有需要要再监测
      this.observeArray(value)
    } else {
      // 设置对象的seeter和getter
      this.walk(value)
    }
  }
  // 对遍历对象的属性值,调用defineReactive设置setter和getter
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
  // 观测数组项
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

// 下面是工具类函数
// 用this.__proto__实现继承
function protoAugment (target, src: Object, keys: any) {
  target.__proto__ = src
}
// 重载数组上的push等方法
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

// 监测的方法
export function observe (value: any, asRootData: ?boolean): Observer | void {
// 如果传入的不是对象,或者是vNode的实例,则跳过
// 因为普通值是不要监测的,对于值的监测都应该建立在对象的键值上面,通过setter和getter拦截
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  // 判断是不是已经被监听过了
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    // 监听对象或者数组
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}

// 这里是重点, 实现geeter和seeter的地方
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 新建一个依赖, 每一个Observer实例对应一个依赖,例如 data () => {return { obj: {}, arr:[] }} obj和arr会各自建立一个依赖
  
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  
  // 监听对象里面array和嵌套对象,例如{ obj:{}, arr:[] } obj和arr是需要监听的
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      //有getter直接调用
      const value = getter ? getter.call(obj) : val
      // 建立依赖
      ／/=======================重点===========================
      // vue是在setter里面建立依赖的，而不是在初始化的时候，就建立好所有的依赖．这样只有在视图引用了这个对象，才会触发setter，建立依赖
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
　    // 对比新旧值，未发生变化则不进行任何操作　
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      // ===============重点=====================
      // dep通知所有订阅这个依赖的ｗatcher
      dep.notify()
    }
  })
}

export function set (target: Array<any> | Object, key: any, val: any): any {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
export function del (target: Array<any> | Object, key: any) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}

```
#### dep.js

```
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }
  
  // 把watcher添加到依赖列表
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

　// 把wathcer添加到 this.subs 并且把在watcher里面把保存依赖
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  // 当监测的变量发生变化时,会调用这个方法, 去通知所有依赖这个变量的
  // watcher
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// 为所有的watcher建立了一个堆栈
Dep.target = null
// watcher堆栈
const targetStack = []

export function pushTarget (_target: Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  // 指向栈顶
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}

```
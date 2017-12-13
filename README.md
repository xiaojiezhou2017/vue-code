# vue-code
vue源码分析

> vue源码目录结构(src目录下的文件)

阅读源码没有太长时间,还没有把所有文件全看一遍, 只是把自己觉得重要的文件做上了注释
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

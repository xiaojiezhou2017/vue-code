# vue-code
vue源码学习

> vue源码目录

```
.
├── dist                   // 打包后文件放置的目录
├── examples               // 例子展示
├── flow                   // 使用flow，定义了静态类型。在这里能看到vue文档上面提供的api，或者文档上没有提及的api
├── packages               // 独立拆分的功能包，方便复用，其中就包含了vue把template编译成render的函数  
│   ├── vue-server-renderer
│   ├── vue-template-compiler
│   ├── weex-template-compiler
│   └── weex-vue-framework
├── scripts
├── src
│   ├── compiler
│   ├── core                // 核心实现，用于向不同平台的实现提供基础能力，不同平台就包含了platform/web, pltform/server等
│   │   ├── components   
│   │   ├── global-api
│   │   ├── instance
│   │   ├── observer
│   │   ├── util
│   │   └── vdom
│   ├── platforms                                // 对不同平台的实现，不同平台包括web/server/weex
│   │   ├── web
│   │   │   ├── compiler                         // web平台编译模版的实现
│   │   │   ├── runtime                          // 对应与web平台运行时实现，运行时不包含模版编译，这个在vue文档中有描述
            ├── entry-compiler.js                // 打包packages/vue-template-compiler的入口
            ├── entry-runtime-with-compiler.js   // 打包完整版的入口
             ├── entry-runtime.js                // 只包含运行时版打包入口文件

```

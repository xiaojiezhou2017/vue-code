
# vue源码目录结构
```
├── .babelrc.js                          babel的配置文件，里面主要包含了babel插件，和解析路径的一些配置
├── .circleci                            持续集成的配置文件，使用的是circleci，这个工具对于开源项目是免费使用的
├── .editorconfig                        http://editorconfig.org 通用idea代码风格配置文件，有些idea需要下载插件，有些是不需要的
├── .eslintignore                        eslint代码风格检查需要忽略的文件
├── .eslintrc.js                         eslint代码风格检查的配置文件
├── .flowconfig                          flow类型检查的配置文件
├── .git                                 git版本文件
├── .github                              github项目页面一些阅读文档，在READEME.md中，有到该文件下说明文件的超链接。
├── .gitignore                           git版本控制忽略的文件
├── BACKERS.md                           捐献者记录文档
├── LICENSE                              遵守的协议说明，vue遵守的是MIT
├── README.md                            项目的说明文档
├── benchmarks                           基准测试说明的一些文件，主要是包含了一些性能测试和说明。之前是没有的
├── dist                                 项目打包的输出目录
├── examples                             项目使用示例
├── flow                                 flow类型定义文件
├── package.json
├── packages                             单独发布在npm上的，可以单独使用的模块。例如npm包 vue-template-compiler
│   ├── vue-server-renderer
│   ├── vue-template-compiler
│   ├── weex-template-compiler
│   └── weex-vue-framework
├── scripts                              可执行的脚本文件，其中包含了发版构建等命令
│   ├── alias.js                         别名文件。 别名文件独立出来还是非常重要的，因为有些idea可以根据alias配置的路径进行跳转。
│   ├── build.js                         项目构建rollup的配置文件
│   ├── config.js                        打包配置文件，包含了不同打包入口的配置文件
│   ├── feature-flags.js                 打包的时候，内置的变量
│   ├── gen-release-note.js              发版记录说明
│   ├── git-hooks                        目前没有在项目中没有发现对该文件的引用？？？？
│   ├── release-weex.sh
│   ├── release.sh                       发版的脚本. 1 运行测试 2 项目打包 3 项目发布到npm上
│   ├── verify-commit-msg.js             在package.json  gitHooks  commit-msg钩子中，用来校验commit信息是否符合规范，并且给出提示
├── src
│   ├── compiler                         vue-template-compiler的基础实现
│   ├── core
│   │   ├── components                   keep-alive组件的实现。keep-alive组件属于核心实现
│   │   ├── config.js                    vue默认的配置选项，对应于vue中的vue.config选项
│   │   ├── global-api                   vue全局api的实现， Vue.component Vue.filter Vue.directive Vue.extend Vue.mxin Vue.use
│   │   ├── instance 
|   |   |   |── events.js                实现了vue事件的监听和更新功能， 实现的api有$on $once $off $emitAPI
|   |   |   |── init.js                  vm.prototype._init方法的实现
|   |   |   ├── inject.js                inject和provider相关实现
|   |   |   |── lifecycle.js             初始化和生命周期相关的私有属性，例如_isDestroyed,_isBeingDestroyed等，prototype._update函数
|   |   |   ├── proxy.js                 代理vm示例，用来处理render函数中引用不存在属性的报错
|   |   |   ├── render-helpers           render相关的帮助函数，例如vm._l vm._o vm._e等，这些函数会在编译模版生成render函数的时候使用。
|   |   |   ├── render.js                实现prototype._render函数，挂在vm._c私有方法
|   |   |   └── state.js                 初始化props, data, methods computed watch 实现$set $delete $watch等api
│   │   ├── observer                     依赖收集的实现 
│   │   ├── util                         包含debug,错误处理，不同浏览器环境兼容实现
│   │   └── vdom                         虚拟dom相关实现，包含了diff算法, patch算法
│   ├── platforms                        与平台相关的实现， 包含了web weex
│   │   ├── web
│   │   │   ├── compiler                 
│   │   │   │   ├── directives           编译时的指令相关平台实现，包含了v-html v-model和v-text指令  
│   │   │   │   ├── modules              包含了对于 class  model style属性的处理
│   │   │   │   ├── options              core/compiler的配置
│   │   │   ├── runtime                  运行时需要的东西 
│   │   │   │   ├── components           包含了transitionGroup transition过渡组件的实现 
│   │   │   │   ├── directives           包含了v-model，v-show指令的实现 
│   │   │   │   ├── modules              包含了更新attrs class dom-props events style transition的实现，在diff阶段是使用 
│   │   │   │   ├── node-ops             包含虚拟dom diff后要执行的原生操作，例如插入和删除元素 
│   │   │   │   ├── patch                将虚拟dom映射为真实元素的函数, 在这里引用了modules和node-ops作为参数传入
│   │   │   ├── entry-compiler.js                 package/vue-template-compiler的入口文件
│   │   │   ├── entry-runtime-with-compiler.js    完整的包含编译和运行时的入口文件
│   │   │   ├── entry-runtime.js                  只包含运行时的入口文件
│   │   │   ├── entry-server-basic-renderer.js
│   │   │   ├── entry-server-renderer.js
│   │   │   ├── server
│   │   │   └── util
│   │   └── weex
│   ├── server
│   ├── sfc
│   │   └── parser.js                    解析.vue单文件的解析器
│   └── shared                           整个项目共享的文件
│       ├── constants.js
│       └── util.js
├── test                                 测试文件
│   ├── e2e                              ele的全程是end-to-end, 表示的是端到端自动化测试，使用的是nightwatch,浏览器自动化测试工具。 这个会打开一个网页，在网页上演示测试过程和结果，是可视化的。
│   │   ├── .eslintrc.json
│   │   ├── nightwatch.config.js
│   │   ├── runner.js
│   │   └── specs                       测试用例
│   ├── helpers
│   ├── ssr                             服务端渲染的测试， 使用的测试工具是jasmine
│   │   ├── .eslintrc
│   │   ├── async-loader.js
│   │   ├── compile-with-webpack.js
│   │   ├── fixtures
│   │   ├── jasmine.js
│   │   ├── ssr-basic-renderer.spec.js
│   │   ├── ssr-bundle-render.spec.js
│   │   ├── ssr-stream.spec.js
│   │   ├── ssr-string.spec.js
│   │   └── ssr-template.spec.js
│   ├── unit                            单元测试
│   │   ├── .eslintrc.json
│   │   ├── features
│   │   │   ├── component
│   │   │   ├── debug.spec.js
│   │   │   ├── directives
│   │   │   ├── error-handling.spec.js
│   │   │   ├── filter
│   │   │   ├── global-api
│   │   │   ├── instance
│   │   │   ├── options
│   │   │   ├── ref.spec.js
│   │   │   └── transition
│   │   ├── index.js
│   │   ├── karma.base.config.js
│   │   ├── karma.cover.config.js
│   │   ├── karma.dev.config.js
│   │   ├── karma.sauce.config.js
│   │   ├── karma.unit.config.js
│   │   └── modules
│   │       ├── compiler
│   │       ├── observer
│   │       ├── server-compiler
│   │       ├── sfc
│   │       ├── util
│   │       └── vdom
│   └── weex      
├── types
│   ├── test
│   ├── tsconfig.json
│   ├── typings.json
│   ├── vnode.d.ts
│   └── vue.d.ts
```


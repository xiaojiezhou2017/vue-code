
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
│   ├── unit                            单元测试，这里要注意的是*.spec.js表示的是测试条件代码
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
## package.json解析
```json
{
  "name": "vue", 
  "version": "2.6.10",
  "description": "Reactive, component-oriented view layer for modern web interfaces.",
  "main": "dist/vue.runtime.common.js",
  "module": "dist/vue.runtime.esm.js",
  "unpkg": "dist/vue.js",
  "jsdelivr": "dist/vue.js",
  "typings": "types/index.d.ts",
  "files": [
    "src",
    "dist/*.js",
    "types/*.d.ts"
  ],
  "sideEffects": false,
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
    "dev:test": "karma start test/unit/karma.dev.config.js",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
    "dev:compiler": "rollup -w -c scripts/config.js --environment TARGET:web-compiler ",
    "dev:weex": "rollup -w -c scripts/config.js --environment TARGET:weex-framework",
    "dev:weex:factory": "rollup -w -c scripts/config.js --environment TARGET:weex-factory",
    "dev:weex:compiler": "rollup -w -c scripts/config.js --environment TARGET:weex-compiler ",
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex",
    "test": "npm run lint && flow check && npm run test:types && npm run test:cover && npm run test:e2e -- --env phantomjs && npm run test:ssr && npm run test:weex",
    "test:unit": "karma start test/unit/karma.unit.config.js",
    "test:cover": "karma start test/unit/karma.cover.config.js",
    "test:e2e": "npm run build -- web-full-prod,web-server-basic-renderer && node test/e2e/runner.js",
    "test:weex": "npm run build:weex && jasmine JASMINE_CONFIG_PATH=test/weex/jasmine.js",
    "test:ssr": "npm run build:ssr && jasmine JASMINE_CONFIG_PATH=test/ssr/jasmine.js",
    "test:sauce": "npm run sauce -- 0 && npm run sauce -- 1 && npm run sauce -- 2",
    "test:types": "tsc -p ./types/test/tsconfig.json",
    "lint": "eslint src scripts test",
    "flow": "flow check",
    "sauce": "karma start test/unit/karma.sauce.config.js",
    "bench:ssr": "npm run build:ssr && node benchmarks/ssr/renderToString.js && node benchmarks/ssr/renderToStream.js",
    "release": "bash scripts/release.sh",
    "release:weex": "bash scripts/release-weex.sh",
    "release:note": "node scripts/gen-release-note.js",
    "commit": "git-cz"
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node scripts/verify-commit-msg.js"
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ]
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vuejs/vue.git"
  },
  "keywords": [
    "vue"
  ],
  "author": "Evan You",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/vuejs/vue/issues"
  },
  "homepage": "https://github.com/vuejs/vue#readme",
  "devDependencies": {},
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}

```
 `name`: 项目名称 vue  
 `version`: 项目的版本 2.6.10  
 `description`: 项目的描述  
 `files`: 表示该npm包应该包含的文件， 也就是npm publish发布上去的文件。 例如通过npm install的Vue，文件目录为：
  src/ dist/ types/
  > 官方文档上的说明如下：
  The "files" field is an array of files to include in your project. If you name a folder in the array, then it will also include the files inside that folder. (Unless they would be ignored by another rule.)  
  
 `main`: main项目的主要入口，指向的是一个导出的模块，当用户使用require('moduleID'), 返回的应该是该main字段指定的模块  
 `module`: 该字段目前不属于package.json的规范,所以从npm的官方文档是查不到的。 module是表示使用ES module规范的入口，也就是es5包规范的入口。main 表示的是使用common.js规范的入口。当使用require('module')，会从模块的main字段中读取入口文件并导出。当使用
 es模块规范的时候，会从module字段读取入口文件并导出。webpack从2版本开始支持，也就是这个字段是给打包工具用的
 [module字段参考网址](https://segmentfault.com/a/1190000014286439) [package.json 非官方字段集合](https://segmentfault.com/a/1190000016365409)  
 `unpkg`: 在unpkg根据url寻找文件的时候，如果只指向了一个基础的url,例如unpkg.com/jquery, 将会读取unpkg字段寻找入口文件，如果失败的话，退回到main字段  
 `jsdelivr`: 是npm的一个分发CDN，配置分发的内容，默认读取的是package.json中的jsdelivr，没有的话，会读取browser和main  
 `typings`: 定义typescript的入口文件。  
 `sideEffects`: webpack打包进行tree-sharking的时候会用到。表示该模块不含有任何的副作用，在tree-sharking的时候可以优化掉。什么是副作用：例如
  `console.log('hello world'')`这段代码就有副作用，例如
  ```
  // module b
  export function b () { };
  console.log('module b');  // 副作用代码
  // module a
  export function a () {}
  // app.js
  import a from 'a'
  import b from 'b'
  a();
  ```
  此时tree-sharking是无法优化掉b的代码的，即使b模块只是导入并没有使用，因为b模块中有副作用代码
  [详细内容可以参考](https://segmentfault.com/a/1190000015689240)   
  `gitHooks`:结合尤大大的yorkie根据[husky](https://github.com/typicode/husky)改写的模块，可以根据package.json中的配置文件，自动安装gitHooks。
  `lint-staged`:[lint-staged](https://github.com/okonet/lint-staged)模块需要读取的配置,用来对git暂存的文件执行命令，git暂存的文件是指git add没有git commit的文件。在gitHooks中配置了pre-commit钩子执行的命令是lint-staged。lint-staged会读取package.json中该项的配置，
  也就是执行`eslint --fix git add`, 在每次commit之前对代码风格进行修复。  
  `config`:[commitizen](https://github.com/commitizen/cz-cli)用来规范git提交记录。可以选用不同的格式，其中config中的path就对应了配置的交互界面的路径。
  `cz-conventional-changelog`是angular.js使用的格式。
  
  ### package.json中script中运行的命令：
  * dev 调试开发运行时加编译时的代码， 其中的`TARGET`环境变量用来表示当前所要打包的文件类型。在src/scripts/config中的中用来取对应的入口文件
  ```javascript
  if (process.env.TARGET) {
    module.exports = genConfig(process.env.TARGET)
  } else {
    exports.getBuild = genConfig
    exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
  }
  ```
  * dev:cjs 调试开发打包后是commonjs规范
  * dev:esm 调试开发打包后是es6模块规范
  * dev:test 在当前的开发环境（指chrome）运行单元测试
  * dev:ssr 调试开发服务端渲染
  * dev:compiler 调试开发commonjs规范的，vue-template-compiler包
  * dev:weex
  * dev:weex:factory
  * dev:weex:compiler
  * build 打包出服务端渲染和浏览器端代码，不包含weex平台。 
    dist/vue.runtime.common.dev.js 217.71kb  
    dist/vue.runtime.common.prod.js 63.20kb (gzipped: 22.83kb)  
    dist/vue.common.dev.js 312.02kb  
    dist/vue.common.prod.js 91.30kb (gzipped: 33.23kb)  
    dist/vue.runtime.esm.js 221.72kb  
    dist/vue.esm.js 317.96kb  
    dist/vue.esm.browser.js 307.36kb  
    dist/vue.esm.browser.min.js 90.79kb (gzipped: 33.22kb)  
    dist/vue.runtime.js 232.78kb  
    dist/vue.runtime.min.js 63.36kb (gzipped: 22.89kb)  
    dist/vue.js 333.34kb  
    dist/vue.min.js 91.46kb (gzipped: 33.29kb)  
    packages/vue-template-compiler/build.js 140.31kb  
    packages/vue-template-compiler/browser.js 247.68kb  
    packages/vue-server-renderer/build.dev.js 247.05kb  
    packages/vue-server-renderer/build.prod.js 80.18kb (gzipped: 29.27kb)  
    packages/vue-server-renderer/basic.js 333.88kb  
    packages/vue-server-renderer/server-plugin.js 2.91kb  
    packages/vue-server-renderer/client-plugin.js 3.03kb  
  * build:ssr 打包出服务端渲染的代码
    dist/vue.runtime.common.dev.js 217.71kb  
    dist/vue.runtime.common.prod.js 63.20kb (gzipped: 22.83kb)  
    packages/vue-server-renderer/build.dev.js 247.05kb  
    packages/vue-server-renderer/build.prod.js 80.18kb (gzipped: 29.27kb)  
    packages/vue-server-renderer/basic.js 333.88kb  
    packages/vue-server-renderer/server-plugin.js 2.91kb  
    packages/vue-server-renderer/client-plugin.js 3.03kb  
  * build:weex 打包出weex平台的代码
    packages/weex-vue-framework/factory.js 203.90kb  
    packages/weex-vue-framework/index.js 5.68kb  
    packages/weex-template-compiler/build.js 127.37kb  
  * test:unit 运行单元测试，包括了三个环境['Chrome', 'Firefox', 'Safari']
  * test:cover 运行单元测试，并在终端输出测试结果和覆盖率
  * test:e2e 运行界面测试，可以直接看到网页的交互行为。
  * test:sauce 在sauceLabs云测试平台运行vue的单元测试。使用的是['karma-sauce-launcher'](https://www.npmjs.com/package/karma-sauce-launcher)插件
  * test:types 测试typescript类型
  * lint 使用eslint检查测试文件, 包括src scripts test下的文件
  * flow 做flow的类型检查，并且在终端打印出结果
  * sauce 供test:sauce调用
  * bench:ssr 运行服务端渲染的基准测试或者说是性能测试，测试的是渲染1000行10列的表格
  * release 发版脚本。 主要做了下面几件事情 1 让用户输入版本号 2 运行发版前的步骤，主要包括（lint代码风格检查，flow 静态类型检查, test:cover单元测试, test:e2e可视化测试， test:ssr服务端渲染测试）3 运行build的命令 4 切到 packages/vue-template-compiler目录下和packages/vue-server-renderer下，执行npm publish命令发布vue-template-compiler和vue-server-renderer包 5 将生成的dist下的内容和packages下的内容添加到git版本中 5 生成发版记录也就是release note 6 把分支推送到远程 7 vue发布到npm上
  * commit 运行git提交命令
  
  ### 目前不了解或者需要深入学习的知识点
 * typescript 类型测试
 * vue源码是如何集成typescript的
 * karma单元测试 
 * e2e 测试
 * jasmine测试工具
 * typescipt
 * flow
 * rollup打包工具的使用
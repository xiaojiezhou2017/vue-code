### vue虚拟dom比较算法(主要代码位于src/core/vdom)

* 虚拟dom的结构(src/core/vdom/vnode.js)
* vdom的patch方法(在修改data数据后,会触发更新调用vdom的patch方法)
* vdom的diff方法(主要体现在更新子节点的时候,对应的源码位置vdom/patch.js下面的updateChildren方法)

#### vdom的结构(src/core/vnode.js)
> 下面的写法是typescript的写, 可以
```
  tag: string | void;                                    // 标签名称
  data: VNodeData | void;                                // data表示vnode的节点信息, 具体可以参考 /types/vnode.d.t
  children: ?Array<VNode>;                               // 用来存放孩子节点的数组
  text: string | void;                                   // 当前节点的文本内容, 一般是文本节点和注释节点会有该属性
  elm: Node | void;                                      // 当前节点对应的真实节点, 文本节点为#text
  ns: string | void;                                     // 命名空间, 这个应该和svg和xml有关
  context: Component | void; // rendered in this component's scope // 上下文
  key: string | number | void                            // 当前节点对应的key值
  componentOptions: VNodeComponentOptions | void;        // 组件的options项目
  componentInstance: Component | void; // component instance // 对应组件的构造函数实例
  parent: VNode | void; // component placeholder node    // 父节点
  // 下面作者做的注释很详细了, 就不再写中文注释了
  // strictly internal
  raw: boolean;                                         // contains raw HTML? (server only)
  isStatic: boolean;                                    // hoisted static node
  isRootInsert: boolean;                                // necessary for enter transition check
  isComment: boolean;                                   // empty comment placeholder?
  isCloned: boolean;                                    // is a cloned node?
  isOnce: boolean;                                      // is a v-once node?
  asyncFactory: Function | void;                        // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void;                          // real context vm for functional nodes
  fnOptions: ?ComponentOptions;                         // for SSR caching
  fnScopeId: ?string; // func
```


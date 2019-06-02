

### 该模块实现的就是我们常用的v-model指令，vue用来实现双向绑定。

该指令主要分为inserted和componentUpdated, 其中主要区分了select select.multiple和其他文本类型框

#### inserte部分
``` javascript
inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', () => {
          directive.componentUpdated(el, binding, vnode)
        })
      } else {
        setSelected(el, binding, vnode.context)
      }
      el._vOptions = [].map.call(el.options, getValue)
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers
      // lazy修饰符的处理在src/platforms/web/compiler/directives/model.js->genDefaultModel
      if (!binding.modifiers.lazy) { // 默认逻辑，没有lazy修饰符时
        el.addEventListener('compositionstart', onCompositionStart)
        el.addEventListener('compositionend', onCompositionEnd)
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd)
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true
        }
      }
    }
  },
```
针对select标签和textarea和input(text,number,password,search,email,tel,url)采取了不同的处理。

* select的处理逻辑


class Observer {
    constructor (observerVal){
        this.observerVal = observerVal;
        this.walk(observerVal)
    }
    walk (obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i ++ ) {
            this.observer.call(this,obj,keys[i],obj[keys[i]])
        }
    }
    observer (obj, key, value) {
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            get () {
                dep.depend();
                return value;
            },
            set (v) {
                value = v;
                dep.notify();
            }
        }) 
    }
}

const stack = [];

const pushStack = (watcher) => {
    Dep.target = watcher;
    stack.push(watcher);
}
const popStack = () => {
    Dep.target = stack.pop()
}



let DepId = 0;

class Dep {
    constructor () {
        this.watchers = [];
        this.id = DepId ++;
    }
    pushWatch (watch) {
        this.watchers.push(watch);
    }
    depend () {
        Dep.target.addDep(this);
    }
    notify () {
        this.watchers.forEach(w => {
            w.update();
         })
    }
}

class Watcher {
    constructor (render,ctx) {
        this.render = render;
        this.ctx = ctx;
        this.deps = [];
        this.get();
    }
　　 addDep (dep){
        const deps = this.deps;
        const record = deps.find(i => i.id === dep.id);
        if (!record) { 
            this.deps.push(dep);
            dep.pushWatch(this);
        }
    }　
    clearDep () {
        this.deps.forEach((i) => {
            i.watchers = [];
        })
    }
    get () {
        pushStack(this);
        this.render();
        popStack();
    }
    update () {
        this.render.call(this.ctx)
    }
}

const obj = {name: 'zhou'};
function mount () {
   const input = document.getElementById('input');
   const text = document.getElementById('text');
   const render = () => { 
        input.value = obj.name;
        text.innerText = obj.name; 
   }
   const watcher = new Watcher(render);
   new Observer(obj);   
   input.value = obj.name;
   input.addEventListener('input', (e)=> {
        obj.name = e.target.value;
   })
}

mount();
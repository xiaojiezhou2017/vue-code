class Observer {
    constructor (observerVal){
        this.observerVal = observerVal;
        this.walk(observerVal)
    }
    walk (obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i ++ ) {
            this.observer(obj,keys[i],obj[keys[i]])
        }
    }
    observer (obj, key, value) {
        Object.defineProperty(obj, key, {
            get () {
                return value;
            },
            set: function (v) {
                render(v);
                return v;
            }
        }) 
    }
}
const obj = {name: 'zhou'};
new Observer(obj);

const view = document.getElementById('view');
const content = document.getElementById('content');

const render = (v) => {
    view.value = v;
    content.innerText = v;
} 

view.addEventListener("change", (e) => {
   const v = e.target.value;
   obj.name = v;
})


render(obj.name);


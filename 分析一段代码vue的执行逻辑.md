> 代码如下
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="app">

</div>
</body>
<script src="./vue.js"></script>
<script>
    Vue.component('parent', {
        template: '<div> i am parent<h1 v-for="(item, index) in obj">{{item}}</h1><button @click="handleClick">click</button></div>', 
        data () {
            return {
                obj: [
                    "wo",
                    "ni"
                ]
             }
        },
        methods: {
            handleClick () {
                const arr = [ first, last ] = this.obj; 
                this.obj = [ last, first];
            }
        },
        watch : {
            obj () {
                console.log('obj is change');
            }
        }
    })
    var app = new Vue({
        el:"#app",
        template: '<div class="" ><parent/></div>'
    })
</script>
</html>
```
![image]()

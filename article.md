## `Vue`组件通信
使用`Vue`进行项目开发，碰到的比较多的问题就是如何进行组件之间的参数传递。为了能够更优雅的解决此类问题，笔者在这里总结了开发中经常用到的一些组件通信方式，并配合一些例子方便理解。

源码地址：

所有的例子都在`src/views`目录中，有需要的小伙伴可以自行取用

> 注：有些例子刻意为之，只是为了学习对应的知识点，对于实际使用场景刻意不必深究

### `props`传参
在`Vue`中，我们可以通过为子组件传入`props`，然后在子组件中接收，并通过`this`来直接访问
```vue
<!--demo-props-->
<template>
  <div class="demo-props">
    <h2>{{ count }}</h2>
    <demo-children
      :count="count"
      :add-count="addCount"
    >
    </demo-children>
    <button @click="addCount">parent click</button>
  </div>
</template>
```
```vue
<!--demo-child-->
<template>
  <div class="demo-child">
    <demo-grandson :add-count="addCount"></demo-grandson>
    <button @click="addCount">child click</button>
  </div>
</template>
```
这里我们为`demo-children`传入了`count`和`add-count`属性，然后又将`add-count`传入了`demo-grandson`组件中。这样当我们分别点击父组件(`demo-props`)、子组件(`demo-child`)和孙子组件(`demo-grandson`)中的按钮时，都会更新`count`属性

当然我们也可以使用`v-bind`来直接绑定一个对象，`Vue`会帮我们将组件属性进行分发，类似于`react`中的`{...props}`：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200912180143.png)
> 这张图的出处在这里，有兴趣的小伙伴可以去围观😜：https://twitter.com/tannerlinsley/status/1300847251846176768


在`Vue`中我们也可以利用这个对象简写的特性来少敲几下键盘：  
```vue
<!--demo-props-->
<template>
  <div class="demo-props">
    <h2>{{ count }}</h2>
    <demo-children v-bind="{count,addCount}" >
    </demo-children>
    <button @click="addCount">parent click</button>
  </div>
</template>
```

### 自定义事件

### 双向绑定`v-model/.sync`


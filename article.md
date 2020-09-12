## `Vue`组件通信
使用`Vue`进行项目开发，碰到的比较多的问题就是如何进行组件之间的参数传递。为了能够更优雅的解决此类问题，笔者在这里总结了开发中经常用到的一些组件通信方式，并配合一些例子方便理解。

* 源码地址：[`vue-component-communication`](https://github.com/wangkaiwd/vue-component-communication/blob/master/article.md)
* [在线访问](https://wangkaiwd.github.io/vue-component-communication)

所有的例子都在`src/views`目录中，有需要的小伙伴可以自行取用

> 注：有些例子刻意为之，只是为了学习对应的知识点，对于实际使用场景刻意不必深究

### `props`传参
在`Vue`中，我们可以通过为子组件传入`props`，然后在子组件中接收，并通过`this`来直接访问
```vue
<!--demo-props-->
<template>
  <div class="demo-access-instance">
    <h2>{{ count }}</h2>
    <demo-child
      :count="count"
      :add-count="addCount"
    >
    </demo-child>
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
  <div class="demo-access-instance">
    <h2>{{ count }}</h2>
    <demo-child v-bind="{count,addCount}" >
    </demo-child>
    <button @click="addCount">parent click</button>
  </div>
</template>
```

### 自定义事件
`Vue`中可以通过`@`符号来监听自定义事件，并在子组件中通过`$emit`方法来触发监听的事件。我们将上面的例子用自定义事件来进行改写：
```vue
<!--demo-custom-event-->
<template>
  <div class="demo-custom-event">
    <h2>{{ count }}</h2>
    <demo-child
      :count="count"
      @add-count="addCount"
    >
    </demo-child>
    <button @click="addCount">parent click</button>
  </div>
</template>
```

```vue
<template>
  <div class="demo-child">
    <demo-grandson @add-count="addCount"></demo-grandson>
    <button @click="addCount">child click</button>
  </div>
</template>
<script>
export default {
  // ...
  methods: {
    addCount () {
      // 通知父组件执行'add-count'对应的事件
      this.$emit('add-count');
    }
  }
};
</script>
```
完成上述代码后，我们依旧可以通过点击各个组件内的按钮来更新`count`属性

### 双向绑定`v-model/.sync`
`Vue`为了方便用户，提供了俩个可以实现**双向绑定数据**的语法糖。用户不在需要在父组件进行事件监听，便可以在实现属性的自动更新。
```vue
<template>
  <div class="demo-two-way">
    <h2>count: {{ count }}</h2>
    <h2>count1: {{ count1 }}</h2>
    <h2>count2: {{ count2 }}</h2>
    <demo-child
      v-model="count"
      :count1.sync="count1"
    >
    </demo-child>
    <button @click="count++">parent click</button>
  </div>
</template>
```
```vue
<template>
  <div class="demo-child">
    <demo-grandson :add-count="addCount"></demo-grandson>
    <button @click="addCount">child click</button>
    <button @click="$emit('update:count1',count1+1)">child:update .sync count1</button>
  </div>
</template>
<script>
export default {
  name: 'DemoChild',
  props: {
    value: {
      type: Number,
      default: 0
    },
    count1: {}
  },
  components: {
    DemoGrandson
  },
  data () {
    return {};
  },
  methods: {
    addCount () {
      this.$emit('input', this.value + 1);
    }
  }
};
</script>
```
相比于之前的传参方式，我们不再需要在父组件中监听`addCount`事件来更新父组件中的`count`。`Vue`会帮我们自动监听对应的事件，并更新属性值。

这俩个语法糖的本质如下：
* `v-model`: `value` + `@input`
* `xxx.sync`: `@update:xxx`

下面我们模拟实现下这俩个语法为我们简化的一些事情：
```vue
<!-- 父组件 -->
<template>
  <div class="demo-model">
    <h2>模拟实现v-model的count: {{ count }}</h2>
    <h2>模拟实现.sync指令的count: {{ count1 }}</h2>
    <demo-child
      :value="count"
      @input="count = $event"
      :count1="count1"
      @update:count1="count1 = $event"
    >
    </demo-child>
  </div>
</template>
```
```vue
<!--子组件-->
<template>
  <div class="demo-model-child">
    <button @click="addCount">child click</button>
    <button @click="$emit('update:count1',count1+1)">child: update .sync count1</button>
  </div>
</template>
<script>
export default {
  name: 'DemoModelChild',
  props: {
    value: {
      type: Number,
      default: 0
    },
    count1: {}
  },
  data () {
    return {};
  },
  methods: {
    addCount () {
      this.$emit('input', this.value + 1);
    }
  }
};
</script>
```
对于上例中的`count`属性，我们通过`value`来接收，并将其传到子组件。然后子组件中通过调用`this.$emit('input',this.value+1)`通知父组件调用`@input`指令监听的发放，并将最新值作为参数传入。

父组件受到通知后调用`@input`指令对应的内容，并通过传入的参数来更新`count`属性。

而对于使用`.sync`修饰符的`count1`，我们可以随意指定其要传递给子组件的属性名，而不只能是`value`，并且会通过监听`@update:count1`，在`count1`发生变化后通过调用`@update:count1`对应的内容来更新`count1`。(注意：这里`@update:count1`中的`count1`与子组件中`props`接收的属性相同)

当然，`v-model`也并不是一定只能监听`value`属性和`input`事件，`Vue`为我们提供了自定义属性及更新方法的功能：
[自定义组件的`v-model`](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model) 
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200912193105.png)

到这里，我们使用`v-model/.sync`更简单的实现了功能。

### `$parent/$children`
`Vue`可以让我们通过`$parent/$children`来直接访问到父组件或子组件实例，这样就可以使用组件中的任意属性或方法。
```vue
<template>
  <div class="demo-access-instance">
    <h2>parent:{{ count }}</h2>
    <h2>child:{{ child.count }}</h2>
    <demo-child>
    </demo-child>
    <button @click="addCount">parent click</button>
  </div>
</template>

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoAccessInstance',
  components: {
    DemoChild
  },
  data () {
    return {
      count: 0,
      child: {}
    };
  },
  computed: {},
  mounted () {
    this.child = this.$children[0];
  },
  methods: {
    addCount () {
      this.count++;
    }
  }
};
</script>
```
在父组件挂载完成后，通过`this.$chilren[0]`获取到了子组件实例，之后直接通过子组件实例来访问子组件的`count`属性。

```vue
<template>
  <div class="demo-child">
    <button @click="addCount">child click</button>
    <button @click="addParentCount">child:update parent count</button>
  </div>
</template>

<script>
export default {
  name: 'DemoChild',
  props: {},
  data () {
    return {
      count: 0
    };
  },
  methods: {
    addCount () {
      this.count++;
    },
    addParentCount () {
      this.$parent.count++;
    }
  }
};
</script>
```
在子组件中，也可以通过`this.$parent`来直接获取到父组件的`count`属性进行更新。

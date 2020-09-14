## `Vue`组件通信
使用`Vue`进行项目开发，碰到的比较多的问题就是如何进行组件之间的参数传递。为了能够更优雅的解决此类问题，笔者在这里总结了开发中经常用到的一些组件通信方式，并配合一些例子方便理解。
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Vue-2020-9-14-11-35.png)

* 源码地址：[`vue-component-communication`](https://github.com/wangkaiwd/vue-component-communication/blob/master/article.md)
* [在线访问](https://wangkaiwd.github.io/vue-component-communication)

所有的例子都在`src/views`目录中，有需要的小伙伴可以自行取用

> 注：有些例子刻意为之，只是为了学习对应的知识点，对于实际使用场景刻意不必深究

### `props`传参
在`Vue`中，我们可以通过为子组件传入`props`，然后在子组件中接收，并通过`this`来直接访问
```vue
<!--demo-props-->
<template>
  <div class="demo-props">
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
这里我们为`demo-children`传入了`count`和`add-count`属性，然后又将`add-count`传入到`demo-grandson`组件中。这样当我们分别点击父组件(`demo-props`)、子组件(`demo-child`)和孙子组件(`demo-grandson`)中的按钮时，都会更新`count`属性

当然我们也可以使用`v-bind`来直接绑定一个对象，`Vue`会帮我们将组件属性进行分发，类似于`react`中的`{...props}`：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200912180143.png)
> 这张图的出处在这里，有兴趣的小伙伴可以去围观😜：https://twitter.com/tannerlinsley/status/1300847251846176768


在`Vue`中我们也可以利用这个对象简写的特性来少敲几下键盘：  
```vue
<!--demo-props-->
<template>
  <div class="demo-props">
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
<!-- 父组件 -->
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
<!-- 子组件 -->
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
`Vue`为了方便用户，提供了俩个可以实现**双向绑定数据**的语法糖。用户不再需要在父组件进行事件监听，便可以实现属性的自动更新。
```vue
<!-- 父组件 -->
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
<!-- 子组件 -->
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
* `v-model`: 自动绑定`value`属性 + `input`事件
* `xxx.sync`: 自动绑定`update:xxx`事件

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

### `$attrs/$listeners`
在很多情况，我们并不需要重新封装一个组件，而是只需要在旧有组件的基础上再添加一些功能。这里我们就用到了`$attrs`和`$listenners`属性，而`$attrs`又会与`inheritAttrs`属性一起使用。

先看一下这些属性的用途：  
* [`$attrs`](https://cn.vuejs.org/v2/api/index.html#vm-attrs): 包含父作用域中绑定的没有被识别或提取为`props`的属性(`class`和`style`除外)
* [`inheritAttrs`](https://cn.vuejs.org/v2/api/index.html#inheritAttrs): 默认的，父作用域中没有被作为`props`识别的属性将会"回退"，并且作为正常的`HTML`属性应用到子组件的根元素。设置`inheritAttrs`为`false`，将会禁用这个默认行为。
* [`$listenners`](https://cn.vuejs.org/v2/api/index.html#vm-listeners): 包含父作用域中`v-on`绑定的监听器(不包括`.native`修饰符绑定的监听器)

假设我们有`demo-grandson`组件，可以接收`count`进行展示，并且接受方法`addCount`来更新组件。

而现在我们想要在不改变`demo-grandson`的基础上，再实现一个组件，它具有`demo-grandson`的所有功能，并且还可以展示标题.代码如下：  
```vue
<!-- 父组件 -->
<template>
  <div class="demo-all-props">
    <demo-child
      :count="count"
      @add-count="addCount"
      title="访问所有属性"
    >
    </demo-child>
    <button @click="addCount">parent click</button>
  </div>
</template>
```
```vue
<!-- 子组件 -->
<template>
  <div class="demo-child">
    <h1>{{ title }}</h1>
    <demo-grandson
      v-bind="$attrs"
      v-on="$listeners"
    >
    </demo-grandson>
  </div>
</template>

<script>
import DemoGrandson from './demo-grandson';

export default {
  name: 'DemoChild',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    DemoGrandson
  },
};
</script>
```
子组件中的`$attrs`为除`title`外的所有根元素中传入的属性组成的对象，配合`inheritAttrs: false`，并不会让其作为正常的`HTML`属性在`element`中展示。之后再配合`v-bind`将属性分发的`demo-grandson`上：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200913164907.png)

`$listeners`中包含`v-on`(即`@`)中绑定的所有事件监听函数，同理通过`v-on`分发到`demo-grandson`上：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200913165716.png)

这样`demo-grandson`中有再多的属性和事件，我们都可以通过`v-bind=$attrs`和`v-on=$linstenners`进行传入。而不用每次都在`props`中定义，然后在单独在子组件标签上通过`:`和`@`来单独进行绑定。

这俩个属性在对项目中用到的`ui`组件库进行二次封装时尤其好用，既可以保证使用原有组件所有的`api`，还可以额外封装一些项目中复用度高的功能。

### 依赖注入(`provide/inject`)
`provide/inject`通常用于跨层级传参，不管组件的层级有多深，都可以通过`inject`来获得父组件`provide`提供的内容。

通常情况下，我们会将父组件的实例通过`provide`传入，这样子组件通过`inject`就可以直接获取到父组件的实例，从而可以使用到父组件实例中定义的任意属性和方法，我们把之前的例子通过`provide/inject`来进行实现：
```vue
<!--parent-->
<template>
  <div class="demo-provide-inject">
    <demo-child></demo-child>
  </div>
</template>

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoProvideInject',
  provide () {
    return { top: this };
  },
  components: { DemoChild },
  data () {
    return { count: 0 };
  },
  methods: {
    addCount () {
      this.count++;
    }
  }
};
</script>
```
在子组件中调用`addCount`方法
```vue
<template>
  <div class="demo-child">
    <demo-grandson></demo-grandson>
    <button @click="top.addCount">child click</button>
  </div>
</template>

<script>
import DemoGrandson from './demo-grandson';

export default {
  name: 'DemoChild',
  inject: ['top'],
  components: {
    DemoGrandson
  },
};
</script>
```
在孙子组件中渲染`count`到页面中，并且通过按钮来更新`count`:
```vue
<template>
  <div class="demo-grandson">
    <h2>child: {{ top.count }}</h2>
    <button @click="top.addCount">grandson click</button>
  </div>
</template>

<script>
export default {
  name: 'DemoGrandson',
  inject: ['top'],
};
</script>
```

`provide/inject`的数据传递思路如下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Untitled-2020-09-12-1714.png)

### $dispatch/$broadcast
当我们的组件层级比较深的时候，我们需要一层一层向下传递事件，而当更新父组件中的某个属性时，又需要一层一层的将更新向上通知，大概的逻辑如下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Untitled-2020-09-14-0028%20(1).png)

为了可以直接通过子组件更新父组件，而不再用经历中间的事件监听步骤，我们可以递归遍历找到父组件的子组件(`demo-child`)，然后调用它的`$emit('event-name')`来更新父组件中的属性。这便是`$dispatch`方法的核心思路，代码如下：
```javascript
Vue.prototype.$dispatch = function (ComponentName, event, ...args) {
  let parent = this.$parent;
  while (parent) { //
    const { name } = parent.$options;
    // 递归查找父组件，如果组件名满足要求的话，调用组件实例的$emit方法
    if (name === ComponentName) {
      parent.$emit(event, ...args);
      break;
    }
    parent = parent.$parent;
  }
};
```

而`$broadcast`方法可以帮我们在父组件中直接调用较深层的子组件的`$emit('eventName')`方法，从而通过子组件的父组件更改传入到子组件的值(在本例中为`grandson`传入到`great-grandson`中的`name`属性)，代码如下：
```javascript
Vue.prototype.$broadcast = function (ComponentName, event, ...args) {
  for (let i = 0; i < this.$children.length; i++) {
    const child = this.$children[i];
    const { name } = child.$options;
    // 如果找到满足的子组件，调用$emit方法
    if (name === ComponentName) {
      child.$emit(event, ...args);
    } else {
      if (child.$children) {
        // 继续递归查找符合要求的子组件
        child.$broadcast(ComponentName, event, ...args);
      }
    }
  }
};
```
在原型上添加了对应的方法后，我们便可以在组件中通过组件实例来直接调用：
```vue
<!-- 父组件 -->
<template>
  <div class="demo-extend-proto">
    <h2>parent: {{ count }}</h2>
    <demo-child
      :count="count"
      @add-count="addCount"
    >
    </demo-child>
    <button @click="changeName">parent:change name</button>
  </div>
</template>

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoExtendProto',
  components: { DemoChild },
  data () {
    return {
      count: 0
    };
  },
  methods: {
    addCount (params) {
      this.count++;
    },
    changeName () {
      // 更新直接name属性
      this.$broadcast('DemoGreatGrandson', 'change-name', 'xxx');
    }
  }
};
</script>
```
```vue
<!-- 子组件 -->
<template>
  <div class="demo-child">
    <demo-grandson></demo-grandson>
    <button @click="$emit('add-count')">child click</button>
  </div>
</template>
```
```vue
<!-- grandson -->
<template>
  <div class="demo-grandson">
    <great-grandson :name="name" @change-name="changeName"></great-grandson>
    <button @click="addCount">grandson click</button>
  </div>
</template>

<script>
export default {
  name: 'DemoGrandson',
  // ... some code
  data () {
    return {
      name: '张三'
    };
  },
  methods: {
    addCount () {
      // 直接通知父组件更新count
      this.$dispatch('DemoChild', 'add-count', 'xxx');
    },
    changeName () {
      this.name = this.name + 1;
    }
  }
};
</script>
```
```vue
<template>
  <div class="demo-great-grandson">
    <h2>great grandson:{{ name }}</h2>
    <button @click="addCount">great-grandson: click</button>
  </div>
</template>

<script>
export default {
  // ... some code
  props: {
    name: {
      type: String,
    }
  },
  methods: {
    addCount () {
      // 直接通知父组件更新count
      this.$dispatch('DemoChild', 'add-count', 'xxx');
    },
  }
};
</script>
```
上边代码的逻辑大概如下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Untitled-2020-09-14-0028.png)

现在我们便可以通过`$dispatch/$broadcast`来实现跨层级调用`$emit`方法，少写一些进行事件监听的`@`和`$emit`代码。

上述代码参考`element ui`源码中`$dispatch/$broadcast`的相应实现：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200914110021.png)
最终可以通过`mixins`来混入到组件中进行使用： 
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200914110610.png)

> 截图中的代码地址：  
> * [emitter](https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js)
> * [form-item](https://github.com/ElemeFE/element/blob/04b5f0d2c042fb1efabaebe40749287761c14a21/packages/form/src/form-item.vue#L52)


### 事件总线(bus)
`Vue`通过`$emit/$on`实现事件的发布订阅机制，通过`$on`来订阅事件，通过`$emit`来触发`$on`订阅的事件，并将需要的参数传入。我们也正好可以利用`Vue`的`$emit`和`$on`属性来进行组件之间的函数调用。

首先我们需要在`Vue`的原型上扩展`$bus`属性，方便直接在组件中通过`this.$bus`来进行调用：
```javascript
Vue.prototype.$bus = new Vue();
```
`$bus`的值是一个新的`Vue`实例，所以它可以调用`Vue`实例的`$emit`和`$on`方法。

在父组件中，我们通过`$bus.$on`来订阅事件：
```vue
<template>
  <div class="demo-bus">
    <demo-child :count="count"></demo-child>
  </div>
</template>
<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoBus',
  components: {
    DemoChild
  },
  data () {
    return {
      count: 0
    };
  },
  mounted () {
    this.initListeners();
  },
  methods: {
    initListeners () {
      this.$bus.on('add-count');
    },
    addCount () {
      this.count++;
    }
  }
};
</script>
```
在子组件和孙子组件中，可以通过`$bus.$emit`来通知执行对应的订阅事件来更新`count`属性：
```vue
<!-- 子组件 -->
<template>
  <div class="demo-child">
    <h2>child: {{ count }}</h2>
    <demo-grandson></demo-grandson>
    <button @click="$bus.$emit('add-count')">child click</button>
  </div>
</template>
```
```vue
<!-- 孙子组件 -->
<template>
  <div class="demo-grandson">
    <button @click="$bus.$emit('add-count')">grandson click</button>
  </div>
</template>
```
不管组件层级有多深，我们都可以通过约定好的名字(例子中是`add-count`)来直接调用父组件中订阅函数。

### `Vuex`
对于稍大规模一点的项目来说，通过`Vuex`来管理全局状态比较好的选择。我们可以在任意组件使用`Vuex`中的`state`，并且可以通过`commit`一个`mutation`来更新状态。

下面我们用`Vuex`来再次实现`count`累加的例子。

首先在`store`中定义`state`和`mutation`：
```js
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    addCount (state, count) {
      state.count++;
    }
  },
});
```

可以在任意组件中引入，并且更改`state`。

每个文件中引入辅助函数的代码如下：
```js
import { mapMutations, mapState } from 'vuex';

export default {
  // ... some code
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['addCount'])
  }
};
```

`HTML`模板代码：
```vue
<!-- 父组件 -->
<template>
  <div class="demo-props">
    <h2>{{ count }}</h2>
    <demo-child>
    </demo-child>
    <button @click="addCount">parent click</button>
  </div>
</template>

<!-- 子组件 -->
<template>
  <div class="demo-child">
    <h2>child: {{ count }}</h2>
    <demo-grandson></demo-grandson>
    <button @click="addCount">child click</button>
  </div>
</template>

<!-- 孙子组件 -->
<template>
  <div class="demo-grandson">
    <h2>grandson count: {{ count }}</h2>
    <button @click="addCount">grandson click</button>
  </div>
</template>
```
现在我们可以通过调用`Vuex`通过辅助函数在实例上提供`count`属性和`addCount`方法，就可以任意组件使用和更新`count`。

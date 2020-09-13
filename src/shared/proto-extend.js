import Vue from 'vue';

// 递归查找父组件，如果组件名满足要求的话，调用组件实例的$emit方法
Vue.prototype.$dispatch = function (ComponentName, event, ...args) {
  let parent = this.$parent;
  while (parent) {
    const { name } = parent.$options;
    if (name === ComponentName) {
      parent.$emit(event, ...args);
      break;
    }
    parent = parent.$parent;
  }
};

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

Vue.prototype.$bus = new Vue();

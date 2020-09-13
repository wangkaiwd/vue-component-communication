import Vue from 'vue';

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
  const children = this.$children;

  function iterate (children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const { name } = child.$options;
      if (name === ComponentName) {
        return child.$emit(event, ...args);
      }
      if (child.$children) {
        iterate(child.$children);
      }
    }
  }

  iterate(children);
};

Vue.prototype.$bus = new Vue();

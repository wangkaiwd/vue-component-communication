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

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoAllProps',
  components: {
    DemoChild
  },
  data () {
    return {
      count: 0
    };
  },
  methods: {
    addCount () {
      this.count++;
    }
  }
};
</script>

<style scoped>
.demo-all-props {

}
</style>

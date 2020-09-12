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

<script>
import DemoChildren from './demo-child';

export default {
  name: 'DemoProps',
  components: {
    DemoChildren
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
.demo-props {

}
</style>

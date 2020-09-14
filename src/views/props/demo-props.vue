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

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoProps',
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
.demo-props {

}
</style>

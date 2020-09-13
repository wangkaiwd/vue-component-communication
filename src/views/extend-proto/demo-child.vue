<template>
  <div class="demo-child">
    <demo-grandson @change-name="changeName" :name="name" :count="count"></demo-grandson>
    <button @click="$emit('add-count')">child click</button>
  </div>
</template>

<script>
import DemoGrandson from './demo-grandson';

export default {
  name: 'DemoChild',
  props: {
    count: {
      type: Number,
      default: 0
    },
  },
  components: {
    DemoGrandson
  },
  data () {
    return {
      name: '张三'
    };
  },
  methods: {
    changeName () {
      this.name = this.name + 1;
    }
  }
};
</script>

<style scoped>
.demo-child {

}
</style>

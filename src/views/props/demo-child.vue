<template>
  <div class="demo-child">
    <demo-grandson :add-count="addCount"></demo-grandson>
    <button @click="addCount">child click</button>
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
    addCount: {
      type: Function
    }
  },
  components: {
    DemoGrandson
  },
  data () {
    return {};
  },
};
</script>

<style scoped>
.demo-child {

}
</style>

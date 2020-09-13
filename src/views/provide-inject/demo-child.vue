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
  props: {},
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

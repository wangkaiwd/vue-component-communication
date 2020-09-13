<template>
  <div class="demo-child">
    <demo-grandson></demo-grandson>
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
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.demo-child {

}
</style>

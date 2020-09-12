<template>
  <div class="demo-child">
    <demo-grandson :add-count="addCount"></demo-grandson>
    <button @click="addCount">child click</button>
    <button @click="$emit('update:count1',count1+1)">child:update .sync count1</button>
  </div>
</template>

<script>
import DemoGrandson from './demo-grandson';

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

<style scoped>
.demo-child {

}
</style>

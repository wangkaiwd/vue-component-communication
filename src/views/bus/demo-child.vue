<template>
  <div class="demo-child">
    <h2>child: {{ count }}</h2>
    <demo-grandson></demo-grandson>
    <button @click="$bus.$emit('add-count')">child click</button>
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
  methods: {
    addCount () {
      this.$bus.$emit('add-count');
    }
  }
};
</script>

<style scoped>
.demo-child {

}
</style>

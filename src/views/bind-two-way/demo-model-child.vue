<template>
  <div class="demo-model-child">
    <button @click="addCount">child click</button>
  </div>
</template>

<script>
export default {
  name: 'DemoModelChild',
  props: {
    value: {
      type: Number,
      default: 0
    },
    count1: {}
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
.demo-model-child {

}
</style>

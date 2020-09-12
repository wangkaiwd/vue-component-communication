<template>
  <div class="demo-grandson">
    <button @click="addCount">grandson click</button>
  </div>
</template>

<script>
export default {
  name: 'DemoGrandson',
  props: {},
  data () {
    return {};
  },
  methods: {
    addCount () {
      this.$emit('add-count');
    }
  }
};
</script>

<style scoped>
.demo-grandson {

}
</style>

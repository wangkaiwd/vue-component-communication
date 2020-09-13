<template>
  <div class="demo-great-grandson">
    <h2>great grandson:{{ name }}</h2>
    <button @click="addCount">great-grandson: click</button>
  </div>
</template>

<script>
export default {
  name: 'DemoGreatGrandson',
  props: {
    name: {
      type: String,
    }
  },
  data () {
    return {};
  },
  methods: {
    addCount () {
      // 直接通知父组件更新count
      this.$dispatch('DemoChild', 'add-count', 'xxx');
    },
  }
};
</script>

<style scoped>
.demo-great-grandson {

}
</style>

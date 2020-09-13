<template>
  <div class="demo-grandson">
    <h2>grandson: {{ count }}</h2>
    <h2>grandson name: {{ name }}</h2>
    <button @click="addCount">grandson click</button>
  </div>
</template>

<script>
export default {
  name: 'DemoGrandson',
  props: {
    count: {
      type: Number,
      default: 0
    },
    name: {
      type: String
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
.demo-grandson {

}
</style>

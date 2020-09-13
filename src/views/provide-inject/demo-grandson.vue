<template>
  <div class="demo-grandson">
    <h2>child: {{ top.count }}</h2>
    <button @click="top.addCount">grandson click</button>
  </div>
</template>

<script>
export default {
  name: 'DemoGrandson',
  inject: ['top'],
  data () {
    return {};
  },
  mounted () {
  }
};
</script>

<style scoped>
.demo-grandson {

}
</style>

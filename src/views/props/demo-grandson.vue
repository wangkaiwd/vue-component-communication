<template>
  <div class="demo-grandson">
    <button @click="addCount">grandson click</button>
  </div>
</template>

<script>
export default {
  name: 'DemoGrandson',
  props: {
    addCount: {
      type: Function
    }
  },
  data () {
    return {};
  },
};
</script>

<style scoped>
.demo-grandson {

}
</style>

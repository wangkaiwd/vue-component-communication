<template>
  <div class="demo-grandson">
    <h2>{{ count }}</h2>
    <button @click="$emit('add-count')">grandson click</button>
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

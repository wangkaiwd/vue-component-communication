<template>
  <div class="demo-grandson">
    <button @click="$bus.$emit('add-count')">grandson click</button>
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
    }
  }
};
</script>

<style scoped>
.demo-grandson {

}
</style>

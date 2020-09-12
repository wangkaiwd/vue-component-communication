<template>
  <div class="demo-child">
    <button @click="addCount">child click</button>
    <button @click="addParentCount">child:update parent count</button>
  </div>
</template>

<script>
export default {
  name: 'DemoChild',
  props: {},
  data () {
    return {
      count: 0
    };
  },
  methods: {
    addCount () {
      this.count++;
    },
    addParentCount () {
      this.$parent.count++;
    }
  }
};
</script>

<style scoped>
.demo-child {

}
</style>

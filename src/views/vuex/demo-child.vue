<template>
  <div class="demo-child">
    <h2>child: {{ count }}</h2>
    <demo-grandson></demo-grandson>
    <button @click="addCount">child click</button>
  </div>
</template>

<script>
import DemoGrandson from './demo-grandson';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'DemoChild',
  components: {
    DemoGrandson
  },
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['addCount'])
  }
};
</script>

<style scoped>
.demo-child {

}
</style>

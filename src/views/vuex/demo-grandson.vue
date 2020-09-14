<template>
  <div class="demo-grandson">
    <h2>grandson count: {{ count }}</h2>
    <button @click="addCount">grandson click</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'DemoGrandson',
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['addCount'])
  }
};
</script>

<style scoped>
.demo-grandson {

}
</style>

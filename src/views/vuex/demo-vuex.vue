<template>
  <div class="demo-vuex">
    <h2>{{ count }}</h2>
    <demo-child>
    </demo-child>
    <button @click="addCount">parent click</button>
  </div>
</template>

<script>
import DemoChild from './demo-child';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'DemoProps',
  components: {
    DemoChild
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
.demo-vuex {

}
</style>

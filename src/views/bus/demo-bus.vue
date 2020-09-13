<template>
  <div class="demo-bus">
    <demo-child :count="count"></demo-child>
  </div>
</template>

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoBus',
  components: {
    DemoChild
  },
  data () {
    return {
      count: 0
    };
  },
  mounted () {
    this.initListeners();
  },
  methods: {
    initListeners () {
      this.$bus.$on('add-count', this.addCount);
    },
    addCount () {
      this.count++;
    }
  }
};
</script>

<style scoped>
.demo-bus {

}
</style>

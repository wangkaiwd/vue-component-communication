<template>
  <div class="demo-provide-inject">
    <demo-child></demo-child>
  </div>
</template>

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoProvideInject',
  provide () {
    return { top: this };
  },
  components: { DemoChild },
  data () {
    return { count: 0 };
  },
  methods: {
    addCount () {
      this.count++;
    }
  }
};
</script>

<style scoped>
.demo-provide-inject {

}
</style>

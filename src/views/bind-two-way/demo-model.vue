<template>
  <div class="demo-model">
    <h2>自己实现v-model的count: {{ count }}</h2>
    <demo-child :value="count" @input="count = $event"></demo-child>
  </div>
</template>

<script>
import DemoChild from './demo-model-child';

export default {
  name: 'DemoModel',
  components: {
    DemoChild
  },
  data () {
    return {
      count: 0
    };
  },
};
</script>

<style scoped>
.demo-model {

}
</style>

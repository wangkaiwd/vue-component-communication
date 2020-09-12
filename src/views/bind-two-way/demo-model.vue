<template>
  <div class="demo-model">
    <h2>模拟实现v-model的count: {{ count }}</h2>
    <h2>模拟实现.sync指令的count: {{ count1 }}</h2>
    <demo-child
      :value="count"
      @input="count = $event"
      :count1="count1"
      @update:count1="count1 = $event"
    >
    </demo-child>
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
      count: 0,
      count1: 0
    };
  },
};
</script>

<style scoped>
.demo-model {

}
</style>

<template>
  <div class="demo-two-way">
    <div class="demo-props">
      <h2>count: {{ count }}</h2>
      <h2>count1: {{ count1 }}</h2>
      <h2>count2: {{ count2 }}</h2>
      <demo-child
        v-model="count"
        :count1.sync="count1"
      >
      </demo-child>
      <button @click="count++">parent click</button>
    </div>
    <demo-model></demo-model>
  </div>
</template>

<script>
import DemoChild from './demo-child';
import DemoModel from './demo-model';

export default {
  name: 'DemoTwoWay',
  components: {
    DemoChild,
    DemoModel
  },
  data () {
    return {
      count: 0,
      count1: 0,
      count2: 0
    };
  },
  methods: {}
};
</script>

<style scoped>
.demo-two-way {

}
</style>

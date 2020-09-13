<template>
  <div class="demo-extend-proto">
    <h2>parent: {{ count }}</h2>
    <demo-child
      :count="count"
      @add-count="addCount"
    >
    </demo-child>
    <button @click="changeName">parent:change name</button>
  </div>
</template>

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoExtendProto',
  components: { DemoChild },
  data () {
    return {
      count: 0
    };
  },
  methods: {
    addCount (params) {
      this.count++;
    },
    changeName () {
      // 更新直接name属性
      this.$broadcast('DemoGreatGrandson', 'change-name', 'xxx');
    }
  }
};
</script>

<style scoped>
.demo-extend-proto {

}
</style>

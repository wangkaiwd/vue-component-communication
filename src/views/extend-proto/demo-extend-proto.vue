<template>
  <div class="demo-extend-proto">
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
      // 直接调用子元素的addCount事件
      this.count++;
    },
    changeName () {
      this.$broadcast('DemoGrandson', 'change-name', 'xxx');
    }
  }
};
</script>

<style scoped>
.demo-extend-proto {

}
</style>

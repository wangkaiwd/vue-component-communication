<template>
  <div class="demo-grandson">
    <great-grandson :name="name" @change-name="changeName"></great-grandson>
    <button @click="addCount">grandson click</button>
  </div>
</template>

<script>
import GreatGrandson from './demo-great-grandson';

export default {
  name: 'DemoGrandson',
  props: {},
  components: {
    GreatGrandson
  },
  data () {
    return {
      name: '张三'
    };
  },
  mounted () {
  },
  methods: {
    addCount () {
      // 直接通知父组件更新count
      this.$dispatch('DemoChild', 'add-count', 'xxx');
    },
    changeName () {
      this.name = this.name + 1;
    }
  }
};
</script>

<style scoped>
.demo-grandson {

}
</style>

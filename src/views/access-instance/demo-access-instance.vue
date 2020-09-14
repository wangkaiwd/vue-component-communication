<template>
  <div class="demo-vuex">
    <h2>parent:{{ count }}</h2>
    <h2>child:{{ child.count }}</h2>
    <demo-child>
    </demo-child>
    <button @click="addCount">parent click</button>
  </div>
</template>

<script>
import DemoChild from './demo-child';

export default {
  name: 'DemoAccessInstance',
  components: {
    DemoChild
  },
  data () {
    return {
      count: 0,
      child: {}
    };
  },
  computed: {},
  mounted () {
    this.child = this.$children[0];
  },
  methods: {
    addCount () {
      this.count++;
    }
  }
};
</script>

<style scoped>
.demo-vuex {

}
</style>

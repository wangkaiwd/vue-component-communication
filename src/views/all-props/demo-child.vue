<template>
  <div class="demo-child">
    <h1>{{ title }}</h1>
    <demo-grandson
      v-bind="$attrs"
      v-on="$listeners"
    >
    </demo-grandson>
  </div>
</template>

<script>
import DemoGrandson from './demo-grandson';

export default {
  name: 'DemoChild',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    DemoGrandson
  },
  data () {
    return {};
  },
  mounted () {
    console.log('$listenners', this.$listeners);
  }
};
</script>

<style scoped>
.demo-child {

}
</style>

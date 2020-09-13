<template>
  <div class="demo-extend-proto">
    <demo-child
      :count="count"
      :add-count="addCount"
    >
    </demo-child>
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
    addCount () {

    }
  }
};
</script>

<style scoped>
.demo-extend-proto {

}
</style>

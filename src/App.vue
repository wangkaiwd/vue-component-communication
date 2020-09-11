<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li v-for="menu in menus"
            :key="menu.path">
          <router-link :to="menu.path">
            {{ menu.name }}
          </router-link>
        </li>
      </ul>

    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },
  computed: {
    menus () {
      return this.$router.options.routes;
    }
  }
};
</script>
<style lang="scss">
</style>

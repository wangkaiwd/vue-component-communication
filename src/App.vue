<template>
  <div id="app">
    <div class="nav">
      <ul class="menu">
        <li class="menu-item" v-for="menu in menus"
            :key="menu.path">
          <router-link :to="menu.path">
            {{ menu.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
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
<style scoped lang="scss">
#app {
  display: flex;
  height: 100vh;
  overflow: auto;
  .nav {
    width: 10em;
    border-right: 1px solid rgb(66 133 242 / 1);
    li {
      padding: 0.2em 0.5em;
    }
  }
  .content {
    flex: 1;
    padding: 16px;
  }
}
</style>

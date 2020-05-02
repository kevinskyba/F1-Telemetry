<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="scss">
  @import "styles/variables.scss";

  body {
    background-color: $background-color;
  }
  #app {
    background-color: $background-color;
  }
</style>

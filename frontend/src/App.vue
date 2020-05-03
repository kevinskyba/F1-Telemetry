<template>
  <div id="app">
    <GridBoard/>
  </div>
</template>

<script>
import GridBoard from "./components/boards/GridBoard";
export default {
  name: 'App',
  components: {
    GridBoard
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

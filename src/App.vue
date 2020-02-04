<template>
  <div id="app">
    <Map></Map>
  </div>
</template>

<script>
import Map from "./components/Map";
export default {
  name: 'app',
  components: {
    Map
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

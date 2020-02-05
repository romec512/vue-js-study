<template>
  <div id="app">
    <MapMenu></MapMenu>
    <Map></Map>
  </div>
</template>

<script>
import Map from "./components/Map";
import MapMenu from "./components/MapMenu";
export default {
  name: 'app',
  components: {
    MapMenu,
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
  width: 100%;
  height: 100%;
}
</style>

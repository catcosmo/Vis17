<template>
  <div id="app">
    <picker></picker>
  </div>
</template>

<script>
import Picker from './components/Picker'

export default {
  name: 'app',
  components: {
    Picker
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
  margin-top: 60px;
}
</style>

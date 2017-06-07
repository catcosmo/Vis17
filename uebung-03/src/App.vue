<template>
  <div id="app">
    <div v-if="hasData">
      <graph />
    </div>
    <div v-else>
      Fetching data...
    </div>
  </div>
</template>

<script>
import Graph from './components/Graph'

export default {
  name: 'app',
  components: {
    Graph
  },
  computed: {
    hasData () {
      return this.$store.state.data.length
    }
  },
  mounted () {
    // this.$store comes from the central data store in vuex/store.js;
    // it's available in all components.
    this.$store.dispatch('fetchTsv', './static/cars.tsv')
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
  margin-bottom: 60px;
}
</style>

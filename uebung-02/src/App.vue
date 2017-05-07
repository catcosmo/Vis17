<template>
  <div id="app">
    <div class="test" v-if="results.length < 5">
      <h1>{{currentStep}} von {{totalSteps}}</h1>
      <picker @result="onResult" />
    </div>
    <evaluation :results="results" v-else />
  </div>
</template>

<script>
import Evaluation from './components/Evaluation'
import Picker from './components/Picker'

export default {
  name: 'app',

  // import and name our components so we can use them in the template
  components: {
    Evaluation, Picker
  },

  // our app state
  data () {
    return {
      currentStep: 1,
      totalSteps: 5,
      results: []
    }
  },

  methods: {
    // aggregate all the results we get from our picker component
    onResult (result) {
      this.results.push(result)
      this.currentStep++
    }
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

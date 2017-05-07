<template>
  <div id="app">
    <div class="test" v-if="results.length < totalSteps">
      <h1>Achte auf das Testbild</h1>
      <h2>{{currentStep}} von {{totalSteps}}</h2>

      <div v-if="!started">
        <p>
          Es werden je für kurze Zeit verschiedene Bilder mit Formen gezeigt.<br>
          In manchen Durchgängen gibt es Besonderheiten bei einzelnen Formen, in anderen nicht.
        </p>
        <p>Bereit? <button @click="started = true">Start</button></p>
      </div>
      <picker @result="onResult" :current-step="currentStep" :total-steps="totalSteps" v-else />
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
      started: false,
      currentStep: 1,
      totalSteps: 10,
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

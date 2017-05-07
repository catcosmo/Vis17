<template lang="html">
  <div class="">
    <h1 class="question">Target Detection</h1>

    <figure>
      <svg width="357" height="150" viewBox="0 0 357 150">
            <circle v-for="circle in circles" v-bind:cx="circle.x" v-bind:cy="circle.y" :r="5" v-bind:fill="circle.color" />
      </svg>
    </figure>

    <p>Was there anyone standing out?</p>

    <section class="test">
      <form class="answer" @submit.prevent="onSubmit">

        <p>
          <button id="jaButton" type="submit" v-model="guesses.yes">Ja</button>
          <button id="neinButton" type="submit" v-model="guesses.no">Nein</button>
        </p>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  // the name is only relevant for debugging
  name: 'picker',

  // 'data' is the state of our component
  data () {
    const array = this.generateCircles()
    const hasBlue = this.generateColor(array)
    const circles = { circles: array, hadBlue: hasBlue, guesses: {yes: null, no: null} }
    // return {
    //   circles: [
    //     { x: '60', y: '80', color: 'red' },
    //     { x: '120', y: '90', color: 'red' }
    //   ]
    // }

    return circles
  },

  // under methods we can define functions of a component
  methods: {

    getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    // this method returns two radii and an origin
    // if the origin is "left", the ratio would be "1 to x", if it is "right",
    // the ratio would be "x to 1"
    generateCircles () {
      // const ratio = 1 + Math.ceil(Math.random() * 4) // ∈ [2,5]
      // const origin = Math.random() < 0.5 ? 'left' : 'right'
      var values = []
      for (var i = 0; i < 23; i++) {
        var xRand = '' + this.getRandomInt(5, 352)
        var yRand = '' + this.getRandomInt(5, 145)
        values.push({x: xRand, y: yRand, color: 'red'})
      }

      // ratio = (r1 * r1) / (r2 * r2) | * (r2 * r2)
      // (r2 * r2) * ratio = r1 * r1 | / ratio
      // (r2 * r2) = r1 * r1 / ratio | sqrt
      // r2 = sqrt(r1 * r1 / ratio)

      return values
    },

    generateColor (circles) {
      const index = this.getRandomInt(0, 46)
      if (index < 23) {
        circles[index].color = 'blue'
        return true
      }
      return false
    },

    // this one is called onSubmit, because in the template we said "@submit="onSubmit"".
    // it could also be called "schnitzel", so there's no magic or anything
    onSubmit () {
      var correct = false
      if ((this.hadBlue && this.guesses.yes) || (!this.hadBlue && this.guesses.no)) {
        correct = true
      }
      // fire an event with our results so we can handle it in parent components
      this.$emit(
        'result',
        // the JSON.parse / stringify returns a deep copy
        JSON.parse(JSON.stringify({ correctAnswer: correct }))
      )
    }
  }
}
</script>

<style lang="css">
figure {
  margin-left: 0;
  margin-right: 0
}

html{
  background-color: black;
  color: white;
  font-family: helvetica
}

.answer input {
  width: 2em;
  text-align: center;
  font-size: 1.2em;
  margin: .6em
}

.answer input,
.answer button {
  font-size: 14px;
}
</style>

<template lang="html">
  <div class="">
    <h1 class="question">Schätze das Verhältnis</h1>

    <figure>
      <svg width="357" height="150" viewBox="0 0 357 150">
        <circle cx="75" cy="75" :r="circles.left" fill="#D76759" />
        <circle cx="282" cy="75" :r="circles.right" fill="#D76759" />
      </svg>
    </figure>

    <p>Bitte schätze das Verhältnis der Flächeninhalte der beiden Kreise.</p>

    <section class="test">
      <form class="answer" @submit.prevent="onSubmit">
        <p>
          <input type="text" v-model="guesses.left">
          zu
          <input type="text" v-model="guesses.right">
        </p>
        <p>
          <button type="submit">Weiter</button>
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
    const circles = this.generateCircles()

    return {
      circles,
      guesses: {
        left: circles.origin === 'left' ? '1' : null,
        right: circles.origin === 'right' ? '1' : null
      }
    }
  },

  // under methods we can define functions of a component
  methods: {

    // this method returns two radii and an origin
    // if the origin is "left", the ratio would be "1 to x", if it is "right",
    // the ratio would be "x to 1"
    generateCircles () {
      const ratio = 1 + Math.ceil(Math.random() * 4) // ∈ [2,5]
      const origin = Math.random() < 0.5 ? 'left' : 'right'

      return origin === 'left'
        ? { left: 75 / ratio, right: 75, origin }
        : { left: 75, right: 75 / ratio, origin }
    },

    // this one is called onSubmit, because in the template we said "@submit="onSubmit"".
    // it could also be called "schnitzel", so there's no magic or anything
    onSubmit () {
      // fire an event with our results so we can handle it in parent components
      this.$emit(
        'result',
        // the JSON.parse / stringify returns a deep copy
        JSON.parse(JSON.stringify({ guesses: this.guesses, circles: this.circles }))
      )

      // regenerate circles and populate our input fields
      this.circles = this.generateCircles()
      this.guesses.left = this.circles.origin === 'left' ? '1' : null
      this.guesses.right = this.circles.origin === 'right' ? '1' : null
    }
  }
}
</script>

<style lang="css">
figure {
  margin-left: 0;
  margin-right: 0
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

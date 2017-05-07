<template lang="html">
  <div class="">
    <h2 class="question">Achte auf das Testbild</h2>

    <figure>
      <rotation-distractor />
    </figure>

    <section class="test">
      <form class="answer" @submit.prevent="onSubmit">
        <h3>Ist eine Figur herausgestochen?</h3>
        <p>
          <label>Auffälligkeit:</label>
          <select v-bind="answer">
            <option value="none">Keine</option>
            <option value="rotation">Rotation</option>
            <option value="size">Größe</option>
            <option value="color">Farbe</option>
          </select>
          <button type="submit">Weiter</button>
        </p>
      </form>
    </section>
  </div>
</template>

<script>
import NoDistractor from '@/components/figures/NoDistractor'
import RotationDistractor from '@/components/figures/RotationDistractor'

export default {
  // the name is only relevant for debugging
  name: 'picker',

  components: {
    NoDistractor,
    RotationDistractor
  },

  // 'data' is the initial state of our component
  data () {
    return {
      distractor: this.pickDistractor(),
      answer: ''
    }
  },

  // under methods we can define functions of a component
  methods: {

    pickDistractor () {
      // these are all possible distractors; the svg is being constructed based
      // on which one is picked
      const distractors = ['none', 'rotation', 'size', 'rotation', 'color']
      // pick one distractor randomly:
      return distractors[Math.floor(Math.random() * distractors.length)]
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

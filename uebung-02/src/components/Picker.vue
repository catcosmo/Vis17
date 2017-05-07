<template lang="html">
  <div class="">
    <figure>
      <size-distractor v-if="distractor === 'size'" />
      <rotation-distractor v-else-if="distractor === 'rotation'" />
      <color-distractor v-else-if="distractor === 'color'" />
      <no-distractor v-else-if="distractor === 'none'" />
    </figure>

    <section class="test">
      <form class="answer" @submit.prevent="onSubmit">
        <h2>Ist eine Figur herausgestochen?</h2>
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
import SizeDistractor from '@/components/figures/SizeDistractor'
import ColorDistractor from '@/components/figures/ColorDistractor'

export default {
  // the name is only relevant for debugging
  name: 'picker',

  components: {
    NoDistractor,
    RotationDistractor,
    SizeDistractor,
    ColorDistractor
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
      const distractors = ['none', 'rotation', 'size', 'color']
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

rect {
  fill: #F8044C;
  stroke-width: 2px;
  stroke: white
}

rect.special-color {
  fill: #88EAF5
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

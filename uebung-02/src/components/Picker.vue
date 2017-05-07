<template lang="html">
  <div class="">
    <figure v-if="isShowingTestImg">
      <size-distractor v-if="distractor === 'size'" />
      <rotation-distractor v-else-if="distractor === 'rotation'" />
      <color-distractor v-else-if="distractor === 'color'" />
      <no-distractor v-else-if="distractor === 'none'" />
    </figure>

    <section v-else>
      <form class="answer" @submit.prevent="onSubmit">
        <h2>Ist eine einzelne Figur herausgestochen?</h2>
        <p>
          <label>Auffälligkeit:</label>
          <select v-model="answer">
            <option value="none">Alle identisch</option>
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

  props: ['currentStep', 'totalSteps'],

  components: {
    NoDistractor,
    RotationDistractor,
    SizeDistractor,
    ColorDistractor
  },

  // 'data' is the initial state of our component
  data () {
    return {
      isShowingTestImg: null,
      distractor: null,
      answer: null,
      timeout: null
    }
  },

  mounted () {
    this.initRound()
  },

  // under methods we can define functions of a component
  methods: {

    initRound () {
      // this gets called for each and every test image
      this.distractor = this.pickDistractor()
      this.answer = 'none'
      this.isShowingTestImg = true
      this.timeout = (this.currentStep / this.totalSteps <= 0.5)
       ? 100 + Math.random() * 100 // test preattentive in first half
       : 50 + Math.random() * 500 // test general awareness in second

      setTimeout(_ => { this.isShowingTestImg = false }, this.timeout)
    },

    pickDistractor () {
      // these are all possible distractors; the svg is being constructed based
      // on which one is picked
      const distractors = ['none', 'rotation', 'size', 'color']
      // pick one distractor randomly:
      return distractors[Math.floor(Math.random() * distractors.length)]
    },

    onSubmit () {
      // our submit handler; this emits each test result to the parent component
      this.$emit(
        'result',
        // the JSON.parse / stringify returns a deep copy
        JSON.parse(JSON.stringify({
          distractor: this.distractor, answer: this.answer, timeout: this.timeout
        }))
      )

      // regenerate circles and populate our input fields
      this.initRound()
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

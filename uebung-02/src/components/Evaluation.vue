<template lang="html">
  <div class="">
    <h1>Der Test ist zuende!</h1>
    <p>
      Auswertung:
    </p>
    <ul>
      <li v-for="(r, i) in results" :class="{correct: r.distractor === r.answer}">
        <strong>{{i + 1}}. Runde:</strong>

        <em>Unterschied:</em>
        <span v-if="r.distractor === 'size'">Größe</span>
        <span v-if="r.distractor === 'rotation'">Rotation</span>
        <span v-if="r.distractor === 'color'">Farbe</span>
        <span v-if="r.distractor === 'none'">Keiner</span>

        <em>Antwort:</em>
        <span v-if="r.answer === 'size'">Größe</span>
        <span v-if="r.answer === 'rotation'">Rotation</span>
        <span v-if="r.answer === 'color'">Farbe</span>
        <span v-if="r.answer === 'none'">Keiner</span>

        ({{Math.round(r.timeout)}}ms)</li>
    </ul>
    <p>{{results.filter(r => r.timeout <= 250 && r.distractor === r.answer).length}} Distraktoren wurden <strong>präattentiv</strong> (in unter 200ms) erkannt, insgesamt <strong>{{results.filter(r => r.distractor === r.answer).length}} richtige Antworten</strong>!</p>
  </div>
</template>

<script>
export default {
  name: 'evaluation',

  // the results are our guesses entered in the other component
  props: ['results']
}
</script>

<style scoped media="screen">
  ul {
    max-width: 50%;
    position: relative;
    margin: 0 auto;
  }

  ul li.correct {
    color: green
  }
</style>

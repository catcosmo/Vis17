<template lang="html">
  <div class="">
    <h1>Der Test ist zuende!</h1>
    <p>
      Im folgenden erfährst du, wie gut du geschätzt hast.
      Sind alle Ergebnisse richtig, erhälst du <strong><em>x = 1</em></strong>.
    </p>
    <p>
      Nach der Formel<br>
      <em>(wahrgenommenes Größenverhältnis) = (tatsächliches Verhältnis der Flächeninhalte)<sup>x</sup></em><br>
      ergibt sich für dich im Durchschnitt:
    </p>
    <h2><em>x = {{x}}</em></h2>
  </div>
</template>

<script>
export default {
  name: 'evaluation',

  // the results are our guesses entered in the other component
  props: ['results'],

  computed: {
    // we calculate our x based on the results we got passed in as a prop
    x () {
      console.log('results', this.results)

      // calculate the area of a circle
      const area = (r) => Math.PI * r * r

      // get the logarithm of x to base y
      // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log
      const baseLog = (x, y) => Math.log(y) / Math.log(x)

      // calculate the x for every single result
      const xs = this.results
        .map(r => ({
          actualRatio: area(r.circles.left) / area(r.circles.right),
          guessedRatio: parseInt(r.guesses.left, 10) / parseInt(r.guesses.right, 10)
        }))
        .map(r => baseLog(r.actualRatio, r.guessedRatio))
        .filter(i => !isNaN(i))

      console.log('xs', xs)

      // sum all x and get the average
      const avg = xs.reduce((a, b) => a + b) / xs.length
      console.log('avg', avg)

      // rounded it to three decimal digits
      return Math.round(avg * 1000) / 1000
    }
  }
}
</script>

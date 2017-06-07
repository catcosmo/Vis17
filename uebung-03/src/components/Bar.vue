<template lang="html">
  <g class="axis">
    <!-- the complete scale -->
    <rect class="axis-bar" x="30" y="530" width="500" height="1" v-if="axis === 'xAxis'" />
    <rect class="axis-bar" x="30" y="30" width="1" height="500" v-else />
    <!-- our axis label -->
    <g transform="translate(30 0)" v-if="axis === 'xAxis'">
      <text class="axis-label"
         x="50%" y="555" alignment-baseline="bottom" text-anchor="middle">{{this.data.label}}</text>
    </g>
    <g transform="translate(-545 30) rotate(-90 265 265)" v-else>
      <text class="axis-label"
         x="50%" y="555" alignment-baseline="top" text-anchor="middle">{{this.data.label}}</text>
    </g>
    <!-- ticks -->
    <g transform="translate(30 530)" v-if="axis === 'xAxis'">
      <rect class="axis-tick" v-for="tick in ticks" :x="tick.position" width="1" height="10"></rect>
    </g>
    <g transform="translate(20 1) rotate(-90 265 265)" v-else>
      <rect class="axis-tick" v-for="tick in ticks" :x="tick.position" width="1" height="10"></rect>
    </g>
    <!-- tick labels -->
    <g v-if="axis === 'xAxis'" class="axis-tick-label">
      <text transform="translate(30 0)" y="555" alignment-baseline="bottom" text-anchor="middle">{{data.min}}</text>
      <text :transform="'translate(' + (ticks[1].position + 30) + ' 0)'" y="555" alignment-baseline="bottom" text-anchor="middle">{{ticks[1].value}}</text>
      <text transform="translate(530 0)" y="555" alignment-baseline="bottom" text-anchor="middle">{{data.max}}</text>
    </g>
    <g transform="translate(-545 30) rotate(-90 265 265)" v-else class="axis-tick-label">
      <text transform="translate(30 0)" y="555" alignment-baseline="bottom" text-anchor="middle">{{data.min}}</text>
      <text :transform="'translate(' + (ticks[1].position + 30) + ' 0)'" y="555" alignment-baseline="bottom" text-anchor="middle">{{ticks[1].value}}</text>
      <text transform="translate(530 0)" y="555" alignment-baseline="bottom" text-anchor="middle">{{data.max}}</text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'bar',
  props: [ 'axis' ],

  computed: {
    /**
     * Get our displayed data from the store
     * @return {Object}  this.$store.getters.xAxis or this.$store.getters.yAxis
     */
    data () {
      return this.$store.getters[this.axis]
    },

    ticks () {
      // ticks can be placed in steps of 1, steps of 10 or steps of 100
      const range = this.data.max - this.data.min
      console.log('range', range)

      // first we build up all ticks depending on our scale
      let values = []
      let stepSize = null
      if (range < 10) {
        stepSize = 1
      } else if (range < 100) {
        stepSize = 10
      } else if (range < 1000) {
        stepSize = 100
      } else { // if (range < 10000) {
        stepSize = 1000
      }

      for (let i = this.data.min; i <= this.data.max; i += stepSize) {
        values.push(i)
      }

      // now we need to find out whether there's a rest and how big it is
      // compared to the whole range we cover
      const rest = (this.data.max - values[values.length - 1]) / this.data.max
      console.log('values', values)
      console.log('rest', rest)

      // so we know now on which area we have do place the ticks, having
      // 500px available in total
      const availableSpace = 500
      const ticks = values.map(val => ({
        position: ((val - this.data.min) / range) * availableSpace,
        value: val
      }))
      console.log('ticks', ticks)

      return ticks
    }
  },

  mounted () {
    console.log('Bar mounted on axis', this.axis)
    console.log('Data:', this.data)
  }
}
</script>

<style lang="css">
  .axis-label {
    font-size: 14px;
    fill: #2e2e2e
  }

  .axis-bar,
  .axis-tick {
    fill: #b0b0b0
  }

  .axis-tick-label {
    font-size: 12px;
    fill: #2e2e2e
  }
</style>

<template lang="html">
  <use class="glyph" xlink:href="#car"
    :transform="`scale(${scale})`"
    :x="x"
    :y="y"
    :fill="`hsl(${fill.join(',')})`">
    <title>{{tooltip}}</title>
  </use>
</template>

<script>
const originalWidth = 73.74
const originalHeight = 53.42

export default {
  name: 'glyph',

  // All the data for this glyph is available in this.data
  props: [ 'data' ],

  data () {
    const targetWidth = 30

    const horsepowerPercentage = this.data['Horsepower'] / this.$store.getters.horsepower.max
    const scaleMultiplier = 0.5 + horsepowerPercentage * 0.5 // scale from [0.5, 1]
    const scale = (1 / originalWidth * targetWidth) * scaleMultiplier

    return {
      scale,
      width: originalWidth,
      height: originalHeight
    }
  },

  computed: {
    /**
     * @return {Number} This item's absolute x-coordinate
     */
    x () {
      const xVal = this.data[this.$store.state.dimensions.x]
      const relativePosition = (xVal - this.xAxis.min) / (this.xAxis.max - this.xAxis.min)
      return this.width / -2 + relativePosition * 500 / this.scale
    },

    /**
     * @return {Number} This item's absolute y-coordinate
     */
    y () {
      const yVal = this.data[this.$store.state.dimensions.y]
      const relativePosition = (yVal - this.yAxis.min) / (this.yAxis.max - this.yAxis.min)
      return this.height / -2 + (1 - relativePosition) * 500 / this.scale
    },

    /**
     * This holds info about all values on the x axis
     *
     * @return {Object} See getters.xAxis in vuex/store.js
     */
    xAxis () {
      return this.$store.getters.xAxis
    },

    /**
     * This holds info about all values on the y axis
     *
     * @return {Object} See getters.yAxis in vuex/store.js
     */
    yAxis () {
      return this.$store.getters.yAxis
    },

    /**
     * Computes the tooltip based on currently selected axes
     * and some always visible info.
     *
     * @return {String}
     */
    tooltip () {
      const {data} = this
      const name = `${data.Manufacturer} ${'' + data.Car}`.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return `${name}, ${data.Horsepower}PS, ${data['KM per Liter']}km/l`
    },

    /**
     * Returns a color between green and red
     * @return {Number[]} HSL array
     */
    fill () {
      const val = this.data['KM per Liter']
      if (val == null) return [0, '100%', '50%']

      const kmPerLiter = this.$store.getters.kmPerLiter
      const percentage = (val - kmPerLiter.min) / kmPerLiter.max

      // red is at 0 deg, green is at 120
      return [Math.round(120 * percentage * 10) / 10, '100%', '50%']
    }
  }
}
</script>

<style lang="css">
.glyph:hover {
  fill: #333;
  opacity: 1 !important;
}
</style>

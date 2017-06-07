<template lang="html">
  <rect
    :width="width"
    :height="height"
    :x="x * (500 - width)"
    :y="y * (500 - height)" />
</template>

<script>
export default {
  name: 'glyph',

  // All the data for this glyph is available in this.data
  props: [ 'data' ],

  data () {
    return {
      width: 10,
      height: 10
    }
  },

  computed: {
    /**
     * @return {Number} This items relative x-coordinate (between 0 and 1)
     */
    x () {
      const xVal = this.data[this.$store.state.dimensions.x]
      return (xVal - this.xAxis.min) / (this.xAxis.max - this.xAxis.min)
    },

    /**
     * @return {Number} This items relative y-coordinate (between 0 and 1)
     */
    y () {
      const yVal = this.data[this.$store.state.dimensions.y]
      return (yVal - this.yAxis.min) / (this.yAxis.max - this.yAxis.min)
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
    }
  }
}
</script>

<style lang="css">
</style>

<template lang="html">
  <g class="axis">
    <!-- the complete scale -->
    <rect class="axis-bar"
      x="30"
      :y="axis === 'yAxis' ? 0 : 500"
      :width="axis === 'xAxis' ? 500 : 1"
      :height="axis === 'yAxis' ? 500 : 1" />
    <!-- our axis label -->
    <g transform="translate(15 0)" v-if="axis === 'xAxis'">
      <text class="axis-label"
         x="50%" y="520" alignment-baseline="bottom" text-anchor="middle">{{this.data.label}}</text>
    </g>
    <g transform="translate(0 15) rotate(-90 250 250)" v-else>
      <text class="axis-label"
         x="50%" y="20" alignment-baseline="top" text-anchor="middle">{{this.data.label}}</text>
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
  }
</style>

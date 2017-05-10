<template lang="html">
  <svg width="320" height="320" viewBox="0 0 320 320">
    <rect :x="coord[0]" :y="coord[1]" width="20" height="20" v-for="coord in coords.slice(0, coords.length - 1)" />
    <rect :x="coords[coords.length - 1][0] - 20 / (scale / 2)" :y="coords[coords.length - 1][1] - 20 / (scale / 2)" :width="20 * scale" :height="20 * scale" fill="#000" />
  </svg>
</template>

<script type="text/javascript">
import randomCoords from '@/random-coords'

export default {
  name: 'size-distractor',

  data () {
    const coords = randomCoords({ amount: 9, maxX: 300, maxY: 300 })
    const scale = 1.5 + Math.random()
    return { coords, scale }
  }
}
</script>

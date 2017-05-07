<template lang="html">
  <svg width="320" height="320" viewBox="0 0 320 320">
    <rect :x="coord[0]" :y="coord[1]" width="20" height="20" v-for="coord in coords.slice(0, coords.length - 1)" />
    <rect :x="coords[coords.length - 1][0]" :y="coords[coords.length - 1][1]" width="20" height="20" fill="#000" :transform="rotation" />
  </svg>
</template>

<script type="text/javascript">
import randomCoords from '@/random-coords'

export default {
  name: 'rotation-distractor',

  data () {
    // generate 9 random coords
    const coords = randomCoords({ amount: 9, maxX: 300, maxY: 300 })

    return {
      coords,

      // rotate around the center of the last generated coordinate
      rotation: `rotate(45 ${coords[coords.length - 1][0] + 10} ${coords[coords.length - 1][1] + 10})`
    }
  }
}
</script>

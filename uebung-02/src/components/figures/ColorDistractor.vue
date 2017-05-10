<template lang="html">
  <svg width="320" height="320" viewBox="0 0 320 320">
    <rect :x="coord[0]" :y="coord[1]" width="20" height="20" v-for="coord in coords.slice(0, coords.length - 1)" />
    <rect :x="coords[coords.length - 1][0]" :y="coords[coords.length - 1][1]" :width="20" :height="20" class="special-color" />
  </svg>
</template>

<script type="text/javascript">
import randomCoords from '@/random-coords'

export default {
  name: 'color-distractor',

  data () {
    // generate 9 random coords
    const coords = randomCoords({ amount: 9, maxX: 300, maxY: 300 })
    return {
      coords
    }
  }
}
</script>

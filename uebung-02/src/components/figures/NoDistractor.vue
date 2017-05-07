<template lang="html">
  <svg width="320" height="320" viewBox="0 0 320 320">
    <rect :x="coord[0]" :y="coord[1]" width="20" height="20" v-for="coord in coords" />
  </svg>
</template>

<script type="text/javascript">
import randomCoords from '@/random-coords'

export default {
  name: 'no-distractor',

  data () {
    return {
      // generate 9 random coords
      coords: randomCoords({ amount: 9, maxX: 300, maxY: 300 })
    }
  }
}
</script>

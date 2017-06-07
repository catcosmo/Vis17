<template>
  <div class="graph">
    <h1>Car visualisation</h1>
    <div class="">
      X-Axis:
      <select v-model="xAxis">
        <option v-for="dimension in $store.getters.numericDimensions">{{dimension}}</option>
      </select>

      Y-Axis:
      <select v-model="yAxis">
        <option v-for="dimension in $store.getters.numericDimensions">{{dimension}}</option>
      </select>
    </div>

    <!--
      the drawing area is: 30px border on all sides,
      500px for the items
    -->
    <svg width="560" height="560">
      <!-- to draw crisp lines, we translate the whole graph -->
      <g transform="translate(0.5, 0.5)">
        <bar axis="xAxis" />
        <bar axis="yAxis" />
      </g>
    </svg>
  </div>
</template>

<script>
import Item from '@/components/Item'
import Bar from '@/components/Bar'

export default {
  name: 'graph',
  components: { Item, Bar },
  computed: {
    xAxis: {
      get () {
        return this.$store.state.dimensions.x
      },
      set (dimension) {
        this.$store.commit('setDimension', { axis: 'x', dimension: dimension })
      }
    },

    yAxis: {
      get () {
        return this.$store.state.dimensions.y
      },
      set (dimension) {
        this.$store.commit('setDimension', { axis: 'y', dimension: dimension })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

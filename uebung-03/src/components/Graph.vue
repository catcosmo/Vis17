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
      <defs>
        <path id="car"
          width="73.7"
          height="53.4"
          d="M51.353,0l8.71,15.91l13.666,1.2l0,25.465l-9.573,0.049c0.002,0.087 0.003,0.173 0.003,0.259c0,5.807 -4.714,10.521 -10.52,10.521c-5.806,0 -10.52,-4.714 -10.52,-10.521c0,-0.05 0,-0.1 0.001,-0.151l-6.066,0.031l0,0.002l-0.189,-0.001l-0.19,0.001l0,-0.002l-7.037,-0.036c0.001,0.052 0.002,0.104 0.002,0.156c0,5.807 -4.714,10.521 -10.52,10.521c-5.807,0 -10.521,-4.714 -10.521,-10.521c0,-0.088 0.002,-0.176 0.004,-0.263l-8.603,-0.045l0,-26.665l13.666,0l8.711,-15.91l28.976,0Z" />
      </defs>
      <!-- to draw crisp lines, we translate the whole graph -->
      <g transform="translate(0.5, 0.5)">
        <bar axis="xAxis" />
        <bar axis="yAxis" />
        <!--
          transform again and all our items are in a coordinate space of [0, 500],
          but allowed to reach out with a max width of 30px
        -->
        <g class="glyphs" :transform="`translate(30, 30)`">
          <item :data="data" :key="Object.values(data).join('-')" v-for="data in $store.state.displayed" />
        </g>
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
<style>
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

.glyphs .glyph {
  opacity: 1;
  transition: opacity .2s ease-in-out;
}

.glyphs:hover .glyph {
  opacity: 0.5;
}
</style>

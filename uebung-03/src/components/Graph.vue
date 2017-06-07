<template>
  <div class="graph">
    <h1>Car visualisation</h1>
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
  components: { Item, Bar }
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

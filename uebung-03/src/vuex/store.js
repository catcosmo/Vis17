/* eslint-env browser */

import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const cache = {}
function cachedGetter (state, label) {
  // state doesn't really change in our app once it's set,
  // so we don't need invalidation
  if (cache[label]) return cache[label]
  const data = state.displayed.map(item => item[label])
  cache[label] = {
    label,
    data,
    min: Math.min.apply(null, data),
    max: Math.max.apply(null, data)
  }
  return cache[label]
}

export default new Vuex.Store({
  state: {
    data: [],      // all the data
    displayed: [], // displayed data
    dimensions: {
      x: '',
      y: ''
    }
  },

  mutations: {
    /**
     * Load a completeley new dataset
     *
     * @param {Object} state Our current state
     * @param {Object} data  Our new data
     */
    reset (state, data) {
      // set dimensions arbitrarily to the first two numeric values
      const firstRow = data[0]
      const keys = Object.keys(firstRow)
      const vals = Object.values(firstRow)

      let dimensions = []
      for (let i = 0, l = vals.length; i < l; i++) {
        if (typeof vals[i] === 'number') {
          dimensions.push(keys[i])
          if (dimensions.length === 2) {
            break
          }
        }
      }

      state.dimensions.x = dimensions[0]
      state.dimensions.y = dimensions[1]
      state.data = state.displayed = data
    },

    /**
     * Change x or y dimension
     *
     * @param {Object} state
     * @param {String} axis      x or y
     * @param {String} dimension a numeric dimension
     */
    setDimension (state, { axis, dimension }) {
      state.dimensions[axis] = dimension
    }
  },

  getters: {

    horsepower (state) {
      return cachedGetter(state, 'Horsepower')
    },

    /**
     * @param  {Object}  state
     * @return {Object}         An object describing the current data for the x axis
     */
    xAxis (state) {
      const label = state.dimensions.x
      return cachedGetter(state, label)
    },

    /**
     * @param  {Object}  state
     * @return {Object}         An object describing the current data for the y axis
     */
    yAxis (state) {
      const label = state.dimensions.y
      return cachedGetter(state, label)
    },

    /**
     * Get all numeric dimensions that we can put on bars
     *
     * @param  {Object}   state
     * @return {String[]}
     */
    numericDimensions (state) {
      if (!state.data.length) return []
      const data = state.data[0]
      return Object.keys(data).filter(k => typeof data[k] === 'number')
    }

  },

  actions: {
    /**
     * Fetch and parse new tsv from our static folder
     *
     * @param  {[type]} commit               [description]
     * @param  {String} [dataSet='cars.tsv'] [description]
     * @return {[type]}                      [description]
     */
    fetchTsv ({commit}, url) {
      fetch(url)
        .then(res => res.text())
        .then(tsv => {
          console.log('Fetched text file, parsing...')
          const isNumeric = /-?\d+(\.\d+)?/

          // first parse into a header array and an array of rows
          const [header, ...rows] = tsv.split('\n')
            .map(row => row.split('\t'))

          // then transform into an array like
          // [ {col1: val11, col2: val21, ...}, {col1: val21, col2: val22, ...}, ...]
          return rows.map(row => {
            let transformed = {}
            for (let i = 0, l = row.length; i < l; i++) {
              const label = header[i]
              // parse numeric values
              transformed[label] = row[i].match(isNumeric)
                ? parseFloat(row[i])
                : row[i]

              // handle non-available data sets
              if (transformed[label] === 'NA') {
                transformed[label] = null
              }
            }
            return transformed
          })
        })
        .then(data => {
          console.log('Parsed data, converting...')
          const converted = data.map(datum => {
            datum['KM per Liter'] = datum['MPG'] * 0.43
            datum['Displacement'] *= 16.39
            datum['Weight'] *= 0.45
            delete datum['MPG']
            return datum
          })
          console.log('Converted!')

          commit('reset', converted)
        })
        .catch(err => console.error('Something went wrong fetching & parsing the data :(', err))
    }
  },

  strict: debug,
  plugins: debug ? [createLogger()] : []
})

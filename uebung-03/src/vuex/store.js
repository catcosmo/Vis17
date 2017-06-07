/* eslint-env browser */

import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    data: {},   // all the data
    visible: {} // displayed data
  },

  mutations: {
    /**
     * Load a completeley new dataset
     *
     * @param {Object} state Our current state
     * @param {Object} data  Our new data
     */
    reset (state, data) {
      state.data = state.visible = data
    },

    /**
     * Set visible data by defining a filter function
     *
     * @param  {Object}   state
     * @param  {Function} filterFn
     */
    filter (state, filterFn) {
      const copy = JSON.parse(JSON.stringify(state.data))
      state.visible = filterFn(copy)
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

          // first parse into a header array and an array of rows
          const [header, ...rows] = tsv.split('\n')
            .map(row => row.split('\t'))

          // then transform into an array like
          // [ {col1: val11, col2: val21, ...}, {col1: val21, col2: val22, ...}, ...]
          return rows.map(row => {
            let transformed = {}
            for (let i = 0, l = row.length; i < l; i++) {
              transformed[header[i]] = row[i]
            }
            return transformed
          })
        })
        .then(parsed => {
          // TODO: Convert to metric units
          console.log('Parsed data')
          console.log(parsed)
          commit('reset', parsed)
        })
        .catch(err => console.error('Something went wrong fetching & parsing the data :(', err))
    }
  },

  strict: debug,
  plugins: debug ? [createLogger()] : []
})

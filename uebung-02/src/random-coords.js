import { range, zip } from 'lodash'

function prngCoords ({ amount, maxX, maxY }) {
  // generate empty int arrays and fill them with random numbers
  const xs = new Uint16Array(amount)
  const ys = new Uint16Array(amount)
  window.crypto.getRandomValues(xs)
  window.crypto.getRandomValues(ys)

  // normalize and pack them in one array
  return zip(
    Array.from(xs).map(x => x / (2 ** 16)).map(x => Math.floor(x * maxX)),
    Array.from(ys).map(y => y / (2 ** 16)).map(y => Math.floor(y * maxY))
  )
}

function badCoords ({ amount, maxX, maxY }) {
  return range(amount)
    .map(_ => [Math.random() * maxX, Math.random() * maxX])
    .map(xy => xy.map(Math.floor))
}

/**
 * Generates `amount` random coordinates between [0, maxX] and [0, maxY]
 * @param  {Object}         options
 * @return {Array[Number]}
 */
export default function randomCoords ({ amount, maxX, maxY }) {
  return window.crypto // use a prng if available
    ? prngCoords({ amount, maxX, maxY })
    : badCoords({ amount, maxX, maxY })
}

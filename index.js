const ParrotsHandler = require('./src/ParrotsHandler')

/**
 * @module parrots
 * Create a new instance of ParrotHandler
 * @param {object} options required options are getter, setter
 * @return {ParrotHandler}
 *
 * @example // Create a handle to synchronize scroll left
 * parrots({
 *  // get scroll left from source
 *  getter: (el) => $(el).scrollLeft(),
 *  // set scroll left into items
 *  setter: (el, value) => $(el).scrollLeft(value)
 * })
 */
const parrots = (options) => new ParrotsHandler(options)

module.exports = parrots

if (typeof window !== 'undefined') {
  // window injecting
  window.parrots = parrots
}

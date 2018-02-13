const ParrotsHandler = require('./src/ParrotsHandler')

/**
 * Create a new instance of ParrotsHandler
 * @param {object} options options of current handler
 * @param {Function} options.getter required, is function, get value from source
 * @param {Function} options.setter required, is function, set value into items
 * @param {integer} options.duration optional, milliseconds, duration of synchronizing operation, default value is 2000
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

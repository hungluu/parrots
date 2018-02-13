/**
 * Continuously synchronizing web items without worrying about lags, delays or misses
 * Using request animation frame if possible
 *
 * @author Hung Luu <hungluu2106@gmail.com>
 * @license MIT
 */

var raf = require('raf')
var objectAssign = require('object-assign')
var kindOf = require('kind-of')

/**
 * Create a handler for synchronizing items
 * @param {object} options options of current handler
 * @param {Function} options.getter required, is function, get value from source
 * @param {Function} options.setter required, is function, set value into items
 * @param {integer} options.duration optional, milliseconds, duration of synchronizing operation, default value is 2000
 */
var ParrotsHandler = function (options) {
  var defaultOptions = {
    duration: 2000
  }

  // Affected items (receive copied value from source), passed as first arguments of setter
  this.items = []

  // Source to copy from, passed as the only argument of options.getter
  this.source = null

  // Timer of synchronizing operations
  this.timer = null

  // options
  this.options = objectAssign({}, defaultOptions, options)

  if (kindOf(this.options.getter) !== 'function') {
    throw new Error('[ParrotsHandler] options.getter should be function')
  }

  if (kindOf(this.options.setter) !== 'function') {
    throw new Error('[ParrotsHandler] options.setter should be function')
  }

  // events
  this.startLoopEvent = this.startLoop.bind(this)
  this.freeLoopEvent = this.freeLoop.bind(this)
  this.loopEvent = this.loop.bind(this)
}

ParrotsHandler.prototype = {
  /**
   * Add an affected item (receive synchronized value from source)
   * @param {object} item item that receives synchronized value from source
   * @return {this}
   */
  to: function (item) {
    this.items.push(item)
    return this
  },

  /**
   * Get a trigger to start synchronizing value from source into items
   * @param {object} source source of synchronized value passed into items
   * @return {Function}
   */
  from: function (source) {
    return () => {
      this.source = source
      return this.startLoopEvent()
    }
  },

  // Loop used for synchronizing items
  loop: function () {
    this.sync()

    // Recall loop in a performant style
    raf(this.loopEvent)
  },

  // Sync items
  sync: function () {
    // Get copied value from source
    const copiedValue = this.options.getter(this.source)
    // Copy value to every items in stack
    for (let idx = 0, maxIndex = this.items.length - 1; idx <= maxIndex; idx++) {
      // Use setter to copy into affected item
      this.options.setter(this.items[idx], copiedValue)
    }
  },

  // Start loop
  startLoop: function () {
    if (this.timer === null) {
      // create new timer
      this.timer = raf(this.loopEvent)
      // release timer when time is up
      setTimeout(this.freeLoopEvent, this.loopDuration)
    }
  },

  // End loop
  freeLoop: function () {
    if (this.timer !== null) {
      // Release timer
      raf.cancel(this.timer)
    }
  }
}

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
var parrots = function (options) {
  return new ParrotsHandler(options)
}

exports = module.exports = parrots
exports.ParrotsHandler = ParrotsHandler

if (typeof window !== 'undefined') {
  // window injecting
  window.parrots = parrots
}

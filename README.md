# Parrots

[![Build Status](https://travis-ci.org/hungluu2106/parrots.svg?branch=master)](https://travis-ci.org/hungluu2106/parrots)
[![npm version](https://badge.fury.io/js/parrots.svg)](https://badge.fury.io/js/parrots)

Continuously synchronizing web with performance. Parrot em all! :baby_chick:

Suitable for synchronizing HTML element scroll left, scroll top, width, height, ... or any other things like object properties, array items...

## Installation

```shell
npm i --save parrots
```
UMD latest builds also available at [jsDelivr](https://www.jsdelivr.com/package/npm/parrots?path=dist)
```
<script src="https://cdn.jsdelivr.net/npm/parrots@latest/dist/parrots.min.js"></script>
```
or [unpkg.com](https://unpkg.com/)
```
https://unpkg.com/parrots@latest/dist/parrots.min.js
```

## Examples

#### Live examples

- [Scroll left bidirectional sync](https://jsfiddle.net/hungluu/nrdLmbhu/)
- [Scroll sync with counter](https://jsfiddle.net/hungluu/15b9hv6q/)

```javascript
// Create a handle to synchronize scroll left
var syncScrollLeft = parrots({
  // get scroll left from source
  getter: (el) => $(el).scrollLeft(),
  // set scroll left into items
  setter: (el, value) => $(el).scrollLeft(value)
  // auto sync duration, optional, default is 2 seconds (2000 milliseconds)
  duration: 2000
})

// Add affected elements
syncScrollLeft.to(el)
syncScrollLeft.to(el2)

// Trigger scroll left copying from el3 when it's scrolled
el3.on('scroll', syncScrollLeft.from(el3))
```

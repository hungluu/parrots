# Parrots
Continuously synchronizing web items without worrying about lags, delays or misses. Parrot em all! :baby_chick:
Suitable for synchronizing html element scroll left, scroll top, width, height, ... or any other javascript things like object properties, array items.

## Installation

```shell
npm i --save parrots
```

## Examples

```javascript
// Create a handle to synchronize scroll left
var syncScrollLeft = parrots({
  // get scroll left from source
  getter: (el) => $(el).scrollLeft(),
  // set scroll left into items
  setter: (el, value) => $(el).scrollLeft(value)
})

// Add affected elements
syncScrollLeft.to(el)
syncScrollLeft.to(el2)
// Trigger scroll left copying from el3 when it's scrolled
el3.on('scroll', syncScrollLeft.from(el3))
```

## API
Please view [API.md](https://github.com/hungluu2106/parrots/blob/master/API.md)

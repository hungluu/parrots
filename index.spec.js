const ParrotsHandler = require('./index').ParrotsHandler
const kindOf = require('kind-of')

describe('ParrotsHandler', function () {
  const getter = (o) => o.value
  const setter = (o, v) => o.value = v
  const parrots = new ParrotsHandler({
    getter: getter,
    setter: setter
  })
  const item1 = { value: 1 }
  const item2 = { value: 2 }
  const source = { value: 3 }
  const trigger = parrots.from(source)

  describe('When it is created', function () {
    it('should receive options and merged with default options', function () {
      expect(parrots.options).toMatchObject({
        setter: setter,
        getter: getter,
        duration: 2000
      })
    })

    it('should throw Exception if getter or setter not passed in', function () {
      expect(() => new ParrotsHandler()).toThrow()
      expect(() => new ParrotsHandler({
        getter: getter
      })).toThrow()
      expect(() => new ParrotsHandler({
        setter: setter
      })).toThrow()
    })

    it('should has an empty list of items', function () {
      expect(parrots.items).toEqual([])
    })

    it('should has a shared timer and source', function () {
      expect(parrots.timer).toBeNull()
      expect(parrots.source).toBeNull()
    })
  })

  describe('When manupilating items', function () {
    it('can add any item', function () {
      parrots.to(item1)
      parrots.to(item2)

      expect(parrots.items.length).toBe(2)
      expect(parrots.items[0].value).toBe(item1.value)
      expect(parrots.items[1].value).toBe(item2.value)
    })
  })

  describe('When synchronizing', function () {
    it('can make a trigger to sync with source', function () {
      expect(kindOf(parrots.from({ value: 3 }))).toBe('function')
    })

    it('should receive source from trigger when it is called', function () {
      trigger()
      expect(parrots.source).toBe(source)
    })

    it('should continuosly synchronizing items during duration', function (done) {
      parrots.items[0].value = source.value + 1
      setTimeout(function () {
        expect(parrots.items[0].value).toBe(source.value)
        done()
      }, 1000)
    })

    it('should synchronize items', function (done) {
      setTimeout(function () {
        expect(parrots.items[0].value).toBe(3)
        expect(parrots.items[1].value).toBe(3)
        done()
      }, 1000)
    })

    it('should stop synchronizing items after duration', function () {
      parrots.items[0].value = source.value + 1
      expect(parrots.items[0].value).toBe(source.value + 1)
    })
  })
})

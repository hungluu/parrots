const ParrotsHandler = require('./ParrotsHandler')
const kindOf = require('kind-of')

describe('ParrotsHandler', function () {
  const getter = (o) => o.value
  const setter = (o, v) => o.value = v
  const parrots = new ParrotsHandler({
    getter: getter,
    setter: setter
  })

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
    const item1 = { value: 1 }
    const item2 = { value: 2 }

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
      const source = { value: 3 }
      const trigger = parrots.from(source)
      trigger()
      expect(parrots.source).toBe(source)
    })
  })
})

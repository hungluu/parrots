var ParrotsHandler = require('../index').ParrotsHandler
var kindOf = require('kind-of')
var chai = require('chai')
var expect = chai.expect

describe('ParrotsHandler', function () {
  var getter = (o) => o.value
  var setter = (o, v) => o.value = v
  var parrots = new ParrotsHandler({
    getter: getter,
    setter: setter
  })
  var item1 = { value: 1 }
  var item2 = { value: 2 }
  var source = { value: 3 }
  var trigger = parrots.from(source)

  describe('When it is created', function () {
    it('should receive options and merged with default options', function () {
      expect(parrots.options).to.deep.equal({
        setter: setter,
        getter: getter,
        duration: 2000
      })
    })

    it('should throw Exception if getter or setter not passed in', function () {
      expect(() => new ParrotsHandler()).to.throw()
      expect(() => new ParrotsHandler({
        getter: getter
      })).to.throw()
      expect(() => new ParrotsHandler({
        setter: setter
      })).to.throw()
    })

    it('should has an empty list of items', function () {
      expect(parrots.items.length).to.equal(0)
    })

    it('should has a shared timer and source', function () {
      expect(parrots.timer).to.equal(null)
      expect(parrots.source).to.equal(null)
    })
  })

  describe('When manupilating items', function () {
    it('can add any item', function () {
      parrots.to(item1)
      parrots.to(item2)

      expect(parrots.items.length).to.equal(2)
      expect(parrots.items[0].value).to.equal(item1.value)
      expect(parrots.items[1].value).to.equal(item2.value)
    })
  })

  describe('When synchronizing', function () {
    it('can make a trigger to sync with source', function () {
      expect(kindOf(parrots.from({ value: 3 }))).to.equal('function')
    })

    it('should receive source from trigger when it is called', function () {
      trigger()
      expect(parrots.source).to.equal(source)
    })

    it('should continuosly synchronizing items during duration', function (done) {
      parrots.items[0].value = source.value + 1
      setTimeout(function () {
        expect(parrots.items[0].value).to.equal(source.value)
        done()
      }, 1000)
    })

    it('should synchronize items', function (done) {
      setTimeout(function () {
        expect(parrots.items[0].value).to.equal(3)
        expect(parrots.items[1].value).to.equal(3)
        done()
      }, 1000)
    })

    it('should stop synchronizing items after duration', function () {
      parrots.items[0].value = source.value + 1
      expect(parrots.items[0].value).to.equal(source.value + 1)
    })
  })
})

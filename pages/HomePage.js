var Page = require('./Page')

var HomePage = Object.create(Page, {
  div1: {
    get: function () {
      return browser.element("div[id='#sync1']")
    }
  },

  div2: {
    get: function () {
      return browser.element("div[id='#sync2']")
    }
  }
});

module.exports = HomePage

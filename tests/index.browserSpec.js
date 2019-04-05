var ParrotsHandler = require('../index').ParrotsHandler
var kindOf = require('kind-of')
var chai = require('chai')
var expect = chai.expect
var HomePage = require('../pages/HomePage')
// https://github.com/saucelabs-sample-test-frameworks/JS-Mocha-WebdriverIO-Selenium/blob/master/pages/home.page.js
// http://webdriver.io/guide/getstarted/install.html

describe('ParrotsHandler', function () {
  it('should has elements', function () {
    var home = HomePage.open()
    var div1 = HomePage.div1()
    var div2 = HomePage.div2()
    expect(div1.scrollLeft).to.be.not.null()
  })
})

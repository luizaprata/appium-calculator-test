'use strict'

require('./setup')
var wd = require('wd'),
  serverConfigs = require('./appium-servers')

describe('android simple', function() {
  this.timeout(300000)
  var driver
  var allPassed = true

  before(function() {
    var serverConfig = process.env.npm_package_config_sauce
      ? serverConfigs.sauce
      : serverConfigs.local
    driver = wd.promiseChainRemote(serverConfig)
    require('./log').configure(driver)

    var desired = require('./caps').android18
    desired.app = require('./apps').androidApp
    if (process.env.npm_package_config_sauce) {
      desired.name = 'android - simple'
      desired.tags = ['sample']
    }
    return driver.init(desired).setImplicitWaitTimeout(3000)
  })

  after(function() {
    return driver.quit().finally(function() {
      if (process.env.npm_package_config_sauce) {
        return driver.sauceJobStatus(allPassed)
      }
    })
  })

  afterEach(function() {
    allPassed = allPassed && this.currentTest.state === 'passed'
  })

  it('should find an element', function() {
    return driver.elementsByClassName('android.widget.TextView')
    .should.exist
    //els[2].text().should.become("This is a new note!")
  })
})

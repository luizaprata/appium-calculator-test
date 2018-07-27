"use strict";
require("colors");

let wd = require("wd");
let Q = wd.Q;

const serverConfig = {
  host: "localhost",
  port: 4723
};

let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let should = chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

const addLogs = function(driver) {
  // See whats going on
  driver.on("status", function(info) {
    console.log(info.cyan);
  });
  driver.on("command", function(meth, path, data) {
    console.log(" > " + meth.yellow, path.grey, data || "");
  });
  driver.on("http", function(meth, path, data) {
    console.log(" > " + meth.magenta, path, (data || "").grey);
  });
};

describe("android simple", function() {
  this.timeout(300000);
  let driver;
  let allPassed = true;

  before(function() {
    driver = wd.promiseChainRemote(serverConfig);
    addLogs(driver);

    let desired = {
      platformName: "Android",
      deviceName: "emulator-5554",
      automationName: "Appium",
      app:
        "C:\\Users\\luiza.passos\\Documents\\_labs\\appium-calculator-test\\resources\\CTAppium-1-1.apk"
    };

    return driver.init(desired).setImplicitWaitTimeout(3000);
  });

  after(function() {
    return driver.quit().finally(function() {
      if (process.env.npm_package_config_sauce) {
        return driver.sauceJobStatus(allPassed);
      }
    });
  });

  afterEach(function() {
    allPassed = allPassed && this.currentTest.state === "passed";
  });

  it("deve preencher campo texto", function() {
    const textViewList = driver.elementsByClassName("");
    return driver
      .elementsByClassName("android.widget.TextView")
      .then(function(els) {
        els.map(function(el) {
          el.text().should.become("This is a new note!");
        });
        //els[2].text().should.become("This is a new note!")
      })
      .done();
  });
});

/*
"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');

describe("android simple", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.npm_package_config_sauce ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = process.env.npm_package_config_sauce ?
      _.clone(require("./helpers/caps").android18) :
      _.clone(require("./helpers/caps").android19);
    desired.app = require("./helpers/apps").androidApiDemos;
    if (process.env.npm_package_config_sauce) {
      desired.name = 'android - simple';
      desired.tags = ['sample'];
    }
    return driver
      .init(desired)
      .setImplicitWaitTimeout(3000);
  });

  after(function () {
    return driver
      .quit()
      .finally(function () {
        if (process.env.npm_package_config_sauce) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("should find an element", function () {
    return driver
      .elementByAccessibilityId('Graphics')
      .click()
      .elementByAccessibilityId('Arcs')
        .should.eventually.exist
      .back()
      .elementByName('App')
        .should.eventually.exist
      .elementsByAndroidUIAutomator('new UiSelector().clickable(true)')
        .should.eventually.have.length(12)
      .elementsByAndroidUIAutomator('new UiSelector().enabled(true)')
        .should.eventually.have.length.above(20)
      .elementByXPath('//android.widget.TextView[@text=\'API Demos\']')
        .should.exists;
  });
});
*/

/*
const wdio = require("webdriverio");

const caps = {
  platformName: "Android",
  deviceName: "emulator-5554",
  automationName: "Appium",
  appPackage: "com.android.calculator2",
  appActivity: "com.android.calculator2.Calculator"
};
const driver = wdio.remote({
  protocol: "http",
  host: "127.0.0.1",
  port: 4723,
  path: "/wd/hub",
  desiredCapabilities: caps
});

driver
  .init()
  .element("com.android.calculator2:id/digit_9")
  .click()
  .element("~plus")
  .click()
  .element("com.android.calculator2:id/digit_5")
  .click()
  .element("~equals")
  .click()
  .end();
*/


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

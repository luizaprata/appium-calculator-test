const wdio = require("webdriverio");

const opts = {
  port: 4723,
  desiredCapabilities: {
    platformName: "Android",
    deviceName: "Android Emulator",
    appPackage: "com.android.calculator2",
    appActivity: "com.android.calculator2.Calculator",
    automationName: "Appium"
  }
};

const client = wdio.remote(opts);
client.init();

let el1 = client.element("com.android.calculator2:id/digit_9");
console.log("el1", el1);
el1.click();
console.log("el1", el1);
let el2 = client.element("~plus");
el2.click();
let el3 = client.element("com.android.calculator2:id/digit_5");
el3.click();
let el4 = client.element("~equals");
el4.click();

client.end();

//let el5 = client.element("com.android.calculator2:id/formula");

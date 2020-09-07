const puppeteer = require("puppeteer");
const url = "https://zapier.com/app/login/?forceLoginDisplayForm=true";

const youtubeSubscriber = async (channelID) => {
  let browser = await puppeteer.launch({ headless: false, devtools: true });
  let page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // add edge case of other login page
  // if a href="/app/login/?forceLoginDisplayForm exists, click it and continue

  await page.waitForSelector("input[name='email']");
  await page.click("input[name='email']");
  await page.type("input[name='email']", "tal.dwek@gmail.com");
  await page.waitFor(2000);
  const usernameInput = await page.$("input[name='email']");
  await usernameInput.press("Enter");
  await page.waitFor(2000);

  await page.waitForSelector("input#password");
  console.log("selctor found?");
  await page.waitFor(4000);

  await page.click("input#password");
  await page.type("input#password", "Thecure1985");
  await page.waitFor(2000);

  const passwordInput = await page.$("input#password");
  await passwordInput.press("Enter");

  await page.waitFor(2000);

  await page.waitFor(2000);
  await page.goto("https://zapier.com/app/zaps", { waitUntil: "networkidle2" });

  // copy template
  await page.waitForSelector("div.menu-button");
  await page.click("div.menu-button");

  await page.click(".zap-menu__list li:nth-child(7)");
  await page.waitFor(4000);
  await page.click(".zap-set .zap-set__item:nth-child(2)"); /* click new zap */
  await page.waitFor(4000);
  await page.click(".e2e-tests-editor-step"); /* edit zap */
  await page.waitFor(2000);
  await page.click(".e2e-tests-editor-step a:nth-child(3)");
  await page.waitFor(4000);

  /* change channel ID */

  const inputField = await page.$("div.css-cfrlgl-FieldsForm span");
  inputField.click();
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Backspace");
  }

  page.waitFor(1000);
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Delete");
  }
  page.waitFor(1000);
  await inputField.type(channelID);

  await page.waitFor(3000);
  await page.hover("div.flow-fields-page__fields-page-container button");
  await page.waitFor(2000);
  await page.click("div.flow-fields-page__fields-page-container button");
  await page.waitFor(5000);

  await page.evaluate(() => {
    const continueButton = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Continue"));
    console.log("continue", continueButton);
    continueButton.click();
  });

  await page.waitFor(5000);
  await page.evaluate(() => {
    console.log("test trigger");
    const testTrigger = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Test trigger"));
    testTrigger.click();
  });

  await page.waitFor(4000);

  await page.evaluate(() => {
    const continueButton = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Continue"));
    continueButton ? continueButton.click() : true;
  });

  await page.waitFor(4000);

  const zapName = await page.$("span.css-cwhdyc-Text--subtitle800--black");
  await zapName.click();
  await page.type("nav h1", channelID);
  await page.keyboard.press('Enter')

  await page.waitFor(4000);

  await page.evaluate(() => {
    const activateZap = document.querySelectorAll("button")[1];
    console.log(activateZap);
    activateZap.click();
  });

  browser.close();
  return true;
};

module.exports = youtubeSubscriber;

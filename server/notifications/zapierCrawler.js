const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const channelID = "UCwWhs_6x42TyRM4Wstoq8HA";

(async () => {
  const url = "https://zapier.com/app/login/?forceLoginDisplayForm=true";
  
  // // launch browser
  let browser = await puppeteer.launch({ headless: false, devtools: true });
  
  // // open new page
  let page = await browser.newPage();
  
  await page.goto(url, { waitUntil: "networkidle2" });
  
  // login

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
  await page.click(
    ".e2e-tests-editor-step a:nth-child(3)"
  ); 
  await page.waitFor(4000);

  /* change channel ID */

  await page.evaluate((channelID) => {
    const inputChannel = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("UC"));
    inputChannel.textContent = channelID;
  }, channelID);

  await page.evaluate(() => {
    const refreshFields = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Refresh Fields"));
    refreshFields.click();
  });

  await page.waitFor(2000);

  await page.evaluate(() => {
    const continueButton = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Done Editing"));
    continueButton.click();
  });

  await page.waitFor(3000);

  // edge case of test trigger required
  // await page.evaluate(() => {
  //   const testTrigger = Array.from(
  //     document.querySelectorAll("span")
  //   ).find((el) => el.textContent.includes("Test tirgger"));
  //   testTrigger.click();
  // });

  await page.waitFor(4000);

  await page.evaluate(() => {
    const activateZap = document.querySelectorAll("button")[1];
    console.log(activateZap);
    activateZap.click();
  });

  await page.waitFor(2000);

  
  browser.close()
})();

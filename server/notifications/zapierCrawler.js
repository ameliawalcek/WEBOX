const puppeteer = require("puppeteer");

(async () => {
  const url = "https://zapier.com/app/login/?forceLoginDisplayForm=true";
  const email = "tal.dwek@gmail.com";
  const emailPassword = "Thecure1985";
  const channelID = "UCwWhs_6x42TyRM4Wstoq8HA";

  // launch browser
  let browser = await puppeteer.launch({ headless: false });

  // open new page
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  // login
  await page.waitForSelector("input[name='email']");
  await page.click("input[name='email']");
  await page.type("input[name='email']", "tal.dwek@gmail.com");
  await page.waitFor(2000);
  const usernameInput = await page.$("input[name='email']");
  await usernameInput.press("Enter");
  console.log("pressed enter");
  await page.waitFor(2000);
  console.log("waited 2 sec");

  await page.waitForSelector("input#password");
  console.log("selctor found?");
  await page.waitFor(4000);

  await page.click("input#password");
  await page.type("input#password", "Thecure1985");
  await page.waitFor(2000);

  const passwordInput = await page.$("input#password");
  await passwordInput.press("Enter");

  await page.waitFor(2000);
  // await page.waitForSelector("input#password");
  // await page.click(selectors.continue);

  await page.waitFor(2000);
  await page.goto("https://zapier.com/app/zaps", { waitUntil: "networkidle2" });

  // copy template
  await page.waitForSelector("div.menu-button");
  await page.click("div.menu-button");

  await page.click(".zap-menu__list li:nth-child(7)");
  await page.waitFor(4000);
  await page.click(".zap-set .zap-set__item:nth-child(2)");
  await page.waitFor(4000);
  await page.click(".e2e-tests-editor-step");
  await page.waitFor(2000);

  // connect gmail
  await page.click(".e2e-tests-editor-step a:nth-child(2)");
  await page.waitFor(4000);

  await page.evaluate(async () => {
    const needToReconnect = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Please Reconnect"));

    if (needToReconnect) {

      needToReconnect.click();

      await page.waitForSelector("input#identifierId");
      await page.type("input#identifierId", email);
      await page.$("input#identifierId").press("Enter");

      await page.waitForSelector("div#password");
      await page.type("input#identifierId", emailPassword);
      await page.$("input#identifierId").press("Enter");

      await page.waitForSelector("div#submit_approve_access");
      await page.click("div#submit_approve_access");
      await page.waitFor(4000);

      const continueButton = Array.from(
        document.querySelectorAll("span")
      ).find((el) => el.textContent.includes("Continue"));
      continueButton.click();
      await page.waitFor(4000);
    }

    const customizeVideo = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Customize Video"));
    customizeVideo.click();
    await page.waitFor(4000);
    
    const inputChannel = Array.from(
      document.querySelectorAll("span")
      ).find((el) => el.textContent.includes("UC"));
      inputChannel.textContent = channelID;
      await page.waitFor(4000);
      await inputChannel.press('Enter')
      await page.waitFor(4000);
      
      const refreshFields = Array.from(
        document.querySelectorAll("span")
        ).find((el) => el.textContent.includes("Refresh Fields"));
        refreshFields.click();
        await page.waitFor(2000);
        
    const continueButton = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Continue"));
    continueButton.click();

    await page.waitFor(4000);

    const testTrigger = Array.from(
      document.querySelectorAll("span")
    ).find((el) => el.textContent.includes("Test tirgger"));
    testTrigger.click();

    await page.waitFor(4000);
    const activateZap = document.querySelectorAll("button")[1];
    activateZap.click();

    await page.waitFor(4000);
  });

  return;
})();

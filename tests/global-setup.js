const { chromium } = require("@playwright/test");

module.exports=async config =>{
    let browser = await chromium.launch({ headless: false });
  let page = await browser.newPage();
  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle" });
  await page.locator('//*[@id="loginForm"]/div/div[1]/div/label/input').click();

  await page
    .locator('//*[@id="loginForm"]/div/div[1]/div/label/input')
    .fill("najum1993@gmail.com");
  await page.locator('//*[@id="loginForm"]/div/div[2]/div/label/input').click();

  await page
    .locator('//*[@id="loginForm"]/div/div[2]/div/label/input')
    .fill("MAMAlove.123");
    await page.locator('//*[@id="loginForm"]/div/div[3]/button').click();

    await page.context().storageState({path:'storageState.json'})

}



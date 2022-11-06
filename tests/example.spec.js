const { chromium, expect } = require("@playwright/test");
const cheerio = require("cheerio");

exports.testFunction = async () => {
  let links = [];
  let browser = await chromium.launch({ headless: false });
  let page = await browser.newPage();

  await page.goto("https://www.reddit.com/search/?q=uber", {
    waitUntil: "networkidle",
  });
  const previousHeight = await page.evaluate('document.body.scrollHeight');
  console.log('1',previousHeight)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  //await page.waitForSelector("div.QBfRw7Rj8UkxybFpX-USO", { visible: true });
  await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const div = page.locator("div.QBfRw7Rj8UkxybFpX-USO");
  const urls = await div.evaluate((div) =>
    Array.from(div.querySelectorAll("a[data-click-id=body]")).map(
      (a) => `www.reddit.com${a.getAttribute("href")}`
    )
  );
  console.log(await page.evaluate('document.body.scrollHeight'))
  
  const h = urls.length;
  /*  const elements= await page.content()//innerHTML('//*[@class="_1MTbwSHIISfMYM16YhZ8kN"]') //SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE
  const $=cheerio.load(elements);
  console.log($)
  $('div[class="QBfRw7Rj8UkxybFpX-USO"]').find('div>div>div>div>div>div[2]>div>div>div>a').each(function(index,element){
    const t=$(element).attr('href')
    console.log(t)
  }) */

  return {h,urls};
};

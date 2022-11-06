const { test } = require("@playwright/test");

test("homepage has Playwright in title and get started link linking to the intro page", async ({
  page,
}) => {
  // Go to https://www.instagram.com/accounts/login/?source=auth_switcher
  await page.goto("https://www.instagram.com", { waitUntil: "networkidle" });

  await page.screenshot({
    path: "hhhhhhh.png",
  });
});

module.exports=test;

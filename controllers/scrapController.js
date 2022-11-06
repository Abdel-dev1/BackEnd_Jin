const { test, expect } = require("@playwright/test");
const testFunction = require("./../tests/example.spec");

exports.testNavigation = async (req, res, next) => {
  const x = await testFunction.testFunction();
  res.status(200).json(x);
};

/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
    console.log("Haciendo Login");
    const page = await browser.newPage();
    await page.authenticate({username:"demo", password:"freedom"});
    await page.goto('http://stagedeeperaf.wpengine.com/');
    //await page.waitForNavigation();
  };
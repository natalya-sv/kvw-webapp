const { Builder, By, Key } = require("selenium-webdriver");
require("dotenv").config();
const { before } = require("mocha");

describe("UI Test", () => {
  let driver;

  before(async () => {
    driver = new Builder().forBrowser("chrome").build();
    driver.get("http://localhost:3000");
  });
  it("Clicking the login button logs the user in", async () => {
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    await driver.findElement(By.id("username")).sendKeys(username);
    await driver.findElement(By.id("password")).sendKeys(password);

    const button = await driver.findElement(By.id("login-button"));
    await button.click();
  });
  it("Change title for home page", async () => {
    await new Promise((r) => setTimeout(r, 1000));

    const homeTitle = "Kindervakantieweek 2024";
    const themaTitle = "Stap mee in de tijdmachine";
    const homeContent =
      "Welkom op de site van de Kindervakantieweek Brandevoort. Gedurende de eerste week van de zomervakantie organiseren wij voor de kinderen in de basisschoolleeftijd een geweldige week vol plezier en vrolijkheid.\nOp deze website vind je informatie over o.a onze geweldige vrijwilligers, de verschillende activiteiten en onze sponsoren. Mocht je informatie missen dan kun je je vraag natuurlijk altijd stellen contact formulier";
    const imageUrl = "https://www.kvwbrandevoort.nl/images/2024/Thema_2024.jpg";

    const title = await driver.findElement(By.id("home-title"));
    const thema = await driver.findElement(By.id("thema-title"));
    const button = await driver.findElement(By.id("home-page-btn"));
    const content = await driver.findElement(By.id("home-content"));
    const image = await driver.findElement(By.id("thema-image"));

    await title.sendKeys(Key.COMMAND, "a");
    await title.sendKeys(Key.DELETE);

    await thema.sendKeys(Key.COMMAND, "a");
    await thema.sendKeys(Key.DELETE);

    await title.sendKeys(homeTitle);
    await thema.sendKeys(themaTitle);
    // await title.getAttribute("value");
    //

    const buttonIsEnabled = await button.isEnabled();
    if (buttonIsEnabled) {
      await button.click();
    }
    // await driver.quit();
  });
});

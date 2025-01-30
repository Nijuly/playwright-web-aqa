import test, { Page } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage";
import { NavigationBarPage } from "../pageObjects/navigationBarPage";
import { Url } from "../testData/urlData";
import { cookies } from "../testData/loginCookies";
import { HistoryPage } from "../pageObjects/historyPage";
import { ConvertPage } from "../pageObjects/convertPage";
import { WelcomePage } from "../pageObjects/welcomePage";
import { restartServer } from "../helpers/restartServer";

let loginPage: LoginPage;
let navigationBarPage: NavigationBarPage;
let historyPage: HistoryPage;
let convertPage: ConvertPage;
let welcomePage: WelcomePage;
let page: Page;

test.describe("Logout user test", () => {
  test.beforeAll(async () => {
    test.setTimeout(60000);

    await restartServer();
  });

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies([cookies]);
    page = await context.newPage();
    loginPage = new LoginPage(page);
    navigationBarPage = new NavigationBarPage(page);
    historyPage = new HistoryPage(page);
    convertPage = new ConvertPage(page);
    welcomePage = new WelcomePage(page);
  });

  test("Should logout from convert page", async () => {
    await welcomePage.goToConvertPage();
    await convertPage.checkHistoryLinkIsVisible();
    await navigationBarPage.userLogout();
    await loginPage.checkEmailAndPasswordFieldsAreVisible();
  });

  test("Should logout from history page", async () => {
    await page.goto(Url.HISTORY);
    await historyPage.checkHistoryPageIsVisible();
    await navigationBarPage.userLogout();
    await loginPage.checkEmailAndPasswordFieldsAreVisible();
  });
});

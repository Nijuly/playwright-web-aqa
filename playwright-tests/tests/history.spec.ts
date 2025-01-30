import test, { Page } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage";
import { Url } from "../testData/urlData";
import { ConvertPage } from "../pageObjects/convertPage";
import { cookies } from "..//testData/loginCookies";
import { HistoryPage } from "../pageObjects/historyPage";
import { WelcomePage } from "../pageObjects/welcomePage";
import { NavigationBarPage } from "../pageObjects/navigationBarPage";
import { VALID_USER } from "../testData/credentialsData";
import { restartServer } from "../helpers/restartServer";

let loginPage: LoginPage;
let historyPage: HistoryPage;
let welcomePage: WelcomePage;
let convertPage: ConvertPage;
let navigationBarPage: NavigationBarPage;
let page: Page;
const documentName: string = "TestDocument.pdf";

test.describe("History test", () => {
  test.beforeAll(async () => {
    test.setTimeout(60000);

    await restartServer({
      PAGE_LOAD_DELAY: "0",
      PDF_ERROR_CHANCE: "0",
      EMPTY_RESULT_CRASH_CHANCE: "0;",
      FILE_DOWNLOADED_CRASH_CHANCE: "0",
    });
  });
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies([cookies]);
    page = await context.newPage();
    loginPage = new LoginPage(page);
    historyPage = new HistoryPage(page);
    convertPage = new ConvertPage(page);
    welcomePage = new WelcomePage(page);
    navigationBarPage = new NavigationBarPage(page);
  });

  test("Validate elements at the history page", async () => {
    await welcomePage.goToHistoryPage();
    await historyPage.checkHistoryPageIsVisible();
  });

  test("Should save history", async () => {
    await welcomePage.goToConvertPage();
    await convertPage.convertFile(documentName);
    await navigationBarPage.userLogout();
    await loginPage.loginUser(VALID_USER.email, VALID_USER.password);
    await loginPage.checkURL(page, Url.CONVERT);
    await convertPage.goToHistoryPage();
    await historyPage.checkHistoryPageIsVisible();
    await historyPage.checkDocumentIsVisible(documentName);
  });

  test("Should remove all entries", async () => {
    await welcomePage.goToConvertPage();
    await convertPage.convertFile(documentName);
    await convertPage.goToHistoryPage();
    await historyPage.removeHistory();
    await historyPage.checkDocumentIsNotExist(documentName);
  });

  test("Should back to the convert page", async () => {
    await welcomePage.goToHistoryPage();
    await historyPage.backToConvertPage();
    await convertPage.checkURL(page, Url.CONVERT);
  });

  test("Should remove specific item from the history", async () => {
    await welcomePage.goToConvertPage();
    await convertPage.convertFile(documentName);
    await convertPage.goToHistoryPage();
    await historyPage.removeFileFromHistory(documentName);
    await historyPage.checkDocumentIsNotExist(documentName);
  });
});

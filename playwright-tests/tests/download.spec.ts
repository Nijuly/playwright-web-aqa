import test, { Page } from "@playwright/test";
import { cookies } from "../testData/loginCookies";
import { ConvertPage } from "../pageObjects/convertPage";
import { WelcomePage } from "../pageObjects/welcomePage";
import { Text } from "../testData/textData";
import { restartServer } from "../helpers/restartServer";

let convertPage: ConvertPage;
let welcomePage: WelcomePage;
let page: Page;

test.describe("Download documents test", () => {
  test.beforeAll(async () => {
    test.setTimeout(60000);
    await restartServer({
      PAGE_LOAD_DELAY: "0",
      PDF_ERROR_CHANCE: "0",
      EMPTY_RESULT_CRASH_CHANCE: "0;",
      FILE_DOWNLOADED_CRASH_CHANCE: "0",
      HIDE_DOWNLOADED_BUTTON_CHANCE: "0.1",
    });
  });

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies([cookies]);
    page = await context.newPage();
    convertPage = new ConvertPage(page);
    welcomePage = new WelcomePage(page);
    await welcomePage.goToConvertPage();
  });

  test("Download pdf file", async () => {
    await convertPage.convertFile("TestDocument.pdf");
    await convertPage.checkAlertMessageHasText(Text.ALERT_SUCCESS);
    await convertPage.downloadFile();
  });
});

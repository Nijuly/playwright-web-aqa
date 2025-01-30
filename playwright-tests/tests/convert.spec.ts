import test, { Page } from "@playwright/test";
import { ConvertPage } from "../pageObjects/convertPage";
import { WelcomePage } from "../pageObjects/welcomePage";
import { cookies } from "../testData/loginCookies";
import { Text } from "../testData/textData";
import { restartServer } from "../helpers/restartServer";

let convertPage: ConvertPage;
let welcomePage: WelcomePage;
let page: Page;

test.describe("Convert documents test", () => {
  test.beforeAll(async () => {
    test.setTimeout(60000);
    await restartServer({
      PAGE_LOAD_DELAY: "0",
      PDF_ERROR_CHANCE: "0",
      HIDE_DOWNLOADED_BUTTON_CHANCE: "0",
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
  test("Validate elements at the convert page", async () => {
    await convertPage.checkHistoryLinkIsVisible();
    await convertPage.checkConvertButtonIsVisible();
    await convertPage.checkDropDownAreaTextIsVisible();
    await convertPage.checkNumberOfUploadedFiles(
      await convertPage.getNumberOfUploadedFiles()
    );
  });

  test("Upload file", async () => {
    const numberBeforeUpload: number =
      await convertPage.getNumberOfUploadedFiles();
    await convertPage.convertFile("TestDocument.pdf");
    await convertPage.checkAlertMessageHasText(Text.ALERT_SUCCESS);
    await convertPage.checkNumberOfUploadedFiles(numberBeforeUpload + 1);
  });

  test("Remove file from Drag and Drop area", async () => {
    await convertPage.dragAndDropFile("TestDocument.pdf");
    await convertPage.removeFile();
  });
});

test.describe("Convert invalid document", () => {
  test.beforeAll(async () => {
    test.setTimeout(60000);
    await restartServer({
      PAGE_LOAD_DELAY: "0",
      PDF_ERROR_CHANCE: "0",
      EMPTY_RESULT_CRASH_CHANCE: "0;",
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

  test("Download docx file", async () => {
    await convertPage.convertFile("TestDocument.docx");
    await convertPage.checkAlertMessageHasText([
      Text.ALERT_INVALID_FILE_FORMAT,
      Text.ALERT_PDF_ONLY,
    ]);
    await convertPage.removeFile();
  });
});
